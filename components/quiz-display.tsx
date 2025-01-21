/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Question } from "@/types/quiz";
import { Progress } from "@/components/ui/progress";

interface QuizDisplayProps {
  question: Question;
  timeLimit: number;
  onTimeUp?: () => void;
  onAnswerSelect: (answer: string) => void;
  showAnswer?: boolean;
  isLeader?: boolean;
  enableSubmit?: boolean;
}

export function QuizDisplay({
  question,
  timeLimit,
  onTimeUp,
  onAnswerSelect,
  showAnswer = false,
  isLeader = false,
  enableSubmit = true,
}: QuizDisplayProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (true) {
      setSelectedAnswer(answer);
      onAnswerSelect(answer);
    }
  };


  return (
    <Card className="bg-gray-800 text-gray-300 border-gray-700 max-h-[300px] overflow-hidden">
      <CardContent className="p-6 space-y-6">
        <h2 className="text-lg font-bold text-center">{question.text}</h2>
        {!isLeader && (
          <div className="grid grid-cols-2 gap-4">
            {question.options.map((option, index) => {
              const isSelected = option == selectedAnswer;
              const isCorrect = index == question.correctAnswer;
              return (
                <button
                  key={index}
                  className={`p-1 h-[40px] text-md text-gray-300 rounded transition ${
                    showAnswer && isCorrect
                      ? "bg-green-600"
                      : isSelected
                      ? "bg-gray-600"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={!enableSubmit}
                >
                  {option}
                </button>
              );
            })}
          </div>
        )}
        {!enableSubmit && !isLeader && (
          <div className="text-center text-sm  grid place-content-center font-bold text-green-500 border h-[30px] overflow-hidden">
            Correct Answer : {question.options[question.correctAnswer]}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
