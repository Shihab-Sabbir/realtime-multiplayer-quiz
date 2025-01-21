import { Question } from "../types/quiz";

export const sampleQuizzes: Record<string, Question[]> = {
  general: [
    {
      id: "g1q1",
      text: "What is the capital of France?",
      options: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 0,
      category: "general",
      points: 1000,
    },
    {
      id: "g1q2",
      text: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1,
      category: "general",
      points: 1000,
    },
  ],
  science: [
    {
      id: "s1q1",
      text: "What planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: 1,
      category: "science",
      points: 1000,
    },
    {
      id: "s1q2",
      text: "What is the chemical symbol for water?",
      options: ["H2O", "O2", "CO2", "NaCl"],
      correctAnswer: 0,
      category: "science",
      points: 1000,
    },
  ],
  history: [
    {
      id: "h1q1",
      text: "Who was the first President of the United States?",
      options: [
        "George Washington",
        "Thomas Jefferson",
        "Abraham Lincoln",
        "John Adams",
      ],
      correctAnswer: 0,
      category: "history",
      points: 1000,
    },
    {
      id: "h1q2",
      text: "In which year did World War II end?",
      options: ["1945", "1939", "1918", "1965"],
      correctAnswer: 0,
      category: "history",
      points: 1000,
    },
  ],
  geography: [
    {
      id: "geo1q1",
      text: "Which is the largest continent by area?",
      options: ["Asia", "Africa", "North America", "Europe"],
      correctAnswer: 0,
      category: "geography",
      points: 1000,
    },
    {
      id: "geo1q2",
      text: "Which country has the most natural lakes?",
      options: ["Canada", "Brazil", "Russia", "United States"],
      correctAnswer: 0,
      category: "geography",
      points: 1000,
    },
  ],
};