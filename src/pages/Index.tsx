
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/jobs/SearchBar';
import JobCard from '@/components/jobs/JobCard';
import FadeIn from '@/components/ui/FadeIn';

// Mock data for initial render
const mockCategories = [
  { _id: '1', name: 'Technology', icon: 'computer', color: '#10B981', count: 42 },
  { _id: '2', name: 'Marketing', icon: 'trending-up', color: '#6366F1', count: 28 },
  { _id: '3', name: 'Design', icon: 'pen-tool', color: '#F59E0B', count: 31 },
  { _id: '4', name: 'Finance', icon: 'dollar-sign', color: '#3B82F6', count: 19 },
  { _id: '5', name: 'Healthcare', icon: 'heart', color: '#EF4444', count: 24 },
  { _id: '6', name: 'Education', icon: 'book', color: '#8B5CF6', count: 16 },
];

const mockJobs = [
  {
    _id: '1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'fulltime',
    salary: '$100k - $130k',
    date: '2023-07-15',
    category: { name: 'Technology', color: '#10B981', icon: 'computer' },
  },
  {
    _id: '2',
    title: 'Marketing Specialist',
    company: 'BrandWave',
    location: 'New York, NY',
    type: 'parttime',
    salary: '$50k - $70k',
    date: '2023-07-18',
    category: { name: 'Marketing', color: '#6366F1', icon: 'trending-up' },
  },
  {
    _id: '3',
    title: 'UX/UI Designer',
    company: 'DesignHub',
    location: 'Austin, TX',
    type: 'contract',
    salary: '$80k - $100k',
    date: '2023-07-10',
    category: { name: 'Design', color: '#F59E0B', icon: 'pen-tool' },
  },
  {
    _id: '4',
    title: 'Financial Analyst',
    company: 'MoneyMatters',
    location: 'Chicago, IL',
    type: 'fulltime',
    salary: '$75k - $90k',
    date: '2023-07-20',
    category: { name: 'Finance', color: '#3B82F6', icon: 'dollar-sign' },
  },
];

const Index = () => {
  const [featuredJobs, setFeaturedJobs] = useState(mockJobs);
  const [categories, setCategories] = useState(mockCategories);
  
  // In a real app, we would fetch data here
  useEffect(() => {
    // Simulate API call
    // const fetchData = async () => {
    //   try {
    //     const jobsResponse = await fetch('/api/jobs/featured');
    //     const jobsData = await jobsResponse.json();
    //     setFeaturedJobs(jobsData);
    //
    //     const categoriesResponse = await fetch('/api/categories');
    //     const categoriesData = await categoriesResponse.json();
    //     setCategories(categoriesData);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //   }
    // };
    //
    // fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-green-50 to-green-100">
          <div className="container-custom pt-16 pb-20 md:pt-20 md:pb-24 text-center">
            <FadeIn>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold max-w-3xl mx-auto leading-tight">
                Find Your Dream Job With <span className="text-primary">GreenJobs</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect with the best companies and discover opportunities that match your skills and aspirations.
              </p>
            </FadeIn>
            
            <FadeIn delay={200}>
              <div className="mt-10 max-w-2xl mx-auto">
                <SearchBar />
              </div>
            </FadeIn>
            
            <FadeIn delay={300}>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link to="/jobs" className="btn btn-primary px-6 py-2.5">
                  Explore All Jobs
                </Link>
                <Link to="/register" className="btn btn-secondary px-6 py-2.5">
                  Create Account
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <FadeIn>
              <div className="flex justify-between items-center mb-10">
                <h2 className="section-heading">Browse by Category</h2>
                <Link to="/categories" className="text-primary font-medium text-sm flex items-center hover:underline">
                  View All Categories
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </FadeIn>
            
            <FadeIn delay={100}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6">
                {categories.map((category) => (
                  <Link 
                    key={category._id}
                    to={`/jobs?category=${category._id}`}
                    className="flex flex-col items-center p-6 bg-white rounded-xl border border-border/60 text-center hover:shadow-md hover:border-primary/20 transition-all"
                  >
                    <div 
                      className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <Briefcase className="h-6 w-6" style={{ color: category.color }} />
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {category.count} Jobs Available
                    </p>
                  </Link>
                ))}
              </div>
            </FadeIn>
          </div>
        </section>
        
        {/* Featured Jobs Section */}
        <section className="py-16 md:py-20 bg-secondary/50">
          <div className="container-custom">
            <FadeIn>
              <div className="flex justify-between items-center mb-10">
                <h2 className="section-heading">Featured Jobs</h2>
                <Link to="/jobs" className="text-primary font-medium text-sm flex items-center hover:underline">
                  View All Jobs
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredJobs.map((job, index) => (
                <FadeIn key={job._id} delay={index * 100}>
                  <JobCard job={job} />
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 md:py-20">
          <div className="container-custom">
            <FadeIn>
              <div className="bg-primary rounded-2xl p-8 md:p-12 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Take the Next Step in Your Career?
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-8">
                  Create an account today to save jobs, get personalized recommendations, and apply to positions with just one click.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/register" className="btn bg-white text-primary hover:bg-white/90 px-6 py-2.5">
                    Create Account
                  </Link>
                  <Link to="/jobs" className="btn bg-primary-foreground/10 text-white border border-white/30 hover:bg-primary-foreground/20 px-6 py-2.5">
                    Browse Jobs
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
