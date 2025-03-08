
import { useQuery } from "@tanstack/react-query";
import { categoryApi, Category } from "@/services/api-service";

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => categoryApi.getCategories(),
  });
}

export function useCategory(id: string) {
  return useQuery({
    queryKey: ['category', id],
    queryFn: () => categoryApi.getCategoryById(id),
    enabled: !!id,
  });
}
