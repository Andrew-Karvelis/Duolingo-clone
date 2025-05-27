import Profile from '@/components/Profile';
import { type LeagueName } from '@/components/Profile';

// Generate badges from July 2022 to December 2025
const generateBadges = () => {
  const badges = [];
  const startDate = new Date(2022, 6); // July 2022
  const endDate = new Date(2025, 11); // December 2025
  const currentDate = new Date();

  const achievementTypes = [
    { name: 'Speed Demon', icon: '⚡', description: 'Complete 10 lessons in under 2 minutes each' },
    { name: 'Weekend Warrior', icon: '⚔️', description: 'Practice for 8 hours on weekends' },
    { name: 'Polyglot', icon: '🗣️', description: 'Study 3 different languages in one month' },
    { name: 'Grammar Guru', icon: '📚', description: 'Score 100% on 20 grammar exercises' },
    { name: 'League Champion', icon: '👑', description: 'Finish #1 in your league' },
    { name: 'Global Citizen', icon: '🌍', description: 'Practice with learners from 10 countries' },
    { name: 'Conversation Master', icon: '💬', description: 'Complete 50 speaking exercises' },
    { name: 'Writing Expert', icon: '✍️', description: 'Score perfectly in 30 writing challenges' },
    { name: 'Listening Pro', icon: '🎧', description: 'Complete 100 listening exercises' },
    { name: 'Helpful Hero', icon: '🦸', description: 'Help 100 other learners' },
    { name: 'Quiz Whiz', icon: '🎯', description: 'Score 100% in 20 unit tests' },
    { name: 'Streak Legend', icon: '🏆', description: 'Maintain a 100-day streak' }
  ];

  const monthlyBadgeTypes = [
    { name: 'January', icon: '❄️' },
    { name: 'February', icon: '💝' },
    { name: 'March', icon: '🌪️' },
    { name: 'April', icon: '🌧️' },
    { name: 'May', icon: '🌸' },
    { name: 'June', icon: '☀️' },
    { name: 'July', icon: '🔥' },
    { name: 'August', icon: '🌊' },
    { name: 'September', icon: '🍁' },
    { name: 'October', icon: '🎃' },
    { name: 'November', icon: '🦃' },
    { name: 'December', icon: '🎁' }
  ];

  // Generate monthly badges for each year
  for (let year = 2022; year <= 2025; year++) {
    const startMonth = year === 2022 ? 6 : 0; // Start from July for 2022
    const endMonth = 11;

    for (let month = startMonth; month <= endMonth; month++) {
      const date = new Date(year, month);
      const monthlyBadge = monthlyBadgeTypes[month];
      
      badges.push({
        id: `monthly-${year}-${month + 1}`,
        name: monthlyBadge.name,
        icon: monthlyBadge.icon,
        earnedDate: date.toISOString(),
        isEarned: date <= currentDate && Math.random() > 0.3,
        type: 'monthly' as const
      });
    }
  }

  // Add achievements separately to avoid mixing with monthly badges
  for (let date = new Date(startDate); date <= endDate; date.setMonth(date.getMonth() + 1)) {
    if (Math.random() < 0.2) { // 20% chance for an achievement each month
      const achievement = achievementTypes[Math.floor(Math.random() * achievementTypes.length)];
      badges.push({
        id: `achievement-${date.getFullYear()}-${date.getMonth() + 1}-${achievement.name}`,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        earnedDate: date.toISOString(),
        isEarned: date <= currentDate && Math.random() > 0.3,
        type: 'achievement' as const
      });
    }
  }

  return badges;
};

export default function ProfilePage() {
  const dummyData = {
    username: 'Sarah Johnson',
    userTag: 'sarahj_learns',
    avatarUrl: 'https://i.pravatar.cc/300',
    dateJoined: 'January 2024',
    courses: [
      {
        name: 'Spanish',
        flag: '🇪🇸',
        level: 'Intermediate'
      },
      {
        name: 'Japanese',
        flag: '🇯🇵',
        level: 'Beginner'
      },
      {
        name: 'French',
        flag: '🇫🇷',
        level: 'Advanced'
      }
    ],
    followingCount: 245,
    followerCount: 189,
    streak: 42,
    totalXP: 15420,
    currentLeague: {
      name: 'diamond' as LeagueName,
      color: 'blue-500'
    },
    topThreeFinishes: 8,
    badges: generateBadges()
  };

  return (
    <main className="min-h-screen bg-gray-100 py-12">
      <Profile {...dummyData} />
    </main>
  );
} 