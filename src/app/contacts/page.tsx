'use client';

import { useAuth } from '@/hooks/useAuth';
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout';
import { ContactTabs } from '@/components/home/ContactTabs';

export default function ContactsPage() {
  useAuth();

  return (
    <AuthenticatedLayout>
      <ContactTabs />
    </AuthenticatedLayout>
  );
}
