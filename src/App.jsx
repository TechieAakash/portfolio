import React, { useState, useEffect, useMemo } from 'react';
import { BarChart3, Code2, Zap, TrendingUp, Github, Linkedin, Mail, ExternalLink, Calendar, Clock, Award, Target, Sun, Moon, Filter, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PortfolioDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });
  const [metrics, setMetrics] = useState({ projects: 0, commits: 0, stars: 0, contributions: 0 });
  const [targetMetrics, setTargetMetrics] = useState({ projects: 3, commits: 145, stars: 0, contributions: 89 });
  const [leetcodeData, setLeetcodeData] = useState(null);

  // Theme toggle effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [timeRange, setTimeRange] = useState('month');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // Fetch actual GitHub data
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/TechieAakash');
        const data = await response.json();
        // We keep projects fixed at 3 as per user preference (the 3 main "alive" projects)
        // Only fetching repos to confirm connection, not using raw count for metrics
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      }
    };
    fetchGitHubData();

    const fetchLeetCodeData = async () => {
      try {
        const response = await fetch('https://leetcode-stats-api.herokuapp.com/Aakash_Yadav1213');
        const data = await response.json();
        if (data.status === 'success') {
          setLeetcodeData(data);
        }
      } catch (error) {
        console.error('Error fetching LeetCode data:', error);
      }
    };
    fetchLeetCodeData();
  }, []);

  // Animate metrics on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setMetrics({
        projects: Math.floor(targetMetrics.projects * easeOut),
        commits: Math.floor(targetMetrics.commits * easeOut),
        stars: Math.floor(targetMetrics.stars * easeOut),
        contributions: Math.floor(targetMetrics.contributions * easeOut)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [targetMetrics]); // Re-run only if target data changes

  const projects = [
    {
      id: 1,
      name: 'ALRIS',
      category: 'Data Intelligence',
      status: 'Completed',
      progress: 100,
      tech: ['Python', 'Flask', 'ML', 'MySQL'],
      stars: 4,
      color: 'from-purple-500 to-pink-500',
      description: 'Aadhaar Linked Regional Intelligence System - ML-powered platform for assessment.',
      challenge: 'Manual assessment of regional service delivery was fragmented, leading to significant intelligence gaps and inefficient resource distribution in UIDAI operations.',
      solution: 'Developed an ML-powered intelligence system using Python and Flask that aggregates regional data to visualize service delivery gaps and predict future capacity needs.',
      impact: 'Provided regional managers with actionable real-time insights, enabling a 25% improvement in resource allocation accuracy and better coverage for underserved areas.',
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
      stars: 5,
      color: 'from-blue-500 to-cyan-500',
      description: 'Full-stack parking management with real-time tracking and auto-detection.',
      challenge: 'Urban areas faced severe parking congestion with no centralized tracking, leading to contractor overruns and manual violation detection errors.',
      solution: 'Engineered a robust Node.js/Express backend with a MySQL database to track contractor limits in real-time and automate violation detection through smart business logic.',
      impact: 'Successfully managed city-wide contractor limits and reduced parking-related manual monitoring needs by 40%, creating a transparent ecosystem for city authorities.',
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
      description: 'Modern web app for discovering 20+ Indian recipes with search and animations.',
      challenge: 'Home cooks needed a quick, mobile-friendly way to find Indian recipes based on ingredients while maintaining a premium, distraction-free cooking environment.',
      solution: 'Built a lightweight, responsive web application using Flask for routing and advanced JavaScript for real-time filtering across a curated recipe database.',
      impact: 'Created a high-performance tool with zero latency and 100% mobile responsiveness, improving user retention for everyday culinary tasks.',
      github: 'https://github.com/TechieAakash/recipeFinderApp',
      demo: 'https://recipefinderapp-u8mg.onrender.com/'
    }
  ];

  const experience = [
    {
      year: '2024 - Present',
      title: 'Aspiring Software Engineer',
      organization: 'NSUT, Delhi',
      description: 'Pursuing B.Tech while building full-stack applications and exploring ML/AI.',
      type: 'education'
    },
    {
      year: 'Jan 2026',
      title: 'ALRIS Project Developer',
      organization: 'UIDAI Internal Project',
      description: 'Built an ML-powered intelligence system for service gap analysis.',
      type: 'project'
    },
    {
      year: 'Dec 2025',
      title: 'Full Stack Developer',
      organization: 'Smart Parking System',
      description: 'Developed a real-time parking management platform with violation detection.',
      type: 'project'
    },
    {
      year: 'Nov 2024',
      title: 'Web Developer',
      organization: 'Recipe Finder',
      description: 'Created a responsive culinary platform using modern JS and Flask.',
      type: 'project'
    }
  ];

  const categories = ['All', ...new Set(projects.map(p => p.category))];
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

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
      { month: 'Feb', commits: 10, pullRequests: 2 },   // Portfolio Optimization (Feb 2026)
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
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-100 dark:border-gray-700">
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
      <p className="text-gray-500 dark:text-gray-300 text-sm font-semibold mb-1">{label}</p>
      <p className="text-3xl font-bold text-gray-800 dark:text-white drop-shadow-sm">{value.toLocaleString()}</p>
    </div>
  );

  const ProjectCard = ({ project }) => (
    <div
      onClick={() => setSelectedProject(project)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
    >
      <div className={`h-2 bg-gradient-to-r ${project.color}`} />
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">{project.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{project.category}</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${project.status === 'Active' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' :
            project.status === 'Completed' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
              'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
            }`}>
            {project.status}
          </span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-500 mb-1">
            <span>Progress</span>
            <span className="font-semibold">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${project.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`h-full bg-gradient-to-r ${project.color}`}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {project.tech.slice(0, 3).map((tech, idx) => (
              <span key={idx} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-md font-medium">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <Award className="w-4 h-4" />
            <span className="text-sm font-semibold">{project.stars}</span>
          </div>
        </div>
      </div>
    </div>
  );

  const SkillBar = ({ skill }) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="mb-4"
    >
      <div className="flex justify-between items-center mb-2">
        <div>
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{skill.name}</span>
          <span className="ml-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded">{skill.category}</span>
        </div>
        <span className="text-sm font-bold text-gray-800 dark:text-white">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
        />
      </div>
    </motion.div>
  );

  const NotFoundView = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 text-center"
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 10, 0],
          y: [0, -20, 0]
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="text-9xl mb-8"
      >
        🛰️
      </motion.div>
      <h2 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">404: Lost in Code Space</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
        Oops! It looks like you've drifted into an undefined sector. Even the best developers get lost sometimes.
      </p>
      <button
        onClick={() => setActiveTab('overview')}
        className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/40 transition-all flex items-center gap-2"
      >
        <Zap className="w-5 h-5" />
        Back to Earth (Home)
      </button>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 flex-shrink-0">
                  <img
                    src="/profile.jpg"
                    alt="Aakash Yadav"
                    className="w-full h-full rounded-full object-cover shadow-lg ring-4 ring-blue-100 dark:ring-blue-900 hover:ring-blue-300 dark:hover:ring-blue-700 transition-all duration-300 hover:scale-105"
                  />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">Aakash Yadav</h1>
                  <p className="text-gray-600 dark:text-gray-300">Aspiring Software Engineer | Tech Enthusiast | Open Source Contributor</p>
                  <div className="flex gap-4 mt-3">
                    <a href="https://github.com/TechieAakash" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      <Github className="w-5 h-5" />
                    </a>
                    <a href="https://linkedin.com/in/aakash-yadav-33a135332" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a href="mailto:aakash3121733@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-4 w-full sm:w-auto">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 shadow-sm border border-gray-200 dark:border-gray-600"
                  aria-label="Toggle Theme"
                >
                  {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
                </button>
                <div className="flex gap-1 sm:gap-2 flex-wrap sm:flex-nowrap w-full sm:w-auto">
                  {['overview', 'projects', 'skills', 'contact'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 sm:flex-none px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg font-semibold text-sm sm:text-base transition-all duration-300 ${activeTab === tab
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
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
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                About Me
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    Hi, I'm <span className="font-semibold text-gray-900 dark:text-white">Aakash Yadav</span> — A tech enthusiast passionate about coding, debugging, and building user-friendly apps.
                    I'm currently pursuing my degree at <span className="font-semibold text-blue-600 dark:text-blue-400">Netaji Subhas University of Technology</span> (formerly NSIT), Dwarka.
                  </p>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    My journey in software development has led me to work on diverse projects ranging from
                    <span className="font-semibold"> ML-powered data intelligence systems</span> to
                    <span className="font-semibold"> full-stack web applications</span>. I'm constantly learning and
                    exploring new technologies to enhance my skillset.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800">
                      💻 Full-Stack Developer
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium border border-purple-200 dark:border-purple-800">
                      🤖 ML Enthusiast
                    </span>
                    <span className="px-4 py-2 bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 text-green-700 dark:text-green-300 rounded-lg text-sm font-medium border border-green-200 dark:border-green-800">
                      🚀 Problem Solver
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-5 border border-blue-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <span className="text-lg">🎯</span>
                      Current Focus
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
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

                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800 rounded-lg p-5 border border-orange-100 dark:border-gray-700">
                    <h3 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                      <span className="text-lg">⚡</span>
                      Quick Facts
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">📍 Location:</span> Dwarka, Delhi
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">🎓 Education:</span> NSUT (formerly NSIT)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">💼 Status:</span> Aspiring Software Engineer
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900 dark:text-white">📧 Email:</span> aakash3121733@gmail.com
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">Activity Overview</h2>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {timeRange === 'week' && 'Showing: February 2026'}
                    {timeRange === 'month' && 'Showing: January 2026 - February 2026'}
                    {timeRange === 'year' && 'Showing: November 2024 - February 2026 (Active months only)'}
                  </p>
                </div>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-colors"
                >
                  <option value="week">This Month ({new Date().toLocaleString('default', { month: 'short' })})</option>
                  <option value="month">Last 2 Months</option>
                  <option value="year">All Activity</option>
                </select>
              </div>

              {/* Summary Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-lg p-4 border border-blue-200 dark:border-blue-900/50">
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold mb-1">Total Contributions</p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">89</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400/60 mt-1">Since Nov 2024</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-lg p-4 border border-purple-200 dark:border-purple-900/50">
                  <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mb-1">Repositories</p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">3</p>
                  <p className="text-xs text-purple-500 dark:text-purple-400/60 mt-1">Featured projects</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-lg p-4 border border-green-200 dark:border-green-900/50">
                  <p className="text-xs text-green-600 dark:text-green-400 font-semibold mb-1">Active Months</p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">4</p>
                  <p className="text-xs text-green-500 dark:text-green-400/60 mt-1">Nov, Dec, Jan, Feb</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 rounded-lg p-4 border border-orange-200 dark:border-orange-900/50">
                  <p className="text-xs text-orange-600 dark:text-orange-400 font-semibold mb-1">GitHub Stars</p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">0</p>
                  <p className="text-xs text-orange-500 dark:text-orange-400/60 mt-1">Portfolio projects</p>
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
                        <span className="text-sm font-bold text-gray-700 dark:text-gray-300 w-12">{data.month}</span>
                        <div className="flex-1 ml-4 space-y-2">
                          {/* Commits Bar */}
                          <div className="relative flex items-center group">
                            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${commitWidth}%` }}
                              />
                            </div>
                            <span className="ml-4 text-xs font-semibold text-blue-600 dark:text-blue-400 min-w-[70px]">
                              {data.commits} commits
                            </span>
                          </div>
                          {/* PRs Bar */}
                          <div className="relative flex items-center group">
                            <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full transition-all duration-700 ease-out"
                                style={{ width: `${prWidth}%` }}
                              />
                            </div>
                            <span className="ml-4 text-xs font-semibold text-purple-600 dark:text-purple-400 min-w-[70px]">
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
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-4">Activity Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4 border border-blue-100 dark:border-blue-900/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <p className="text-xs font-semibold text-blue-700 dark:text-blue-400">Most Active Month</p>
                    </div>
                    <p className="text-lg font-bold text-blue-900 dark:text-blue-200">December 2025</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400/80 mt-1">37 commits • Smart Parking System</p>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-900/10 rounded-lg p-4 border border-purple-100 dark:border-purple-900/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <p className="text-xs font-semibold text-purple-700 dark:text-purple-400">Peak PR Activity</p>
                    </div>
                    <p className="text-lg font-bold text-purple-900 dark:text-blue-200">4 Months</p>
                    <p className="text-xs text-purple-600 dark:text-purple-400/80 mt-1">Since Nov 2024 • Growing fast</p>
                  </div>

                  <div className="bg-green-50 dark:bg-green-900/10 rounded-lg p-4 border border-green-100 dark:border-green-900/30">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p className="text-xs font-semibold text-green-700 dark:text-green-400">Consistency Score</p>
                    </div>
                    <p className="text-lg font-bold text-green-900 dark:text-green-200">100%</p>
                    <p className="text-xs text-green-600 dark:text-green-400/80 mt-1">Active every month since signup</p>
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
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">
                      🚀 Jan 2026: ALRIS Project (28 commits)
                    </span>
                    <span className="text-xs bg-white px-3 py-1 rounded-full text-gray-700 border border-gray-200">
                      🛠️ Feb 2026: Portfolio Optimization (10 commits)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-2">
                <div className="w-1 h-8 bg-gradient-to-b from-orange-500 to-red-600 rounded-full"></div>
                Professional Roadmap
              </h2>
              <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent">
                {experience.map((item, idx) => (
                  <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white dark:border-gray-800 bg-gray-50 dark:bg-gray-700 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform duration-300 group-hover:scale-110 z-10">
                      {item.type === 'education' ? <Award className="w-5 h-5 text-blue-500" /> : <Zap className="w-5 h-5 text-orange-500" />}
                    </div>
                    {/* Content */}
                    <div className="w-[calc(100%-4rem)] md:w-[45%] bg-white dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-all duration-300 hover:shadow-md group-hover:-translate-y-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="font-bold text-gray-800 dark:text-white">{item.title}</div>
                        <time className="text-xs font-bold text-blue-600 dark:text-blue-400 px-2 py-1 bg-blue-50 dark:bg-blue-900/30 rounded-full">{item.year}</time>
                      </div>
                      <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">{item.organization}</div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Journal */}
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl p-8 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Learning Journal</h2>
                    <p className="text-indigo-100 text-sm">Documenting my journey through technology</p>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-md rounded-xl">
                    <Zap className="w-6 h-6" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { topic: 'System Design', status: 'Learning', icon: '🏗️' },
                    { topic: 'Advanced React Patterns', status: 'Mastering', icon: '⚛️' },
                    { topic: 'Cloud Computing', status: 'Exploring', icon: '☁️' },
                    { topic: 'DSA Optimization', status: 'Practicing', icon: '🚀' }
                  ].map((journal, i) => (
                    <div key={i} className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:bg-white/20 transition-all cursor-default">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{journal.icon}</span>
                        <div>
                          <div className="font-bold">{journal.topic}</div>
                          <div className="text-xs text-indigo-200">{journal.status}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Decorative elements */}
            </div>

            {/* Recent Projects Preview */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Featured Projects</h2>
                <button
                  onClick={() => {
                    setActiveTab('projects');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:gap-2 flex items-center gap-1 transition-all"
                >
                  View All <ExternalLink className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.slice(0, 3).map(project => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Portfolio Gallery</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Filtering through {projects.length} curated projects</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${selectedCategory === cat
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-100 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-800'
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map(project => (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ProjectCard project={project} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredProjects.length === 0 && (
              <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">No projects found</h3>
                <p className="text-gray-500">Try selecting a different category</p>
              </div>
            )}
          </motion.div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Technical Skills</h2>
              {skills.map((skill, idx) => (
                <SkillBar key={idx} skill={skill} />
              ))}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Coding Proficiency</h2>
                <div className="bg-orange-100 dark:bg-orange-900/30 p-2 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                </div>
              </div>

              {leetcodeData ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Easy</p>
                      <p className="text-lg font-bold text-green-600 dark:text-green-400">{leetcodeData.easySolved}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Med.</p>
                      <p className="text-lg font-bold text-yellow-600 dark:text-yellow-400">{leetcodeData.mediumSolved}</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Hard</p>
                      <p className="text-lg font-bold text-red-600 dark:text-red-400">{leetcodeData.hardSolved}</p>
                    </div>
                  </div>

                  <div className="relative pt-2">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="font-bold text-gray-700 dark:text-gray-300">Total Solved</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">{leetcodeData.totalSolved} / {leetcodeData.totalQuestions}</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(leetcodeData.totalSolved / leetcodeData.totalQuestions) * 100}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full shadow-sm"
                      />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-2 italic text-center">Top {Math.round(leetcodeData.ranking / 10000)}k Ranking on LeetCode</p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-gray-50 to-orange-50 dark:from-gray-900 dark:to-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/30">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-gray-800 dark:text-white">Acceptance Rate</p>
                      <span className="text-sm font-bold text-orange-600 dark:text-orange-400">{leetcodeData.acceptanceRate}%</span>
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400">High accuracy and optimized logic in problem-solving</p>
                  </div>

                  <a
                    href="https://leetcode.com/u/Aakash_Yadav1213"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-600 hover:from-orange-400 hover:to-yellow-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-orange-500/20"
                  >
                    View LeetCode Profile
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-500">Syncing LeetCode stats...</p>
                </div>
              )}
            </div>
          </motion.div>
        )}


        {/* Contact Tab */}
        {activeTab === 'contact' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Hero Section */}
            <div className="text-center py-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-full text-sm font-semibold text-green-700 dark:text-green-400 mb-6 border border-green-200 dark:border-green-800"
              >
                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                Open to Full-Time Opportunities
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4"
              >
                Let's Build Something{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Amazing
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
              >
                I'm always excited to discuss new projects, creative ideas, or opportunities to be part of your vision.
              </motion.p>
            </div>

            {/* Main Contact Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Contact Options */}
              <div className="space-y-6">
                {/* Contact Cards */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
                >
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
                    Connect Directly
                  </h2>

                  <div className="space-y-4">
                    {/* Email */}
                    <a
                      href="mailto:aakash3121733@gmail.com"
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">Email</p>
                        <p className="font-bold text-gray-800 dark:text-white">aakash3121733@gmail.com</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </a>

                    {/* LinkedIn */}
                    <a
                      href="https://linkedin.com/in/aakash-yadav-33a135332"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-800"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                        <Linkedin className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">LinkedIn</p>
                        <p className="font-bold text-gray-800 dark:text-white">Connect with me</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                    </a>

                    {/* GitHub */}
                    <a
                      href="https://github.com/TechieAakash"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-all group border border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    >
                      <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Github className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">GitHub</p>
                        <p className="font-bold text-gray-800 dark:text-white">View my code</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                    </a>
                  </div>
                </motion.div>

                {/* Resume Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-2xl shadow-xl p-6 text-white relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center">
                        <Award className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold">Resume / CV</h3>
                        <p className="text-sm text-blue-200">View my complete background</p>
                      </div>
                    </div>
                    <a
                      href="https://drive.google.com/file/d/1JH_-iIz0Kq_Tm5tPQmRmBR9DmAgEKhpx/view?usp=drivesdk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full py-4 bg-white text-gray-900 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
                    >
                      <Award className="w-5 h-5 text-blue-600" />
                      View Resume (PDF)
                    </a>
                  </div>
                </motion.div>
              </div>

              {/* Right Column - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700"
              >
                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full"></div>
                  Send a Message
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                  Have a question or want to work together? Drop me a message!
                </p>

                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setIsSubmitting(true);

                    const formData = new FormData(e.target);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const message = formData.get('message');

                    const subject = `Portfolio Inquiry from ${name}`;
                    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
                    const mailtoUrl = `mailto:aakash3121733@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                    setTimeout(() => {
                      setIsSubmitting(false);
                      setIsSent(true);
                      window.location.href = mailtoUrl;
                      setTimeout(() => setIsSent(false), 3000);
                    }, 1500);
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Name</label>
                      <input
                        type="text"
                        name="name"
                        required
                        placeholder="John Doe"
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Email</label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Your Message</label>
                    <textarea
                      rows="5"
                      name="message"
                      required
                      placeholder="Tell me about your project or opportunity..."
                      className="w-full px-4 py-3.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                    ></textarea>
                  </div>
                  <button
                    disabled={isSubmitting || isSent}
                    className={`w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2 ${isSubmitting || isSent ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : isSent ? (
                      <>
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}><Code2 className="w-5 h-5" /></motion.div>
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>

                {/* Quick Tip */}
                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/50">
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    <span className="font-bold">💡 Tip:</span> For faster response, reach out on LinkedIn. I typically respond within 24 hours!
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Fallback 404 View */}
        {!['overview', 'projects', 'skills', 'contact'].includes(activeTab) && (
          <NotFoundView />
        )}

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-all duration-300"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto border border-gray-100 dark:border-gray-700"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{selectedProject.name}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{selectedProject.category}</p>
                  </div>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className={`h-1.5 bg-gradient-to-r ${selectedProject.color} rounded-full mb-8`} />

                <div className="space-y-8">
                  {/* Challenge Section */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                      <Target className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">The Challenge</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedProject.challenge}</p>
                    </div>
                  </div>

                  {/* Solution Section */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                      <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">My Solution</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedProject.solution}</p>
                    </div>
                  </div>

                  {/* Impact Section */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                      <Award className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Outcome & Impact</h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{selectedProject.impact}</p>
                    </div>
                  </div>

                  {/* Tech Stack */}
                  <div className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4">
                      <Code2 className="w-5 h-5 text-gray-400" />
                      <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Technical Arsenal</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tech.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-lg font-bold border border-gray-200 dark:border-gray-700 shadow-sm transition-all hover:border-blue-300 dark:hover:border-blue-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all flex items-center justify-center gap-2"
                    >
                      <Github className="w-5 h-5" />
                      View Repository
                    </a>
                  )}
                  {selectedProject.demo && (
                    <a
                      href={selectedProject.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 px-6 py-3.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-5 h-5" />
                      Live Preview
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="w-full mt-12 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Main Footer Row */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Branding */}
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                Aakash Yadav
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Building scalable web apps & creating engaging content
              </p>
            </div>

            {/* Quick Links - Horizontal */}
            <nav className="flex items-center gap-6">
              {[
                { name: 'About', target: 'overview' },
                { name: 'Projects', target: 'projects' },
                { name: 'Skills', target: 'skills' },
                { name: 'Contact', target: 'contact' }
              ].map((link) => (
                <button
                  key={link.name}
                  onClick={() => {
                    setActiveTab(link.target);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 bg-transparent border-none cursor-pointer"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Back to Top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium text-sm transition-all duration-200"
            >
              <span>Back to Top</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
            </button>
          </div>

          {/* Divider & Copyright */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400">
              © 2026 Aakash Yadav. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioDashboard;
