
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';
import { CheckCircle, Users, Globe, Award, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="bg-gradient-to-r from-green-50 to-green-100 py-16">
        <div className="container-custom">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">About GreenJobs</h1>
            <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto">
              Connecting talented professionals with sustainable and meaningful career opportunities.
            </p>
          </FadeIn>
        </div>
      </div>
      
      <main className="flex-1">
        <section className="py-16">
          <div className="container-custom">
            <FadeIn>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Mission</h2>
                  <p className="text-muted-foreground mb-6">
                    At GreenJobs, we believe that finding the right job should be an empowering experience. Our mission is to connect talented professionals with companies that value sustainability, innovation, and employee wellbeing.
                  </p>
                  <p className="text-muted-foreground">
                    We're dedicated to creating a platform where job seekers can discover opportunities that align with their skills, values, and career aspirations, while helping companies find the perfect candidates to drive their success.
                  </p>
                  <div className="mt-8">
                    <Link to="/jobs" className="btn btn-primary px-6 py-2.5">
                      Explore Jobs
                    </Link>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
        
        <section className="py-16 bg-secondary/50">
          <div className="container-custom">
            <FadeIn>
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">Why Choose GreenJobs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white p-6 rounded-xl border border-border/60">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Quality Listings</h3>
                  <p className="text-muted-foreground">
                    Curated job opportunities from reputable companies across various industries.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-border/60">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Community Focus</h3>
                  <p className="text-muted-foreground">
                    Building connections between professionals and forward-thinking organizations.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-border/60">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Global Reach</h3>
                  <p className="text-muted-foreground">
                    Access to opportunities from around the world, including remote positions.
                  </p>
                </div>
                
                <div className="bg-white p-6 rounded-xl border border-border/60">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Career Growth</h3>
                  <p className="text-muted-foreground">
                    Resources and support to help professionals advance in their careers.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container-custom">
            <FadeIn>
              <div className="bg-primary rounded-2xl p-8 md:p-12 text-white text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  Ready to Find Your Dream Job?
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto mb-8">
                  Join thousands of professionals who have found their ideal positions through GreenJobs. Create an account today to start your journey.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/register" className="btn bg-white text-primary hover:bg-white/90 px-6 py-2.5">
                    Create Account
                  </Link>
                  <Link to="/contact" className="btn bg-primary-foreground/10 text-white border border-white/30 hover:bg-primary-foreground/20 px-6 py-2.5 flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Us
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

export default About;
