import { Doctor, doctors } from '@/helpers/mockData';
import { useQuery } from '@tanstack/react-query';

export interface DoctorsResponse {
    doctors: Doctor[];
    totalCount: number;
    totalPages: number;
}

// Mock function to simulate API request
const fetchDoctors = async (
    page: number,
    limit: number,
    specialty: string | null
): Promise<DoctorsResponse> => {
    // Add a small delay to simulate network request

    // Filter by specialty if provided
    const filteredDoctors = specialty
        ? doctors.filter(doctor => doctor.specialty === specialty)
        : doctors;

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedDoctors = filteredDoctors.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredDoctors.length / limit);

    return {
        doctors: paginatedDoctors,
        totalCount: filteredDoctors.length,
        totalPages,
    };
};

export function useDoctors(page: number, limit: number, specialty: string | null) {
    return useQuery<DoctorsResponse, Error>({
        queryKey: ['doctors', page, limit, specialty],
        queryFn: () => fetchDoctors(page, limit, specialty),
        // These settings help ensure loading states appear appropriately
        staleTime: 0, // Data is immediately stale and will refetch
        gcTime: 0, // Don't keep the data in cache (React Query v4+ uses gcTime instead of cacheTime)
        // Don't refetch on window focus
        refetchOnWindowFocus: false,
    });
} 