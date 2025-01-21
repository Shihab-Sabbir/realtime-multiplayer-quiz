"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const TEAMS = [
  { id: "red", name: "Red Team", color: "bg-red-500" },
  { id: "blue", name: "Blue Team", color: "bg-blue-500" },
  { id: "green", name: "Green Team", color: "bg-green-500" },
  { id: "yellow", name: "Yellow Team", color: "bg-yellow-500" },
] as const;

type TeamColor = (typeof TEAMS)[number]["id"];

export function JoinRoom() {
  const router = useRouter();
  const [roomId, setRoomId] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamColor | "">("");
  const [error, setError] = useState<string | null>(null);

  const handleJoinRoom = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/rooms/${roomId}/join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: playerName,
            teamId: selectedTeam,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.error === "Player name already taken") {
          setError(
            "This name is already taken. Please choose a different name."
          );
          return;
        }
        throw new Error(data.error || "Failed to join room");
      }

      sessionStorage.setItem("playerName", playerName);
      sessionStorage.setItem("teamId", selectedTeam);
      sessionStorage.removeItem("isLeader");
      sessionStorage.setItem("isLeader", "false");
      router.push(`/room/${roomId}/game`);
    } catch (error) {
      console.error("Failed to join room:", error);
      setError(error instanceof Error ? error.message : "Failed to join room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gray-800 text-gray-100 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl">Join Room</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <p className="bg-red-900 border-red-500 text-white p-2">
            <p>{error}</p>
          </p>
        )}
        <div className="space-y-2">
          <Input
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="bg-gray-700 border-gray-600"
          />
        </div>
        <div className="space-y-2">
          <Input
            placeholder="Your Name"
            value={playerName}
            onChange={(e) => {
              setPlayerName(e.target.value);
              setError(null); // Clear error when user starts typing new name
            }}
            className={`bg-gray-700 border-gray-600 ${
              error ? "border-red-500 focus-visible:ring-red-500" : ""
            }`}
          />
        </div>
        <div className="space-y-2">
          <Select
            value={selectedTeam}
            onValueChange={(value) => setSelectedTeam(value as TeamColor)}
          >
            <SelectTrigger className="w-full bg-gray-700 border-gray-600">
              <SelectValue placeholder="Select Team">
                {selectedTeam && (
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        TEAMS.find((t) => t.id === selectedTeam)?.color
                      }`}
                    ></div>
                    {TEAMS.find((t) => t.id === selectedTeam)?.name}
                  </div>
                )}
              </SelectValue>
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              {TEAMS.map((team) => (
                <SelectItem
                  key={team.id}
                  value={team.id}
                  className="hover:bg-gray-600 focus:bg-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${team.color}`}></div>
                    {team.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button
          onClick={handleJoinRoom}
          className={`w-full ${
            selectedTeam ? TEAMS.find((t) => t.id === selectedTeam)?.color : ""
          } hover:opacity-90`}
          disabled={!roomId || !playerName || !selectedTeam || isLoading}
        >
          {isLoading ? "Joining..." : "Join Room"}
        </Button>
      </CardContent>
    </Card>
  );
}
