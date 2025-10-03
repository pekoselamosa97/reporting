import React from 'react';
import { Nav } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const Sidebar = ({ userType }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavItems = () => {
    const baseItems = {
      student: [
        { key: 'monitoring', label: 'Monitoring', icon: 'bi-eye' },
        { key: 'rating', label: 'Rating', icon: 'bi-star' }
      ],
      lecturer: [
        { key: 'reporting', label: 'Reporting Form', icon: 'bi-clipboard' },
        { key: 'classes', label: 'Classes', icon: 'bi-book' },
        { key: 'reports', label: 'Reports', icon: 'bi-file-text' },
        { key: 'monitoring', label: 'Monitoring', icon: 'bi-eye' },
        { key: 'rating', label: 'Rating', icon: 'bi-star' }
      ],
      'principal-lecturer': [
        { key: 'courses', label: 'Courses', icon: 'bi-journal' },
        { key: 'reports', label: 'Reports', icon: 'bi-file-text' },
        { key: 'monitoring', label: 'Monitoring', icon: 'bi-eye' },
        { key: 'rating', label: 'Rating', icon: 'bi-star' },
        { key: 'classes', label: 'Classes', icon: 'bi-book' }
      ],
      'program-leader': [
        { key: 'courses', label: 'Courses', icon: 'bi-journal' },
        { key: 'reports', label: 'Reports', icon: 'bi-file-text' },
        { key: 'monitoring', label: 'Monitoring', icon: 'bi-eye' },
        { key: 'classes', label: 'Classes', icon: 'bi-book' },
        { key: 'lectures', label: 'Lectures', icon: 'bi-person' },
        { key: 'rating', label: 'Rating', icon: 'bi-star' }
      ]
    };

    return baseItems[userType] || [];
  };

  const handleNavClick = (key) => {
    navigate(`/${userType}?tab=${key}`);
  };

  const currentTab = new URLSearchParams(location.search).get('tab') || getNavItems()[0]?.key;

  return (
    <div className="sidebar bg-light">
      <Nav className="flex-column p-3">
        {getNavItems().map(item => (
          <Nav.Link
            key={item.key}
            className={`sidebar-nav-link ${currentTab === item.key ? 'active' : ''}`}
            onClick={() => handleNavClick(item.key)}
          >
            <i className={`${item.icon} me-2`}></i>
            {item.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;