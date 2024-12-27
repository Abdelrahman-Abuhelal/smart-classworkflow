import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";

interface NavbarProps {
  portalType: 'Student' | 'Teacher' | 'Admin';
}

export const Navbar: React.FC<NavbarProps> = ({ portalType }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored data/session
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">
              Smart Class Workflow
            </h1>
            <span className="ml-4 px-3 py-1 bg-primary/10 text-primary rounded-md">
              {portalType} Portal
            </span>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
}; 