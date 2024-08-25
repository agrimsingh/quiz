import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates quiz questions.",
        },
        {
          role: "user",
          content:
            "Generate 10 multiple choice questions with 4 options each about 10th grade economics. The response should be a JSON array of objects, each containing 'question', 'options' (array of 4 strings), and 'correctAnswer' (index of correct option).",
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error("No content generated");
    }

    // Remove markdown formatting
    const cleanedContent = content.replace(/```json\n|\n```/g, "").trim();

    let questions;
    try {
      questions = JSON.parse(cleanedContent);
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError);
      throw new Error("Invalid JSON format");
    }

    if (!Array.isArray(questions) || questions.length !== 10) {
      throw new Error("Invalid questions format");
    }

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error generating questions:", error);
    return NextResponse.json(
      {
        error: "Failed to generate questions",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
