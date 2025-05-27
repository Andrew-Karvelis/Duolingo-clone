"use client";
import Link from 'next/link';
import { HomeIcon, BookOpenIcon, UserIcon } from '@heroicons/react/24/outline';
import { useStore } from '@/store/useStore';

export function Navbar() {
  const { user } = useStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link 
            href="/"
            className="text-xl font-bold text-green-500 flex items-center space-x-2"
          >
            <span>🦉</span>
            <span>Duolingo Clone</span>
          </Link>

          <div className="flex space-x-4">
            <Link
              href="/dashboard"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <HomeIcon className="w-5 h-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/lessons"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <BookOpenIcon className="w-5 h-5" />
              <span>Lessons</span>
            </Link>
            {user && (
              <Link
                href="/profile"
                className="flex items-center space-x-1 px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
              >
                <UserIcon className="w-5 h-5" />
                <span>Profile</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 