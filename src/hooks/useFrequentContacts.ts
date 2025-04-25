import { useState, useEffect } from 'react';
import { FrequentContact } from '@/types/users';
import { ContactService } from '@/services/ContactService';

export function useFrequentContacts() {
  const [contacts, setContacts] = useState<FrequentContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchContacts = async () => {
    try {
      setIsLoading(true);
      const response = await ContactService.getFrequentContacts();
      setContacts(response);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Error al cargar los contactos frecuentes'));
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
