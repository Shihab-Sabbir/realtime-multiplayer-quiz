"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Player } from "@/types/quiz";

type Team = "red" | "blue" | "green" | "yellow";

interface PlayerListProps {
  players: Player[];
}

export function PlayerList({ players }: PlayerListProps) {
  const teamColors: Record<Team, string> = {
    red: "text-red-400",
    blue: "text-blue-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
  };
  console.log({ players });
  return (
    <Card className="bg-gray-800 border-gray-700 border w-[300px] !h-[calc(100vh_-_10px)] max-h-[900px] overflow-y-auto">
      <CardHeader>
        <CardTitle>Players ({players?.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {players?.map((player) => (
            <li
              key={player.name}
              className="flex items-center justify-between p-2 rounded bg-gray-700/50"
            >
              <span>{player.name}</span>
              <span
                className={`uppercase text-xs ${
                  player.teamId
                    ? teamColors[player.teamId as Team]
                    : "text-gray-400"
                }`}
              >
                {player.teamId ? `${player.teamId} team` : "No team"}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
