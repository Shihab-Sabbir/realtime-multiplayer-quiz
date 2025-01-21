"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface ChatMessage {
  type: "user" | "system";
  text: string;
  message?: string;
  player: {
    name: string;
    team?: string;
  };
  timestamp: string;
}

interface ChatBoxProps {
  game_messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  className?: string;
}

export function ChatBox({ game_messages, onSendMessage, className }: ChatBoxProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  console.log({ game_messages });
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [game_messages]);

  const handleSend = () => {
    if (message.trim()) {
      console.log({ message });
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <div className={cn("flex flex-col bg-gray-800 rounded-lg max-h-[300px] overflow-y-auto w-full", className)}>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {game_messages?.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "px-3 py-2 rounded",
              msg.type === "system" ? "text-gray-400 text-sm italic" : ""
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                {msg.type === "user" && msg.player && (
                  <div className="flex items-center">
                    <span
                      className={cn(
                        "font-bold mr-2",
                        msg.player.team === "red" && "text-red-400",
                        msg.player.team === "blue" && "text-blue-400",
                        msg.player.team === "green" && "text-green-400",
                        msg.player.team === "yellow" && "text-yellow-400",
                        !msg.player.team && "text-yellow-400"
                      )}
                    >
                      {msg.player.name}:
                    </span>
                    <span>{msg?.text || msg?.message}</span>
                  </div>
                )}
                {msg.type === "system" && (
                  <span>{msg?.text || msg?.message}</span>
                )}
              </div>
              <span className="text-xs text-gray-500 ml-2">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-gray-700 flex gap-2">
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type a message..."
          className="bg-gray-700 border-gray-600"
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </div>
  );
}
