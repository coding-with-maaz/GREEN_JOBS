
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Users, Code, Palette, LightbulbIcon, Building, Stethoscope, Landmark, GraduationCap, Map } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';

// Mock categories data
const mockCategories = [
  { _id: '1', name: 'Technology', icon: Code, color: '#10B981', count: 42 },
  { _id: '2', name: 'Marketing', icon: LightbulbIcon, color: '#6366F1', count: 28 },
  { _id: '3', name: 'Design', icon: Palette, color: '#F59E0B', count: 31 },
  { _id: '4', name: 'Finance', icon: Landmark, color: '#3B82F6', count: 19 },
  { _id: '5', name: 'Healthcare', icon: Stethoscope, color: '#EF4444', count: 24 },
  { _id: '6', name: 'Education', icon: GraduationCap, color: '#8B5CF6', count: 16 },
  { _id: '7', name: 'Real Estate', icon: Building, color: '#EC4899', count: 12 },
  { _id: '8', name: 'Customer Service', icon: Users, color: '#14B8A6', count: 22 },
  { _id: '9', name: 'Hospitality', icon: Map, color: '#F97316', count: 15 },
  { _id: '10', name: 'Engineering', icon: Briefcase, color: '#0EA5E9', count: 29 },
];

const Categories = () => {
  const [categories, setCategories] = useState(mockCategories);
  const [loading, setLoading] = useState(false);

  // In a real app, we would fetch categories here
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 500);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-10">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl font-bold text-center">Browse Job Categories</h1>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
              Explore jobs by category to find opportunities that match your expertise and interests.
            </p>
          </FadeIn>
        </div>
      </div>
      
      <main className="flex-1 container-custom py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-48 bg-muted rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <FadeIn key={category._id} delay={index * 50}>
                  <Link 
                    to={`/jobs?category=${category._id}`}
                    className="flex flex-col p-6 bg-white rounded-xl border border-border hover:shadow-md hover:border-primary/20 transition-all h-full"
                  >
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <IconComponent className="h-8 w-8" style={{ color: category.color }} />
                    </div>
                    <h2 className="text-xl font-semibold">{category.name}</h2>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">
                      {category.count} Jobs Available
                    </p>
                    <div className="mt-auto">
                      <span className="text-primary text-sm font-medium flex items-center">
                        Browse Jobs
                      </span>
                    </div>
                  </Link>
                </FadeIn>
              );
            })}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
