import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, LightbulbIcon, Palette, Landmark, Stethoscope, GraduationCap, Building, Users, Map, Briefcase } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import FadeIn from '@/components/ui/FadeIn';
import { cn } from '@/lib/utils';

// Define the Category interface
interface Category {
  _id: string;
  name: string;
  icon: any;
  color: string;
  count: number;
}

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
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  // Filter categories based on search term
  const filteredCategories = categories.filter(
    category => category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/jobs?category=${categoryId}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <section className="py-12 md:py-16">
          <Container>
            <FadeIn>
              <h1 className="text-3xl md:text-4xl font-bold mb-6">Browse Job Categories</h1>
              <p className="text-muted-foreground mb-10 max-w-2xl">
                Explore job opportunities by category. Find the perfect role that matches your skills and interests.
              </p>
              
              <div className="mb-8">
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full md:w-1/2 px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  return (
                    <FadeIn key={category._id} delay={index * 50}>
                      <div
                        onClick={() => handleCategoryClick(category._id)}
                        className={cn(
                          "relative overflow-hidden p-6 rounded-xl border border-border/60 cursor-pointer transition-all",
                          "hover:shadow-lg hover:border-primary/30 hover:scale-[1.02] hover:-translate-y-1",
                          "flex flex-col items-center text-center h-full"
                        )}
                      >
                        {/* Background pattern */}
                        <div
                          className="absolute inset-0 z-0 opacity-[0.03]"
                          style={{
                            backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0V0zm20 0h1v1h-1V0zM0 20h1v1H0v-1zm20 0h1v1h-1v-1z'/%3E%3C/g%3E%3C/svg%3E\")"
                          }}
                        ></div>
                        
                        <div
                          className="w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10"
                          style={{ backgroundColor: `${category.color}15` }}
                        >
                          <IconComponent className="h-7 w-7" style={{ color: category.color }} />
                        </div>
                        
                        <h3 className="text-xl font-semibold mb-2 z-10">{category.name}</h3>
                        <p className="text-muted-foreground z-10">{category.count} Jobs Available</p>
                        
                        {/* Bottom line accent */}
                        <div
                          className="absolute bottom-0 left-0 h-1 w-full"
                          style={{ backgroundColor: category.color }}
                        ></div>
                      </div>
                    </FadeIn>
                  );
                })}
              </div>
              
              {filteredCategories.length === 0 && (
                <div className="text-center py-12">
                  <h3 className="text-xl font-medium">No categories found</h3>
                  <p className="text-muted-foreground mt-2">Try a different search term</p>
                </div>
              )}
            </FadeIn>
          </Container>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Categories;
