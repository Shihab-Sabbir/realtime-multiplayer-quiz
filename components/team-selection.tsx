"use client";

import { Button } from "@/components/ui/button";
import { Team } from "@/types/quiz";

interface TeamSelectionProps {
  onTeamSelect: (team: Team["color"]) => void;
}

export function TeamSelection({ onTeamSelect }: TeamSelectionProps) {
  const teams = [
    { color: "red", label: "Red Team" },
    { color: "blue", label: "Blue Team" },
    { color: "green", label: "Green Team" },
    { color: "yellow", label: "Yellow Team" },
  ] as const;

  return (
    <div className="grid grid-cols-2 gap-4">
      {teams.map((team) => (
        <Button
          key={team.color}
          onClick={() => onTeamSelect(team.color)}
          className={`h-24 text-xl ${
            team.color === "red" && "bg-red-600 hover:bg-red-700"
          } ${team.color === "blue" && "bg-blue-600 hover:bg-blue-700"} ${
            team.color === "green" && "bg-green-600 hover:bg-green-700"
          } ${team.color === "yellow" && "bg-yellow-600 hover:bg-yellow-700"}`}
        >
          {team.label}
        </Button>
      ))}
    </div>
  );
}
