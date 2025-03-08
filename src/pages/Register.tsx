import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { User, Eye, EyeOff, ArrowLeft, ArrowRight, X, Check, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import Container from "@/components/ui/Container";
import { useAuth } from "@/contexts/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register, signInWithGoogle, loading } = useAuth();
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

  const handleSubmit = async () => {
    setIsLoading(true);
    
    try {
      await register(personalInfo.email, password);
      // In a real application, you would also save the user's profile information
      // to a database after successful registration
      navigate('/login');
    } catch (error) {
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithGoogle();
      // After Google sign-in, we would typically redirect to a profile completion page
      // where the user can add their skills, bio, etc.
      navigate('/');
    } catch (error) {
      console.error("Google sign-up error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <Container>
        <div className="max-w-lg mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create your account</h1>
            <p className="mt-2 text-gray-600">Join our community of green job seekers</p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Google Sign Up button at the top */}
            <div className="p-6 border-b border-gray-200">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading}
                className={cn(
                  "w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors",
                  loading && "opacity-70 cursor-not-allowed"
                )}
              >
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z" />
                </svg>
                Sign up with Google
              </button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="w-full bg-gray-100 h-2">
              <div 
                className="bg-primary h-2 transition-all duration-300 ease-out"
                style={{ width: `${(step / 4) * 100}%` }}
              />
            </div>

            <div className="p-6">
              {/* Step indicators */}
              <div className="flex justify-between mb-8">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div 
                    key={stepNum}
                    className={cn(
                      "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all",
                      stepNum < step 
                        ? "border-primary bg-primary text-white" 
                        : stepNum === step
                          ? "border-primary text-primary"
                          : "border-gray-300 text-gray-400"
                    )}
                  >
                    {stepNum < step ? <Check className="w-4 h-4" /> : stepNum}
                  </div>
                ))}
              </div>

              {/* Step 1: Skills */}
              {step === 1 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">What skills do you have?</h2>
                  <p className="text-gray-600 text-sm">Enter your key skills or areas of expertise to help us match you with the right jobs.</p>
                  
                  <div className="mt-4">
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                      Skills <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <div className="flex flex-wrap gap-2 p-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary/50 transition-all">
                        {skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                          >
                            {skill}
                            <button 
                              type="button" 
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary/20 hover:bg-primary/40 transition-colors"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </span>
                        ))}
                        <input
                          type="text"
                          id="skillInput"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={handleAddSkill}
                          placeholder="Type a skill and press Enter"
                          className="flex-grow min-w-[150px] border-none focus:ring-0 p-0.5 text-sm"
                        />
                      </div>
                      <p className="mt-1 text-xs text-gray-500">Press Enter after each skill to add it</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Personal Information */}
              {step === 2 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
                  <p className="text-gray-600 text-sm">Tell us about yourself so employers can get to know you better.</p>
                  
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                        First Name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="firstName"
                          value={personalInfo.firstName}
                          onChange={(e) => setPersonalInfo({...personalInfo, firstName: e.target.value})}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 sm:text-sm transition-colors"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                        Last Name <span className="text-red-500">*</span>
                      </label>
                      <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="lastName"
                          value={personalInfo.lastName}
                          onChange={(e) => setPersonalInfo({...personalInfo, lastName: e.target.value})}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 sm:text-sm transition-colors"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        value={personalInfo.email}
                        onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 sm:text-sm transition-colors"
                        required
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        value={personalInfo.phone}
                        onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 sm:text-sm transition-colors"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Bio */}
              {step === 3 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Professional Summary</h2>
                  <p className="text-gray-600 text-sm">Write a brief bio highlighting your professional experience and career goals.</p>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Bio <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 sm:text-sm transition-colors"
                      placeholder="I am a passionate professional with experience in..."
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {bio.length}/500 characters
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Password */}
              {step === 4 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-gray-900">Set Your Password</h2>
                  <p className="text-gray-600 text-sm">Create a secure password for your account.</p>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full pr-10 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 rounded-md sm:text-sm transition-colors"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="block w-full pr-10 py-2 border border-gray-300 shadow-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/50 rounded-md sm:text-sm transition-colors"
                        required
                      />
                    </div>
                  </div>

                  <div className="text-sm space-y-1">
                    <p className={password.length >= 8 ? "text-green-600" : "text-gray-500"}>
                      <span className="inline-flex items-center">
                        {password.length >= 8 ? 
                          <Check className="h-3 w-3 mr-1" /> : 
                          <span className="h-3 w-3 mr-1 inline-block" />
                        }
                        At least 8 characters
                      </span>
                    </p>
                    <p className={/[A-Z]/.test(password) ? "text-green-600" : "text-gray-500"}>
                      <span className="inline-flex items-center">
                        {/[A-Z]/.test(password) ? 
                          <Check className="h-3 w-3 mr-1" /> : 
                          <span className="h-3 w-3 mr-1 inline-block" />
                        }
                        Contains uppercase letter
                      </span>
                    </p>
                    <p className={/[0-9]/.test(password) ? "text-green-600" : "text-gray-500"}>
                      <span className="inline-flex items-center">
                        {/[0-9]/.test(password) ? 
                          <Check className="h-3 w-3 mr-1" /> : 
                          <span className="h-3 w-3 mr-1 inline-block" />
                        }
                        Contains number
                      </span>
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Previous
                  </button>
                ) : (
                  <div></div>
                )}
                
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={isLoading || loading}
                  className={cn(
                    "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                    (isLoading || loading) && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isLoading || loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : step === 4 ? (
                    "Complete Registration"
                  ) : (
                    <>
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Register;
