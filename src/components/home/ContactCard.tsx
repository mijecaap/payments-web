'use client';

import { useState } from 'react';
import { useUserDetails } from '@/hooks/useUserDetails';
import { UserDetailsModal } from './UserDetailsModal';

interface ContactCardProps {
  id: number;
  name: string;
  description: string;
}

export function ContactCardSkeleton() {
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg animate-pulse">
      <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600" />
      <div className="space-y-2 flex-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
      </div>
    </div>
  );
}

export function ContactCard({ id, name, description }: ContactCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userDetails, isLoading, fetchUserDetails } = useUserDetails();

  const handleClick = async () => {
    try {
      setIsModalOpen(true);
      await fetchUserDetails(id);
    } catch {
      setIsModalOpen(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg cursor-pointer hover:bg-gray-100/80 dark:hover:bg-gray-700/70 transition-colors"
        onClick={handleClick}
      >
        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
          {name
            .split(' ')
            .map((word) => word[0])
            .join('')}
        </div>
        <div>
          <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
        </div>
      </div>

      <UserDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        user={userDetails}
        isLoading={isLoading}
      />
    </>
  );
}
