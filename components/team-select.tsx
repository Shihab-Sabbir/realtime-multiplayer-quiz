import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TeamSelectProps {
  onTeamSelect: (teamId: string) => void;
  selectedTeam: string;
  teams: Array<{ _id: string; players: string[] }>;
}

export function TeamSelect({
  onTeamSelect,
  selectedTeam,
  teams,
}: TeamSelectProps) {
  return (
    <Select onValueChange={onTeamSelect} value={selectedTeam}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a team" />
      </SelectTrigger>
      <SelectContent>
        {teams.map((team, index) => (
          <SelectItem key={team._id} value={team._id}>
            Team {index + 1} ({team.players.length} players)
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
