"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { QuizData, Question } from "@/types/quiz";

export default function ResultsPage() {
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedQuizData = localStorage.getItem("quizData");
    if (storedQuizData) {
      setQuizData(JSON.parse(storedQuizData));
    } else {
      setError("No quiz data found. Please take the quiz first.");
    }
  }, []);

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <Card className="w-full max-w-2xl mb-4">
          <CardHeader>
            <CardTitle>Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
        </Card>
        <Link href="/">
          <Button>Back to Home</Button>
        </Link>
      </main>
    );
  }

  if (!quizData) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
        <Card className="w-full max-w-2xl mb-4">
          <CardHeader>
            <CardTitle>Loading...</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please wait while we fetch your results.</p>
          </CardContent>
        </Card>
      </main>
    );
  }

  const score = quizData.questions.reduce((acc, q, index) => {
    return acc + (q.correctAnswer === quizData.answers[index] ? 1 : 0);
  }, 0);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
      <Card className="w-full max-w-2xl mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl text-center">
            Your score: <span className="font-bold">{score}</span> out of{" "}
            <span className="font-bold">{quizData.questions.length}</span>
          </p>
        </CardContent>
      </Card>
      {quizData.questions.map((q, index) => {
        const userAnswer = quizData.answers[index];
        const isCorrect = userAnswer !== null && q.correctAnswer === userAnswer;
        return (
          <Card
            key={index}
            className={`w-full max-w-2xl mb-4 ${
              isCorrect ? "bg-green-50" : "bg-red-50"
            }`}
          >
            <CardHeader>
              <CardTitle className="text-lg flex items-center">
                {isCorrect ? (
                  <CheckCircle2 className="mr-2 text-green-500" />
                ) : (
                  <XCircle className="mr-2 text-red-500" />
                )}
                Question {index + 1}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-medium mb-2">{q.question}</p>
              <p
                className={`mb-1 ${
                  isCorrect ? "text-green-700" : "text-red-700"
                }`}
              >
                Your answer:{" "}
                {userAnswer !== null ? q.options[userAnswer] : "Not answered"}
              </p>
              {!isCorrect && (
                <p className="text-green-700">
                  Correct answer: {q.options[q.correctAnswer]}
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
      <Link href="/">
        <Button size="lg" className="mt-4">
          Back to Home
        </Button>
      </Link>
    </main>
  );
}
