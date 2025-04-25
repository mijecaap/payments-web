import { useState } from 'react';
import { UserDetails } from '@/types/users';
import { UserService } from '@/services/UserService';
import { toast } from 'sonner';

interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}

interface APIError {
  response?: {
    data?: ErrorResponse;
    status?: number;
  };
}

export function useUserDetails() {
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchUserDetails = async (userId: number) => {
    try {
      setIsLoading(true);
      const response = await UserService.getUserDetails(userId);
      setUserDetails(response);
    } catch (error) {
      const apiError = error as APIError;
      if (apiError?.response?.data) {
        const errorResponse = apiError.response.data;
        if (
          apiError.response.status &&
          apiError.response.status >= 400 &&
          apiError.response.status < 500
        ) {
          toast.error(errorResponse.message);
        } else {
          toast.error('Error al cargar los detalles del usuario');
        }
      } else {
        toast.error('Error al cargar los detalles del usuario');
      }
      setError(
        error instanceof Error ? error : new Error('Error al cargar los detalles del usuario'),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    userDetails,
    isLoading,
    error,
    fetchUserDetails,
  };
}
