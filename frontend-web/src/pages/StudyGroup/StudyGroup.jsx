import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Users,
  Calendar,
  ChevronRight,
  Flame,
  Plus,
  MessageCircle,
  BookOpen,
  Clock,
  UserPlus,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Compass,
  Target,
  Zap,
  GraduationCap,
  Layers,
  Activity,
} from "lucide-react";
import api from "../../api";
import GroupCard from "./GroupCard";
import MyGroupCard from "./MyGroupCard";

const StudyGroups = () => {
  const navigate = useNavigate();
  const [discoverSearchQuery, setDiscoverSearchQuery] = useState("");
  const [myGroupsSearchQuery, setMyGroupsSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [hoveredId, setHoveredId] = useState(null);
  const [groups, setGroups] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [activeTab, setActiveTab] = useState("discover");
  const [loading, setLoading] = useState(true);
  const [isContentVisible, setIsContentVisible] = useState(true);

  const categories = ["all", "trending", "most active", "recent"];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [groupsRes, joinedRes] = await Promise.all([
          api.get("/groups"),
          api.get("/groups/my-groups"),
        ]);

        console.log("Joined Groups:", joinedRes.data);

        setGroups(groupsRes.data);
        setJoinedGroups(joinedRes.data);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredJoinedGroups = joinedGroups.filter((group) => {
    return (
      group.name.toLowerCase().includes(myGroupsSearchQuery.toLowerCase()) ||
      group.description
        ?.toLowerCase()
        .includes(myGroupsSearchQuery.toLowerCase())
    );
  });

  const displayGroups = discoverSearchQuery.trim() ? searchResults : [];

  const handleSearch = useCallback(async () => {
    try {
      const res = await api.get(`groups/search?query=${discoverSearchQuery}`);
      setSearchResults(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  }, [discoverSearchQuery]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (discoverSearchQuery.trim()) {
        handleSearch();
      } else {
        setSearchResults([]);
      }
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [discoverSearchQuery, handleSearch]);

  const handleJoinGroup = async (id) => {
    try {
      await api.post(`groups/${id}/apply/`);
      const joinedRes = await api.get("/groups/my-groups");
      setJoinedGroups(joinedRes.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const handleLeaveGroup = async (id) => {
    try {
      await api.post(`groups/${id}/leave/`);
      const joinedRes = await api.get("/groups/my-groups");
      setJoinedGroups(joinedRes.data);
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  const handleTabChange = (tab) => {
    // Animate content out
    setIsContentVisible(false);

    // Change tab after animation
    setTimeout(() => {
      setActiveTab(tab);
      // Animate content back in
      setTimeout(() => {
        setIsContentVisible(true);
      }, 50);
    }, 150);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-2 border-brand-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-tx-muted">Loading your study space...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-main via-bg-main to-brand-primary/3">
      {/* Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-brand-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-brand-accent/3 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <div className="px-8 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          {/* Tabs - Left side */}
          <div className="flex gap-1 bg-tx-main/5 rounded-xl p-1 h-10">
            <button
              onClick={() => handleTabChange("discover")}
              className={`px-5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === "discover"
                  ? "bg-bg-card text-brand-primary shadow-sm"
                  : "text-tx-muted hover:text-tx-main"
              }`}
            >
              <Compass size={14} />
              Discover
            </button>
            <button
              onClick={() => handleTabChange("joined")}
              className={`px-5 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === "joined"
                  ? "bg-bg-card text-brand-primary shadow-sm"
                  : "text-tx-muted hover:text-tx-main"
              }`}
            >
              <GraduationCap size={14} />
              My Groups
              {joinedGroups.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-[10px] font-medium bg-brand-primary/10 text-brand-primary rounded-full">
                  {joinedGroups.length}
                </span>
              )}
            </button>
          </div>

          {/* Create Button - Right side with same height */}
          <button
            onClick={() => navigate("/create-study-group")}
            className="px-5 h-10 rounded-lg text-sm font-medium transition-all flex items-center gap-2 bg-brand-primary text-white shadow-sm hover:bg-brand-primary/90"
          >
            <Plus size={14} />
            Create Group
          </button>
        </div>
        {/* Animated Content Container - Welcome + Search + Results */}
        <div
          className={`transition-all duration-200 ease-out ${
            isContentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-3"
          }`}
        >
          {/* Discover Tab */}
          {activeTab === "discover" && (
            <>
              {/* Welcome Section */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-tx-main tracking-tight">
                  Find your community
                </h2>
                <p className="text-sm text-tx-muted mt-1">
                  Join groups that match your interests and start learning
                  together
                </p>
              </div>

              {/* Search Section */}
              <div className="bg-bg-card rounded-2xl border border-tx-main/5 p-4 mb-10">
                <div className="flex gap-3">
                  <div className="flex-1 relative">
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted/40"
                    />
                    <input
                      type="text"
                      placeholder="Search by name, topic, or interest..."
                      value={discoverSearchQuery}
                      onChange={(e) => setDiscoverSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-main border border-tx-main/8 text-tx-main placeholder:text-tx-muted/40 focus:outline-none focus:border-brand-primary/30 transition-all text-sm"
                    />
                  </div>
                  <button
                    onClick={() => setDiscoverSearchQuery("")}
                    className="px-4 py-2.5 rounded-xl text-tx-muted hover:text-tx-main transition-colors"
                  >
                    Clear
                  </button>
                </div>
                {discoverSearchQuery && (
                  <p className="text-xs text-tx-muted/50 mt-2">
                    {displayGroups.length} matching groups
                  </p>
                )}
              </div>

              {/* Results Count */}
              <div className="mb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity size={14} className="text-brand-primary" />
                    <span className="text-sm text-tx-muted">
                      <span className="font-medium text-tx-main">
                        {displayGroups.length}
                      </span>{" "}
                      groups available
                    </span>
                  </div>
                </div>
              </div>

              {/* Groups Grid - Using GroupCard for Discover */}
              {displayGroups.length === 0 ? (
                discoverSearchQuery ? (
                  // CASE 1: Search has no results
                  <div className="text-center py-16 bg-bg-card/30 rounded-2xl border border-dashed border-tx-main/10">
                    <div className="w-16 h-16 rounded-full bg-tx-main/5 flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-tx-muted/40" />
                    </div>
                    <h3 className="text-base font-medium text-tx-main mb-1">
                      No groups found
                    </h3>
                    <p className="text-sm text-tx-muted">
                      Try adjusting your search or browse all groups
                    </p>
                    <button
                      onClick={() => setDiscoverSearchQuery("")}
                      className="mt-4 px-4 py-2 rounded-xl bg-brand-primary/10 text-brand-primary text-sm font-medium hover:bg-brand-primary/20 transition-all"
                    >
                      Browse all groups
                    </button>
                  </div>
                ) : (
                  // CASE 2: No search query and no groups available (empty database)
                  <div className="text-center py-16 bg-bg-card/30 rounded-2xl border border-dashed border-tx-main/10">
                    <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                      <Search size={24} className="text-brand-primary/40" />
                    </div>
                    <h3 className="text-base font-medium text-tx-main mb-1">
                      Search for something
                    </h3>
                    <p className="text-sm text-tx-muted mb-4">
                      Try searching for a topic or interest to find your
                      community
                    </p>
                    <button
                      onClick={() => setDiscoverSearchQuery("")}
                      className="px-4 py-2 rounded-xl bg-brand-primary/10 text-brand-primary text-sm font-medium hover:bg-brand-primary/20 transition-all"
                    >
                      Browse all groups
                    </button>
                  </div>
                )
              ) : (
                // RESULTS FOUND - Show groups
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                  {displayGroups.map((group) => (
                    <GroupCard
                      key={group.id}
                      group={group}
                      hoveredId={hoveredId}
                      setHoveredId={setHoveredId}
                      handleJoinGroup={handleJoinGroup}
                    />
                  ))}
                </div>
              )}
            </>
          )}

          {/* My Groups Tab - Using MyGroupCard */}
          {activeTab === "joined" && (
            <>
              {joinedGroups.length === 0 ? (
                <div className="text-center py-16 bg-bg-card/30 rounded-2xl border border-dashed border-tx-main/10">
                  <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                    <GraduationCap size={24} className="text-brand-primary" />
                  </div>
                  <h3 className="text-base font-medium text-tx-main mb-1">
                    Start your journey
                  </h3>
                  <p className="text-sm text-tx-muted mb-4">
                    Join a group to begin learning together
                  </p>
                  <button
                    onClick={() => handleTabChange("discover")}
                    className="px-4 py-2 rounded-xl bg-brand-primary text-white text-sm font-medium hover:bg-brand-primary/90 transition-all"
                  >
                    Explore Groups
                  </button>
                </div>
              ) : (
                <>
                  {/* Search Section - My Groups */}
                  <div className="bg-bg-card rounded-2xl border border-tx-main/5 p-4 mb-8">
                    <div className="flex gap-3">
                      <div className="flex-1 relative">
                        <Search
                          size={18}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-tx-muted/40"
                        />
                        <input
                          type="text"
                          placeholder="Search your groups..."
                          value={myGroupsSearchQuery}
                          onChange={(e) =>
                            setMyGroupsSearchQuery(e.target.value)
                          }
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-bg-main border border-tx-main/8 text-tx-main placeholder:text-tx-muted/40 focus:outline-none focus:border-brand-primary/30 transition-all text-sm"
                        />
                      </div>
                      <button
                        onClick={() => setMyGroupsSearchQuery("")}
                        className="px-4 py-2.5 rounded-xl text-tx-muted hover:text-tx-main transition-colors"
                      >
                        Clear
                      </button>
                    </div>
                    {myGroupsSearchQuery && (
                      <p className="text-xs text-tx-muted/50 mt-2">
                        {filteredJoinedGroups.length} matching groups
                      </p>
                    )}
                  </div>

                  {/* My Group Cards Grid */}
                  {filteredJoinedGroups.length === 0 && myGroupsSearchQuery ? (
                    <div className="text-center py-12">
                      <p className="text-sm text-tx-muted/50">
                        No groups match "{myGroupsSearchQuery}"
                      </p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {filteredJoinedGroups.map((group) => (
                        <MyGroupCard
                          key={group.id}
                          group={group}
                          hoveredId={hoveredId}
                          setHoveredId={setHoveredId}
                          handleViewGroup={(id) =>
                            navigate(`/study-groups/${id}`)
                          }
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyGroups;
