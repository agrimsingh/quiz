"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("/api/questions");
        const data = await response.json();
        if (Array.isArray(data)) {
          localStorage.setItem("quizQuestions", JSON.stringify(data));
        } else {
          console.error("Invalid data format received:", data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleStartQuiz = () => {
    router.push("/quiz");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl">Loading questions...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-white p-4 md:p-8 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold">
            Economics Quiz
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">
            Test your knowledge of economics with this quiz!
          </p>
          <Button onClick={handleStartQuiz} size="lg">
            Start Quiz
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
