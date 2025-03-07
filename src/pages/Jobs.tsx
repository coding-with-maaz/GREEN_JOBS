
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SearchBar from '@/components/jobs/SearchBar';
import JobCard from '@/components/jobs/JobCard';
import CategoryFilter from '@/components/jobs/CategoryFilter';
import FadeIn from '@/components/ui/FadeIn';
import { Briefcase, Filter, Calendar, TrendingUp, Check, MapPin, XCircle } from 'lucide-react';

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

// Job types with icons and colors
const jobTypes = [
  { id: 'fulltime', label: 'Full-time', color: 'bg-blue-100 text-blue-800' },
  { id: 'parttime', label: 'Part-time', color: 'bg-purple-100 text-purple-800' },
  { id: 'contract', label: 'Contract', color: 'bg-amber-100 text-amber-800' },
  { id: 'internship', label: 'Internship', color: 'bg-green-100 text-green-800' },
];

// Experience levels
const experienceLevels = [
  { id: 'entry', label: 'Entry Level' },
  { id: 'mid', label: 'Mid Level' },
  { id: 'senior', label: 'Senior Level' },
  { id: 'executive', label: 'Executive' },
];

const Jobs = () => {
  const [jobs, setJobs] = useState(mockJobs);
  const [filteredJobs, setFilteredJobs] = useState(mockJobs);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<string>('recent');
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExpLevels, setSelectedExpLevels] = useState<string[]>([]);

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
      applyFilters();
      return;
    }
    
    const searchResults = jobs.filter(job => 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    applyFilters(searchResults);
  };

  const handleCategoryFilter = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    applyFilters(undefined, categoryId);
  };

  const handleJobTypeToggle = (typeId: string) => {
    setSelectedJobTypes(prev => {
      if (prev.includes(typeId)) {
        return prev.filter(id => id !== typeId);
      } else {
        return [...prev, typeId];
      }
    });
  };

  const handleExpLevelToggle = (levelId: string) => {
    setSelectedExpLevels(prev => {
      if (prev.includes(levelId)) {
        return prev.filter(id => id !== levelId);
      } else {
        return [...prev, levelId];
      }
    });
  };

  const applyFilters = (baseJobs = jobs, category = selectedCategory) => {
    let results = [...baseJobs];
    
    // Apply category filter
    if (category) {
      results = results.filter(job => job.category.name.toLowerCase() === category.toLowerCase());
    }
    
    // Apply job type filters
    if (selectedJobTypes.length > 0) {
      results = results.filter(job => selectedJobTypes.includes(job.type));
    }
    
    // Sort results
    switch(sortBy) {
      case 'salary-high':
        results.sort((a, b) => {
          const aValue = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bValue = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return bValue - aValue;
        });
        break;
      case 'salary-low':
        results.sort((a, b) => {
          const aValue = parseInt(a.salary.replace(/[^0-9]/g, ''));
          const bValue = parseInt(b.salary.replace(/[^0-9]/g, ''));
          return aValue - bValue;
        });
        break;
      case 'recent':
      default:
        results.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
    }
    
    setFilteredJobs(results);
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

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedJobTypes([]);
    setSelectedExpLevels([]);
    setFilteredJobs(jobs);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedJobTypes, selectedExpLevels]);

  const hasActiveFilters = selectedCategory || selectedJobTypes.length > 0 || selectedExpLevels.length > 0;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-3">Find Your Dream Job</h1>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto mb-8">
              Browse through thousands of job listings to find the perfect position that matches your skills and career goals.
            </p>
            <div className="mt-8 max-w-4xl mx-auto">
              <SearchBar onSearch={handleSearch} className="shadow-md" />
            </div>
            
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {mockCategories.map(category => (
                <button 
                  key={category._id}
                  onClick={() => handleCategoryFilter(category._id === selectedCategory ? null : category._id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full transition-all ${
                    selectedCategory === category._id 
                      ? 'bg-primary text-white shadow-md' 
                      : 'bg-white hover:bg-gray-50 border border-gray-200 shadow-sm'
                  }`}
                >
                  <span 
                    className="inline-block w-3 h-3 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="font-medium">{category.name}</span>
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
      
      <main className="flex-1 container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-8 md:py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4 w-full">
            <div className="lg:sticky lg:top-24">
              <div className="lg:hidden mb-4">
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
              
              <div className={`${isFilterOpen ? 'block' : 'hidden'} lg:block space-y-6`}>
                <div className="bg-white rounded-xl border border-border shadow-sm p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-semibold text-lg">Filters</h2>
                    {hasActiveFilters && (
                      <button 
                        onClick={clearAllFilters}
                        className="text-sm text-primary hover:text-primary/80 flex items-center"
                      >
                        <XCircle className="h-3.5 w-3.5 mr-1" />
                        Clear all
                      </button>
                    )}
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-base mb-3">Category</h3>
                      <CategoryFilter 
                        categories={mockCategories}
                        selectedCategory={selectedCategory}
                        onSelectCategory={handleCategoryFilter}
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-base mb-3">Job Type</h3>
                      <div className="space-y-2.5">
                        {jobTypes.map((type) => (
                          <div key={type.id} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={type.id} 
                              checked={selectedJobTypes.includes(type.id)}
                              onChange={() => handleJobTypeToggle(type.id)}
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label htmlFor={type.id} className="ml-2 text-sm text-gray-700 flex items-center">
                              {type.label}
                              <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${type.color}`}>
                                {mockJobs.filter(job => job.type === type.id).length}
                              </span>
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-base mb-3">Experience Level</h3>
                      <div className="space-y-2.5">
                        {experienceLevels.map((level) => (
                          <div key={level.id} className="flex items-center">
                            <input 
                              type="checkbox" 
                              id={level.id} 
                              checked={selectedExpLevels.includes(level.id)}
                              onChange={() => handleExpLevelToggle(level.id)}
                              className="rounded border-gray-300 text-primary focus:ring-primary"
                            />
                            <label 
                              htmlFor={level.id} 
                              className="ml-2 text-sm text-gray-700"
                            >
                              {level.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-base mb-3">Location</h3>
                      <div className="space-y-3">
                        <div className="relative">
                          <MapPin className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="text"
                            placeholder="Enter location..."
                            className="w-full pl-10 pr-3 py-2 border border-border/60 rounded-md text-sm focus:border-primary focus:ring-1 focus:ring-primary"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="remote-only"
                            className="rounded border-gray-300 text-primary focus:ring-primary"
                          />
                          <label htmlFor="remote-only" className="ml-2 text-sm text-gray-700">
                            Remote Only
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Job Listings Area */}
          <div className="lg:w-3/4 w-full">
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
                <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm border border-border/60">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-muted-foreground flex items-center text-sm sm:text-base">
                      <Briefcase className="h-4 w-4 mr-2 text-primary" />
                      <span>Found <span className="font-medium text-foreground mx-1">{filteredJobs.length}</span> jobs</span>
                    </p>
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
                    {selectedJobTypes.map(typeId => (
                      <span key={typeId} className="flex items-center text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        {jobTypes.find(t => t.id === typeId)?.label}
                        <button
                          onClick={() => handleJobTypeToggle(typeId)}
                          className="ml-1 rounded-full hover:bg-blue-200 p-0.5"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center self-end sm:self-auto">
                    <label htmlFor="sort-by" className="text-sm text-muted-foreground mr-2 whitespace-nowrap">Sort by:</label>
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
                
                <div className="grid gap-5">
                  {filteredJobs.length > 0 ? (
                    filteredJobs.map((job, index) => (
                      <FadeIn key={job._id} delay={index * 50}>
                        <JobCard job={job} />
                      </FadeIn>
                    ))
                  ) : (
                    <div className="text-center py-16 bg-white rounded-xl border border-border shadow-sm">
                      <Briefcase className="h-12 w-12 mx-auto text-muted-foreground" />
                      <h3 className="mt-4 text-lg font-medium">No jobs found</h3>
                      <p className="mt-2 text-muted-foreground">
                        Try changing your search or filter criteria
                      </p>
                      <button
                        onClick={clearAllFilters}
                        className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90"
                      >
                        Clear all filters
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
