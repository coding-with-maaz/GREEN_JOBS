
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import JobDetailView from '@/components/jobs/JobDetailView';
import FadeIn from '@/components/ui/FadeIn';

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
  const [loading, setLoading] = useState(false);

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
        <main className="flex-1 container-custom py-10">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container-custom py-10">
        <FadeIn>
          <Link 
            to="/jobs" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to all jobs
          </Link>
        </FadeIn>
        
        <FadeIn delay={100}>
          <JobDetailView job={job} />
        </FadeIn>
        
        <FadeIn delay={200}>
          <div className="mt-12">
            <h2 className="section-heading mb-6">Similar Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarJobs.map((similarJob) => (
                <Link 
                  key={similarJob._id}
                  to={`/job/${similarJob._id}`}
                  className="block p-5 bg-white rounded-xl border border-border/60 hover:shadow-md transition-shadow"
                >
                  <h3 className="font-semibold">{similarJob.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{similarJob.company}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{similarJob.location}</span>
                    <span className="text-sm text-primary font-medium">{similarJob.salary}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </main>
      
      <Footer />
    </div>
  );
};

export default JobDetail;
