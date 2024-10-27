import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';

import './styles/internDash.css';
import AppliedJobs from './AppliedJobs.js';
import Profile from './Profile.js';
import JobPortal from './JobPortal';
import p3 from '../images/p3.jpeg'
import Quiz from './quiz/Quiz.js';
import Cookies from 'js-cookie';
import Lmsdash from './LMS/Lmsdash.js';
import Home from './intern_home.js';
import UserQuizAnalysis from './quiz/userAnalyze.js';

const InternDashboard = ({defaultTab}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedView, setSelectedView] = useState(defaultTab || 'Dashboard'); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // const { '*': currentPath } = useParams();
  
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab') || defaultTab || 'Dashboard'; // Use defaultTab if provided
    if (tab) {
      setSelectedView(tab.charAt(0).toUpperCase() + tab.slice(1));
    }
  }, [location, defaultTab]);
  
  const menuItems =
    [
      { id: 'Dashboard', name: 'Dashboard', icon: 'fas fa-home' },
      { id: 'Applied', name: 'Applied', icon: 'fas fa-edit' },
      { id: 'Jobs', name: 'Jobs', icon: 'fas fa-chalkboard-user' },
      { id: 'LMS', name: 'LMS', icon: 'fas fa-book' },
      { id: 'Quiz', name: 'Quiz', icon: 'fas fa-laptop-code' },
      { id: 'Profile', name: 'Profile', icon: 'fas fa-user' },
    ];

  const handleMenuItemClick = (view) => {
    setSelectedView(view);
    navigate(`/intern_dash/${view.toLowerCase()}`);
  };
  const handleLogout = () => {
    Object.keys(Cookies.get()).forEach(cookieName => {
      Cookies.remove(cookieName);
    });
    navigate('/');
  };


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderContent = () => {
    // if (currentPath.startsWith('quiz_analysis/')) {
    //   const token = currentPath.split('/')[1];
    //   return (
    //     <UserQuizAnalysis quizToken={token} />
    //   );
    // }
    switch (selectedView) {
      case 'Dashboard':
        return <Home setSelectedView={setSelectedView} />
      case 'Applied':
        return <AppliedJobs />
      case 'Jobs':
        return <JobPortal setSelectedView={setSelectedView} />
      case 'Quiz':
        return <Quiz />
      case 'Profile':
        return <Profile />
      case 'LMS':
        return <Lmsdash />
      default:
    }
  };

  return (
    <div className={`intern_dashboard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <nav className={`intern-side-nav ${isSidebarOpen ? 'open' : 'closed'}`} >
        <div className="logo">
          {isSidebarOpen ? <img className="logo-img" src={p3} alt='text' /> : ''}
        </div>
        <button className="intern-toggle-button" onClick={toggleSidebar}>
           <FontAwesomeIcon icon={isSidebarOpen ? faTimes : faBars} />
        </button>
        <div className='icons-container'>
          <ul>
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => handleMenuItemClick(item.id)}
                className={selectedView === item.name ? 'active' : ''}>
                <i className={item.icon}></i>
                {isSidebarOpen && <span>{item.name}</span>}
              </li>
            ))}
          </ul>
        </div>
        <Button
          className={"Logout" ? 'active' : ''}
          variant="outlined"
          style={{
            color: "#fff",
            border: "none",
            padding: "10px 20px",
            fontSize: "13px",
            position: "absolute",
            bottom: "10px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            transition: "background-color 0.3s, color 0.3s",
          }}
          onClick={handleLogout}
        >
          Logout <i className="fa-solid fa-sign-out-alt"></i>
        </Button>

      </nav>
      <div className={`intern-main-content ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        {renderContent()}
      </div>
    </div>
  );
};

export default InternDashboard;

