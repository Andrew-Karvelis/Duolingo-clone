'use client';

import Image from 'next/image';
import { FaUserFriends, FaUsers, FaFire, FaTrophy, FaMedal, FaStar, FaTimes, FaAward } from 'react-icons/fa';
import { useState } from 'react';

interface Course {
  name: string;
  flag: string;
  level: string;
}

interface Badge {
  id: string;
  name: string;
  description?: string;
  icon: string;
  earnedDate: string;
  isEarned: boolean;
  type: 'monthly' | 'achievement';
}

export type LeagueName = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

interface ProfileProps {
  username: string;
  userTag: string;
  avatarUrl: string;
  dateJoined: string;
  courses: Course[];
  followingCount: number;
  followerCount: number;
  streak: number;
  totalXP: number;
  currentLeague: {
    name: LeagueName;
    color: string;
  };
  topThreeFinishes: number;
  badges: Badge[];
}

const leagueColors: Record<LeagueName, string> = {
  bronze: 'text-amber-700',
  silver: 'text-gray-400',
  gold: 'text-yellow-500',
  platinum: 'text-cyan-400',
  diamond: 'text-blue-500',
};

export default function Profile({
  username,
  userTag,
  avatarUrl,
  dateJoined,
  courses,
  followingCount,
  followerCount,
  streak,
  totalXP = 0,
  currentLeague,
  topThreeFinishes,
  badges = [],
}: ProfileProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBadgesModalOpen, setIsBadgesModalOpen] = useState(false);
  const mainCourse = courses[0];
  const remainingCourses = courses.slice(1);
  const additionalCoursesCount = remainingCourses.length;

  // Filter badges by type
  const monthlyBadges = badges.filter(b => b.type === 'monthly' && b.isEarned).slice(0, 3);
  const achievements = badges.filter(b => b.type === 'achievement' && b.isEarned).slice(0, 3);

  // Group badges by type and year
  const groupedBadges = badges.reduce((acc, badge) => {
    const date = new Date(badge.earnedDate);
    const year = date.getFullYear();
    if (!acc[year]) {
      acc[year] = {
        monthly: Array(12).fill(null),
        achievements: []
      };
    }
    if (badge.type === 'monthly') {
      acc[year].monthly[new Date(badge.earnedDate).getMonth()] = badge;
    } else {
      acc[year].achievements.push(badge);
    }
    return acc;
  }, {} as Record<number, { monthly: (Badge | null)[], achievements: Badge[] }>);

  const years = Object.keys(groupedBadges)
    .map(Number)
    .sort((a, b) => b - a);

  const handleModalClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsModalOpen(false);
      setIsBadgesModalOpen(false);
    }
  };

  return (
    <>
      {/* Courses Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="fixed z-10 right-4 top-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Learning</h2>
            <div className="grid grid-cols-1 gap-4">
              {courses.map((course, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <span className="text-2xl">{course.flag}</span>
                  <div>
                    <p className="font-medium">{course.name}</p>
                    <p className="text-sm text-gray-600">{course.level}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Badges Modal */}
      {isBadgesModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalClick}
        >
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full max-h-[80vh] overflow-y-auto relative">
            <button
              onClick={() => setIsBadgesModalOpen(false)}
              className="fixed z-10 right-4 top-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md"
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-xl font-semibold mb-6">All Badges</h2>
            <div className="space-y-12">
              {years.map(year => (
                <div key={year} className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-700">{year}</h3>
                  
                  {/* Monthly Badges Grid */}
                  <div className="grid grid-cols-3 gap-y-8 gap-x-2">
                    {groupedBadges[year].monthly.map((badge, index) => {
                      if (!badge && year === 2022 && index < 6) return null; // Skip first 6 months of 2022
                      if (!badge) {
                        const month = new Date(year, index).toLocaleString('default', { month: 'short' });
                        return (
                          <div key={`empty-${year}-${index}`} className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center opacity-30">
                              <span className="text-4xl">❔</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">{month}</p>
                          </div>
                        );
                      }
                      return (
                        <div key={badge.id} className="flex flex-col items-center">
                          <div className={`w-32 h-32 rounded-full ${badge.isEarned ? 'bg-gray-50' : 'bg-gray-100 opacity-30'} flex items-center justify-center shadow-sm`}>
                            <span className="text-4xl">{badge.icon}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{badge.name}</p>
                        </div>
                      );
                    })}
                  </div>

                  {/* Achievements Section */}
                  {groupedBadges[year].achievements.length > 0 && (
                    <div className="mt-8">
                      <h4 className="text-md font-medium text-gray-600 mb-4">Achievements</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {groupedBadges[year].achievements.map(badge => (
                          <div
                            key={badge.id}
                            className={`p-4 rounded-lg ${
                              badge.isEarned ? 'bg-gray-50' : 'bg-gray-100 opacity-50'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm">
                                <span className="text-2xl">{badge.icon}</span>
                              </div>
                              <div>
                                <p className="font-medium">{badge.name}</p>
                                <p className="text-sm text-gray-600">{badge.description}</p>
                                {badge.isEarned && (
                                  <p className="text-xs text-gray-500 mt-1">
                                    Earned {new Date(badge.earnedDate).toLocaleDateString('en-US', { month: 'long' })}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          {/* Avatar */}
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={avatarUrl}
              alt={`${username}'s avatar`}
              fill
              className="rounded-full object-cover"
            />
          </div>

          {/* User Info */}
          <h1 className="text-2xl font-bold">{username}</h1>
          <p className="text-gray-600 mb-2">@{userTag}</p>
          <p className="text-sm text-gray-500 mb-6">Joined {dateJoined}</p>

          {/* Stats Row: Following, Followers, Main Language */}
          <div className="flex gap-8 mb-8 flex-wrap justify-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <span className="text-2xl">{mainCourse.flag}</span>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold">{mainCourse.name}</p>
                  <p className="text-sm text-gray-600">{mainCourse.level}</p>
                </div>
                {additionalCoursesCount > 0 && (
                  <span className="ml-2 text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    +{Math.min(additionalCoursesCount, 9)}
                  </span>
                )}
              </div>
            </button>

            <div className="flex items-center gap-2">
              <FaUserFriends className="text-gray-600" />
              <div>
                <p className="font-semibold">{followingCount}</p>
                <p className="text-sm text-gray-600">Following</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <FaUsers className="text-gray-600" />
              <div>
                <p className="font-semibold">{followerCount}</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
            </div>
          </div>

          {/* Overview Section */}
          <div className="w-full mb-8">
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Streak */}
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <FaFire className="text-orange-500 text-xl mb-2" />
                <p className="font-bold text-2xl">{streak}</p>
                <p className="text-sm text-gray-600">Day Streak</p>
              </div>
              {/* Total XP */}
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <FaStar className="text-yellow-500 text-xl mb-2" />
                <p className="font-bold text-2xl">{totalXP.toLocaleString()}</p>
                <p className="text-sm text-gray-600">Total XP</p>
              </div>
              {/* Current League */}
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <FaTrophy className={`text-xl mb-2 ${leagueColors[currentLeague.name]}`} />
                <p className="font-bold text-2xl capitalize">{currentLeague.name}</p>
                <p className="text-sm text-gray-600">League</p>
              </div>
              {/* Top 3 Finishes */}
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col items-center">
                <FaMedal className="text-yellow-600 text-xl mb-2" />
                <p className="font-bold text-2xl">{topThreeFinishes}</p>
                <p className="text-sm text-gray-600">Top 3 Finishes</p>
              </div>
            </div>
          </div>

          {/* Monthly Badges Section - More Visual */}
          <div className="w-full mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Monthly Badges</h2>
              <button
                onClick={() => setIsBadgesModalOpen(true)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                View All
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {monthlyBadges.map(badge => (
                <div 
                  key={badge.id} 
                  className="aspect-square bg-gray-50 rounded-lg flex flex-col items-center justify-center p-4 hover:bg-gray-100 transition-colors"
                  title={badge.description}
                >
                  <span className="text-4xl mb-2">{badge.icon}</span>
                  <p className="font-medium text-center text-sm">
                    {new Date(badge.earnedDate).toLocaleDateString('en-US', { month: 'short' })}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Section */}
          <div className="w-full mb-8">
            <h2 className="text-xl font-semibold mb-4">Achievements</h2>
            <div className="grid grid-cols-1 gap-4">
              {achievements.map(badge => (
                <div key={badge.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-sm">
                      <span className="text-2xl">{badge.icon}</span>
                    </div>
                    <div>
                      <p className="font-medium">{badge.name}</p>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        Earned {new Date(badge.earnedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 