
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/jobs/SearchBar';
import JobCard from '@/components/jobs/JobCard';
import CategoryFilter from '@/components/jobs/CategoryFilter';
import FadeIn from '@/components/ui/FadeIn';
import { Brief, Briefcase, Filter } from 'lucide-react';

// Mock job data
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
  {
    _id: '5',
    title: 'Backend Developer',
    company: 'CodeNinja',
    location: 'Seattle, WA',
    type: 'fulltime',
    salary: '$110k - $140k',
    date: '2023-07-16',
    category: { name: 'Technology', color: '#10B981', icon: 'computer' },
  },
  {
    _id: '6',
    title: 'Content Writer',
    company: 'WordSmith',
    location: 'Remote',
    type: 'contract',
    salary: '$45k - $65k',
    date: '2023-07-14',
    category: { name: 'Marketing', color: '#6366F1', icon: 'trending-up' },
  },
];

const Jobs = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // In a real app, we would fetch jobs here
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
      setLoading(false);
    }, 500);
  }, []);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredJobs(jobs);
      return;
    }
    
    const filtered = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  const handleCategoryFilter = (categoryId: string) => {
    if (!categoryId) {
      setFilteredJobs(jobs);
      return;
    }
    
    const filtered = jobs.filter(job => job.category.name.toLowerCase() === categoryId.toLowerCase());
    setFilteredJobs(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-10">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold text-center">Find Your Dream Job</h1>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
              Browse through thousands of job listings to find the perfect position that matches your skills and career goals.
            </p>
            <div className="mt-8 max-w-2xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
          </FadeIn>
        </div>
      </div>
      
      <main className="flex-1 container-custom py-10">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/4">
            <div className="sticky top-24">
              <div className="md:hidden mb-4">
                <button 
                  className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-border"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <span className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </span>
                  <span>{isFilterOpen ? '−' : '+'}</span>
                </button>
              </div>
              
              <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block`}>
                <div className="bg-white rounded-xl border border-border p-6 mb-6">
                  <h2 className="font-semibold mb-4">Job Categories</h2>
                  <CategoryFilter onCategorySelect={handleCategoryFilter} />
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:w-3/4">
            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-32 bg-muted rounded-xl"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="mb-6 flex justify-between items-center">
                  <p className="text-muted-foreground">
                    Found <span className="font-medium text-foreground">{filteredJobs.length}</span> jobs
                  </p>
                  <select className="p-2 border border-border rounded-md text-sm">
                    <option>Most Recent</option>
                    <option>Salary: High to Low</option>
                    <option>Salary: Low to High</option>
                  </select>
                </div>
                
                <div className="space-y-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                      <FadeIn key={job._id} delay={index * 50}>
                        <JobCard job={job} />
                      </FadeIn>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-border">
                      <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
                      <p className="mt-2 text-muted-foreground">
                        Try changing your search or filter criteria
                      </p>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Jobs;
