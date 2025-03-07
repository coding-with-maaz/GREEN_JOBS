
import { useState } from 'react';
import { MapPin, Briefcase, Calendar, Building, Heart, Share2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from 'sonner';
import FadeIn from '../ui/FadeIn';

interface JobDetailProps {
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    date: string;
    description: string;
    requirements: string[];
    applicationUrl: string;
    category: {
      name: string;
      color: string;
      icon: string;
    };
  };
}

const JobDetailView = ({ job }: JobDetailProps) => {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveJob = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? "Job removed from saved jobs" : "Job saved successfully");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Check out this job: ${job.title} at ${job.company}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMMM dd, yyyy');
  };

  const typeColors = {
    fulltime: 'bg-blue-100 text-blue-800',
    parttime: 'bg-purple-100 text-purple-800',
    contract: 'bg-amber-100 text-amber-800',
    internship: 'bg-green-100 text-green-800',
  };

  const getTypeColor = (type: string) => {
    return typeColors[type as keyof typeof typeColors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-xl border border-border shadow-sm">
      <div className="p-8">
        <FadeIn>
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">{job.title}</h1>
              <div className="flex items-center mt-2 text-slate-600">
                <Building className="h-4 w-4 mr-1.5" />
                <span className="font-medium">{job.company}</span>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSaveJob}
                className={`rounded-full p-2.5 transition-colors ${
                  isSaved 
                    ? 'bg-primary/10 text-primary' 
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                }`}
                aria-label={isSaved ? "Unsave job" : "Save job"}
              >
                <Heart className={`h-5 w-5 ${isSaved ? 'fill-primary' : ''}`} />
              </button>
              <button
                onClick={handleShare}
                className="rounded-full p-2.5 bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Share job"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary py-2.5 px-5 rounded-lg shadow-sm hover:shadow"
              >
                Apply Now
              </a>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="flex items-center p-4 bg-secondary rounded-lg">
              <MapPin className="h-5 w-5 text-primary mr-3" />
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Location</div>
                <div className="font-medium text-slate-700">{job.location}</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-secondary rounded-lg">
              <Briefcase className="h-5 w-5 text-primary mr-3" />
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Salary</div>
                <div className="font-medium text-slate-700">{job.salary}</div>
              </div>
            </div>
            <div className="flex items-center p-4 bg-secondary rounded-lg">
              <Calendar className="h-5 w-5 text-primary mr-3" />
              <div>
                <div className="text-xs text-slate-500 uppercase tracking-wide">Posted On</div>
                <div className="font-medium text-slate-700">{formatDate(job.date)}</div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div className="mt-10">
            <div className="flex items-center mb-4">
              <h2 className="text-xl font-semibold text-slate-800">Job Description</h2>
              <span className={`ml-3 text-xs rounded-full px-3 py-1 font-medium ${getTypeColor(job.type)}`}>
                {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
              </span>
            </div>
            <div className="prose prose-slate max-w-none">
              <p className="text-slate-600 leading-relaxed text-base whitespace-pre-line">{job.description}</p>
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-5 text-slate-800">Requirements</h2>
            <ul className="space-y-3 pl-1">
              {job.requirements.map((requirement, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-2 w-2 rounded-full bg-primary mt-2 mr-3"></span>
                  <span className="text-slate-600 leading-relaxed">{requirement}</span>
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="mt-10 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <span className="chip chip-secondary">{job.category.name}</span>
              </div>
              <a
                href={job.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary py-2.5 px-5 flex items-center justify-center rounded-lg shadow-sm hover:shadow"
              >
                Apply For This Position
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};

export default JobDetailView;
