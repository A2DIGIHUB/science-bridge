import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Brain, Trophy, RefreshCw, Loader2, Medal, Info } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { decode } from 'html-entities';
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { motion, AnimatePresence } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from '@/lib/supabase';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  explanation?: string;
}

interface QuizCategory {
  id: number;
  name: string;
}

const CATEGORIES = [
  { id: 17, name: 'Science & Nature' },
  { id: 44, name: 'Healthcare & Medicine' },
  { id: 13, name: 'Health & Wellness' },
  { id: 27, name: 'Biology & Life Sciences' },
];

const DIFFICULTIES = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
];

const fetchQuestions = async (category: string, difficulty: string) => {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  const data = await response.json();

  // Process questions sequentially
  const questionsWithExplanations = [];
  for (const q of data.results) {
    const explanation = await generateExplanation(q.question, q.correct_answer);
    questionsWithExplanations.push({
      ...q,
      explanation
    });
  }
  
  return questionsWithExplanations;
};

// Use GPT-3 to generate explanations
const generateExplanation = async (question: string, answer: string) => {
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{
          role: "user",
          content: `Explain why "${answer}" is the correct answer to this question: "${question}". Keep it brief and educational.`
        }],
        max_tokens: 100,
      }),
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Failed to generate explanation:', error);
    return 'Explanation not available.';
  }
};

const QuizSection = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('17');
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [showExplanation, setShowExplanation] = useState(false);
  const [showHighScores, setShowHighScores] = useState(false);

  const { data: questions, isLoading, refetch } = useQuery<Question[]>({
    queryKey: ['quiz-questions', selectedCategory, selectedDifficulty],
    queryFn: () => fetchQuestions(selectedCategory, selectedDifficulty),
    staleTime: 1000 * 60 * 60, // Cache for 1 hour
  });

  const { data: highScores } = useQuery({
    queryKey: ['quiz-high-scores'],
    queryFn: async () => {
      const { data } = await supabase
        .from('quiz_scores')
        .select(`
          id,
          score,
          total_questions,
          category,
          difficulty,
          created_at,
          user:users(email)
        `)
        .order('score', { ascending: false })
        .limit(10);
      return data;
    },
  });

  const saveScore = useMutation({
    mutationFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('quiz_scores').insert({
        user_id: user.id,
        score,
        total_questions: questions?.length || 0,
        category: CATEGORIES.find(c => c.id === parseInt(selectedCategory))?.name || '',
        difficulty: selectedDifficulty,
      });
    },
  });

  if (isLoading || !questions) {
    return (
      <div className="flex items-center justify-center py-16">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const answers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    .sort(() => Math.random() - 0.5);

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === currentQuestion.correct_answer) {
      setScore(prev => prev + 1);
    }
    setAnsweredQuestions(prev => prev + 1);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      saveScore.mutate();
    }
  };

  const handleReset = async () => {
    await refetch();
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setScore(0);
    setAnsweredQuestions(0);
    setShowExplanation(false);
  };

  const progress = ((answeredQuestions) / questions.length) * 100;

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <h2 className="text-2xl font-bold">Science Quiz</h2>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowHighScores(true)}
              >
                <Medal className="w-4 h-4 mr-2" />
                High Scores
              </Button>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-500" />
                <span className="font-semibold">{score}/{questions.length}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={handleReset}
                className="h-8 w-8"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((category) => (
                  <SelectItem key={category.id} value={category.id.toString()}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                {DIFFICULTIES.map((difficulty) => (
                  <SelectItem key={difficulty.id} value={difficulty.id}>
                    {difficulty.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Progress value={progress} className="mb-8" />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestionIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
                  <span>•</span>
                  <span className="capitalize">{currentQuestion.difficulty}</span>
                </div>
                <p className="text-lg font-medium">
                  {decode(currentQuestion.question)}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {answers.map((answer, index) => (
                  <Button
                    key={index}
                    variant={
                      isAnswered
                        ? answer === currentQuestion.correct_answer
                          ? "default"
                          : answer === selectedAnswer
                          ? "destructive"
                          : "outline"
                        : "outline"
                    }
                    className={`p-4 h-auto text-left ${
                      isAnswered && answer === currentQuestion.correct_answer
                        ? "ring-2 ring-primary"
                        : ""
                    }`}
                    onClick={() => !isAnswered && handleAnswer(answer)}
                    disabled={isAnswered}
                  >
                    {decode(answer)}
                  </Button>
                ))}
              </div>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <p className="text-center font-medium">
                    {selectedAnswer === currentQuestion.correct_answer ? (
                      <span className="text-primary"> Correct! Well done!</span>
                    ) : (
                      <span className="text-destructive">
                        The correct answer is: {decode(currentQuestion.correct_answer)}
                      </span>
                    )}
                  </p>

                  <div className="flex justify-center gap-4">
                    <Button
                      variant="outline"
                      onClick={() => setShowExplanation(true)}
                    >
                      <Info className="w-4 h-4 mr-2" />
                      Show Explanation
                    </Button>
                    
                    {currentQuestionIndex < questions.length - 1 ? (
                      <Button onClick={handleNextQuestion}>
                        Next Question
                      </Button>
                    ) : (
                      <Button onClick={handleReset}>
                        Try Again
                      </Button>
                    )}
                  </div>

                  {currentQuestionIndex === questions.length - 1 && (
                    <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                      <p className="text-center text-lg font-medium">
                        Quiz Complete! Final Score: {score}/{questions.length}
                      </p>
                      {score > 7 && (
                        <p className="text-center text-sm text-muted-foreground mt-2">
                          Outstanding! You're a science expert!
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Explanation Dialog */}
      <Dialog open={showExplanation} onOpenChange={setShowExplanation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Explanation</DialogTitle>
            <DialogDescription className="mt-4">
              {currentQuestion.explanation}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* High Scores Dialog */}
      <Dialog open={showHighScores} onOpenChange={setShowHighScores}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>High Scores</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] mt-4">
            <div className="space-y-4">
              {highScores?.map((score, index) => (
                <div
                  key={score.id}
                  className="flex items-center justify-between p-3 bg-primary/5 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold">{index + 1}</span>
                    <div>
                      <p className="font-medium">{score.user?.email}</p>
                      <p className="text-sm text-muted-foreground">
                        {score.category} • {score.difficulty}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{score.score}/{score.total_questions}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(score.created_at).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default QuizSection;