import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Search, Briefcase, Filter, X, MapPin } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/jobs/SearchBar';
import JobCard from '@/components/jobs/JobCard';
import FadeIn from '@/components/ui/FadeIn';
import Container from '@/components/ui/Container';

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
    title: 'Product Manager',
    company: 'InnovateCorp',
    location: 'Seattle, WA',
    type: 'fulltime',
    salary: '$110k - $140k',
    date: '2023-07-12',
    category: { name: 'Technology', color: '#10B981', icon: 'computer' },
  },
  {
    _id: '6',
    title: 'Content Writer',
    company: 'ContentKing',
    location: 'Remote',
    type: 'contract',
    salary: '$60k - $80k',
    date: '2023-07-14',
    category: { name: 'Marketing', color: '#6366F1', icon: 'trending-up' },
  },
];

// Job types for filtering
const jobTypes = [
  { id: 'fulltime', label: 'Full-time' },
  { id: 'parttime', label: 'Part-time' },
  { id: 'contract', label: 'Contract' },
  { id: 'remote', label: 'Remote' },
  { id: 'internship', label: 'Internship' },
];

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const location = searchParams.get('location') || '';
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (newQuery: string, newLocation?: string) => {
    const params = new URLSearchParams();
    if (newQuery) params.set('query', newQuery);
    if (newLocation) params.set('location', newLocation);
    setSearchParams(params);
  };

  const toggleFilter = (filter: string) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) 
        : [...prev, filter]
    );
  };

  const clearFilters = () => {
    setActiveFilters([]);
  };

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (query || location) {
        let filteredJobs = mockJobs;
        
        // Filter by query (job title, company, etc.)
        if (query) {
          filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.company.toLowerCase().includes(query.toLowerCase())
          );
        }
        
        // Filter by location
        if (location) {
          filteredJobs = filteredJobs.filter(job => 
            job.location.toLowerCase().includes(location.toLowerCase())
          );
        }
        
        // Apply job type filters if any are active
        if (activeFilters.length > 0) {
          filteredJobs = filteredJobs.filter(job => 
            activeFilters.includes(job.type)
          );
        }
        
        setJobs(filteredJobs);
      } else {
        setJobs([]);
      }
      setLoading(false);
    }, 600);
  }, [query, location, activeFilters]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="bg-gradient-to-r from-green-50 to-blue-50 py-12">
        <Container>
          <FadeIn>
            <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">Search Results</h1>
            <div className="max-w-4xl">
              <SearchBar 
                defaultValue={query} 
                defaultLocation={location}
                onSearch={handleSearch} 
                className="shadow-lg" 
              />
            </div>
          </FadeIn>
        </Container>
      </div>
      
      <main className="flex-1 py-10">
        <Container>
          <div className="md:grid md:grid-cols-4 gap-6">
            {/* Filters - desktop */}
            <div className="hidden md:block">
              <div className="bg-white rounded-xl border border-border/60 shadow-sm p-5 sticky top-4">
                <h2 className="font-semibold text-lg mb-4">Filters</h2>
                
                <div>
                  <h3 className="font-medium text-sm uppercase text-muted-foreground tracking-wider mb-3">Job Type</h3>
                  <div className="space-y-2">
                    {jobTypes.map(type => (
                      <div key={type.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`desktop-${type.id}`}
                          checked={activeFilters.includes(type.id)}
                          onChange={() => toggleFilter(type.id)}
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={`desktop-${type.id}`} className="ml-2 text-sm">
                          {type.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {activeFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="mt-4 text-sm text-primary hover:underline flex items-center"
                  >
                    <X className="h-3 w-3 mr-1" />
                    Clear all filters
                  </button>
                )}
              </div>
            </div>
            
            {/* Results section */}
            <div className="md:col-span-3">
              <FadeIn>
                {/* Mobile filter button */}
                <div className="md:hidden mb-4">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="w-full flex items-center justify-center gap-2 bg-white rounded-lg border border-border/60 p-3 mb-4 text-sm font-medium"
                  >
                    <Filter className="h-4 w-4" />
                    Filters
                    {activeFilters.length > 0 && (
                      <span className="bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {activeFilters.length}
                      </span>
                    )}
                  </button>
                  
                  {/* Mobile filters panel */}
                  {isFilterOpen && (
                    <div className="bg-white rounded-xl border border-border/60 shadow-md p-5 mb-4">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="font-semibold">Filters</h2>
                        <button 
                          onClick={() => setIsFilterOpen(false)}
                          className="text-muted-foreground"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-sm uppercase text-muted-foreground tracking-wider mb-3">Job Type</h3>
                        <div className="space-y-2">
                          {jobTypes.map(type => (
                            <div key={type.id} className="flex items-center">
                              <input
                                type="checkbox"
                                id={`mobile-${type.id}`}
                                checked={activeFilters.includes(type.id)}
                                onChange={() => toggleFilter(type.id)}
                                className="rounded border-gray-300 text-primary focus:ring-primary"
                              />
                              <label htmlFor={`mobile-${type.id}`} className="ml-2 text-sm">
                                {type.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-between mt-4">
                        {activeFilters.length > 0 && (
                          <button
                            onClick={clearFilters}
                            className="text-sm text-primary hover:underline"
                          >
                            Clear all
                          </button>
                        )}
                        <button
                          onClick={() => setIsFilterOpen(false)}
                          className="bg-primary text-white text-sm px-4 py-2 rounded-lg"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Search results info */}
                <div className="mb-6 p-4 bg-white rounded-xl shadow-sm border border-border/60">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <div className="flex items-center gap-2">
                      <Search className="h-5 w-5 text-primary" />
                      <p className="text-sm md:text-base">
                        {query && <span>Found <span className="font-semibold">{jobs.length}</span> results for "<span className="text-primary font-medium">{query}</span>"</span>}
                        {!query && location && <span>Found <span className="font-semibold">{jobs.length}</span> results</span>}
                      </p>
                    </div>
                    
                    {location && (
                      <div className="flex items-center gap-2 text-sm">
                        <span className="hidden sm:inline text-muted-foreground">in</span>
                        <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full">
                          <MapPin className="h-3 w-3" />
                          <span className="font-medium">{location}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Loading state */}
                {loading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="animate-pulse">
                        <div className="h-36 bg-muted rounded-xl"></div>
                      </div>
                    ))}
                  </div>
                ) : jobs.length > 0 ? (
                  <div className="space-y-5">
                    {jobs.map((job, index) => (
                      <FadeIn key={job._id} delay={index * 50}>
                        <JobCard job={job} />
                      </FadeIn>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16 bg-white rounded-xl border border-border/60 shadow-sm">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
                    <p className="mt-2 text-muted-foreground">
                      Try searching with different keywords or adjusting your filters
                    </p>
                  </div>
                )}
              </FadeIn>
            </div>
          </div>
        </Container>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;
