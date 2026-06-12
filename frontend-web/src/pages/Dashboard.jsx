import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Clock,
  CheckSquare,
  Users,
  ChevronRight,
  MessageSquare,
  Target,
  Play,
  Flame,
  BookOpen,
  Activity,
  Layers,
  HelpCircle,
} from "lucide-react";
import RoomCard from "../components/RoomCard";

// Move tracking matrices outside component scope to freeze unnecessary re-computation loops
const INITIAL_CONTRIBUTION_DATA = (() => {
  const weeks = 20;
  const data = [];
  for (let week = 0; week < weeks; week++) {
    for (let day = 0; day < 7; day++) {
      let intensity;
      if (day === 5 || day === 6) {
        intensity = Math.random() > 0.6 ? Math.floor(Math.random() * 3) : 0;
      } else {
        intensity = Math.random() > 0.3 ? Math.floor(Math.random() * 4) : 0;
      }
      data.push({ week, day, intensity, value: intensity * 2 });
    }
  }
  return data;
})();

const MOTIVATIONAL_QUOTES = [
  "Small daily improvements lead to massive results",
  "The only way to do great work is to love what you do",
  "Progress over perfection",
  "Stay curious, keep learning",
];

const Dashboard = () => {
  const navigate = useNavigate();
  const currentStreak = 12;
  const totalHours = 24.5;
  const totalTasks = 12;
  const completedCount = 8;

  // Safe State Preservation
  const [contributionData] = useState(INITIAL_CONTRIBUTION_DATA);
  const [motivationalQuote] = useState(
    () =>
      MOTIVATIONAL_QUOTES[
        Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
      ],
  );

  const totalContributions = useMemo(() => {
    return contributionData.filter((d) => d.intensity > 0).length;
  }, [contributionData]);

  // Mock Ecosystem Data
  const activeRooms = [
    {
      id: 1,
      name: "ML Study Group",
      members: 8,
      is_live: true,
      topic: "Transformers Deep Dive",
    },
    {
      id: 2,
      name: "Web Dev Circle",
      members: 5,
      is_live: true,
      topic: "React 19 Features",
    },
    {
      id: 3,
      name: "Data Science Hub",
      members: 12,
      is_live: true,
      topic: "Pandas Workshop",
    },
    {
      id: 4,
      name: "Open Source Night",
      members: 6,
      is_live: true,
      topic: "First PR",
    },
  ];

  const joinedGroups = [
    { id: 1, name: "Machine Learning Masters", members: 1247, avatar: "🤖" },
    { id: 2, name: "Web Developers United", members: 834, avatar: "💻" },
    { id: 3, name: "Open Source Contributors", members: 562, avatar: "🐙" },
  ];

  const focusTasks = [
    {
      id: 1,
      title: "Complete transformer assignment",
      due: "Today",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Review pull request #234",
      due: "Today",
      priority: "high",
      completed: false,
    },
    {
      id: 3,
      title: "Prepare weekly presentation",
      due: "Tomorrow",
      priority: "medium",
      completed: false,
    },
    {
      id: 4,
      title: "Update documentation",
      due: "This week",
      priority: "low",
      completed: false,
    },
  ];

  const feedUpdates = [
    {
      id: 1,
      group: "ML Masters",
      author: "Dr. Sarah Chen",
      content: "Shared a new paper on transformers",
      time: "15m ago",
      type: "resource",
    },
    {
      id: 2,
      group: "Web Dev United",
      author: "Alex Thompson",
      content: "Started discussion: React Server Components",
      time: "1h ago",
      type: "discussion",
    },
    {
      id: 3,
      group: "Data Science Hub",
      author: "Maria Garcia",
      content: "Posted a helpful Pandas tutorial",
      time: "3h ago",
      type: "resource",
    },
    {
      id: 4,
      group: "ML Masters",
      author: "James Wilson",
      content: "Asked about attention mechanisms",
      time: "5h ago",
      type: "question",
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getIntensityColor = (intensity) => {
    if (intensity === 0) return "bg-tx-main/[0.04]";
    if (intensity === 1) return "bg-brand-primary/20";
    if (intensity === 2) return "bg-brand-primary/40";
    if (intensity === 3) return "bg-brand-primary/60";
    return "bg-brand-primary";
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-bg-main antialiased selection:bg-brand-primary/20">
      {/* CENTRAL BENTO CANVAS */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* TOP HEADER SECTION */}
          <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-tx-main/[0.03]">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-2xl font-light tracking-tight text-tx-main">
                  {getGreeting()}, Yuki.
                </h1>
                <span className="text-lg animate-pulse">✨</span>
              </div>
              <p className="text-xs text-tx-muted/60 mt-1 max-w-md italic font-mono">
                "{motivationalQuote}"
              </p>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-center">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/5 border border-amber-500/10 text-[11px] font-bold text-amber-600 dark:text-amber-400 font-mono tracking-wider">
                <Flame size={12} className="fill-current" />
                <span>{currentStreak} DAY STREAK</span>
              </div>
              <button className="relative p-2 rounded-full border border-tx-main/5 hover:bg-tx-main/5 transition-all">
                <Bell size={14} className="text-tx-muted" />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </header>

          {/* MAIN ASYMMETRICAL MULTI-GRID FRAMEWORK */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* COLUMN LAYOUT COMBINATION: Spans 2 Sections Wide */}
            <div className="lg:col-span-2 space-y-6">
              <div className="lg:h-[45vh] lg:min-h-[450px] flex flex-col justify-between space-y-6">
                {/* BLOCK 1: LIVE WORKSPACES CONTAINER */}
                <section className="bg-bg-card rounded-xl border border-tx-main/[0.04] p-5 space-y-4 flex flex-col flex-1 min-h-0 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                      </span>
                      <h2 className="text-xs font-bold text-tx-muted/80 uppercase tracking-wider">
                        Live Workspaces
                      </h2>
                      <span className="text-[10px] font-mono font-medium text-tx-muted/40 bg-tx-main/5 px-2 py-0.5 rounded-full">
                        {activeRooms.length} ACTIVE
                      </span>
                    </div>
                    <button className="text-xs font-medium text-tx-muted/40 hover:text-brand-primary transition-colors">
                      View all rooms
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {activeRooms.slice(0, 4).map((room) => (
                      <RoomCard
                        key={room.id}
                        room={room}
                        onJoin={() =>
                          console.log(`Connecting room: ${room.id}`)
                        }
                      />
                    ))}
                  </div>
                </section>

                {/* BLOCK 3: INTENTIONAL METRICS HORIZONTAL SPLIT */}
                <section
                  className="grid grid-cols-1 sm:grid-cols-3 gap-4"
                  aria-label="Aggregated Metrics"
                >
                  {[
                    {
                      icon: <Clock size={14} />,
                      value: `${totalHours.toFixed(1)}h`,
                      label: "Study hours",
                      sub: "+12% vs last week",
                    },
                    {
                      icon: <CheckSquare size={14} />,
                      value: `${completedCount}/${totalTasks}`,
                      label: "Tasks done",
                      sub: `${Math.round((completedCount / totalTasks) * 100)}% completion`,
                    },
                    {
                      icon: <Users size={14} />,
                      value: "8",
                      label: "Active peers",
                      sub: "3 in your spaces",
                    },
                  ].map((stat, idx) => (
                    <div
                      key={idx}
                      className="bg-bg-card rounded-xl border border-tx-main/[0.04] p-4 flex flex-col justify-between"
                    >
                      <div className="flex items-center gap-2 text-tx-muted/60">
                        {stat.icon}
                        <span className="text-[10px] font-bold text-tx-muted uppercase tracking-wider">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-2xl font-semibold text-tx-main tracking-tight mt-2">
                        {stat.value}
                      </p>
                      <p className="text-[10px] text-tx-muted/40 font-mono mt-1.5">
                        {stat.sub}
                      </p>
                    </div>
                  ))}
                </section>
              </div>

              {/* BLOCK 4: REFINED GROUP ACTIVITY AGGREGATOR */}
              <section className="bg-bg-card rounded-2xl border border-tx-main/[0.04] p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <MessageSquare size={15} className="text-brand-primary" />
                    <h2 className="text-sm font-bold tracking-widest text-tx-muted uppercase">
                      Group Activity Updates
                    </h2>
                  </div>
                  <button className="text-xs font-semibold tracking-wide text-tx-muted/50 hover:text-brand-primary transition-colors">
                    View full history
                  </button>
                </div>

                <div className="divide-y divide-tx-main/[0.03] border border-tx-main/5 rounded-xl overflow-hidden bg-tx-main/[0.01]">
                  {feedUpdates.slice(0, 4).map((update) => (
                    <div
                      key={update.id}
                      className="flex items-start gap-4 p-4 hover:bg-tx-main/[0.02] transition-all"
                    >
                      <div className="w-9 h-9 rounded-xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center flex-shrink-0 text-brand-primary">
                        {update.type === "resource" ? (
                          <BookOpen size={14} />
                        ) : (
                          <HelpCircle size={14} />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-3 flex-wrap">
                          <p className="text-sm font-semibold text-tx-main truncate">
                            {update.author}{" "}
                            <span className="text-tx-muted/40 font-normal">
                              in
                            </span>{" "}
                            <span className="text-brand-primary/90 font-medium">
                              {update.group}
                            </span>
                          </p>
                          <span className="text-xs font-mono text-tx-muted/40 flex-shrink-0">
                            {update.time}
                          </span>
                        </div>
                        <p className="text-sm font-normal leading-relaxed text-tx-muted/80 mt-1.5">
                          {update.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* RIGHT SIDE VERTICAL TRACK BAR COLUMN */}
            <div className="space-y-6">
              {/* BLOCK 2: TODAY'S FOCUS WITH PRESERVED HEIGHT */}
              <section className="bg-bg-card rounded-2xl border border-tx-main/[0.04] p-6 flex flex-col justify-between lg:min-h-[450px] lg:h-[45vh]">
                <div className="space-y-5 overflow-hidden flex flex-col">
                  <div className="flex items-center justify-between flex-shrink-0">
                    <div className="flex items-center gap-2.5">
                      <Target size={15} className="text-brand-primary" />
                      <h3 className="text-sm font-bold tracking-widest text-tx-muted uppercase">
                        Today's Focus
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-semibold text-tx-muted/50 bg-tx-main/5 px-2.5 py-0.5 rounded-full">
                      {focusTasks.filter((t) => !t.completed).length} REMAINING
                    </span>
                  </div>

                  <div className="flex-1 space-y-2.5 overflow-y-auto pr-1 scrollbar-thin">
                    {focusTasks.map((task) => (
                      <div
                        key={task.id}
                        className="group flex items-start gap-3.5 p-2.5 rounded-xl hover:bg-tx-main/[0.03] transition-all"
                      >
                        <input
                          type="checkbox"
                          checked={task.completed}
                          readOnly
                          className="mt-1 w-4 h-4 rounded border-tx-main/20 text-brand-primary focus:ring-0 bg-transparent cursor-pointer"
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm font-medium truncate ${task.completed ? "line-through text-tx-muted/40" : "text-tx-main group-hover:text-brand-primary transition-colors"}`}
                          >
                            {task.title}
                          </p>
                          <p className="text-xs font-mono text-tx-muted/40 mt-1">
                            Due {task.due}
                          </p>
                        </div>
                        {task.priority === "high" && !task.completed && (
                          <span className="text-[10px] font-mono font-bold text-red-500/60 uppercase tracking-wider self-center bg-red-500/5 px-1.5 py-0.5 rounded">
                            CRIT
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate("/tasks")}
                  className="w-full mt-4 pt-4 text-center text-xs font-bold tracking-wider uppercase text-tx-muted/50 hover:text-brand-primary border-t border-tx-main/[0.04] transition-all flex-shrink-0"
                >
                  Manage focus agenda →
                </button>
              </section>

              {/* BLOCK 5: SPACE EXPLORATOR SHORTCUTS CARD */}
              <section className="bg-bg-card rounded-2xl border border-tx-main/[0.04] p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Layers size={15} className="text-brand-primary" />
                    <h3 className="text-sm font-bold tracking-widest text-tx-muted uppercase">
                      Your Spaces
                    </h3>
                  </div>
                  <button
                    onClick={() => navigate("/study-groups")}
                    className="text-xs font-semibold tracking-wide text-tx-muted/50 hover:text-brand-primary transition-colors"
                  >
                    Explore spaces
                  </button>
                </div>

                <div className="space-y-2">
                  {joinedGroups.map((group) => (
                    <div
                      key={group.id}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-tx-main/[0.03] transition-all cursor-pointer group"
                      onClick={() => navigate(`/groups/${group.id}`)}
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <span className="text-xl flex-shrink-0">
                          {group.avatar}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-tx-main truncate">
                            {group.name}
                          </p>
                          <p className="text-xs font-mono text-tx-muted/40 mt-0.5">
                            {group.members} students joined
                          </p>
                        </div>
                      </div>
                      <ChevronRight
                        size={15}
                        className="text-tx-muted/30 group-hover:text-tx-main group-hover:translate-x-0.5 transition-all"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* FIXED SIDE PROFILE GRAPH PANEL */}
      <aside className="w-80 flex-shrink-0 bg-bg-card border-l border-tx-main/[0.04] flex flex-col overflow-y-auto font-sans">
        {/* IDENTITY BLOCK WITH QUICK PRESENCE CONTROL */}
        <div className="px-6 py-6 border-b border-tx-main/[0.03] space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-accent/10 flex items-center justify-center font-bold text-sm text-brand-primary shadow-sm">
              YM
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-tx-main tracking-tight truncate">
                Yuki M.
              </h2>
              <p className="text-xs font-mono text-tx-muted/60 mt-0.5 tracking-wide">
                Full-stack Developer
              </p>
            </div>
          </div>

          {/* NEW DETAILED PRESENCE ACTION SELECTOR */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-tx-main/[0.02] border border-tx-main/5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-xs font-medium text-tx-main">
                Focus Mode Active
              </span>
            </div>
            <button className="text-[11px] font-mono font-bold text-brand-primary uppercase tracking-wider hover:underline">
              Change
            </button>
          </div>
        </div>

        {/* VELOCITY METRICS (GIT PROGRESS TRACKER) */}
        <div className="px-6 py-5 border-b border-tx-main/[0.03] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Activity size={14} className="text-tx-muted/50" />
              <h3 className="text-xs font-bold text-tx-muted/60 uppercase tracking-widest">
                Velocity Metrics
              </h3>
            </div>
          </div>

          {/* Contribution Graph Frame */}
          <div className="overflow-x-auto pb-1 scrollbar-none">
            <div className="grid grid-flow-col grid-rows-7 gap-1 auto-cols-max">
              {contributionData.map((cell, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-[3px] ${getIntensityColor(cell.intensity)} transition-all hover:scale-110 cursor-help`}
                  title={`${cell.value} tracker points mapped`}
                />
              ))}
            </div>
          </div>

          {/* Legend Labels Scaled to Clean 11px Legibility */}
          <div className="flex items-center justify-between pt-0.5 text-[11px] font-mono text-tx-muted/50">
            <div className="flex items-center gap-1.5">
              <span>Less</span>
              <div className="flex gap-0.5">
                {[0, 1, 2, 3, 4].map((v) => (
                  <div
                    key={v}
                    className={`w-1.5 h-1.5 rounded-[1px] ${getIntensityColor(v)}`}
                  />
                ))}
              </div>
              <span>More</span>
            </div>
            <span>{totalContributions} blocks hit</span>
          </div>
        </div>

        {/* DYNAMIC METRIC ACCELERATOR: WEEK PROGRESS GOAL */}
        <div className="px-6 py-5 border-b border-tx-main/[0.03] space-y-3">
          <div className="flex justify-between items-baseline text-xs font-mono tracking-wide">
            <span className="text-tx-muted/70 font-medium">
              WEEK PROGRESS GOAL
            </span>
            <div className="text-right">
              <span className="text-tx-main font-bold text-sm">24.5</span>
              <span className="text-tx-muted/40 font-normal"> / 30h</span>
            </div>
          </div>
          <div className="w-full h-2 bg-tx-main/[0.05] rounded-full overflow-hidden">
            <div className="w-[82%] h-full bg-brand-primary rounded-full transition-all duration-500" />
          </div>
          {/* NEW PREDICTIVE TARGET ASSELERATOR STATEMENT */}
          <p className="text-[11px] text-tx-muted/50 leading-normal font-normal">
            🎯 On track! You need{" "}
            <span className="font-mono font-medium text-tx-main">
              5.5 hours
            </span>{" "}
            to hit your weekly baseline milestone.
          </p>
        </div>

        {/* STUDY FOCUS ALLOCATION */}
        <div className="px-6 py-5 border-b border-tx-main/[0.03] space-y-4">
          <h3 className="text-xs font-bold text-tx-muted/60 uppercase tracking-widest">
            Study Focus Allocation
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Machine Learning",
                hours: "24.5h",
                color: "bg-brand-primary",
              },
              {
                label: "Web Development",
                hours: "18.2h",
                color: "bg-brand-accent",
              },
              {
                label: "Data Science",
                hours: "10.8h",
                color: "bg-emerald-500",
              },
            ].map((focus, index) => (
              <div
                key={index}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 ${focus.color}`}
                  />
                  <span className="text-tx-muted truncate font-medium">
                    {focus.label}
                  </span>
                </div>
                <span className="text-xs font-mono font-semibold text-tx-main">
                  {focus.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* REAL-TIME SYNC PRESENCE STACK */}
        <div className="px-6 py-5 mt-auto bg-tx-main/[0.01] border-t border-tx-main/[0.02]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-tx-muted/60 uppercase tracking-widest">
              Online Presence
            </h3>
            <span className="text-xs font-mono text-green-500 font-semibold tracking-wide">
              ● 2 ACTIVE
            </span>
          </div>
          <div className="space-y-2.5">
            {[
              { name: "Alex Chen", task: "Deep Work", code: "AC" },
              { name: "Sarah Kim", task: "Pair Programming", code: "SK" },
            ].map((peer, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3 rounded-xl border border-tx-main/[0.03] bg-bg-card shadow-sm group"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-tx-main/5 flex items-center justify-center text-xs font-bold text-tx-muted">
                    {peer.code}
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-green-500 ring-2 ring-bg-card" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-tx-main truncate group-hover:text-brand-primary transition-colors">
                    {peer.name}
                  </p>
                  <p className="text-xs font-mono text-tx-muted/50 truncate mt-0.5">
                    {peer.task}
                  </p>
                </div>
                <Play
                  size={11}
                  className="text-tx-muted/30 group-hover:text-brand-primary transition-all flex-shrink-0"
                />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Dashboard;
