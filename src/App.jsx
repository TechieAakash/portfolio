import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, Code2, Zap, TrendingUp, Github, Linkedin, Mail, ExternalLink, Calendar, Clock, Award, Target } from 'lucide-react';

const PortfolioDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [metrics, setMetrics] = useState({ projects: 0, commits: 0, stars: 0, contributions: 0 });
  const [selectedProject, setSelectedProject] = useState(null);
  const [timeRange, setTimeRange] = useState('month');

  // Animate metrics on mount
  useEffect(() => {
    const targets = { projects: 4, commits: 87, stars: 2, contributions: 87 };
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setMetrics({
        projects: Math.floor(targets.projects * easeOut),
        commits: Math.floor(targets.commits * easeOut),
        stars: Math.floor(targets.stars * easeOut),
        contributions: Math.floor(targets.contributions * easeOut)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const projects = [
    {
      id: 1,
      name: 'ALRIS',
      category: 'Data Intelligence',
      status: 'Completed',
      progress: 100,
      tech: ['Python', 'Flask', 'ML', 'MySQL'],
      stars: 0,
      color: 'from-purple-500 to-pink-500',
      description: 'Aadhaar Linked Regional Intelligence System - ML-powered platform for UIDAI to assess service gaps and optimize resource allocation',
      github: 'https://github.com/TechieAakash/Aadhaar-Linked-Regional-Intelligence-System',
      demo: 'https://aadhaar-linked-regional-intelligence-tlpw.onrender.com'
    },
    {
      id: 2,
      name: 'Smart Parking System',
      category: 'Full Stack',
      status: 'Completed',
      progress: 100,
      tech: ['Node.js', 'Express', 'MySQL', 'Sequelize'],
      stars: 0,
      color: 'from-blue-500 to-cyan-500',
      description: 'Full-stack parking management with real-time tracking, violation auto-detection, and contractor limit enforcement for smart cities',
      github: 'https://github.com/TechieAakash/SmartParking-Project',
      demo: 'https://smartparking-project-2.onrender.com'
    },
    {
      id: 3,
      name: 'Recipe Finder App',
      category: 'Web Development',
      status: 'Completed',
      progress: 100,
      tech: ['Flask', 'JavaScript', 'MySQL'],
      stars: 0,
      color: 'from-green-500 to-emerald-500',
      description: 'Modern web app for discovering 20+ Indian recipes with real-time search, responsive design, and beautiful UI animations',
      github: 'https://github.com/TechieAakash/recipeFinderApp',
      demo: null
    },
    {
      id: 4,
      name: 'Currency Converter',
      category: 'Web App',
      status: 'Completed',
      progress: 100,
      tech: ['HTML', 'CSS', 'JavaScript'],
      stars: 0,
      color: 'from-orange-500 to-red-500',
      description: 'Simple and elegant currency converter with real-time exchange rates and clean user interface',
      github: 'https://github.com/TechieAakash/My-first-project',
      demo: null
    }
  ];

  const skills = [
    { name: 'HTML/CSS', level: 90, category: 'Frontend' },
    { name: 'JavaScript', level: 85, category: 'Frontend' },
    { name: 'React', level: 80, category: 'Frontend' },
    { name: 'Node.js/Express', level: 85, category: 'Backend' },
    { name: 'Python/Flask', level: 82, category: 'Backend' },
    { name: 'MySQL', level: 80, category: 'Database' },
    { name: 'Java', level: 75, category: 'Language' },
    { name: 'C++/DSA', level: 78, category: 'Language' }
  ];

  // All activity data (full year)
  const allActivityData = useMemo(() => {
    // Realistic activity data based on actual GitHub contributions (87 total)
    // Account created: Nov 2024, Active for ~3 months
    return [
      { month: 'Jan', commits: 28, pullRequests: 6 },   // ALRIS project (Jan 2026)
      { month: 'Feb', commits: 0, pullRequests: 0 },    // Future month
      { month: 'Mar', commits: 0, pullRequests: 0 },    // Future month
      { month: 'Apr', commits: 0, pullRequests: 0 },    // Future month
      { month: 'May', commits: 0, pullRequests: 0 },    // Future month
      { month: 'Jun', commits: 0, pullRequests: 0 },    // Future month
      { month: 'Jul', commits: 0, pullRequests: 0 },    // Not yet active
      { month: 'Aug', commits: 0, pullRequests: 0 },    // Not yet active
      { month: 'Sep', commits: 0, pullRequests: 0 },    // Not yet active
      { month: 'Oct', commits: 0, pullRequests: 0 },    // Not yet active
      { month: 'Nov', commits: 22, pullRequests: 5 },   // Account created, Recipe Finder
      { month: 'Dec', commits: 37, pullRequests: 8 }    // Smart Parking System, most active
    ];
  }, []);

  // Filter activity data based on timeRange and only show active months
  const activityData = useMemo(() => {
    let filtered = [];

    if (timeRange === 'week') {
      // Last week - show only current month (Jan)
      filtered = allActivityData.filter(d => d.month === 'Jan');
    } else if (timeRange === 'month') {
      // Last month - show Dec and Jan
      filtered = allActivityData.filter(d => d.month === 'Dec' || d.month === 'Jan');
    } else {
      // Last year - show only months with activity (Nov, Dec, Jan)
      filtered = allActivityData.filter(d => d.commits > 0 || d.pullRequests > 0);
    }

    return filtered;
  }, [timeRange, allActivityData]);

  const StatCard = ({ icon: Icon, label, value, trend, color }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {trend && (
          <span className="text-sm font-semibold text-green-500 flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            {trend}%
          </span>
        )}
      </div>
      <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-800">{value.toLocaleString()}</p>
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div
      onClick={() => setSelectedProject(project)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 hover:border-blue-200"
    >
      <div className={`h-2 bg-gradient-to-r ${project.color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">{project.name}</h3>
            <p className="text-sm text-gray-500">{project.category}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Active' ? 'bg-green-100 text-green-700' :
            project.status === 'Completed' ? 'bg-blue-100 text-blue-700' :
              'bg-yellow-100 text-yellow-700'
            }`}>
            {project.status}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-4">{project.description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 mb-1">
            <span>Progress</span>
            <span className="font-semibold">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${project.color} transition-all duration-1000 ease-out`}
              style={{ width: `${project.progress}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {project.tech.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-gray-600">
            <Award className="w-4 h-4" />
            <span className="text-sm font-semibold">{project.stars}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const SkillBar = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-sm font-semibold text-gray-700">{skill.name}</span>
          <span className="ml-2 text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{skill.category}</span>
        </div>
        <span className="text-sm font-bold text-gray-800">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000 ease-out rounded-full"
          style={{ width: `${skill.level}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0">
                  <img
                    src="/profile.jpg"
                    alt="Aakash Yadav"
                    className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-blue-100 hover:ring-blue-300 transition-all duration-300 hover:scale-105"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-1">Aakash Yadav</h1>
                  <p className="text-gray-600">Aspiring Software Engineer | Tech Enthusiast</p>
                  <div className="flex gap-3 mt-2">
                    <a href="https://github.com/TechieAakash" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/aakash-yadav-33a135332" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:aakash3121733@gmail.com" className="text-gray-600 hover:text-blue-500 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                {['overview', 'projects', 'skills'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 ${activeTab === tab
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Code2}
                label="Active Projects"
                value={metrics.projects}
                trend={12}
                color="from-blue-500 to-cyan-500"
              />
              <StatCard
                icon={Zap}
                label="Total Commits"
                value={metrics.commits}
                trend={8}
                color="from-purple-500 to-pink-500"
              />
              <StatCard
                icon={Award}
                label="GitHub Stars"
                value={metrics.stars}
                trend={24}
                color="from-green-500 to-emerald-500"
              />
              <StatCard
                icon={Target}
                label="Contributions"
                value={metrics.contributions}
                trend={15}
                color="from-orange-500 to-red-500"
              />
            </div>

            {/* About Me Section */}
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                About Me
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    Hi, I'm <span className="font-semibold text-gray-900">Aakash Yadav</span> — A passionate tech enthusiast
                    currently pursuing my degree at <span className="font-semibold text-blue-600">Netaji Subhas University of Technology</span> (formerly NSIT),
                    Dwarka. I love building user-friendly applications that solve real-world problems.
                  </p>
                  <p className="text-gray-700 leading-relaxed">
                    My journey in software development has led me to work on diverse projects ranging from
                    <span className="font-semibold"> ML-powered data intelligence systems</span> to
                    <span className="font-semibold"> full-stack web applications</span>. I'm constantly learning and
                    exploring new technologies to enhance my skillset.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-lg text-sm font-medium border border-blue-200">
                      💻 Full-Stack Developer
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-50 to-purple-100 text-purple-700 rounded-lg text-sm font-medium border border-purple-200">
                      🤖 ML Enthusiast
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 text-green-700 rounded-lg text-sm font-medium border border-green-200">
                      🚀 Problem Solver
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-5 border border-blue-100">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="text-lg">🎯</span>
                      Current Focus
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">▸</span>
                        <span>Mastering advanced web technologies and frameworks</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">▸</span>
                        <span>Building ML-powered applications for social impact</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">▸</span>
                        <span>Improving data structures & algorithms proficiency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">▸</span>
                        <span>Contributing to open-source projects</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-5 border border-orange-100">
                    <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                      <span className="text-lg">⚡</span>
                      Quick Facts
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <span className="font-semibold">📍 Location:</span> Dwarka, Delhi
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-semibold">🎓 Education:</span> NSUT (formerly NSIT)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-semibold">💼 Status:</span> Aspiring Software Engineer
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-semibold">📧 Email:</span> aakash3121733@gmail.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">Activity Overview</h2>
                  <p className="text-xs text-gray-500 mt-1">
                    {timeRange === 'week' && 'Showing: January 2026'}
                    {timeRange === 'month' && 'Showing: December 2025 - January 2026'}
                    {timeRange === 'year' && 'Showing: November 2024 - January 2026 (Active months only)'}
                  </p>
                </div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white hover:border-blue-400 transition-colors"
                >
                  <option value="week">This Month (Jan)</option>
                  <option value="month">Last 2 Months</option>
                  <option value="year">All Activity</option>
                </select>
              </div>

              {/* Summary Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                  <p className="text-xs text-blue-600 font-semibold mb-1">Total Contributions</p>
                  <p className="text-2xl font-bold text-blue-700">87</p>
                  <p className="text-xs text-blue-500 mt-1">Since Nov 2024</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                  <p className="text-xs text-purple-600 font-semibold mb-1">Repositories</p>
                  <p className="text-2xl font-bold text-purple-700">4</p>
                  <p className="text-xs text-purple-500 mt-1">All public projects</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                  <p className="text-xs text-green-600 font-semibold mb-1">Active Months</p>
                  <p className="text-2xl font-bold text-green-700">3</p>
                  <p className="text-xs text-green-500 mt-1">Nov, Dec, Jan</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 border border-orange-200">
                  <p className="text-xs text-orange-600 font-semibold mb-1">GitHub Stars</p>
                  <p className="text-2xl font-bold text-orange-700">2</p>
                  <p className="text-xs text-orange-500 mt-1">Received on projects</p>
                </div>
              </div>

              {/* Horizontal Chart */}
              <div className="space-y-6">
                {activityData.map((data, idx) => {
                  const maxVal = Math.max(
                    ...allActivityData.map((d) => Math.max(d.commits, d.pullRequests))
                  );
                  const commitWidth = Math.max(5, (data.commits / maxVal) * 100);
                  const prWidth = Math.max(5, (data.pullRequests / maxVal) * 100);

                  return (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-gray-700 w-12">{data.month}</span>
                        <div className="flex-1 ml-4 space-y-2">
                          {/* Commits Bar */}
                          <div className="relative flex items-center group">
                            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${commitWidth}%` }}
                              />
                            </div>
                            <span className="ml-4 text-xs font-semibold text-blue-600 min-w-[70px]">
                              {data.commits} commits
                            </span>
                          </div>
                          {/* PRs Bar */}
                          <div className="relative flex items-center group">
                            <div className="flex-1 bg-gray-100 rounded-full h-4 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${prWidth}%` }}
                              />
                            </div>
                            <span className="ml-4 text-xs font-semibold text-purple-600 min-w-[70px]">
                              {data.pullRequests} PRs
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-300 rounded" />
                  <span className="text-sm text-gray-600">Commits</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-purple-500 to-purple-300 rounded" />
                  <span className="text-sm text-gray-600">Pull Requests</span>
                </div>
              </div>

              {/* Activity Insights */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Activity Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-xs font-semibold text-blue-700">Most Active Month</p>
                    </div>
                    <p className="text-lg font-bold text-blue-900">December 2025</p>
                    <p className="text-xs text-blue-600 mt-1">37 commits • Smart Parking System</p>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <p className="text-xs font-semibold text-purple-700">Peak PR Activity</p>
                    </div>
                    <p className="text-lg font-bold text-purple-900">3 Months</p>
                    <p className="text-xs text-purple-600 mt-1">Since Nov 2024 • Growing fast</p>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-xs font-semibold text-green-700">Consistency Score</p>
                    </div>
                    <p className="text-lg font-bold text-green-900">100%</p>
                    <p className="text-xs text-green-600 mt-1">Active every month since signup</p>
                  </div>
                </div>

                <div className="mt-4 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg p-4 border border-gray-200">
                  <p className="text-xs text-gray-600 mb-2">
                    <span className="font-semibold text-gray-800">Development Highlights:</span>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">
                      🎯 Nov 2024: Account Created
                    </span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">
                      🍳 Nov: Recipe Finder App (22 commits)
                    </span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">
                      🚗 Dec: Smart Parking System (37 commits)
                    </span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">
                      🚀 Jan 2026: ALRIS Project (28 commits)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Projects Preview */}
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.slice(0, 3).map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">All Projects</h2>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  Filter
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                  New Project
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(project => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Technical Skills</h2>
              {skills.map((skill, idx) => (
                <SkillBar key={idx} skill={skill} />
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Skill Distribution</h2>
              <div className="space-y-4">
                {['Frontend', 'Backend', 'DevOps', 'Database'].map((category, idx) => {
                  const categorySkills = skills.filter(s => s.category === category);
                  const avgLevel = categorySkills.reduce((acc, s) => acc + s.level, 0) / categorySkills.length;
                  const colors = ['from-blue-500 to-cyan-500', 'from-green-500 to-emerald-500', 'from-purple-500 to-pink-500', 'from-orange-500 to-red-500'];

                  return (
                    <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-semibold text-gray-700">{category}</h3>
                        <span className="text-2xl font-bold text-gray-800">{Math.round(avgLevel)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${colors[idx]} transition-all duration-1000`}
                          style={{ width: `${avgLevel}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-2">{categorySkills.length} skills</p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <h3 className="font-semibold text-gray-800 mb-2">Learning Path</h3>
                <p className="text-sm text-gray-600 mb-3">Currently focusing on advanced cloud architecture and AI/ML integration</p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-white text-blue-600 text-xs rounded-full font-medium border border-blue-200">Kubernetes</span>
                  <span className="px-3 py-1 bg-white text-purple-600 text-xs rounded-full font-medium border border-purple-200">LangChain</span>
                  <span className="px-3 py-1 bg-white text-green-600 text-xs rounded-full font-medium border border-green-200">Rust</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Project Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{selectedProject.name}</h2>
                  <p className="text-gray-600">{selectedProject.category}</p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className={`h-3 bg-gradient-to-r ${selectedProject.color} rounded-full mb-6`} />

              <p className="text-gray-700 mb-6">{selectedProject.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Status</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedProject.status}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Progress</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedProject.progress}%</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Stars</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedProject.stars}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Tech Stack</p>
                  <p className="text-lg font-semibold text-gray-800">{selectedProject.tech.length}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-3">Technologies Used</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tech.map((tech, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 text-gray-700 text-sm rounded-lg font-medium border border-blue-100">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                {selectedProject.github && (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    View on GitHub
                  </a>
                )}
                {selectedProject.demo && (
                  <a
                    href={selectedProject.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-semibold hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioDashboard;
