import React from 'react';
import { Trophy, Clock, Target, TrendingUp, ArrowLeft, RotateCcw, Download, Share2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import useAppStore from '../store/app-store';

const Results: React.FC = () => {
  const { quizResult, currentQuiz, resetApp, setCurrentStep } = useAppStore();

  if (!quizResult || !currentQuiz) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const handleNewQuiz = () => {
    setCurrentStep('preview');
  };

  const handleStartOver = () => {
    resetApp();
  };

  const handleDownloadReport = () => {
    // In a real app, this would generate a PDF report
    console.log('Download report functionality - placeholder for MERN implementation');
    alert('Download feature will be available in the full MERN stack version!');
  };

  const handleShareResults = () => {
    // In a real app, this would share results
    console.log('Share results functionality - placeholder for MERN implementation');
    alert('Share feature will be available in the full MERN stack version!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary text-white mb-4">
          <Trophy className="w-10 h-10" />
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Quiz Complete!
        </h1>
        <p className="text-xl text-muted-foreground">
          Here's how you performed on your resume assessment
        </p>
      </div>

      {/* Score Overview */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
          <CardContent className="pt-6 text-center">
            <div className="space-y-2">
              <div className={`text-5xl font-bold ${getScoreColor(quizResult.score)}`}>
                {quizResult.score}%
              </div>
              <div className="text-2xl font-semibold text-muted-foreground">
                Grade: {getScoreGrade(quizResult.score)}
              </div>
              <p className="text-sm text-muted-foreground">Overall Score</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-green-600">
                {quizResult.correctAnswers}
              </div>
              <div className="text-sm text-muted-foreground">
                out of {quizResult.totalQuestions}
              </div>
              <p className="text-sm text-muted-foreground">Correct Answers</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-1">
                <Clock className="w-6 h-6" />
                {formatTime(quizResult.timeSpent)}
              </div>
              <p className="text-sm text-muted-foreground">Time Spent</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">
                {Math.round(quizResult.timeSpent / quizResult.totalQuestions)}s
              </div>
              <p className="text-sm text-muted-foreground">Avg. per Question</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Detailed Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                Performance by Category
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {Object.entries(quizResult.categoryBreakdown).map(([category, stats]) => (
                <div key={category} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="capitalize">
                        {category}
                      </Badge>
                      <span className="font-semibold">
                        {stats.correct}/{stats.total} correct
                      </span>
                    </div>
                    <div className={`text-lg font-bold ${getScoreColor(stats.percentage)}`}>
                      {stats.percentage}%
                    </div>
                  </div>
                  <Progress value={stats.percentage} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card>
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentQuiz.questions.map((question, index) => {
                const userAnswer = currentQuiz.answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="space-y-3 p-4 rounded-lg border">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="font-medium mb-2">
                          {index + 1}. {question.question}
                        </p>
                        <div className="space-y-1 text-sm">
                          <div className={`flex items-center gap-2 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                            <span>Your answer:</span>
                            <strong>{question.options[userAnswer]}</strong>
                          </div>
                          {!isCorrect && (
                            <div className="flex items-center gap-2 text-green-600">
                              <span>Correct answer:</span>
                              <strong>{question.options[question.correctAnswer]}</strong>
                            </div>
                          )}
                        </div>
                      </div>
                      <Badge variant={isCorrect ? 'default' : 'destructive'}>
                        {isCorrect ? 'Correct' : 'Incorrect'}
                      </Badge>
                    </div>
                    {!isCorrect && (
                      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                        <strong>Explanation:</strong> {question.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button onClick={handleNewQuiz} className="w-full btn-gradient">
                <RotateCcw className="w-4 h-4 mr-2" />
                Take New Quiz
              </Button>
              
              <Button onClick={handleDownloadReport} variant="outline" className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
              
              <Button onClick={handleShareResults} variant="outline" className="w-full">
                <Share2 className="w-4 h-4 mr-2" />
                Share Results
              </Button>
              
              <Separator />
              
              <Button onClick={handleStartOver} variant="ghost" className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-amber-200 bg-amber-50">
            <CardHeader>
              <CardTitle className="text-amber-800 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quizResult.recommendations.map((recommendation, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                  <p className="text-sm text-amber-700">{recommendation}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Performance Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance Insights</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Strengths</h4>
                {Object.entries(quizResult.categoryBreakdown)
                  .filter(([, stats]) => stats.percentage >= 70)
                  .map(([category]) => (
                    <Badge key={category} variant="secondary" className="mr-1">
                      {category}
                    </Badge>
                  ))}
              </div>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-sm">Areas for Improvement</h4>
                {Object.entries(quizResult.categoryBreakdown)
                  .filter(([, stats]) => stats.percentage < 70)
                  .map(([category]) => (
                    <Badge key={category} variant="outline" className="mr-1">
                      {category}
                    </Badge>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Backend Integration Note */}
          <div className="p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Dev Note:</strong> Results will be stored in MongoDB with detailed analytics in full MERN stack
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;