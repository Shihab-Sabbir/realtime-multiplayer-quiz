"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { QuizCategory } from "@/types/quiz";

export function CreateRoom() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [timerDuration, setTimerDuration] = useState(20);
  const [selectedCategories, setSelectedCategories] = useState<QuizCategory[]>(
    []
  );

  const categories: { label: string; value: QuizCategory }[] = [
    { label: "General Knowledge", value: "general" },
    { label: "Science", value: "science" },
    { label: "History", value: "history" },
    { label: "Geography", value: "geography" },
  ];

  const handleCreateRoom = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}api/v1/rooms`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categories: selectedCategories,
          timerDuration,
          leaderName: "Room Leader",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create room");
      }

      const data = await response.json();
      sessionStorage.setItem("isLeader", "true");
      sessionStorage.setItem("playerName", "Room Leader");
      router.push(`/room/${data.room.id}/game`);
    } catch (error) {
      console.error("Failed to create room:", error);
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-gray-800 text-gray-100 border-gray-700">
      <CardHeader>
        <CardTitle className="text-2xl">Create Room</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="timer">Question Timer (seconds)</Label>
          <Input
            id="timer"
            type="number"
            min={5}
            max={60}
            value={timerDuration}
            onChange={(e) => setTimerDuration(Number(e.target.value))}
            className="bg-gray-700 border-gray-600"
          />
        </div>
        <div className="space-y-2">
          <Label>Select Categories</Label>
          <div className="grid grid-cols-2 gap-4">
            {categories.map((category) => (
              <div key={category.value} className="flex items-center space-x-2">
                <Checkbox
                  id={category.value}
                  checked={selectedCategories.includes(category.value)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([
                        ...selectedCategories,
                        category.value,
                      ]);
                    } else {
                      setSelectedCategories(
                        selectedCategories.filter((c) => c !== category.value)
                      );
                    }
                  }}
                />
                <Label htmlFor={category.value} className="cursor-pointer">
                  {category.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
        <Button
          onClick={handleCreateRoom}
          className="w-full"
          disabled={selectedCategories.length === 0 || isLoading}
        >
          {isLoading ? "Creating..." : "Create Room"}
        </Button>
      </CardContent>
    </Card>
  );
}
