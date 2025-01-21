/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { use } from "react";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { TeamSelection } from "@/components/team-selection";
import { Team } from "@/types/quiz";
import { useRouter } from "next/navigation";

export default function TeamSelectionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: roomId } = use(params);
  const router = useRouter();
  const [socket, setSocket] = useState<any>(null);
  const playerName = sessionStorage.getItem("playerName");

  useEffect(() => {
    if (!roomId) return;

    const socketInstance = io("http://localhost:3001");
    setSocket(socketInstance);

    socketInstance.on("error", (error) => {
      console.error("Socket error:", error);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [roomId, playerName]);

  const handleTeamSelect = (team: Team["color"]) => {
    if (!socket) return;

    // Store selected team
    sessionStorage.setItem("selectedTeam", team);
    sessionStorage.setItem("playerID", socket.id);

    socket.emit("selectTeam", {
      roomId,
      team,
      playerName: playerName || `Player ${socket.id.slice(0, 4)}`,
    });

    // Use the same room ID when redirecting
    router.push(`/room/${roomId}/game`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Select Your Team</h1>
        <TeamSelection onTeamSelect={handleTeamSelect} />
      </main>
    </div>
  );
}
