import { Message, Player, Question, Team } from "./quiz";

export interface GameState {
  currentQuestion: Question | null;
  timeLeft: number;
  players: Player[];
  teams: Team[];
  status: "waiting" | "in-progress" | "completed";
  leaderId: string;
  messages: Message[];
}

export interface ServerToClientEvents {
  gameState: (state: GameState) => void;
  playerJoined: (player: Player) => void;
  playerLeft: (player: Player) => void;
  chatMessage: (message: Message) => void;
  error: (error: { message: string }) => void;
}

export interface ClientToServerEvents {
  joinGame: (data: { roomId: string; playerName: string }) => void;
  gameStart: (data: { roomId: string }) => void;
  submitAnswer: (data: { answer: string; roomId: string }) => void;
  chatMessage: (data: {
    text: string;
    player: { name: string; team?: string };
  }) => void;
}
