import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Brain } from 'lucide-react';

const QuizSection = () => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  const question = {
    text: "What is the closest planet to the Sun?",
    answers: ["Venus", "Mercury", "Mars", "Earth"],
    correctAnswer: 1
  };

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    setIsAnswered(true);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="glass-panel p-8 rounded-2xl">
          <div className="flex items-center justify-center mb-6">
            <Brain className="w-12 h-12 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-center mb-8">Daily Science Quiz</h2>
          
          <div className="space-y-6">
            <p className="text-lg text-center font-medium">{question.text}</p>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {question.answers.map((answer, index) => (
                <Button
                  key={index}
                  variant={selectedAnswer === index ? 
                    (index === question.correctAnswer ? "default" : "destructive") : 
                    "outline"}
                  className="p-4 h-auto text-left"
                  onClick={() => !isAnswered && handleAnswer(index)}
                  disabled={isAnswered}
                >
                  {answer}
                </Button>
              ))}
            </div>
            
            {isAnswered && (
              <p className="text-center text-sm mt-4">
                {selectedAnswer === question.correctAnswer ? 
                  "🎉 Correct! Well done!" : 
                  "Try again! The correct answer is " + question.answers[question.correctAnswer]}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizSection;