import { MCQQuestion, Resume } from '../types';

// Mock resume data for demonstration
export const mockResume: Resume = {
  id: 'mock-resume-1',
  fileName: 'john_doe_resume.pdf',
  content: `
JOHN DOE
Software Engineer | Full Stack Developer
Email: john.doe@email.com | Phone: (555) 123-4567
LinkedIn: linkedin.com/in/johndoe

PROFESSIONAL SUMMARY
Experienced Full Stack Developer with 5+ years of experience in building scalable web applications using React, Node.js, and cloud technologies. Passionate about creating efficient, user-friendly solutions and staying current with emerging technologies.

TECHNICAL SKILLS
• Frontend: React, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS, Next.js
• Backend: Node.js, Express, Python, Django, RESTful APIs, GraphQL
• Databases: MongoDB, PostgreSQL, MySQL, Redis
• Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD, Git, Jenkins
• Testing: Jest, Cypress, Unit Testing, Integration Testing

WORK EXPERIENCE

Senior Software Engineer | TechCorp Inc. | 2021 - Present
• Led development of a customer management system serving 10,000+ users
• Implemented microservices architecture reducing system response time by 40%
• Mentored 3 junior developers and conducted code reviews
• Technologies: React, Node.js, MongoDB, AWS

Full Stack Developer | StartupXYZ | 2019 - 2021
• Built e-commerce platform from scratch handling $2M+ in transactions
• Developed responsive web applications using React and Redux
• Integrated payment gateways and third-party APIs
• Technologies: React, Express, PostgreSQL, Stripe API

PROJECTS

E-Learning Platform | 2023
• Developed a comprehensive online learning platform with video streaming
• Implemented user authentication, progress tracking, and payment integration
• Technologies: Next.js, Node.js, MongoDB, AWS S3

Task Management App | 2022
• Created a collaborative task management application
• Features include real-time updates, file sharing, and team collaboration
• Technologies: React, Socket.io, Express, PostgreSQL

EDUCATION
Bachelor of Science in Computer Science
University of Technology | 2019
GPA: 3.8/4.0
  `,
  uploadDate: new Date('2024-01-15'),
  skills: [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'MongoDB', 
    'PostgreSQL', 'AWS', 'Docker', 'Express', 'Next.js', 'GraphQL'
  ],
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'TechCorp Inc.',
      duration: '2021 - Present',
      description: 'Led development of customer management system, implemented microservices architecture',
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS']
    },
    {
      title: 'Full Stack Developer',
      company: 'StartupXYZ',
      duration: '2019 - 2021',
      description: 'Built e-commerce platform, developed responsive web applications',
      technologies: ['React', 'Express', 'PostgreSQL', 'Stripe API']
    }
  ],
  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      year: '2019',
      grade: '3.8/4.0'
    }
  ],
  projects: [
    {
      name: 'E-Learning Platform',
      description: 'Comprehensive online learning platform with video streaming',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'AWS S3'],
      duration: '2023'
    },
    {
      name: 'Task Management App',
      description: 'Collaborative task management application with real-time updates',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      duration: '2022'
    }
  ]
};

// Mock MCQ questions based on the resume
export const generateMockQuestions = (resume: Resume): MCQQuestion[] => {
  return [
    {
      id: '1',
      question: 'Which frontend framework is most prominently featured in your technical skills?',
      options: ['Angular', 'Vue.js', 'React', 'Svelte'],
      correctAnswer: 2,
      category: 'skills',
      difficulty: 'easy',
      explanation: 'React is listed as a primary frontend technology and is used in multiple projects and work experiences.',
      relatedContent: 'Technical Skills: React, TypeScript, JavaScript'
    },
    {
      id: '2',
      question: 'What was the main achievement in your role at TechCorp Inc.?',
      options: [
        'Reduced system response time by 40%',
        'Increased revenue by 50%',
        'Managed a team of 20 developers',
        'Launched 10 new products'
      ],
      correctAnswer: 0,
      category: 'experience',
      difficulty: 'medium',
      explanation: 'The resume specifically mentions implementing microservices architecture that reduced system response time by 40%.',
      relatedContent: 'TechCorp Inc. - Implemented microservices architecture reducing system response time by 40%'
    },
    {
      id: '3',
      question: 'Which database technologies are mentioned in your technical skills?',
      options: [
        'Only MongoDB',
        'MongoDB, PostgreSQL, MySQL, Redis',
        'Just PostgreSQL and MySQL',
        'Only SQL databases'
      ],
      correctAnswer: 1,
      category: 'skills',
      difficulty: 'medium',
      explanation: 'The resume lists MongoDB, PostgreSQL, MySQL, and Redis as database technologies.',
      relatedContent: 'Databases: MongoDB, PostgreSQL, MySQL, Redis'
    },
    {
      id: '4',
      question: 'What type of platform did you develop in your E-Learning Platform project?',
      options: [
        'A simple blog website',
        'A social media platform',
        'An online learning platform with video streaming',
        'An e-commerce store'
      ],
      correctAnswer: 2,
      category: 'projects',
      difficulty: 'easy',
      explanation: 'The E-Learning Platform project specifically mentions developing a comprehensive online learning platform with video streaming.',
      relatedContent: 'E-Learning Platform - Developed a comprehensive online learning platform with video streaming'
    },
    {
      id: '5',
      question: 'How many years of experience do you have as mentioned in your professional summary?',
      options: ['3+ years', '4+ years', '5+ years', '6+ years'],
      correctAnswer: 2,
      category: 'experience',
      difficulty: 'easy',
      explanation: 'The professional summary clearly states "5+ years of experience in building scalable web applications".',
      relatedContent: 'Professional Summary: 5+ years of experience in building scalable web applications'
    },
    {
      id: '6',
      question: 'Which cloud platform is mentioned in your technical skills?',
      options: ['Google Cloud Platform', 'Microsoft Azure', 'AWS', 'IBM Cloud'],
      correctAnswer: 2,
      category: 'skills',
      difficulty: 'easy',
      explanation: 'AWS is specifically mentioned in the Cloud & DevOps section of technical skills.',
      relatedContent: 'Cloud & DevOps: AWS, Docker, Kubernetes, CI/CD, Git, Jenkins'
    },
    {
      id: '7',
      question: 'What was the transaction volume handled by the e-commerce platform you built at StartupXYZ?',
      options: ['$1M+', '$2M+', '$5M+', '$10M+'],
      correctAnswer: 1,
      category: 'experience',
      difficulty: 'medium',
      explanation: 'The resume states that the e-commerce platform handled "$2M+ in transactions".',
      relatedContent: 'StartupXYZ - Built e-commerce platform handling $2M+ in transactions'
    },
    {
      id: '8',
      question: 'Which testing frameworks/tools are mentioned in your technical skills?',
      options: [
        'Only Jest',
        'Jest and Cypress',
        'Mocha and Chai',
        'Selenium and TestNG'
      ],
      correctAnswer: 1,
      category: 'skills',
      difficulty: 'medium',
      explanation: 'The testing section specifically mentions Jest and Cypress along with Unit Testing and Integration Testing.',
      relatedContent: 'Testing: Jest, Cypress, Unit Testing, Integration Testing'
    },
    {
      id: '9',
      question: 'What is your educational background?',
      options: [
        'Bachelor of Arts in Computer Science',
        'Bachelor of Science in Computer Science',
        'Master of Science in Computer Science',
        'Bachelor of Engineering in Software Engineering'
      ],
      correctAnswer: 1,
      category: 'education',
      difficulty: 'easy',
      explanation: 'The resume clearly states "Bachelor of Science in Computer Science" from University of Technology.',
      relatedContent: 'Bachelor of Science in Computer Science, University of Technology, 2019'
    },
    {
      id: '10',
      question: 'In your Task Management App project, which technology enabled real-time updates?',
      options: ['WebRTC', 'Socket.io', 'WebSockets', 'Server-Sent Events'],
      correctAnswer: 1,
      category: 'projects',
      difficulty: 'hard',
      explanation: 'Socket.io is specifically mentioned as one of the technologies used in the Task Management App project.',
      relatedContent: 'Task Management App - Technologies: React, Socket.io, Express, PostgreSQL'
    }
  ];
};

// Utility functions for demo purposes
export const simulateResumeUpload = async (file: File): Promise<Resume> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // In a real application, this would parse the actual file content
  // For demo, we return mock data
  return {
    ...mockResume,
    id: Date.now().toString(),
    fileName: file.name,
    uploadDate: new Date(),
  };
};

export const simulateQuestionGeneration = async (resume: Resume): Promise<MCQQuestion[]> => {
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // In a real application, this would use AI to generate questions based on resume content
  // For demo, we return mock questions
  return generateMockQuestions(resume);
};

// Backend integration placeholders for future MERN stack development
export const BACKEND_ENDPOINTS = {
  // Authentication endpoints
  auth: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    logout: '/api/auth/logout',
    profile: '/api/auth/profile',
  },
  
  // Resume management endpoints
  resumes: {
    upload: '/api/resumes/upload',
    get: '/api/resumes/:id',
    list: '/api/resumes',
    delete: '/api/resumes/:id',
    parse: '/api/resumes/:id/parse',
  },
  
  // AI question generation endpoints
  ai: {
    generateQuestions: '/api/ai/generate-questions',
    analyzeResume: '/api/ai/analyze-resume',
    getRecommendations: '/api/ai/recommendations',
  },
  
  // Quiz and results endpoints
  quiz: {
    create: '/api/quiz/create',
    submit: '/api/quiz/:id/submit',
    results: '/api/quiz/:id/results',
    history: '/api/quiz/history',
  },
  
  // Analytics endpoints
  analytics: {
    performance: '/api/analytics/performance',
    trends: '/api/analytics/trends',
    reports: '/api/analytics/reports',
  },
};