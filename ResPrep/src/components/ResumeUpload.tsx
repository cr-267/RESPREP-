import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import useAppStore from '../store/app-store';
import { simulateResumeUpload } from '../utils/mockData';
import { useToast } from '../hooks/use-toast';

const ResumeUpload: React.FC = () => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setResume, setCurrentStep, setLoading, isLoading, setError, error } = useAppStore();
  const { toast } = useToast();

  const handleFileSelect = useCallback(async (file: File) => {
    // Validate file type
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a PDF, DOC, DOCX, or TXT file.');
      toast({
        title: 'Invalid file type',
        description: 'Please upload a PDF, DOC, DOCX, or TXT file.',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      toast({
        title: 'File too large',
        description: 'File size must be less than 10MB.',
        variant: 'destructive',
      });
      return;
    }

    setError(null);
    setLoading(true);

    try {
      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      // Simulate resume processing (in real app, this would call backend API)
      const resume = await simulateResumeUpload(file);
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      setTimeout(() => {
        setResume(resume);
        setCurrentStep('preview');
        setUploadProgress(0);
        toast({
          title: 'Resume uploaded successfully!',
          description: 'Your resume has been processed and is ready for preview.',
        });
      }, 500);

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to upload resume. Please try again.';
      setError(errorMessage);
      toast({
        title: 'Upload failed',
        description: errorMessage,
        variant: 'destructive',
      });
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  }, [setResume, setCurrentStep, setLoading, setError, toast]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary text-white mb-4">
          <Upload className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Upload Your Resume
        </h1>
        <p className="text-muted-foreground text-lg">
          Let's analyze your resume and create personalized assessment questions
        </p>
      </div>

      {/* Upload Area */}
      <Card className="relative overflow-hidden">
        <CardContent className="p-0">
          <div
            className={`upload-area p-12 text-center transition-all duration-300 ${
              isDragOver ? 'dragover' : ''
            } ${isLoading ? 'pointer-events-none opacity-50' : 'cursor-pointer'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => !isLoading && document.getElementById('resume-upload')?.click()}
          >
            <input
              id="resume-upload"
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileInputChange}
              className="hidden"
              disabled={isLoading}
            />

            {!isLoading && uploadProgress === 0 && (
              <>
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
                  <FileText className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {isDragOver ? 'Drop your resume here' : 'Choose your resume file'}
                </h3>
                <p className="text-muted-foreground mb-6">
                  Drag and drop your resume or click to browse
                </p>
                <Button className="btn-gradient">
                  Select File
                </Button>
                <div className="mt-6 text-sm text-muted-foreground">
                  <p>Supported formats: PDF, DOC, DOCX, TXT</p>
                  <p>Maximum file size: 10MB</p>
                </div>
              </>
            )}

            {isLoading && (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
                <h3 className="text-xl font-semibold">Processing your resume...</h3>
                <div className="w-full max-w-xs mx-auto">
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Uploading</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              </div>
            )}

            {uploadProgress === 100 && (
              <div className="space-y-4">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-green-600">Upload Complete!</h3>
                <p className="text-muted-foreground">Redirecting to preview...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="animate-shake">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Features Preview */}
      <div className="grid md:grid-cols-3 gap-4 pt-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <h4 className="font-semibold">Smart Analysis</h4>
          <p className="text-sm text-muted-foreground">
            AI-powered resume parsing and content extraction
          </p>
        </div>
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 text-secondary">
            <Upload className="w-6 h-6" />
          </div>
          <h4 className="font-semibold">Instant Processing</h4>
          <p className="text-sm text-muted-foreground">
            Quick upload and immediate question generation
          </p>
        </div>
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-green-100 text-green-600">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h4 className="font-semibold">Secure & Private</h4>
          <p className="text-sm text-muted-foreground">
            Your resume data is processed securely and privately
          </p>
        </div>
      </div>

      {/* Backend Integration Note */}
      <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-dashed border-muted-foreground/30">
        <p className="text-sm text-muted-foreground text-center">
          <strong>Development Note:</strong> This is a frontend prototype. In the full MERN stack version, 
          file upload will integrate with Express.js backend, MongoDB storage, and AI-powered resume parsing.
        </p>
      </div>
    </div>
  );
};

export default ResumeUpload;