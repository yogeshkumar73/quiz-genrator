import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { 
  Users, 
  BarChart3, 
  Search, 
  Filter, 
  ArrowUpDown,
  LogOut,
  Target,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { GlassContainer } from '../../shared/components/GlassContainer';
import { Button } from '../../shared/components/Button';
import { Input } from '../../shared/components/Input';
import { useUserStore } from '../../store/useUserStore';
import { useScoringStore } from '../../store/useScoringStore';
import { storage } from '../../services/storage';
import { UserStats } from '../../types';

export const AdminDashboard: React.FC = () => {
  const { userStats, loadStats } = useScoringStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof UserStats>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadStats();
  }, []);

  const users = Object.entries(userStats).map(([username, stats]) => {
    const s = stats as UserStats;
    return {
      username,
      score: s.score,
      tier: s.tier,
      totalClicks: s.totalClicks,
      pageViews: s.pageViews,
      sessionTimeMinutes: s.sessionTimeMinutes
    };
  });

  const filteredUsers = users
    .filter(u => u.username.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
    });

  const aggregateStats = {
    totalUsers: users.length,
    avgScore: Math.round(users.reduce((acc, u) => acc + u.score, 0) / (users.length || 1)),
    totalActivities: users.reduce((acc, u) => acc + u.totalClicks + u.pageViews, 0),
    topUser: filteredUsers[0]?.username || 'N/A'
  };

  const handleSort = (field: keyof UserStats) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 space-y-10">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center text-blue-500 border border-blue-500/20">
            <LayoutDashboard className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Admin Neural Panel</h1>
            <p className="text-sm text-gray-500">Real-time cross-user analytics</p>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" icon={LogOut}>Main View</Button>
          <Button variant="secondary" icon={Zap}>System Reset</Button>
        </div>
      </header>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <MiniStatsCard label="Total Entities" value={aggregateStats.totalUsers} icon={Users} color="blue" />
        <MiniStatsCard label="Avg Score" value={aggregateStats.avgScore} icon={Target} color="emerald" />
        <MiniStatsCard label="Global Actions" value={aggregateStats.totalActivities} icon={Zap} color="amber" />
        <MiniStatsCard label="Lead Entity" value={aggregateStats.topUser} icon={BarChart3} color="purple" />
      </div>

      {/* Main Table Area */}
      <GlassContainer className="overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-2">
          <h2 className="text-xl font-bold flex items-center gap-2">
            User Matrix
            <span className="text-xs bg-white/5 border border-white/10 px-2 py-1 rounded-full text-blue-400">{filteredUsers.length}</span>
          </h2>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-grow md:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-4 h-4" />
              <input 
                placeholder="Search entities..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 focus:outline-none focus:border-blue-500 transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" icon={Filter} className="hidden md:flex">Filters</Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-500 text-xs font-bold uppercase tracking-widest px-4">
                <th className="pb-4 pl-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('username' as any)}>User Name</th>
                <th className="pb-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('score')}>Score <ArrowUpDown className="inline w-3 h-3 ml-1" /></th>
                <th className="pb-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('tier')}>Tier <ArrowUpDown className="inline w-3 h-3 ml-1" /></th>
                <th className="pb-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('totalClicks')}>Clicks</th>
                <th className="pb-4 cursor-pointer hover:text-white transition-colors" onClick={() => handleSort('sessionTimeMinutes')}>Session</th>
                <th className="pb-4 text-right pr-4">Matrix Pulse</th>
              </tr>
            </thead>
            <tbody className="space-y-4">
              {filteredUsers.map((user, idx) => (
                <motion.tr
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={user.username}
                  className="bg-white/[0.03] hover:bg-white/5 transition-colors group"
                >
                  <td className="py-4 pl-4 rounded-l-2xl font-bold text-gray-200">@{user.username}</td>
                  <td className="py-4">
                    <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full text-sm font-bold border border-blue-500/20">
                      {user.score}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className={`
                      text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-block border
                      ${user.tier === 'VIP' ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' : 
                        user.tier === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-gray-500/10 text-gray-400 border-gray-500/20'}
                    `}>
                      {user.tier}
                    </div>
                  </td>
                  <td className="py-4 text-gray-400">{user.totalClicks} clicks</td>
                  <td className="py-4 text-gray-400">{user.sessionTimeMinutes} min</td>
                  <td className="py-4 pr-4 rounded-r-2xl text-right">
                    <Button variant="outline" className="px-3 py-1 text-xs h-8">Inspect</Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="text-center py-20 text-gray-600">
               <Users className="w-12 h-12 mx-auto mb-4 opacity-20" />
               <p className="font-medium tracking-wide">NO ENTITIES DETECTED IN THE MATRIX</p>
            </div>
          )}
        </div>
      </GlassContainer>
    </div>
  );
};

const MiniStatsCard: React.FC<{ label: string, value: any, icon: any, color: string }> = ({ label, value, icon: Icon, color }) => {
  const colors: any = {
    blue: "text-blue-500 bg-blue-500/10",
    emerald: "text-emerald-500 bg-emerald-500/10",
    amber: "text-amber-500 bg-amber-500/10",
    purple: "text-purple-500 bg-purple-500/10"
  };

  return (
    <GlassContainer className="p-4 rounded-2xl flex items-center gap-4">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${colors[color]}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </GlassContainer>
  );
};
