import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface QuestionCardProps {
  question: string;
  options: string[];
  onAnswer: (selectedIndex: number) => void;
  selectedOption: number | null;
}

export function QuestionCard({
  question,
  options,
  onAnswer,
  selectedOption,
}: QuestionCardProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-lg">{question}</CardTitle>
      </CardHeader>
      <CardContent>
        {options.map((option, index) => (
          <Button
            key={option}
            variant={selectedOption === index ? "default" : "outline"}
            className="w-full mb-2"
            onClick={() => onAnswer(index)}
          >
            {option}
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}
