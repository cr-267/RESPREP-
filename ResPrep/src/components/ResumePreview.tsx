import React from 'react';
import { FileText, User, Briefcase, GraduationCap, Code, ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import useAppStore from '../store/app-store';
import { simulateQuestionGeneration } from '../utils/mockData';
import { useToast } from '../hooks/use-toast';

const ResumePreview: React.FC = () => {
  const { resume, setCurrentStep, startQuiz, setLoading, isLoading } = useAppStore();
  const { toast } = useToast();

  if (!resume) {
    return null;
  }

  const handleStartQuiz = async () => {
    if (!resume) return;

    setLoading(true);
    try {
      // Simulate AI question generation (in real app, this would call backend API)
      const questions = await simulateQuestionGeneration(resume);
      startQuiz(questions);
      
      toast({
        title: 'Quiz Generated!',
        description: `Generated ${questions.length} personalized questions based on your resume.`,
      });
    } catch (error) {
      toast({
        title: 'Generation Failed',
        description: 'Failed to generate quiz questions. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep('upload');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Resume Preview
          </h1>
          <p className="text-muted-foreground">
            Review your parsed resume content before generating quiz questions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={handleBack} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleStartQuiz}
            disabled={isLoading}
            className="btn-gradient flex items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating Quiz...
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                Generate Quiz
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Resume Info Card */}
      <Card className="border-2 border-primary/20">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-xl">{resume.fileName}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Uploaded on {resume.uploadDate.toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Skills Section */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Technical Skills
                <Badge variant="secondary">{resume.skills.length} skills</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {resume.skills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="hover:bg-primary/10">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Experience Section */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-secondary" />
                Work Experience
                <Badge variant="secondary">{resume.experience.length} positions</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resume.experience.map((exp, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="font-semibold text-lg">{exp.title}</h4>
                      <p className="text-muted-foreground">{exp.company}</p>
                    </div>
                    <Badge variant="outline">{exp.duration}</Badge>
                  </div>
                  <p className="text-sm leading-relaxed">{exp.description}</p>
                  {exp.technologies && (
                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  {index < resume.experience.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Projects Section */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-600" />
                Projects
                <Badge variant="secondary">{resume.projects.length} projects</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resume.projects.map((project, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <h4 className="font-semibold text-lg">{project.name}</h4>
                    {project.duration && (
                      <Badge variant="outline">{project.duration}</Badge>
                    )}
                  </div>
                  <p className="text-sm leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  {index < resume.projects.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education Section */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                Education
                <Badge variant="secondary">{resume.education.length} entries</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resume.education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-muted-foreground">{edu.institution}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="outline">{edu.year}</Badge>
                      {edu.grade && (
                        <Badge variant="secondary">GPA: {edu.grade}</Badge>
                      )}
                    </div>
                  </div>
                  {index < resume.education.length - 1 && <Separator className="mt-4" />}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quiz Info */}
          <Card className="border-2 border-secondary/20">
            <CardHeader>
              <CardTitle className="text-center text-secondary">
                Ready for Your Quiz?
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="p-4 rounded-lg bg-secondary/10">
                <Zap className="w-8 h-8 text-secondary mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  We'll generate personalized MCQ questions based on your resume content
                </p>
              </div>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Expected Questions:</span>
                  <Badge>8-12</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Time:</span>
                  <Badge>10-15 min</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Difficulty:</span>
                  <Badge>Mixed</Badge>
                </div>
              </div>

              <Button 
                onClick={handleStartQuiz} 
                disabled={isLoading}
                className="w-full btn-gradient"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    Generate Quiz
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resume Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Experience</span>
                </div>
                <Badge>{resume.experience.length} roles</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Skills</span>
                </div>
                <Badge>{resume.skills.length} technologies</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Projects</span>
                </div>
                <Badge>{resume.projects.length} projects</Badge>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Education</span>
                </div>
                <Badge>{resume.education.length} degrees</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Backend Integration Note */}
          <div className="p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30">
            <p className="text-xs text-muted-foreground text-center">
              <strong>Dev Note:</strong> Question generation will use AI APIs in the full MERN implementation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;