import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, 
  TrendingUp, 
  Clock, 
  MousePointer2, 
  Brain, 
  Sparkles,
  LogOut,
  ChevronRight,
  Activity
} from 'lucide-react';
import { GlassContainer } from '../../shared/components/GlassContainer';
import { Button } from '../../shared/components/Button';
import { generateInsights } from '../../services/gemini';
import { useUserStore } from '../../store/useUserStore';
import { useEventStore } from '../../store/useEventStore';
import { useScoringStore } from '../../store/useScoringStore';

export const UserDashboard: React.FC = () => {
  const username = useUserStore(state => state.username);
  const logout = useUserStore(state => state.logout);
  const { events, addEvent, loadEvents } = useEventStore();
  const { userStats, calculateScore, loadStats } = useScoringStore();
  
  const stats = username ? userStats[username] : null;
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);
  const [aiInsight, setAiInsight] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      loadEvents();
      loadStats();
      addEvent(username, 'VIEW', '/dashboard');
    }
  }, [username]);

  useEffect(() => {
    if (username && events.length > 0) {
      calculateScore(username, events);
    }
  }, [events, username]);

  const handleAction = () => {
    if (username) {
      addEvent(username, 'ACTION', '/dashboard', { details: 'Manual Action' });
    }
  };

  const handleLogout = () => {
    if (username) {
      addEvent(username, 'SESSION', '/logout', { details: 'Session End' });
      logout();
    }
  };

  const generateAIInsights = async () => {
    if (!username || !stats) return;
    setIsGeneratingAI(true);
    try {
      const insight = await generateInsights(username, stats, events);
      setAiInsight(insight);
    } catch (err) {
      console.error(err);
      setAiInsight("Your engagement patterns suggest high productivity and focused intent. Keep exploring!");
    } finally {
      setIsGeneratingAI(false);
    }
  };

  if (!stats || !username) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 space-y-8 bg-gradient-to-br from-blue-900/5 via-black to-purple-900/5">
      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="text-xs font-bold text-blue-500 uppercase tracking-widest flex items-center gap-2">
            <Activity className="w-4 h-4" />
            User Ecosystem
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">Welcome back, <span className="text-blue-400">{username}</span></h1>
        </div>
        <div className="flex items-center gap-4">
           <Button variant="outline" icon={LogOut} onClick={handleLogout}>Logout</Button>
           <Button variant="secondary" icon={Trophy}>Join League</Button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          label="Current Score" 
          value={stats.score} 
          icon={TrendingUp} 
          trend="+12% this week" 
          color="blue"
        />
        <StatsCard 
          label="User Tier" 
          value={stats.tier} 
          icon={Trophy} 
          trend="Dynamic Tiering" 
          color="purple"
        />
        <StatsCard 
          label="Total Clicks" 
          value={stats.totalClicks} 
          icon={MousePointer2} 
          trend="Real-time tracking" 
          color="emerald"
        />
        <StatsCard 
          label="Session Time" 
          value={`${stats.sessionTimeMinutes}m`} 
          icon={Clock} 
          trend="Estimated activity" 
          color="amber"
        />
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: Activity & Interactive */}
        <div className="lg:col-span-2 space-y-8">
          <GlassContainer>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">Activity Hub</h2>
              <Button onClick={handleAction} variant="secondary" icon={Sparkles}>Perform Action (+5)</Button>
            </div>
            
            <div className="space-y-4">
              {events.filter(e => e.userId === username).slice(-5).reverse().map((event, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={event.id}
                  className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                      {event.eventType === 'CLICK' ? <MousePointer2 className="w-5 h-5" /> : <Activity className="w-5 h-5" />}
                    </div>
                    <div>
                      <div className="font-bold text-gray-200">{event.eventType}</div>
                      <div className="text-xs text-gray-500">{new Date(event.timestamp).toLocaleTimeString()}</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-blue-400">{event.page}</div>
                </motion.div>
              ))}
            </div>
          </GlassContainer>
        </div>

        {/* Right Side: AI Insights */}
        <div className="space-y-8">
          <GlassContainer className="h-full flex flex-col">
            <div className="flex items-center gap-3 mb-6 text-purple-400">
              <Brain className="w-6 h-6" />
              <h2 className="text-xl font-bold">AI Neuro-Insights</h2>
            </div>
            
            <div className="flex-grow flex flex-col justify-center text-center space-y-6">
              <AnimatePresence mode="wait">
                {aiInsight ? (
                  <motion.div
                    key="insight"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-6 bg-purple-500/5 border border-purple-500/20 rounded-3xl"
                  >
                    <p className="text-lg text-gray-200 italic leading-relaxed">
                      "{aiInsight}"
                    </p>
                  </motion.div>
                ) : (
                  <motion.div key="placeholder">
                    <p className="text-gray-500 mb-6">Connect to Gemini neural network to generate behavioral insights.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button 
                onClick={generateAIInsights} 
                loading={isGeneratingAI}
                variant={aiInsight ? 'outline' : 'secondary'}
                icon={Sparkles}
                className="w-full"
              >
                {aiInsight ? 'Refresh Insights' : 'Initialize AI Analysis'}
              </Button>
            </div>
            
            {stats.score > 100 && (
              <div className="mt-8 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
                  <Trophy className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <span className="font-bold text-emerald-400">VIP Perk:</span> You’ve unlocked premium dashboard themes!
                </div>
              </div>
            )}
          </GlassContainer>
        </div>
      </div>
    </div>
  );
};

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: any;
  trend: string;
  color: 'blue' | 'purple' | 'emerald' | 'amber';
}

const StatsCard: React.FC<StatsCardProps> = ({ label, value, icon: Icon, trend, color }) => {
  const colors = {
    blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
    purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
    emerald: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    amber: "text-amber-400 bg-amber-500/10 border-amber-500/20"
  };

  return (
    <GlassContainer className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div className="space-y-1">
        <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</div>
        <div className="text-4xl font-bold tracking-tight">{value}</div>
        <div className="flex items-center gap-1 text-xs font-semibold text-gray-400 pt-2">
          {trend}
        </div>
      </div>
    </GlassContainer>
  );
};
