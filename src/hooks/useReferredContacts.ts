import { useState, useEffect } from 'react';
import { ReferredContact } from '@/types/users';
import { ContactService } from '@/services/ContactService';

export function useReferredContacts() {
  const [contacts, setContacts] = useState<ReferredContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await ContactService.getReferredContacts();
      setContacts(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar los contactos de la red'));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return {
    contacts,
    isLoading,
    error,
    refetch: fetchContacts,
  };
}
