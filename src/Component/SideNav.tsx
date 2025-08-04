import './Dashboard.css';

interface SideNavProps {
  activeTab: 'recruiters' | 'templates' | 'preview';
  onTabChange: (tab: 'recruiters' | 'templates' | 'preview') => void;
}

const SideNav = ({ activeTab, onTabChange }: SideNavProps) => {
  return (
    <div className="side-nav">
      <div className="nav-item">
        <button 
          className={`nav-button ${activeTab === 'recruiters' ? 'active' : ''}`}
          onClick={() => onTabChange('recruiters')}
        >
          👥 Add Recruiters
        </button>
      </div>
      <div className="nav-item">
        <button 
          className={`nav-button ${activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => onTabChange('templates')}
        >
          📧 Email Templates
        </button>
      </div>
      <div className="nav-item">
        <button 
          className={`nav-button ${activeTab === 'preview' ? 'active' : ''}`}
          onClick={() => onTabChange('preview')}
        >
          👁️ Preview Email
        </button>
      </div>
    </div>
  );
};

export default SideNav; 