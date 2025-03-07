
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Briefcase, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface JobCardProps {
  job: {
    _id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    date: string;
    category: {
      name: string;
      color: string;
      icon: string;
    };
  };
  className?: string;
}

const JobCard = ({ job, className }: JobCardProps) => {
  const typeColors = {
    fulltime: 'bg-blue-100 text-blue-800',
    parttime: 'bg-purple-100 text-purple-800',
    contract: 'bg-amber-100 text-amber-800',
    internship: 'bg-green-100 text-green-800',
  };

  const getTypeColor = (type: string) => {
    return typeColors[type as keyof typeof typeColors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, 'MMM dd, yyyy');
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-xl border border-border/60 p-6 card-hover",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <Link 
            to={`/job/${job._id}`}
            className="text-lg font-semibold line-clamp-1 hover:text-primary transition-colors"
          >
            {job.title}
          </Link>
          <div className="text-muted-foreground text-sm mt-1">{job.company}</div>
        </div>
        <div className="flex">
          <span 
            className={cn(
              "text-xs rounded-full px-3 py-1 font-medium",
              getTypeColor(job.type)
            )}
          >
            {job.type.charAt(0).toUpperCase() + job.type.slice(1)}
          </span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1.5 text-muted-foreground/70" />
          {job.location}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Briefcase className="h-4 w-4 mr-1.5 text-muted-foreground/70" />
          {job.salary}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground/70" />
          {formatDate(job.date)}
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-border/60 flex items-center justify-between">
        <div className="chip chip-secondary">
          {job.category.name}
        </div>
        <Link 
          to={`/job/${job._id}`}
          className="flex items-center text-sm font-medium text-primary hover:underline"
        >
          View Details
          <ExternalLink className="h-3.5 w-3.5 ml-1.5" />
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
