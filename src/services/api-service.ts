import axios from "axios";

// Base API configuration
const api = axios.create({
  baseURL: "https://api.example.com", // Replace with your actual API URL
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Types
export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  date: string;
  description?: string;
  requirements?: string[];
  applicationUrl?: string;
  category: {
    name: string;
    color: string;
    icon: string;
  };
}

export interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
  count: number;
}

// Job API functions
export const jobsApi = {
  getJobs: async (query?: string, location?: string, filters?: string[]): Promise<Job[]> => {
    // For now, return mock data - replace with actual API call when ready
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock implementation - replace with real API call
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
        
        let filteredJobs = [...mockJobs];
        
        // Apply query filter
        if (query) {
          filteredJobs = filteredJobs.filter(job => 
            job.title.toLowerCase().includes(query.toLowerCase()) ||
            job.company.toLowerCase().includes(query.toLowerCase())
          );
        }
        
        // Apply location filter
        if (location) {
          filteredJobs = filteredJobs.filter(job => 
            job.location.toLowerCase().includes(location.toLowerCase())
          );
        }
        
        // Apply job type filters
        if (filters && filters.length > 0) {
          filteredJobs = filteredJobs.filter(job => 
            filters.includes(job.type)
          );
        }
        
        resolve(filteredJobs);
      }, 600);
    });
  },
  
  getJobById: async (id: string): Promise<Job> => {
    // For now, return mock data - replace with actual API call when ready
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock implementation - replace with real API call
        resolve({
          _id: id,
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
        });
      }, 500);
    });
  },
  
  getSimilarJobs: async (jobId: string): Promise<Job[]> => {
    // For now, return mock data - replace with actual API call when ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
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
        ]);
      }, 500);
    });
  }
};

// Category API functions
export const categoryApi = {
  getCategories: async (): Promise<Category[]> => {
    // For now, return mock data - replace with actual API call when ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { _id: '1', name: 'Technology', icon: 'code', color: '#10B981', count: 42 },
          { _id: '2', name: 'Marketing', icon: 'lightbulb', color: '#6366F1', count: 28 },
          { _id: '3', name: 'Design', icon: 'palette', color: '#F59E0B', count: 31 },
          { _id: '4', name: 'Finance', icon: 'landmark', color: '#3B82F6', count: 19 },
          { _id: '5', name: 'Healthcare', icon: 'stethoscope', color: '#EF4444', count: 24 },
          { _id: '6', name: 'Education', icon: 'graduation-cap', color: '#8B5CF6', count: 16 },
          { _id: '7', name: 'Real Estate', icon: 'building', color: '#EC4899', count: 12 },
          { _id: '8', name: 'Customer Service', icon: 'users', color: '#14B8A6', count: 22 },
          { _id: '9', name: 'Hospitality', icon: 'map', color: '#F97316', count: 15 },
          { _id: '10', name: 'Engineering', icon: 'briefcase', color: '#0EA5E9', count: 29 },
        ]);
      }, 400);
    });
  },
  
  getCategoryById: async (id: string): Promise<Category> => {
    // For now, return mock data - replace with actual API call when ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ 
          _id: id, 
          name: 'Technology', 
          icon: 'code', 
          color: '#10B981', 
          count: 42 
        });
      }, 300);
    });
  }
};

// Auth API functions
export const authApi = {
  login: async (email: string, password: string): Promise<{ token: string; user: any }> => {
    // For now, simulate login - replace with actual API call when ready
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // This is just for demonstration, in a real app you would validate credentials with a server
        if (email === 'user@example.com' && password === 'password123') {
          resolve({
            token: 'fake-jwt-token',
            user: {
              id: '1',
              email: 'user@example.com',
              name: 'Test User',
            },
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },
  
  register: async (userData: any): Promise<{ token: string; user: any }> => {
    // For now, simulate registration - replace with actual API call when ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: 'fake-jwt-token',
          user: {
            id: '2',
            email: userData.email,
            name: `${userData.firstName} ${userData.lastName}`,
          },
        });
      }, 1000);
    });
  },
  
  forgotPassword: async (email: string): Promise<void> => {
    // For now, simulate password reset - replace with actual API call when ready
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 800);
    });
  }
};

export default api;
