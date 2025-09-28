import React from 'react';
import { FileText, Zap, Target, Users, ArrowRight, Star, CheckCircle2, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import useAppStore from '../store/app-store';
import ResumeUpload from '../components/ResumeUpload';
import ResumePreview from '../components/ResumePreview';
import Quiz from '../components/Quiz';
import Results from '../components/Results';

const HomePage: React.FC = () => {
  const { currentStep, resetApp } = useAppStore();

  // Render the appropriate component based on current step
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'upload':
        return <ResumeUpload />;
      case 'preview':
        return <ResumePreview />;
      case 'quiz':
        return <Quiz />;
      case 'results':
        return <Results />;
      default:
        return <ResumeUpload />;
    }
  };

  // Landing page content (shown only on initial load)
  if (currentStep === 'upload' && !useAppStore.getState().resume) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
        {/* Header */}
        <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  ResuPrep
                </h1>
              </div>
              <Button onClick={resetApp} variant="outline">
                Reset Demo
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <section className="text-center space-y-8 mb-16">
            <div className="max-w-4xl mx-auto">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Frontend Prototype • MERN Stack Ready
              </Badge>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Test Your Resume
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Knowledge
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Upload your resume and get personalized MCQ questions based on your skills, experience, 
                and projects. Perfect for interview preparation and self-assessment.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="btn-gradient text-lg px-8 py-6"
                  onClick={() => document.getElementById('upload-section')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  View Demo
                </Button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="relative max-w-4xl mx-auto">
              <div className="absolute -top-10 left-10 animate-float">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="absolute -top-5 right-20 animate-float" style={{ animationDelay: '2s' }}>
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div className="absolute top-10 right-10 animate-float" style={{ animationDelay: '4s' }}>
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">How ResuPrep Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A simple three-step process to assess your resume knowledge
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="card-hover border-2 border-primary/10 hover:border-primary/30">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">1. Upload Resume</h3>
                  <p className="text-muted-foreground">
                    Upload your resume in PDF, DOC, or TXT format. Our system will parse and extract key information.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-2 border-secondary/10 hover:border-secondary/30">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-secondary/10 flex items-center justify-center">
                    <Zap className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">2. AI-Generated Quiz</h3>
                  <p className="text-muted-foreground">
                    Get personalized MCQ questions based on your skills, experience, projects, and education.
                  </p>
                </CardContent>
              </Card>

              <Card className="card-hover border-2 border-green-200 hover:border-green-400">
                <CardContent className="pt-6 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                    <Target className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold">3. Get Results</h3>
                  <p className="text-muted-foreground">
                    Receive detailed feedback, performance analytics, and personalized recommendations.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Why Choose ResuPrep?</h2>
                <p className="text-muted-foreground text-lg">
                  Perfect for job seekers, students, and professionals
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Interview Preparation</h4>
                      <p className="text-muted-foreground">
                        Test your knowledge about your own resume content before interviews
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Personalized Questions</h4>
                      <p className="text-muted-foreground">
                        AI-generated questions specific to your skills and experience
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Instant Feedback</h4>
                      <p className="text-muted-foreground">
                        Get immediate results with detailed explanations and recommendations
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <Clock className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Quick Assessment</h4>
                      <p className="text-muted-foreground">
                        Complete assessment in just 10-15 minutes
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Users className="w-6 h-6 text-purple-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">For Everyone</h4>
                      <p className="text-muted-foreground">
                        Perfect for students, job seekers, and career changers
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <Star className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold mb-2">Professional Growth</h4>
                      <p className="text-muted-foreground">
                        Identify knowledge gaps and areas for improvement
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Upload Section */}
          <section id="upload-section" className="mb-16">
            <ResumeUpload />
          </section>

          {/* Tech Stack Note */}
          <section className="max-w-4xl mx-auto">
            <Card className="border-dashed border-muted-foreground/30 bg-muted/30">
              <CardContent className="pt-6 text-center space-y-4">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-sm font-medium">Development Status</span>
                </div>
                <h3 className="text-lg font-semibold">Frontend Prototype Ready</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  This is a fully functional frontend prototype built with React, TypeScript, and Tailwind CSS. 
                  The codebase includes clear integration points for the backend MERN stack implementation, 
                  including Express.js APIs, MongoDB data models, and AI-powered question generation services.
                </p>
                <div className="flex flex-wrap justify-center gap-2 pt-4">
                  <Badge variant="outline">React 18</Badge>
                  <Badge variant="outline">TypeScript</Badge>
                  <Badge variant="outline">Tailwind CSS</Badge>
                  <Badge variant="outline">Zustand</Badge>
                  <Badge variant="outline">shadcn/ui</Badge>
                  <Badge variant="secondary">MERN Ready</Badge>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t bg-muted/30 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-semibold">ResuPrep</span>
              </div>
              <p className="text-muted-foreground">
                Resume-Based MCQ Generator • Built for Modern Web
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Render the current step for the app flow
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                ResuPrep
              </h1>
            </div>
            
            {/* Step Indicator */}
            <div className="hidden md:flex items-center gap-2">
              {(['upload', 'preview', 'quiz', 'results'] as const).map((step, index) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep === step
                      ? 'bg-primary text-white'
                      : index < (['upload', 'preview', 'quiz', 'results'] as const).indexOf(currentStep)
                      ? 'bg-green-500 text-white'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {index + 1}
                  </div>
                  {index < 3 && (
                    <div className={`w-8 h-0.5 ${
                      index < (['upload', 'preview', 'quiz', 'results'] as const).indexOf(currentStep)
                        ? 'bg-green-500'
                        : 'bg-muted'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <Button onClick={resetApp} variant="outline">
              Start Over
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {renderCurrentStep()}
      </main>
    </div>
  );
};

export default HomePage;