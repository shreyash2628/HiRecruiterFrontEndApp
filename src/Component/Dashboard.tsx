import { useState } from 'react';
import AddRecruiter from './AddRecruiter';
import EmailTemplates from './EmailTemplates';
import PreviewEmail from './PreviewEmail';
import SideNav from './SideNav';
import './Dashboard.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'recruiters' | 'templates' | 'preview'>('recruiters');

  const handleTabChange = (tab: 'recruiters' | 'templates' | 'preview') => {
    setActiveTab(tab);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>HiRecruiter</h1>
        <p>Generate professional email addresses and templates for candidates</p>
      </div>

      <div className="dashboard-layout">
        {/* Side Navigation */}
        <SideNav activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Main Content */}
        <div className="main-content">
          {activeTab === 'recruiters' && <AddRecruiter />}
          {activeTab === 'templates' && <EmailTemplates />}
          {activeTab === 'preview' && <PreviewEmail />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 