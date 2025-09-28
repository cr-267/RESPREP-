import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, ArrowLeft, ArrowRight, AlertCircle, Lightbulb } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
import useAppStore from '../store/app-store';
import { MCQQuestion } from '../types';

const Quiz: React.FC = () => {
  const { currentQuiz, submitAnswer, finishQuiz, setCurrentStep } = useAppStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [timeSpent, setTimeSpent] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!currentQuiz) {
    return null;
  }

  const currentQuestion = currentQuiz.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100;
  const isLastQuestion = currentQuestionIndex === currentQuiz.questions.length - 1;
  const hasAnswered = currentQuiz.answers[currentQuestionIndex] !== -1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    submitAnswer(currentQuestionIndex, answerIndex);
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(currentQuiz.answers[currentQuestionIndex + 1] || -1);
      setShowExplanation(currentQuiz.answers[currentQuestionIndex + 1] !== -1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(currentQuiz.answers[currentQuestionIndex - 1] || -1);
      setShowExplanation(currentQuiz.answers[currentQuestionIndex - 1] !== -1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: MCQQuestion['difficulty']) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: MCQQuestion['category']) => {
    switch (category) {
      case 'skills': return 'bg-blue-100 text-blue-800';
      case 'experience': return 'bg-purple-100 text-purple-800';
      case 'projects': return 'bg-green-100 text-green-800';
      case 'education': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Resume Assessment Quiz
          </h1>
          <p className="text-muted-foreground">
            Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="font-mono">{formatTime(timeSpent)}</span>
          </div>
          <Button
            variant="outline"
            onClick={() => setCurrentStep('preview')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Preview
          </Button>
        </div>
      </div>

      {/* Progress */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Question Card */}
        <div className="lg:col-span-3">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">
                  Question {currentQuestionIndex + 1}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
                    {currentQuestion.difficulty}
                  </Badge>
                  <Badge className={getCategoryColor(currentQuestion.category)}>
                    {currentQuestion.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                <p className="text-lg leading-relaxed">{currentQuestion.question}</p>
              </div>

              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrect = index === currentQuestion.correctAnswer;
                  const isIncorrect = showExplanation && isSelected && !isCorrect;
                  const showCorrect = showExplanation && isCorrect;
                  
                  return (
                    <button
                      key={index}
                      onClick={() => !showExplanation && handleAnswerSelect(index)}
                      disabled={showExplanation}
                      className={`quiz-option w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        isSelected && !showExplanation
                          ? 'selected border-primary bg-primary/5'
                          : showCorrect
                          ? 'correct border-green-500 bg-green-50'
                          : isIncorrect
                          ? 'incorrect border-red-500 bg-red-50'
                          : 'border-border hover:border-primary/50'
                      } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm font-medium ${
                          showCorrect
                            ? 'border-green-500 bg-green-500 text-white'
                            : isIncorrect
                            ? 'border-red-500 bg-red-500 text-white'
                            : isSelected
                            ? 'border-primary bg-primary text-white'
                            : 'border-muted-foreground'
                        }`}>
                          {showCorrect ? (
                            <CheckCircle2 className="w-4 h-4" />
                          ) : isIncorrect ? (
                            <AlertCircle className="w-4 h-4" />
                          ) : (
                            String.fromCharCode(65 + index)
                          )}
                        </div>
                        <span className="flex-1">{option}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {showExplanation && (
                <Alert className="border-blue-200 bg-blue-50">
                  <Lightbulb className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800">
                    <strong>Explanation:</strong> {currentQuestion.explanation}
                    <br />
                    <span className="text-sm text-blue-600">
                      Related content: {currentQuestion.relatedContent}
                    </span>
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Navigation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Navigation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestionIndex === 0}
                className="w-full justify-start"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
              
              <Button
                onClick={handleNext}
                disabled={!hasAnswered}
                className="w-full justify-start btn-gradient"
              >
                {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* Quiz Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Quiz Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-5 gap-2">
                {currentQuiz.questions.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentQuestionIndex(index);
                      setSelectedAnswer(currentQuiz.answers[index] || -1);
                      setShowExplanation(currentQuiz.answers[index] !== -1);
                    }}
                    className={`aspect-square rounded-lg border-2 text-sm font-medium transition-all duration-200 ${
                      index === currentQuestionIndex
                        ? 'border-primary bg-primary text-white'
                        : currentQuiz.answers[index] !== -1
                        ? 'border-green-500 bg-green-100 text-green-800'
                        : 'border-muted-foreground/30 hover:border-primary/50'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Answered:</span>
                  <Badge>
                    {currentQuiz.answers.filter(a => a !== -1).length}/{currentQuiz.questions.length}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span>Time Spent:</span>
                  <Badge variant="outline">{formatTime(timeSpent)}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-lg text-amber-800 flex items-center gap-2">
                <Lightbulb className="w-5 h-5" />
                Quiz Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-amber-700 space-y-2">
              <p>• Read each question carefully</p>
              <p>• Think about your resume content</p>
              <p>• Review explanations to learn</p>
              <p>• Use navigation to revisit questions</p>
            </CardContent>
          </Card>

          {/* Backend Integration Note */}
          <div className="p-3 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Dev Note:</strong> Quiz state will persist in MongoDB in full MERN implementation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;