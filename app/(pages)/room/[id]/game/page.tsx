/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { use, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { QuizDisplay } from "@/components/quiz-display";
import { PlayerList } from "@/components/player-list";
import { ChatBox } from "@/components/chat-box";

import { Button } from "@/components/ui/button";
import { Team } from "@/types/quiz";

export default function GamePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: roomId } = use(params);
  const [room, setRoom] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [scores, setScores] = useState([])
  const [messages, setMessages] = useState([])
  // Fetch initial room state
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/rooms/${roomId}`
        );
        if (!response.ok) throw new Error("Room not found");
        const data = await response.json();
        setRoom(data?.room);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load room");
      } finally {
        setIsLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const clearSessionStorage = () => {
    sessionStorage.clear();
    console.log("Session storage cleared.");
  };
  
  // Setup socket connection
  useEffect(() => {
    const socketInstance = io(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);

    socketInstance.on("gameState", (state: any) => {
      setRoom(state);
     
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []);


   useEffect(() => {
      if (room?.teams) {
        setScores((prevScores:Team[]) =>
          room.teams.map((newTeam:Team) => {
            // Find the corresponding team in the previous scores
            const existingTeam = prevScores?.find((team) => team.id == newTeam.id);
  
            // If no existing team or new score is higher, update the score
            if (!existingTeam || newTeam.score > existingTeam.score) {
              return { ...newTeam }; // Update with the new team data
            }
  
            // Otherwise, retain the existing team data
            return existingTeam;
          }) as any // Ensure the type is correct
        );
      }
  
      // Update messages regardless of the scores
      setMessages(room?.messages || []);
    }, [room]);
  
  
  

  console.log({room,scores});

  const handleStartGame = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/rooms/${roomId}/start`,
        { method: "POST" }
      );

      if (!response.ok) throw new Error("Failed to start game");
    } catch (error) {
      console.error("Failed to start game:", error);
    }
  };

  const handleSubmitAnswer = async (answer: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/rooms/${roomId}/answer`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerName: sessionStorage.getItem("playerName"),
            answer,
            questionId: room.quiz[room.currentQuestionIndex]._id,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to submit answer");
    } catch (error) {
      console.error("Failed to submit answer:", error);
    }
  };

  const handleSendMessage = async (text: string) => {
    try {
      const playerName = sessionStorage.getItem("playerName") || "Anonymous";
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/rooms/${roomId}/message`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            playerName,
            message: text,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to send message");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

 

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        {error || "Room not found"}
      </div>
    );
  }

  const isLeader = sessionStorage.getItem("isLeader") === "true";
  const showResults = room.status === "completed";

  if (showResults) {
    clearSessionStorage()
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
        <main className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">Game Results</h1>
          <div className="grid grid-cols-2 gap-8">
          {scores?.filter((team: any) => team.color) // Exclude teams without a color
  .sort((a: any, b: any) => b.score - a.score) // Sort by score
  .map((team: any, index: any) => (
    <div
      key={team.id || index}
      className={`p-6 rounded-lg ${
        index === 0 ? `bg-${team.color}-600` : "bg-gray-700"
      }`}
    >
      {index === 0 && <p className="text-xl font-bold mb-2">Winner !</p>}
      <h2 className="text-xl font-bold mb-2">
        {`${team.color.toUpperCase()}`}
      </h2>
      <p className="text-2xl">Score: {team.score}</p>
      <div className="text-sm mt-2">
        Players: {team.players && team.players.length}
      </div>
    </div>
  ))}

</div>
        </main>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto grid place-content-center pt-2 px-4 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto">
        <div className="flex gap-8 ">
          <div className="space-y-8 w-[calc(100vw-400px)]">
            <div className="flex justify-between items-center">
              <h1 className="text-xl font-bold">Room: {roomId}</h1>
              {isLeader && !room.quizStarted && room.members?.length > 0 && (
                <Button
                  onClick={handleStartGame}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Start Game
                </Button>
              )}

              {room.quizStarted && (
                <div className="text-sm text-gray-400">
                  Time left: {room.timeLeft}s
                </div>
              )}
            </div>
            {room.quizStarted && (
              <QuizDisplay
                question={room.quiz[room.currentQuestionIndex]}
                timeLimit={room.timerDuration}
                showAnswer={showResults}
                onAnswerSelect={handleSubmitAnswer}
                isLeader={isLeader}
                enableSubmit={room?.submitAnswerActive}
              />
            )}
            {room.quizStarted && (
                <div className="text-sm text-gray-400">
                  Time left: {room.timeLeft}s
                </div>
              )}
           <div className="h-[calc(100vh-360px)] overflow-hidden ">
           {room.quizStarted && (
              <div className="grid grid-cols-4 gap-4 mb-8">
               {scores?.filter((team: any) => team.color)
                        .sort((a: any, b: any) => b.score - a.score) 
                        .map((team: any, index: number) => (
                          <div
                            key={index}
                            className={`h-[30px] grid place-content-center  rounded-lg ${
                              `bg-${team.color}-600`
                            }`}
                          >  
                            <h2 className="text-sm font-bold">
                              {team.color.toUpperCase()} (Team) - {team.score}
                            </h2>
                          </div>
                        ))}
              </div>
            )}
            <ChatBox
              game_messages={messages}
              onSendMessage={handleSendMessage}
              className="h-[300px]"
            />
           </div>
          </div>
          <PlayerList
            players={room.members.map((member: any) => ({
              name: member.name,
              teamId: member.teamId,
            }))}
          />
        </div>
      </main>
    </div>
  );
}
