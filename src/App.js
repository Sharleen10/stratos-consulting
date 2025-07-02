import React, { useState, useEffect, useRef } from 'react';
import { Plus, Users, Calendar, CheckCircle, AlertCircle, User, LogOut, Search, TrendingUp, Clock, Target, ClipboardList, MessageSquare, Upload, Edit, Trash2 } from 'lucide-react';
import STRATOSLOGO from './STRATOSLOGO.jpg';

// Initial mock data with enhanced user profiles
const initialUsers = [
  { 
    id: 1, 
    name: 'Sarah Johnson', 
    email: 'sarah@company.com', 
    password: 'password123', 
    role: 'Manager',
    analysisPreferences: {
      focusAreas: ["strategy", "ROI", "client relations"],
      sentimentFocus: "business impact"
    }
  },
  { 
    id: 2, 
    name: 'Mike Chen', 
    email: 'mike@company.com', 
    password: 'password123', 
    role: 'Team Member',
    analysisPreferences: {
      focusAreas: ["technical debt", "UX", "performance"],
      sentimentFocus: "technical feasibility"
    }
  },
  { 
    id: 3, 
    name: 'Alex Rivera', 
    email: 'alex@company.com', 
    password: 'password123', 
    role: 'Team Member',
    analysisPreferences: {
      focusAreas: ["integration", "scalability", "security"],
      sentimentFocus: "implementation risks"
    }
  },
  { 
    id: 4, 
    name: 'Emma Davis', 
    email: 'emma@company.com', 
    password: 'password123', 
    role: 'Team Member',
    analysisPreferences: {
      focusAreas: ["data quality", "reporting", "analytics"],
      sentimentFocus: "data insights"
    }
  }
];

const initialProjects = [
  {
    id: 1,
    name: 'Digital Transformation Strategy',
    description: 'Comprehensive digital transformation roadmap for Fortune 500 client',
    status: 'In Progress',
    dueDate: '2025-07-15',
    teamMembers: [2, 3],
    managerId: 1
  },
  {
    id: 2,
    name: 'Market Research Analysis',
    description: 'Competitive analysis and market positioning study',
    status: 'To Do',
    dueDate: '2025-07-30',
    teamMembers: [3, 4],
    managerId: 1
  }
];

const initialTasks = [
  {
    id: 1,
    projectId: 1,
    name: 'Conduct stakeholder interviews',
    description: 'Interview key stakeholders to understand current pain points',
    status: 'Done',
    dueDate: '2025-07-05',
    assignedTo: 2
  },
  {
    id: 2,
    projectId: 1,
    name: 'Technology audit',
    description: 'Assess current technology stack and identify gaps',
    status: 'In Progress',
    dueDate: '2025-07-10',
    assignedTo: 3
  },
  {
    id: 3,
    projectId: 2,
    name: 'Competitor analysis',
    description: 'Research top 5 competitors and their market strategies',
    status: 'To Do',
    dueDate: '2025-07-25',
    assignedTo: 4
  }
];

const App = () => {
  // Helper functions for localStorage
  const loadData = (key, initialData) => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : initialData;
  };

  const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // State initialization with localStorage
  const [currentUser, setCurrentUser] = useState(() => {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  });

  const [users, setUsers] = useState(() => loadData('users', initialUsers));
  const [projects, setProjects] = useState(() => loadData('projects', initialProjects));
  const [tasks, setTasks] = useState(() => loadData('tasks', initialTasks));
  const [activeTab, setActiveTab] = useState('dashboard');
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showLanding, setShowLanding] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('Team Member');
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    status: 'To Do',
    dueDate: '',
    assignedTo: '',
    projectId: ''
  });
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [editingProject, setEditingProject] = useState(null);

  // Load analysis history on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('analysisHistory');
    const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
    if (currentUser) {
      setAnalysisHistory(parsedHistory.filter(item => item.userId === currentUser.id));
    }
  }, [currentUser]);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    saveData('users', users);
  }, [users]);

  useEffect(() => {
    saveData('projects', projects);
  }, [projects]);

  useEffect(() => {
    saveData('tasks', tasks);
  }, [tasks]);

  // Landing Page Component
  const LandingPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100">
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <img src={STRATOSLOGO} alt="StratOS Logo" className="h-8 w-auto" />
                <h1 className="text-xl font-bold text-teal-800">StratOS Consulting Platform</h1>
              </div>
              <div className="flex space-x-4">
                <button 
                  onClick={() => { setShowLanding(false); setShowLogin(true); }}
                  className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50"
                >
                  Login
                </button>
                <button 
                  onClick={() => { setShowLanding(false); setShowSignup(true); }}
                  className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <img src={STRATOSLOGO} alt="StratOS Logo" className="h-24 w-auto mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-teal-800 mb-6">Transform Your Consulting Workflow</h1>
            <p className="text-xl text-teal-700 max-w-3xl mx-auto mb-8">
              StratOS combines powerful task management with AI-driven insights to help consulting teams work smarter and deliver better results.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => { setShowLanding(false); setShowSignup(true); }}
                className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 text-lg"
              >
                Get Started
              </button>
              <button 
                onClick={() => { setShowLanding(false); setShowLogin(true); }}
                className="px-6 py-3 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 text-lg"
              >
                Demo the Platform
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center text-teal-800 mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-cyan-50 p-6 rounded-xl border border-cyan-100">
                <div className="bg-cyan-500 p-3 rounded-lg">
                  <ClipboardList className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">Project Management</h3>
                <p className="text-teal-700">
                  Organize projects, assign tasks, and track progress with intuitive dashboards and reporting.
                </p>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                <div className="bg-purple-500 p-3 rounded-lg">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">AI-Powered Insights</h3>
                <p className="text-teal-700">
                  Extract key insights, action items, and sentiment analysis from client meetings and feedback.
                </p>
              </div>
              <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100">
                <div className="bg-emerald-500 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-teal-800 mb-2">Team Collaboration</h3>
                <p className="text-teal-700">
                  Role-based access ensures the right people have the right information at the right time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <footer className="bg-teal-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-teal-600 text-sm">
            <p>© 2025 StratOS Consulting Platform. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  };

  // Login Component
  const LoginScreen = () => {
    const handleLogin = () => {
      const user = users.find(u => u.email === loginEmail && u.password === loginPassword);
      if (user) {
        setCurrentUser(user);
        setShowLogin(false);
        
        // Load user-specific analysis history
        const savedHistory = localStorage.getItem('analysisHistory');
        const parsedHistory = savedHistory ? JSON.parse(savedHistory) : [];
        setAnalysisHistory(parsedHistory.filter(item => item.userId === user.id));
      } else {
        alert('Invalid email or password');
      }
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img src={STRATOSLOGO} alt="StratOS Logo" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-teal-800 mb-2">StratOS Consulting Platform</h1>
            <p className="text-teal-600">Sign in to your account</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Email</label>
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Password</label>
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="••••••••"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Sign In
            </button>
            <p className="text-center text-sm text-teal-600">
              Don't have an account?{' '}
              <button 
                onClick={() => { setShowLogin(false); setShowSignup(true); }}
                className="text-teal-700 hover:text-teal-900 font-medium"
              >
                Sign up
              </button>
            </p>
            <button
              onClick={() => { setShowLogin(false); setShowLanding(true); }}
              className="w-full py-2 text-teal-600 hover:text-teal-800 text-sm"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Signup Component
  const SignupScreen = () => {
    const handleSignup = () => {
      if (!signupName || !signupEmail || !signupPassword) {
        alert('Please fill in all fields');
        return;
      }

      if (users.some(u => u.email === signupEmail)) {
        alert('Email already exists');
        return;
      }

      const newUser = {
        id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
        name: signupName,
        email: signupEmail,
        password: signupPassword,
        role: signupRole,
        analysisPreferences: {
          focusAreas: signupRole === 'Manager' 
            ? ["strategy", "ROI", "client relations"]
            : ["technical debt", "UX", "performance"],
          sentimentFocus: signupRole === 'Manager' 
            ? "business impact" 
            : "technical feasibility"
        }
      };

      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      setCurrentUser(newUser);
      setShowSignup(false);
      
      // Initialize empty history for new user
      setAnalysisHistory([]);
    };

    return (
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-teal-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <img src={STRATOSLOGO} alt="StratOS Logo" className="h-16 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-teal-800 mb-2">Create your account</h1>
            <p className="text-teal-600">Get started with StratOS Consulting Platform</p>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Full Name</label>
              <input
                type="text"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                className="w-full p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Email</label>
              <input
                type="email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                className="w-full p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Password</label>
              <input
                type="password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                className="w-full p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="••••••••"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Role</label>
              <select
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value)}
                className="w-full p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Team Member">Team Member</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            <button
              onClick={handleSignup}
              className="w-full py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
            >
              Create Account
            </button>
            <p className="text-center text-sm text-teal-600">
              Already have an account?{' '}
              <button 
                onClick={() => { setShowSignup(false); setShowLogin(true); }}
                className="text-teal-700 hover:text-teal-900 font-medium"
              >
                Sign in
              </button>
            </p>
            <button
              onClick={() => { setShowSignup(false); setShowLanding(true); }}
              className="w-full py-2 text-teal-600 hover:text-teal-800 text-sm"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    );
  };

  // New Project Modal - Updated version with fixes
  const NewProjectModal = () => {
    const [localProject, setLocalProject] = useState({
      name: '',
      description: '',
      status: 'To Do',
      dueDate: '',
      teamMembers: []
    });

    useEffect(() => {
      if (editingProject) {
        setLocalProject({
          name: editingProject.name,
          description: editingProject.description,
          status: editingProject.status,
          dueDate: editingProject.dueDate,
          teamMembers: editingProject.teamMembers
        });
      } else {
        setLocalProject({
          name: '',
          description: '',
          status: 'To Do',
          dueDate: '',
          teamMembers: []
        });
      }
    }, [editingProject, showNewProjectModal]);

    const handleSubmit = (e) => {
      e.preventDefault();
      if (editingProject) {
        const updatedProjects = projects.map(project => 
          project.id === editingProject.id ? { 
            ...editingProject,
            name: localProject.name,
            description: localProject.description,
            status: localProject.status,
            dueDate: localProject.dueDate,
            teamMembers: localProject.teamMembers
          } : project
        );
        setProjects(updatedProjects);
        setEditingProject(null);
      } else {
        const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
        
        const project = {
          id: newId,
          name: localProject.name,
          description: localProject.description,
          status: localProject.status,
          dueDate: localProject.dueDate,
          teamMembers: localProject.teamMembers,
          managerId: currentUser.id
        };
        
        setProjects([...projects, project]);
      }
      
      setShowNewProjectModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-teal-800">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h3>
            <button 
              onClick={() => {
                setShowNewProjectModal(false);
                setEditingProject(null);
              }}
              className="text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Project Name</label>
              <input
                type="text"
                value={localProject.name}
                onChange={(e) => setLocalProject({...localProject, name: e.target.value})}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Description</label>
              <textarea
                value={localProject.description}
                onChange={(e) => setLocalProject({...localProject, description: e.target.value})}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Status</label>
              <select
                value={localProject.status}
                onChange={(e) => setLocalProject({...localProject, status: e.target.value})}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Due Date</label>
              <input
                type="date"
                value={localProject.dueDate}
                onChange={(e) => setLocalProject({...localProject, dueDate: e.target.value})}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Team Members</label>
              <select
                multiple
                value={localProject.teamMembers}
                onChange={(e) => {
                  const options = [...e.target.selectedOptions];
                  const values = options.map(opt => parseInt(opt.value));
                  setLocalProject({...localProject, teamMembers: values});
                }}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                {users.filter(u => u.role === 'Team Member').map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowNewProjectModal(false);
                  setEditingProject(null);
                }}
                className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                {editingProject ? 'Update Project' : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // New Task Modal
  const NewTaskModal = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
      const newId = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
      
      const task = {
        id: newId,
        projectId: parseInt(newTask.projectId),
        name: newTask.name,
        description: newTask.description,
        status: newTask.status,
        dueDate: newTask.dueDate,
        assignedTo: parseInt(newTask.assignedTo)
      };
      
      const updatedTasks = [...tasks, task];
      setTasks(updatedTasks);
      setNewTask({
        name: '',
        description: '',
        status: 'To Do',
        dueDate: '',
        assignedTo: '',
        projectId: ''
      });
      setShowNewTaskModal(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-teal-800">Create New Task</h3>
            <button 
              onClick={() => setShowNewTaskModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              ✕
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Project</label>
              <select
                value={newTask.projectId}
                onChange={(e) => setNewTask({...newTask, projectId: e.target.value})}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              >
                <option value="">Select Project</option>
                {getVisibleProjects().map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Task Name</label>
              <input
                type="text"
                value={newTask.name}
                onChange={(e) => setNewTask({...newTask, name: e.target.value})}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                rows="3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Status</label>
              <select
                value={newTask.status}
                onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="To Do">To Do</option>
                <option value="In Progress">In Progress</option>
                <option value="Done">Done</option>
                <option value="Blocked">Blocked</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Due Date</label>
              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-teal-700 mb-1">Assign To</label>
              <select
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({...newTask, assignedTo: e.target.value})}
                className="w-full p-2 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="">Select Team Member</option>
                {users.filter(u => u.role === 'Team Member').map(user => (
                  <option key={user.id} value={user.id}>{user.name}</option>
                ))}
              </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={() => setShowNewTaskModal(false)}
                className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              >
                Create Task
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // Get visible projects based on user role
  const getVisibleProjects = () => {
    if (!currentUser) return [];
    if (currentUser.role === 'Manager') {
      return projects.filter(project => project.managerId === currentUser.id);
    }
    return projects.filter(project => project.teamMembers.includes(currentUser.id));
  };

  // Get visible tasks based on user role
  const getVisibleTasks = () => {
    if (!currentUser) return [];
    const visibleProjects = getVisibleProjects();
    const visibleProjectIds = visibleProjects.map(p => p.id);
    
    if (currentUser.role === 'Manager') {
      return tasks.filter(task => visibleProjectIds.includes(task.projectId));
    }
    return tasks.filter(task => 
      task.assignedTo === currentUser.id || visibleProjectIds.includes(task.projectId)
    );
  };

  // Enhanced AI Analysis with user-specific insights
  const analyzeText = async (text) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const user = currentUser;
    const isManager = user.role === 'Manager';
    
    // Sentiment analysis based on text content
    const getSentiment = () => {
      if (text.includes('!') || text.toLowerCase().includes('great')) return 'Positive';
      if (text.toLowerCase().includes('problem') || text.toLowerCase().includes('concern')) return 'Negative';
      return 'Neutral';
    };
    
    const sentiment = getSentiment();
    
    // Generate dynamic action items based on text content
    const generateActionItems = () => {
      const actionItems = [];
      
      if (text.toLowerCase().includes('meeting')) {
        actionItems.push('Schedule follow-up meeting');
        actionItems.push('Distribute meeting minutes');
      }
      
      if (text.toLowerCase().includes('client')) {
        actionItems.push('Prepare client report');
        actionItems.push('Follow up with client');
      }
      
      if (text.toLowerCase().includes('technical')) {
        actionItems.push('Review technical specifications');
        actionItems.push('Assess technical feasibility');
      }
      
      if (text.toLowerCase().includes('budget')) {
        actionItems.push('Review budget allocation');
        actionItems.push('Prepare cost analysis');
      }
      
      if (text.toLowerCase().includes('timeline')) {
        actionItems.push('Update project timeline');
        actionItems.push('Assess schedule risks');
      }
      
      // Add role-specific action items
      if (isManager) {
        actionItems.push('Prepare executive summary');
        actionItems.push('Align with business objectives');
      } else {
        actionItems.push('Document technical requirements');
        actionItems.push('Assess implementation effort');
      }
      
      // Ensure unique action items
      return [...new Set(actionItems)];
    };
    
    // Generate dynamic keywords based on text content
    const generateKeywords = () => {
      const keywords = [];
      
      if (text.toLowerCase().includes('integration')) keywords.push('integration');
      if (text.toLowerCase().includes('performance')) keywords.push('performance');
      if (text.toLowerCase().includes('client')) keywords.push('client');
      if (text.toLowerCase().includes('budget')) keywords.push('budget');
      if (text.toLowerCase().includes('timeline')) keywords.push('timeline');
      if (text.toLowerCase().includes('technical')) keywords.push('technical');
      if (text.toLowerCase().includes('meeting')) keywords.push('meeting');
      
      // Add user's focus areas
      keywords.push(...user.analysisPreferences.focusAreas);
      
      // Ensure unique keywords
      return [...new Set(keywords)].slice(0, 5);
    };
    
    const mockAnalysis = {
      summary: `${isManager ? 'Managerial' : 'Technical'} analysis of the content: ${text.substring(0, 100)}...`,
      keywords: generateKeywords(),
      sentiment,
      sentimentDetail: sentiment === 'Positive'
        ? (isManager ? 'Favorable for business objectives' : 'Technically feasible')
        : sentiment === 'Negative'
          ? (isManager ? 'Requires executive attention' : 'Significant technical challenges')
          : (isManager ? 'Needs further evaluation' : 'Requires technical assessment'),
      actionItems: generateActionItems()
    };
    
    setAiAnalysis(mockAnalysis);
    setIsAnalyzing(false);
    
    // Save to analysis history
    const savedHistory = localStorage.getItem('analysisHistory');
    const history = savedHistory ? JSON.parse(savedHistory) : [];
    history.unshift({
      userId: user.id,
      timestamp: new Date().toISOString(),
      input: text,
      output: mockAnalysis
    });
    localStorage.setItem('analysisHistory', JSON.stringify(history));
    setAnalysisHistory(history.filter(item => item.userId === user.id));
  };

  // Convert action item to task
  const convertToTask = (actionItem, projectId) => {
    const newTask = {
      id: tasks.length + 1,
      projectId: projectId,
      name: actionItem,
      description: `Generated from AI analysis (${new Date().toLocaleDateString()})`,
      status: 'To Do',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      assignedTo: currentUser.id
    };
    setTasks([...tasks, newTask]);
    alert('Task created successfully!');
  };

  // Handle task status change
  const handleTaskStatusChange = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  // Handle project deletion
  const handleDeleteProject = (projectId) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(project => project.id !== projectId);
      setProjects(updatedProjects);
      
      // Also remove associated tasks
      const updatedTasks = tasks.filter(task => task.projectId !== projectId);
      setTasks(updatedTasks);
    }
  };

  // Dashboard Component
  const Dashboard = () => {
    const visibleProjects = getVisibleProjects();
    const visibleTasks = getVisibleTasks();
    const completedTasks = visibleTasks.filter(t => t.status === 'Done');
    const overdueTasks = visibleTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== 'Done');

    if (currentUser.role === 'Manager') {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
              <div className="flex items-center">
                <div className="bg-teal-500 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-teal-700">Total Projects</p>
                  <p className="text-2xl font-bold text-teal-800">{visibleProjects.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
              <div className="flex items-center">
                <div className="bg-emerald-500 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-emerald-700">Completed Tasks</p>
                  <p className="text-2xl font-bold text-emerald-800">{completedTasks.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
              <div className="flex items-center">
                <div className="bg-amber-500 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-amber-700">Active Tasks</p>
                  <p className="text-2xl font-bold text-amber-800">{visibleTasks.filter(t => t.status !== 'Done').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-rose-100">
              <div className="flex items-center">
                <div className="bg-rose-500 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-rose-700">Overdue</p>
                  <p className="text-2xl font-bold text-rose-800">{overdueTasks.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
              <h3 className="text-lg font-semibold text-teal-800 mb-4">Team Workload</h3>
              <div className="space-y-3">
                {users.filter(u => u.role === 'Team Member').map(user => {
                  const userTasks = visibleTasks.filter(t => t.assignedTo === user.id && t.status !== 'Done');
                  const progressWidth = Math.min((userTasks.length / 5) * 100, 100);
                  return (
                    <div key={user.id} className="flex items-center justify-between">
                      <span className="text-sm text-teal-700">{user.name}</span>
                      <div className="flex items-center space-x-2">
                        <div className="bg-teal-100 rounded-full h-2 w-20">
                          <div 
                            className="bg-teal-500 h-2 rounded-full" 
                            style={{ width: `${progressWidth}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-teal-600">{userTasks.length} tasks</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
              <h3 className="text-lg font-semibold text-teal-800 mb-4">Recent Projects</h3>
              <div className="space-y-3">
                {visibleProjects.slice(0, 3).map(project => (
                  <div key={project.id} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                    <div>
                      <p className="font-medium text-teal-800">{project.name}</p>
                      <p className="text-sm text-teal-600">{project.status}</p>
                    </div>
                    <span className="text-xs text-teal-500">{project.dueDate}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
              <div className="flex items-center">
                <div className="bg-teal-500 p-3 rounded-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-teal-700">My Projects</p>
                  <p className="text-2xl font-bold text-teal-800">{visibleProjects.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-emerald-100">
              <div className="flex items-center">
                <div className="bg-emerald-500 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-emerald-700">Completed</p>
                  <p className="text-2xl font-bold text-emerald-800">{completedTasks.length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-amber-100">
              <div className="flex items-center">
                <div className="bg-amber-500 p-3 rounded-lg">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-amber-700">In Progress</p>
                  <p className="text-2xl font-bold text-amber-800">{visibleTasks.filter(t => t.status === 'In Progress').length}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-rose-100">
              <div className="flex items-center">
                <div className="bg-rose-500 p-3 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm text-rose-700">Overdue</p>
                  <p className="text-2xl font-bold text-rose-800">{overdueTasks.length}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
            <h3 className="text-lg font-semibold text-teal-800 mb-4">My Tasks</h3>
            <div className="space-y-3">
              {visibleTasks.slice(0, 5).map(task => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-teal-50 rounded-lg">
                  <div>
                    <p className="font-medium text-teal-800">{task.name}</p>
                    <p className="text-sm text-teal-600">{task.status}</p>
                  </div>
                  <span className="text-xs text-teal-500">{task.dueDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }
  };

  // Projects Component
  const Projects = () => {
    const visibleProjects = getVisibleProjects();
    
    const handleStatusChange = (projectId, newStatus) => {
      const updatedProjects = projects.map(project => 
        project.id === projectId ? { ...project, status: newStatus } : project
      );
      setProjects(updatedProjects);
    };

    const handleEditProject = (project) => {
      setEditingProject(project);
      setShowNewProjectModal(true);
    };

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-teal-800">Projects</h2>
          <button 
            onClick={() => {
              setEditingProject(null);
              setShowNewProjectModal(true);
            }}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-700"
          >
            <Plus className="w-4 h-4" />
            <span>New Project</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleProjects.map(project => (
            <div key={project.id} className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-teal-800">{project.name}</h3>
                <div className="flex space-x-2">
                  <select
                    value={project.status}
                    onChange={(e) => handleStatusChange(project.id, e.target.value)}
                    className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'Done' ? 'bg-emerald-100 text-emerald-800' :
                      project.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                      'bg-teal-100 text-teal-800'
                    }`}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
              
              <p className="text-teal-700 mb-4">{project.description}</p>
              
              <div className="flex items-center justify-between text-sm text-teal-600">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>{project.teamMembers.length} members</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{project.dueDate}</span>
                </div>
              </div>
              
              {currentUser.role === 'Manager' && (
                <div className="flex justify-end space-x-2 mt-4">
                  <button
                    onClick={() => handleEditProject(project)}
                    className="p-1 text-teal-600 hover:text-teal-800"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="p-1 text-rose-600 hover:text-rose-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Tasks Component
  const Tasks = () => {
    const visibleTasks = getVisibleTasks();
    
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-teal-800">Tasks</h2>
          <button 
            onClick={() => setShowNewTaskModal(true)}
            className="bg-teal-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-teal-700"
          >
            <Plus className="w-4 h-4" />
            <span>New Task</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-teal-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-teal-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Task</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Project</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-teal-700 uppercase tracking-wider">Due Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-teal-100">
                {visibleTasks.map(task => {
                  const project = projects.find(p => p.id === task.projectId);
                  const assignedUser = users.find(u => u.id === task.assignedTo);
                  return (
                    <tr key={task.id} className="hover:bg-teal-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-teal-800">{task.name}</div>
                          <div className="text-sm text-teal-600">{task.description}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-800">
                        {project?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-800">
                        {assignedUser?.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={task.status}
                          onChange={(e) => handleTaskStatusChange(task.id, e.target.value)}
                          className={`px-2 py-1 text-xs rounded-full ${
                            task.status === 'Done' ? 'bg-emerald-100 text-emerald-800' :
                            task.status === 'In Progress' ? 'bg-amber-100 text-amber-800' :
                            task.status === 'Blocked' ? 'bg-rose-100 text-rose-800' :
                            'bg-teal-100 text-teal-800'
                          }`}
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Done">Done</option>
                          <option value="Blocked">Blocked</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-teal-800">
                        {task.dueDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // AI Insights Component
  const AIInsights = () => {
    const [inputText, setInputText] = useState('');
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);
    const visibleProjects = getVisibleProjects();

    const handleFileUpload = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      setIsUploading(true);
      setUploadedFile(file);

      // Simulate file reading and text extraction
      const reader = new FileReader();
      reader.onload = (e) => {
        // In a real app, you would parse the file content properly
        // For demo purposes, we'll just use the file name and some mock text
        const fileContent = `Document: ${file.name}\n\nSample extracted text from ${file.name}:\n\nThis is a simulated extraction of text from the uploaded document. In a real application, this would contain the actual content of the file.`;
        
        setInputText(fileContent);
        setIsUploading(false);
      };
      reader.onerror = () => {
        setIsUploading(false);
        alert('Error reading file');
      };
      
      // Simulate processing delay
      setTimeout(() => {
        reader.readAsText(file);
      }, 1000);
    };

    const sampleText = `Client Meeting Notes - June 30, 2025

Attendees: John Smith (CTO), Mary Johnson (Project Manager), our team

Key Discussion Points:
- Current system experiencing 30% slower response times than expected
- Integration with legacy CRM system causing data synchronization issues
- Users reporting difficulty navigating the new interface
- Budget concerns regarding additional infrastructure costs

Client Concerns:
- Performance issues affecting daily operations
- Need for better training materials
- Timeline for resolving integration problems

Next Steps Discussed:
- System performance audit needed by July 15
- Schedule training sessions for end users
- Research alternative integration approaches
- Provide cost analysis for infrastructure upgrades

Overall, client is concerned but willing to work together on solutions.`;

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-teal-800">AI Insights</h2>
          <div className="flex items-center space-x-2">
            <Search className="w-5 h-5 text-teal-600" />
            <span className="text-sm text-teal-600">Analyze meeting notes & feedback</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-teal-100">
          <h3 className="text-lg font-semibold text-teal-800 mb-4">Text Analysis</h3>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-teal-700 mb-2">
              Paste meeting notes, client feedback, or other text to analyze:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here or upload a document..."
              className="w-full h-40 p-3 border border-teal-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <button
              onClick={() => setInputText(sampleText)}
              className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50"
            >
              Load Sample Text
            </button>
            
            <button
              onClick={() => fileInputRef.current.click()}
              className="px-4 py-2 text-teal-600 border border-teal-600 rounded-lg hover:bg-teal-50 flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>{uploadedFile ? uploadedFile.name : 'Upload Document'}</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".txt,.pdf,.doc,.docx"
              className="hidden"
            />
            
            <button
              onClick={() => analyzeText(inputText)}
              disabled={!inputText.trim() || isAnalyzing || isUploading}
              className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isAnalyzing || isUploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>{isUploading ? 'Processing...' : 'Analyzing...'}</span>
                </>
              ) : (
                <>
                  <TrendingUp className="w-4 h-4" />
                  <span>Analyze Text</span>
                </>
              )}
            </button>
          </div>

          {aiAnalysis && (
            <div className="space-y-6 border-t border-teal-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                  <h4 className="font-semibold text-teal-800 mb-2">Summary</h4>
                  <p className="text-teal-700 text-sm">{aiAnalysis.summary}</p>
                </div>
                
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                  <h4 className="font-semibold text-emerald-800 mb-2">Sentiment</h4>
                  <div>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      aiAnalysis.sentiment === 'Positive' ? 'bg-emerald-200 text-emerald-800' :
                      aiAnalysis.sentiment === 'Negative' ? 'bg-rose-200 text-rose-800' :
                      'bg-teal-200 text-teal-800'
                    }`}>
                      {aiAnalysis.sentiment}
                    </span>
                    <p className="text-xs mt-1 text-teal-600">{aiAnalysis.sentimentDetail}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <h4 className="font-semibold text-purple-800 mb-2">Key Topics</h4>
                <div className="flex flex-wrap gap-2">
                  {aiAnalysis.keywords.map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-purple-200 text-purple-800 rounded-full text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="bg-amber-50 p-4 rounded-lg border border-amber-100">
                <h4 className="font-semibold text-amber-800 mb-3">Action Items</h4>
                <div className="space-y-2">
                  {aiAnalysis.actionItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-white rounded border border-teal-100">
                      <span className="text-sm text-teal-800">{item}</span>
                      <div className="flex space-x-2">
                        <select 
                          className="text-xs border border-teal-300 rounded px-2 py-1 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          onChange={(e) => convertToTask(item, e.target.value)}
                        >
                          <option value="">Select Project</option>
                          {visibleProjects.map(project => (
                            <option key={project.id} value={project.id}>{project.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
                <h4 className="font-semibold text-teal-800 mb-2">Your Recent Analyses</h4>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {analysisHistory.slice(0, 3).map((item, index) => (
                    <div key={index} className="p-2 bg-white rounded border border-teal-100">
                      <p className="text-sm font-medium text-teal-800 truncate">{item.input.substring(0, 60)}...</p>
                      <p className="text-xs text-teal-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Main App Router
  if (showLanding) {
    return <LandingPage />;
  }

  if (showLogin) {
    return <LoginScreen />;
  }

  if (showSignup) {
    return <SignupScreen />;
  }

  return (
    <div className="min-h-screen bg-teal-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-teal-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img src={STRATOSLOGO} alt="StratOS Logo" className="h-8 w-auto" />
              <h1 className="text-xl font-bold text-teal-800">StratOS Consulting Platform</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-teal-600" />
                <span className="text-sm text-teal-700">{currentUser.name}</span>
                <span className="text-xs text-teal-500">({currentUser.role})</span>
              </div>
              <button
                onClick={() => { setCurrentUser(null); setShowLanding(true); }}
                className="text-teal-600 hover:text-teal-800"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <nav className="flex space-x-8 mb-8">
          {['dashboard', 'projects', 'tasks', 'ai-insights'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-2 text-sm font-medium border-b-2 ${
                activeTab === tab
                  ? 'border-teal-500 text-teal-600'
                  : 'border-transparent text-teal-500 hover:text-teal-700'
              }`}
            >
              {tab === 'ai-insights' ? 'AI Insights' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>

        {/* Content */}
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'projects' && <Projects />}
        {activeTab === 'tasks' && <Tasks />}
        {activeTab === 'ai-insights' && <AIInsights />}
      </div>

      {/* Modals */}
      {showNewProjectModal && <NewProjectModal />}
      {showNewTaskModal && <NewTaskModal />}
    </div>
  );
};

export default App;