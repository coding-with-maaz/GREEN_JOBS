import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/jobs/SearchBar';
import JobCard from '@/components/jobs/JobCard';
import CategoryFilter from '@/components/jobs/CategoryFilter';
import FadeIn from '@/components/ui/FadeIn';
import { Briefcase, Filter, Calendar, TrendingUp, Check } from 'lucide-react';

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

// Enhanced categories with better colors and icon references
const mockCategories = [
  { _id: 'Technology', name: 'Technology', icon: 'computer', color: '#3B82F6', count: 15 },
  { _id: 'Marketing', name: 'Marketing', icon: 'trending-up', color: '#8B5CF6', count: 8 },
  { _id: 'Design', name: 'Design', icon: 'pen-tool', color: '#EC4899', count: 12 },
  { _id: 'Finance', name: 'Finance', icon: 'dollar-sign', color: '#10B981', count: 6 }
];

const Jobs = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('recent');

  useEffect(() => {
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

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    
    if (!categoryId) {
      setFilteredJobs(jobs);
      return;
    }
    
    const filtered = jobs.filter(job => job.category.name.toLowerCase() === categoryId.toLowerCase());
    setFilteredJobs(filtered);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = event.target.value;
    setSortBy(sortValue);
    
    let sortedJobs = [...filteredJobs];
    
    switch(sortValue) {
      case 'salary-high':
        sortedJobs.sort((a, b) => {
          const aValue = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bValue = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return bValue - aValue;
        });
        break;
      case 'salary-low':
        sortedJobs.sort((a, b) => {
          const aValue = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bValue = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return aValue - bValue;
        });
        break;
      case 'recent':
      default:
        sortedJobs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }
    
    setFilteredJobs(sortedJobs);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-16">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-2">Find Your Dream Job</h1>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
              Browse through thousands of job listings to find the perfect position that matches your skills and career goals.
            </p>
            <div className="mt-8 max-w-3xl mx-auto">
              <SearchBar onSearch={handleSearch} />
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              {mockCategories.map(category => (
                <button 
                  key={category._id}
                  onClick={() => handleCategoryFilter(category._id === selectedCategory ? null : category._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                    selectedCategory === category._id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span 
                    className="inline-block w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span>{category.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-opacity-20"
                    style={{ 
                      backgroundColor: selectedCategory === category._id ? 'rgba(255,255,255,0.3)' : category.color,
                      color: selectedCategory === category._id ? 'white' : 'inherit',
                      opacity: selectedCategory === category._id ? 1 : 0.7
                    }}
                  >
                    {category.count}
                  </span>
                </button>
              ))}
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
                  className="w-full flex items-center justify-between p-3 bg-white rounded-lg border border-border shadow-sm"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <span className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </span>
                  <span>{isFilterOpen ? '−' : '+'}</span>
                </button>
              </div>
              
              <div className={`${isFilterOpen ? 'block' : 'hidden'} md:block space-y-6`}>
                <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                  <h2 className="font-semibold text-lg mb-4">Job Categories</h2>
                  <CategoryFilter 
                    categories={mockCategories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={handleCategoryFilter}
                  />
                </div>
                
                <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                  <h2 className="font-semibold text-lg mb-4">Job Type</h2>
                  <div className="space-y-3">
                    {['Full-time', 'Part-time', 'Contract', 'Internship'].map((type) => (
                      <div key={type} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={type.toLowerCase()} 
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label htmlFor={type.toLowerCase()} className="ml-2 text-sm text-gray-700">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                  <h2 className="font-semibold text-lg mb-4">Experience Level</h2>
                  <div className="space-y-3">
                    {['Entry Level', 'Mid Level', 'Senior Level', 'Executive'].map((level) => (
                      <div key={level} className="flex items-center">
                        <input 
                          type="checkbox" 
                          id={level.toLowerCase().replace(' ', '-')} 
                          className="rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <label 
                          htmlFor={level.toLowerCase().replace(' ', '-')} 
                          className="ml-2 text-sm text-gray-700"
                        >
                          {level}
                        </label>
                      </div>
                    ))}
                  </div>
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
                <div className="mb-6 flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border border-border/60">
                  <p className="text-muted-foreground flex items-center">
                    <Briefcase className="h-4 w-4 mr-2 text-primary" />
                    Found <span className="font-medium text-foreground mx-1">{filteredJobs.length}</span> jobs
                    {selectedCategory && (
                      <span className="ml-2 flex items-center text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                        {mockCategories.find(c => c._id === selectedCategory)?.name}
                        <button 
                          onClick={() => handleCategoryFilter(null)}
                          className="ml-1 rounded-full hover:bg-primary/20 p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    )}
                  </p>
                  <div className="flex items-center">
                    <label htmlFor="sort-by" className="text-sm text-muted-foreground mr-2">Sort by:</label>
                    <select 
                      id="sort-by"
                      value={sortBy}
                      onChange={handleSortChange}
                      className="p-2 border border-border rounded-md text-sm bg-white"
                    >
                      <option value="recent">Most Recent</option>
                      <option value="salary-high">Salary: High to Low</option>
                      <option value="salary-low">Salary: Low to High</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                      <FadeIn key={job._id} delay={index * 50}>
                        <JobCard job={job} />
                      </FadeIn>
                    ))
                  ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-border shadow-sm">
                      <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
                      <p className="mt-2 text-muted-foreground">
                        Try changing your search or filter criteria
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCategory(null);
                          setFilteredJobs(jobs);
                        }}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
                      >
                        Clear filters
                      </button>
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
