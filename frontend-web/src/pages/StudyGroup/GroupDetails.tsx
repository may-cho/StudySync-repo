import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Calendar,
  MessageCircle,
  Share2,
  Heart,
  Reply,
  BookOpen,
  Clock,
  Star,
  Award,
  TrendingUp,
  Sparkles,
  ChevronRight,
  Pin,
  Image,
  Link as LinkIcon,
  Smile,
  Bell,
  CheckCircle,
  Flame,
  UserPlus,
  Target,
  Zap,
  Crown,
  Shield,
  Play,
  Plus,
} from "lucide-react";

const GroupDetails = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("feed");
  const [newPost, setNewPost] = useState("");
  const [isJoined, setIsJoined] = useState(true);

  // Mock Data
  const group = {
    id: 1,
    name: "Machine Learning Masters",
    description:
      "A community for ML enthusiasts. We discuss deep learning, share resources, and help each other grow.",
    memberCount: 1247,
    onlineNow: 89,
    yourContribution: 24,
    yourStreak: 12,
    joinedDate: "Feb 15, 2024",
    nextSession: "Today, 2:00 PM",
    display_tags: ["Deep Learning", "Python", "PyTorch", "NLP"],
  };

  const feed = [
    {
      id: 1,
      author: "Dr. Sarah Chen",
      authorRole: "admin",
      avatar: "SC",
      time: "2 hours ago",
      content:
        "🎉 Great session today! Here are the resources we discussed about transformers. Keep learning!",
      likes: 89,
      comments: 24,
      userLiked: false,
      pinned: true,
    },
    {
      id: 2,
      author: "Alex Thompson",
      authorRole: "member",
      avatar: "AT",
      time: "5 hours ago",
      content:
        "Just finished my first transformer implementation! It's finally clicking. Thanks everyone for the help! 🙌",
      likes: 45,
      comments: 12,
      userLiked: true,
    },
    {
      id: 3,
      author: "Maria Garcia",
      authorRole: "member",
      avatar: "MG",
      time: "Yesterday",
      content:
        "Sharing my notes from the paper reading session. Hope this helps someone! 📝",
      likes: 67,
      comments: 18,
      userLiked: false,
    },
  ];

  const topContributors = [
    { name: "Dr. Sarah Chen", role: "admin", contributions: 156, avatar: "SC" },
    { name: "Alex Thompson", role: "member", contributions: 89, avatar: "AT" },
    { name: "Maria Garcia", role: "member", contributions: 67, avatar: "MG" },
    { name: "James Wilson", role: "member", contributions: 54, avatar: "JW" },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Paper Reading: Attention Is All You Need",
      time: "Today, 2:00 PM",
      attendees: 34,
    },
    {
      id: 2,
      title: "Code Review Session",
      time: "Tomorrow, 4:00 PM",
      attendees: 18,
    },
    {
      id: 3,
      title: "Guest Lecture: LLMs",
      time: "Fri, 10:00 AM",
      attendees: 56,
    },
  ];

  const recentMembers = [
    { name: "Emily Davis", joined: "2 hours ago", avatar: "ED" },
    { name: "Kevin Zhang", joined: "5 hours ago", avatar: "KZ" },
    { name: "Rachel Green", joined: "Yesterday", avatar: "RG" },
  ];

  const popularResources = [
    { title: "Attention Is All You Need Paper", type: "pdf", downloads: 234 },
    {
      title: "Transformer Implementation Guide",
      type: "notebook",
      downloads: 156,
    },
    { title: "PyTorch Tutorial Series", type: "video", downloads: 98 },
  ];

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    console.log("Create post:", newPost);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-main to-brand-primary/3">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-bg-main/80 backdrop-blur-xl border-b border-tx-main/5">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/study-groups")}
              className="flex items-center gap-2 text-sm text-tx-muted hover:text-tx-main transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Groups
            </button>
            <div className="flex items-center gap-2">
              <button className="p-2 rounded-lg text-tx-muted hover:bg-tx-main/5 transition-colors">
                <Bell size={18} />
              </button>
              <button className="p-2 rounded-lg text-tx-muted hover:bg-tx-main/5 transition-colors">
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-brand-primary/15 via-brand-accent/8 to-transparent" />

        <div className="px-6 pb-4">
          <div className="flex items-end justify-between -mt-8 mb-4">
            <div className="flex items-end gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-brand-primary to-brand-accent flex items-center justify-center shadow-lg ring-4 ring-bg-card">
                <span className="text-2xl font-bold text-white">ML</span>
              </div>
              <div className="pb-1">
                <h1 className="text-xl font-semibold text-tx-main">
                  {group.name}
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-tx-muted">
                    {group.memberCount} members
                  </span>
                  <span className="w-1 h-1 rounded-full bg-tx-muted/30" />
                  <span className="text-xs text-tx-muted">
                    {group.onlineNow} online now
                  </span>
                </div>
              </div>
            </div>
            {!isJoined ? (
              <button className="px-4 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-medium hover:bg-brand-primary/90 transition-all">
                Join Group
              </button>
            ) : (
              <button className="px-4 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 text-xs font-medium flex items-center gap-1">
                <CheckCircle size={12} />
                Joined
              </button>
            )}
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-6 px-6 border-b border-tx-main/5">
          {["feed", "sessions", "resources", "progress"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-xs font-medium transition-all capitalize ${
                activeTab === tab
                  ? "text-brand-primary border-b-2 border-brand-primary"
                  : "text-tx-muted hover:text-tx-main"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="px-6 py-6">
        <div className="flex gap-6 max-w-7xl mx-auto">
          {/* LEFT SIDEBAR - About & Quick Info */}
          <div className="hidden lg:block w-64 flex-shrink-0 space-y-4">
            {/* Group Info Card */}
            <div className="bg-bg-card rounded-xl border border-tx-main/8 p-4">
              <h3 className="text-xs font-semibold text-tx-muted uppercase tracking-wide mb-3">
                About
              </h3>
              <p className="text-xs text-tx-muted/70 leading-relaxed">
                {group.description}
              </p>
              <div className="mt-3 pt-3 border-t border-tx-main/5">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-tx-muted">Created</span>
                  <span className="text-tx-main">{group.joinedDate}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-tx-muted">Language</span>
                  <span className="text-tx-main">English</span>
                </div>
              </div>
            </div>

            {/* Your Progress Card */}
            <div className="bg-gradient-to-br from-brand-primary/5 to-brand-accent/5 rounded-xl border border-brand-primary/10 p-4">
              <h3 className="text-xs font-semibold text-tx-muted uppercase tracking-wide mb-3">
                Your Progress
              </h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-tx-muted">Study Streak</span>
                <span className="text-sm font-semibold text-brand-primary">
                  {group.yourStreak} days
                </span>
              </div>
              <div className="w-full h-1 bg-tx-main/8 rounded-full mb-3">
                <div
                  className="h-full bg-brand-primary rounded-full"
                  style={{ width: `${(group.yourStreak / 30) * 100}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-tx-muted">Contributions</span>
                <span className="text-tx-main font-medium">
                  {group.yourContribution}
                </span>
              </div>
              <button className="w-full mt-3 py-1.5 rounded-lg bg-brand-primary/10 text-brand-primary text-xs font-medium hover:bg-brand-primary/20 transition-all">
                View Dashboard →
              </button>
            </div>

            {/* Topics */}
            <div className="bg-bg-card rounded-xl border border-tx-main/8 p-4">
              <h3 className="text-xs font-semibold text-tx-muted uppercase tracking-wide mb-3">
                Topics
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {group.display_tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full bg-tx-main/5 text-tx-muted text-[10px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* MAIN FEED - Center Column */}
          <div className="flex-1 min-w-0">
            {activeTab === "feed" && (
              <div className="space-y-4 max-w-2xl mx-auto lg:mx-0">
                {/* Create Post */}
                {isJoined && (
                  <div className="bg-bg-card rounded-xl border border-tx-main/8 p-4">
                    <textarea
                      placeholder="Share something with the group..."
                      value={newPost}
                      onChange={(e) => setNewPost(e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 rounded-lg bg-bg-main border border-tx-main/8 text-tx-main placeholder:text-tx-muted/40 focus:outline-none focus:border-brand-primary/30 transition-all text-sm resize-none"
                    />
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 rounded-lg text-tx-muted/50 hover:text-brand-primary transition-colors">
                          <Image size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg text-tx-muted/50 hover:text-brand-primary transition-colors">
                          <LinkIcon size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg text-tx-muted/50 hover:text-brand-primary transition-colors">
                          <Smile size={14} />
                        </button>
                      </div>
                      <button
                        onClick={handleCreatePost}
                        disabled={!newPost.trim()}
                        className="px-3 py-1 rounded-lg bg-brand-primary text-white text-xs font-medium hover:bg-brand-primary/90 transition-all disabled:opacity-50"
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}

                {/* Feed Posts */}
                {feed.map((post) => (
                  <div
                    key={post.id}
                    className="bg-bg-card rounded-xl border border-tx-main/8 p-4"
                  >
                    {post.pinned && (
                      <div className="flex items-center gap-1 mb-2 text-[9px] text-amber-500">
                        <Pin size={9} />
                        <span>Pinned</span>
                      </div>
                    )}
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-medium text-brand-primary">
                          {post.avatar}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-medium text-tx-main">
                            {post.author}
                          </span>
                          {post.authorRole === "admin" && (
                            <span className="text-[9px] text-amber-500 bg-amber-500/10 px-1.5 py-0.5 rounded-full">
                              Admin
                            </span>
                          )}
                          <span className="text-[10px] text-tx-muted/50">
                            {post.time}
                          </span>
                        </div>
                        <p className="text-sm text-tx-muted/70 mt-1 leading-relaxed">
                          {post.content}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 pt-2 mt-2 border-t border-tx-main/5">
                      <button className="flex items-center gap-1 text-xs text-tx-muted/50 hover:text-red-500 transition-colors">
                        <Heart size={12} />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-xs text-tx-muted/50 hover:text-brand-primary transition-colors">
                        <MessageCircle size={12} />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1 text-xs text-tx-muted/50 hover:text-brand-primary transition-colors">
                        <Reply size={12} />
                        Reply
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Other tabs content (simplified for brevity) */}
            {activeTab !== "feed" && (
              <div className="max-w-2xl mx-auto lg:mx-0">
                <div className="bg-bg-card rounded-xl border border-tx-main/8 p-8 text-center">
                  <p className="text-sm text-tx-muted">
                    {activeTab} content goes here
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR - Events, Contributors, Resources */}
          <div className="hidden lg:block w-72 flex-shrink-0 space-y-4">
            {/* Upcoming Events */}
            <div className="bg-bg-card rounded-xl border border-tx-main/8 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-tx-muted uppercase tracking-wide">
                  Upcoming
                </h3>
                <Calendar size={12} className="text-tx-muted/50" />
              </div>
              <div className="space-y-3">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="pb-2 border-b border-tx-main/5 last:border-0"
                  >
                    <p className="text-xs font-medium text-tx-main">
                      {event.title}
                    </p>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-[10px] text-tx-muted/50">
                        {event.time}
                      </span>
                      <span className="text-[10px] text-tx-muted/40">
                        👥 {event.attendees}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-1.5 rounded-lg text-xs text-brand-primary hover:bg-brand-primary/10 transition-all">
                View all events →
              </button>
            </div>

            {/* Top Contributors */}
            <div className="bg-bg-card rounded-xl border border-tx-main/8 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-tx-muted uppercase tracking-wide">
                  Top Contributors
                </h3>
                <Crown size={12} className="text-amber-500" />
              </div>
              <div className="space-y-2">
                {topContributors.map((contributor, idx) => (
                  <div
                    key={contributor.name}
                    className="flex items-center gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <span className="text-[9px] font-medium text-brand-primary">
                        {contributor.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-tx-main">
                        {contributor.name}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      {idx === 0 && (
                        <Crown size={10} className="text-amber-500" />
                      )}
                      <span className="text-[9px] text-tx-muted/50">
                        {contributor.contributions}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Popular Resources */}
            <div className="bg-bg-card rounded-xl border border-tx-main/8 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-tx-muted uppercase tracking-wide">
                  Popular Resources
                </h3>
                <BookOpen size={12} className="text-tx-muted/50" />
              </div>
              <div className="space-y-2">
                {popularResources.map((resource) => (
                  <div key={resource.title} className="flex items-center gap-2">
                    {resource.type === "pdf" && (
                      <BookOpen size={12} className="text-brand-primary" />
                    )}
                    {resource.type === "notebook" && (
                      <Sparkles size={12} className="text-brand-primary" />
                    )}
                    {resource.type === "video" && (
                      <Play size={12} className="text-brand-primary" />
                    )}
                    <div className="flex-1">
                      <p className="text-xs text-tx-main truncate">
                        {resource.title}
                      </p>
                    </div>
                    <span className="text-[9px] text-tx-muted/40">
                      {resource.downloads}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-1.5 rounded-lg text-xs text-brand-primary hover:bg-brand-primary/10 transition-all">
                Browse resources →
              </button>
            </div>

            {/* Recent Members */}
            <div className="bg-bg-card rounded-xl border border-tx-main/8 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-semibold text-tx-muted uppercase tracking-wide">
                  Newest Members
                </h3>
                <UserPlus size={12} className="text-tx-muted/50" />
              </div>
              <div className="space-y-2">
                {recentMembers.map((member) => (
                  <div key={member.name} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center">
                      <span className="text-[9px] font-medium text-brand-primary">
                        {member.avatar}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-tx-main">{member.name}</p>
                    </div>
                    <span className="text-[9px] text-tx-muted/40">
                      {member.joined}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
