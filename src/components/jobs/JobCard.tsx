import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { cn } from "@/lib/utils";

interface JobCategory {
  name: string;
  color: string;
  icon: string;
}

interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  date: string;
  category: JobCategory;
}

interface JobCardProps {
  job: Job;
  className?: string;
}

const JobCard = ({ job, className }: JobCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const formattedDate = new Date(job.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  
  const jobTypes: Record<string, string> = {
    fulltime: "Full-time",
    parttime: "Part-time",
    contract: "Contract",
    temporary: "Temporary",
    internship: "Internship",
    remote: "Remote",
  };

  return (
    <Link
      to={`/job/${job._id}`}
      className={cn(
        "block bg-white rounded-xl overflow-hidden border border-border/60 transition-all duration-300",
        "hover:shadow-lg hover:border-primary/30 hover:translate-y-[-2px]",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6">
        <div className="flex justify-between">
          <div>
            <span 
              className="inline-flex items-center text-xs px-2.5 py-0.5 font-medium rounded-full" 
              style={{ 
                backgroundColor: `${job.category.color}15`, 
                color: job.category.color 
              }}
            >
              {job.category.name}
            </span>
          </div>
          <div className="text-sm text-primary font-medium">{job.salary}</div>
        </div>
        
        <h2 className={cn(
          "mt-3 text-xl font-semibold text-foreground transition-colors duration-300",
          isHovered && "text-primary"
        )}>
          {job.title}
        </h2>
        
        <p className="mt-1 text-sm text-muted-foreground mb-4">
          {job.company}
        </p>
        
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1.5 text-muted-foreground/70" />
            {job.location}
          </div>
          
          <div className="flex items-center">
            <Briefcase className="h-4 w-4 mr-1.5 text-muted-foreground/70" />
            {jobTypes[job.type] || job.type}
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground/70" />
            Posted {formattedDate}
          </div>
        </div>
      </div>
      
      <div className={cn(
        "h-1.5 bg-primary origin-left scale-x-0 transition-transform duration-300",
        isHovered && "scale-x-100"
      )} />
    </Link>
  );
};

export default JobCard;
