"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/question-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuizData, Question } from "@/types/quiz";

export default function QuizPage() {
  const router = useRouter();
  const [quizData, setQuizData] = useState<QuizData>({
    questions: [],
    answers: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("quizQuestions");
    if (storedQuestions) {
      const questions: Question[] = JSON.parse(storedQuestions);
      setQuizData({
        questions,
        answers: new Array(questions.length).fill(null),
      });
    } else {
      router.push("/");
    }
    setLoading(false);
  }, [router]);

  const handleAnswer = (questionIndex: number, selectedOption: number) => {
    setQuizData((prevData) => {
      const newAnswers = [...prevData.answers];
      newAnswers[questionIndex] = selectedOption;
      return { ...prevData, answers: newAnswers };
    });
  };

  const handleSubmit = () => {
    if (quizData.answers.every((answer) => answer !== null)) {
      localStorage.setItem("quizData", JSON.stringify(quizData));
      router.push("/results");
    } else {
      alert("Please answer all questions before submitting.");
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading quiz...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4 md:p-8">
      <Card className="mx-auto max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Economics Quiz
          </CardTitle>
        </CardHeader>
        <CardContent>
          {quizData.questions.map((q, index) => (
            <QuestionCard
              key={q.question}
              question={q.question}
              options={q.options}
              onAnswer={(selectedOption) => handleAnswer(index, selectedOption)}
              selectedOption={quizData.answers[index]}
            />
          ))}
          <div className="mt-8 text-center">
            <Button onClick={handleSubmit} size="lg">
              Submit Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
