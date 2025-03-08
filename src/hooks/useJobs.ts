import { useQuery } from "@tanstack/react-query";
import { jobsApi, Job } from "@/services/api-service";

export function useJobs(query?: string, location?: string, filters?: string[]) {
  return useQuery({
    queryKey: ['jobs', query, location, filters],
    queryFn: () => jobsApi.getJobs(query, location, filters),
  });
}

export function useJobDetail(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => jobsApi.getJobById(id),
    enabled: !!id,
  });
}

export function useSimilarJobs(id: string) {
  return useQuery({
    queryKey: ['similarJobs', id],
    queryFn: () => jobsApi.getSimilarJobs(id),
    enabled: !!id,
  });
}
