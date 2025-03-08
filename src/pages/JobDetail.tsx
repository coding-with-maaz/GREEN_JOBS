import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, MapPin, Calendar, Briefcase, Building, ExternalLink } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JobCard from '@/components/jobs/JobCard';
import FadeIn from '@/components/ui/FadeIn';
import Container from '@/components/ui/Container';

// Mock job data for initial render
const mockJob = {
  _id: '1',
  title: 'Senior Frontend Developer',
  company: 'TechCorp',
  location: 'San Francisco, CA',
  type: 'fulltime',
  salary: '$100k - $130k',
  date: '2023-07-15',
  description: `We are looking for a Senior Frontend Developer to join our team. You will be responsible for building and maintaining our web applications.

The ideal candidate has a passion for building intuitive user interfaces and has a deep understanding of modern frontend frameworks and technologies.

You will collaborate closely with our design and backend teams to deliver high-quality, responsive web applications that meet our users' needs.`,
  requirements: [
    'At least 5 years of experience with frontend development',
    'Proficiency in JavaScript, HTML, and CSS',
    'Experience with React, Vue, or Angular',
    'Understanding of responsive design principles',
    'Experience with state management libraries like Redux or Vuex',
    'Familiarity with modern build tools and workflows',
    'Excellent communication and teamwork skills',
    'Bachelor\'s degree in Computer Science or related field (or equivalent experience)'
  ],
  applicationUrl: 'https://example.com/apply',
  category: {
    name: 'Technology',
    color: '#10B981',
    icon: 'computer'
  }
};

// Mock similar jobs
const mockSimilarJobs = [
  {
    _id: '2',
    title: 'Frontend Developer',
    company: 'WebWave',
    location: 'Remote',
    type: 'fulltime',
    salary: '$80k - $100k',
    date: '2023-07-18',
    category: { name: 'Technology', color: '#10B981', icon: 'computer' },
  },
  {
    _id: '3',
    title: 'UI Developer',
    company: 'DesignTech',
    location: 'New York, NY',
    type: 'contract',
    salary: '$90k - $110k',
    date: '2023-07-20',
    category: { name: 'Technology', color: '#10B981', icon: 'computer' },
  },
  {
    _id: '4',
    title: 'React Developer',
    company: 'AppMakers',
    location: 'Austin, TX',
    type: 'fulltime',
    salary: '$90k - $115k',
    date: '2023-07-17',
    category: { name: 'Technology', color: '#10B981', icon: 'computer' },
  },
];

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState(mockJob);
  const [similarJobs, setSimilarJobs] = useState(mockSimilarJobs);
  const [loading, setLoading] = useState(true);

  // In a real app, we would fetch data here
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    // Fake API call delay
    const timer = setTimeout(() => {
      // In a real app, we would fetch the job data based on the ID
      // const fetchJob = async () => {
      //   try {
      //     const response = await fetch(`/api/jobs/${id}`);
      //     const data = await response.json();
      //     setJob(data);
      //   } catch (error) {
      //     console.error('Error fetching job:', error);
      //   }
      // };
      
      // We're just setting the mock data for now
      setJob({ ...mockJob, _id: id || '1' });
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />
        <main className="flex-1">
          <Container className="py-10">
            <div className="animate-pulse space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </Container>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-12">
        <Container>
          <FadeIn>
            <Link 
              to="/jobs" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to all jobs
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">{job.title}</h1>
            <div className="flex flex-wrap gap-5 mt-4">
              <div className="flex items-center text-muted-foreground">
                <Building className="h-4 w-4 mr-1.5" />
                {job.company}
              </div>
              <div className="flex items-center text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1.5" />
                {job.location}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-4 w-4 mr-1.5" />
                {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
              </div>
              <div className="flex items-center text-muted-foreground">
                <Calendar className="h-4 w-4 mr-1.5" />
                Posted {new Date(job.date).toLocaleDateString()}
              </div>
            </div>
          </FadeIn>
        </Container>
      </div>
      
      <main className="flex-1 py-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FadeIn delay={100}>
                <div className="bg-white rounded-xl border border-border/60 p-6 md:p-8 shadow-sm">
                  <div className="mb-6">
                    <span 
                      className="inline-flex items-center text-xs px-2.5 py-0.5 font-medium rounded-full" 
                      style={{ 
                        backgroundColor: `${job.category.color}15`, 
                        color: job.category.color 
                      }}
                    >
                      {job.category.name}
                    </span>
                    <h2 className="text-xl font-semibold mt-2">{job.salary}</h2>
                  </div>
                  
                  <div className="prose prose-slate max-w-none">
                    <h3 className="text-lg font-medium mb-3">Job Description</h3>
                    <div className="whitespace-pre-line text-muted-foreground">
                      {job.description}
                    </div>
                    
                    <h3 className="text-lg font-medium mt-6 mb-3">Requirements</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      {job.requirements.map((requirement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-primary mr-2">•</span>
                          <span>{requirement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </FadeIn>
            </div>
            
            <div>
              <FadeIn delay={150}>
                <div className="bg-white rounded-xl border border-border/60 p-6 shadow-sm sticky top-4">
                  <h3 className="text-lg font-medium mb-4">Apply for this position</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Take the next step in your career by applying for this position. Click the button below to complete your application.
                  </p>
                  <a 
                    href={job.applicationUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full btn btn-primary py-2.5 inline-flex justify-center items-center gap-2"
                  >
                    Apply Now
                    <ExternalLink className="h-4 w-4" />
                  </a>
                  
                  <div className="mt-6 pt-6 border-t border-border/60">
                    <h4 className="font-medium mb-2">Share this job</h4>
                    <div className="flex space-x-3">
                      <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 5.12548 15.0077 5.24917 15.0227 5.37061L8.08261 9.84066C7.54305 9.32015 6.80891 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15C6.80891 15 7.54305 14.6798 8.08261 14.1593L15.0227 18.6294C15.0077 18.7508 15 18.8745 15 19C15 20.6569 16.3431 22 18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C17.1911 16 16.457 16.3202 15.9174 16.8407L8.97733 12.3706C8.99229 12.2492 9 12.1255 9 12C9 11.8745 8.99229 11.7508 8.97733 11.6294L15.9174 7.15934C16.457 7.67985 17.1911 8 18 8Z" fill="currentColor" />
                        </svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-[#1877F2]/10 flex items-center justify-center hover:bg-[#1877F2]/20 transition-colors text-[#1877F2]">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" fill="currentColor" />
                        </svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-[#1DA1F2]/10 flex items-center justify-center hover:bg-[#1DA1F2]/20 transition-colors text-[#1DA1F2]">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22 5.79997C21.2483 6.12606 20.4534 6.34163 19.64 6.43997C20.4982 5.92729 21.1413 5.12075 21.45 4.16997C20.6436 4.65003 19.7608 4.98826 18.84 5.16997C18.2245 4.50254 17.405 4.05826 16.5098 3.90682C15.6147 3.75537 14.6945 3.90444 13.8938 4.33258C13.093 4.76073 12.4569 5.4425 12.0852 6.2708C11.7135 7.09911 11.6273 8.02736 11.84 8.90997C10.2094 8.82749 8.61444 8.40292 7.15864 7.66383C5.70284 6.92474 4.41786 5.88766 3.39 4.61997C3.02914 5.25013 2.83952 5.96379 2.84 6.68997C2.83872 7.36435 3.00422 8.02858 3.32176 8.62353C3.63929 9.21848 4.09902 9.72568 4.66 10.1C4.00798 10.082 3.36989 9.89712 2.8 9.56997V9.61997C2.80489 10.5629 3.13599 11.4774 3.73731 12.2051C4.33864 12.9328 5.17326 13.4342 6.1 13.62C5.74326 13.7216 5.37288 13.7719 5 13.77C4.74189 13.7696 4.48442 13.7492 4.23 13.71C4.49391 14.5244 5.00462 15.2333 5.69107 15.7437C6.37753 16.2541 7.20558 16.5415 8.06 16.57C7.21611 17.2269 6.25728 17.7283 5.2256 18.0494C4.19392 18.3706 3.10909 18.505 2.02 18.45C3.91551 19.7238 6.14219 20.4329 8.42 20.43C9.51594 20.446 10.6077 20.2851 11.6519 19.9535C12.696 19.6219 13.6765 19.1243 14.5451 18.4815C15.4137 17.8387 16.1559 17.0619 16.7343 16.1879C17.3127 15.314 17.7184 14.3584 17.9334 13.3584C18.1485 12.3583 18.1693 11.3295 17.9946 10.3224C17.8199 9.31534 17.4527 8.34577 16.9100 7.4571C16.3673 6.56844 15.6582 5.77328 14.8182 5.11342C13.9782 4.45355 13.0227 3.93897 12 3.59997C13.9179 3.62561 15.8042 4.08119 17.5291 4.93198C19.254 5.78276 20.7743 7.00824 22 8.50997V8.50997C21.9884 7.80596 21.8383 7.11461 21.5583 6.47284C21.2783 5.83108 20.8745 5.25257 20.37 4.77997L22 5.79997Z" fill="currentColor" />
                        </svg>
                      </button>
                      <button className="w-10 h-10 rounded-full bg-[#0A66C2]/10 flex items-center justify-center hover:bg-[#0A66C2]/20 transition-colors text-[#0A66C2]">
                        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="currentColor" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
          
          <FadeIn delay={200}>
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Similar Jobs</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {similarJobs.map((similarJob) => (
                  <FadeIn key={similarJob._id} delay={100}>
                    <JobCard job={similarJob} />
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetail;
