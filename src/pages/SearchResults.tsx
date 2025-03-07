
import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Briefcase, Filter } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/jobs/SearchBar';
import JobCard from '@/components/jobs/JobCard';
import FadeIn from '@/components/ui/FadeIn';

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
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const handleSearch = (newQuery: string) => {
    setSearchParams({ query: newQuery });
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (query) {
        const filteredJobs = mockJobs.filter(job => 
          job.title.toLowerCase().includes(query.toLowerCase()) ||
          job.company.toLowerCase().includes(query.toLowerCase()) ||
          job.location.toLowerCase().includes(query.toLowerCase())
        );
        setJobs(filteredJobs);
      } else {
        setJobs([]);
      }
      setLoading(false);
    }, 600);
  }, [query]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="bg-gradient-to-r from-gray-50 to-slate-100 py-12">
        <div className="container-custom">
          <FadeIn>
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Search Results</h1>
            <div className="max-w-4xl">
              <SearchBar defaultValue={query} onSearch={handleSearch} className="shadow-lg" />
            </div>
          </FadeIn>
        </div>
      </div>
      
      <main className="flex-1 container-custom py-10">
        <FadeIn>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-36 bg-muted rounded-xl"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-8 p-4 bg-white rounded-xl shadow-sm border border-border/60">
                <div className="flex items-center gap-2">
                  <Search className="h-5 w-5 text-primary" />
                  <p className="text-lg">
                    Found <span className="font-semibold">{jobs.length}</span> results for "<span className="text-primary font-medium">{query}</span>"
                  </p>
                </div>
              </div>
              
              {jobs.length > 0 ? (
                <div className="grid gap-5">
                  {jobs.map((job, index) => (
                    <FadeIn key={job._id} delay={index * 50}>
                      <JobCard job={job} />
                    </FadeIn>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-white rounded-xl border border-border shadow-sm">
                  <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
                  <p className="mt-2 text-muted-foreground">
                    Try searching with different keywords
                  </p>
                </div>
              )}
            </>
          )}
        </FadeIn>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
