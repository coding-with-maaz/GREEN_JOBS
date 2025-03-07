
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, ChevronRight, Briefcase } from 'lucide-react';
import { toast } from 'sonner';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import FadeIn from '@/components/ui/FadeIn';

const Register = () => {
  const [step, setStep] = useState(1);
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState('');
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  const [bio, setBio] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      e.preventDefault();
      if (!skills.includes(skillInput.trim())) {
        setSkills([...skills, skillInput.trim()]);
      }
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
  };

  const handleNextStep = () => {
    if (step === 1 && skills.length === 0) {
      toast.error('Please add at least one skill');
      return;
    }

    if (step === 2) {
      if (!personalInfo.firstName || !personalInfo.lastName || !personalInfo.email) {
        toast.error('Please fill all required fields');
        return;
      }
      
      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(personalInfo.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
    }

    if (step === 3 && !bio) {
      toast.error('Please add a bio');
      return;
    }

    if (step === 4) {
      if (!password || !confirmPassword) {
        toast.error('Please enter and confirm your password');
        return;
      }
      
      if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      
      if (password.length < 8) {
        toast.error('Password must be at least 8 characters long');
        return;
      }
      
      handleSubmit();
      return;
    }

    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // In a real app, we would register the user
      // const register = async () => {
      //   try {
      //     const userData = {
      //       skills,
      //       personalInformation: personalInfo,
      //       bio,
      //       password,
      //     };
      //     
      //     const response = await fetch('/api/auth/register', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify(userData),
      //     });
      //     
      //     const data = await response.json();
      //     
      //     if (response.ok) {
      //       toast.success('Registration successful!');
      //       // Redirect to login
      //       window.location.href = '/login';
      //     } else {
      //       toast.error(data.message || 'Failed to register');
      //     }
      //   } catch (error) {
      //     toast.error('An error occurred. Please try again.');
      //   }
      // };
      
      toast.success('Registration successful!');
      setIsLoading(false);
    }, 1500);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">What skills do you have?</h2>
            <div className="mb-4">
              <label htmlFor="skills" className="block text-sm font-medium mb-1">
                Skills (press Enter to add)
              </label>
              <input
                id="skills"
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleAddSkill}
                className="w-full p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="e.g. JavaScript, React, UI Design"
              />
            </div>
            
            {skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {skills.map((skill, index) => (
                  <div 
                    key={index} 
                    className="bg-secondary text-secondary-foreground rounded-full px-3 py-1 text-sm flex items-center"
                  >
                    {skill}
                    <button 
                      type="button" 
                      onClick={() => handleRemoveSkill(skill)}
                      className="ml-2 text-muted-foreground hover:text-foreground"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                    First Name *
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, firstName: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                    Last Name *
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => setPersonalInfo({ ...personalInfo, lastName: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, email: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) => setPersonalInfo({ ...personalInfo, phone: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Tell us about yourself</h2>
            <div>
              <label htmlFor="bio" className="block text-sm font-medium mb-1">
                Bio *
              </label>
              <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={5}
                className="w-full p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Share a bit about your background, experience, and career goals..."
                required
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-lg font-semibold mb-4">Create a password</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password *
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container-custom py-16">
        <div className="max-w-md mx-auto">
          <FadeIn>
            <div className="text-center mb-8">
              <div className="flex justify-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                  <Briefcase className="h-7 w-7 text-primary" />
                </div>
              </div>
              <h1 className="text-2xl font-bold mt-5">Create an account</h1>
              <p className="text-muted-foreground mt-2">
                Join GreenJobs to find your dream job
              </p>
            </div>
          </FadeIn>
          
          <FadeIn delay={100}>
            <div className="bg-white p-8 rounded-xl border border-border/60 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                {[1, 2, 3, 4].map((stepNumber) => (
                  <div 
                    key={stepNumber}
                    className={`relative flex items-center justify-center w-8 h-8 rounded-full text-sm ${
                      stepNumber === step
                        ? 'bg-primary text-white'
                        : stepNumber < step
                        ? 'bg-primary/20 text-primary'
                        : 'bg-secondary text-muted-foreground'
                    }`}
                  >
                    {stepNumber < step ? '✓' : stepNumber}
                    {stepNumber < 4 && (
                      <div 
                        className={`absolute top-1/2 -translate-y-1/2 w-8 h-0.5 left-full ${
                          stepNumber < step ? 'bg-primary/20' : 'bg-secondary'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="my-6">{renderStep()}</div>
              
              <div className="flex justify-between mt-8">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="btn btn-ghost py-2 px-4 border border-border"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn btn-primary py-2 px-4 flex items-center"
                  disabled={isLoading}
                >
                  {step === 4 ? (
                    isLoading ? 'Creating Account...' : 'Create Account'
                  ) : (
                    <>
                      Next <ChevronRight className="ml-1 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?{' '}
                  <Link to="/login" className="text-primary hover:underline">
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Register;
