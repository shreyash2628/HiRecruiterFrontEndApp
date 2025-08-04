import { useState } from 'react';
import './Dashboard.css';

interface EmailEntry {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  company: string;
}

interface Company {
  id: string;
  name: string;
  domain: string;
}

const AddRecruiter = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [emailList, setEmailList] = useState<EmailEntry[]>([]);

  // Sample companies data
  const companies: Company[] = [
    { id: '1', name: 'L&T Technology Services', domain: 'ltts.com' },
    { id: '2', name: 'Infosys', domain: 'infosys.com' },
    { id: '3', name: 'TCS', domain: 'tcs.com' },
    { id: '4', name: 'Wipro', domain: 'wipro.com' },
    { id: '5', name: 'HCL Technologies', domain: 'hcl.com' },
    { id: '6', name: 'Tech Mahindra', domain: 'techmahindra.com' },
    { id: '7', name: 'Cognizant', domain: 'cognizant.com' },
    { id: '8', name: 'Accenture', domain: 'accenture.com' },
    { id: '9', name: 'Capgemini', domain: 'capgemini.com' },
    { id: '10', name: 'Deloitte', domain: 'deloitte.com' },
  ];

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateEmail = (): string => {
    // For real-time preview, show email as it's being formed
    let email = '';
    
    if (firstName) {
      email += firstName.toLowerCase();
    }
    
    if (lastName) {
      if (email) email += '.';
      email += lastName.toLowerCase();
    }
    
    if (selectedCompany) {
      if (email) email += '@';
      email += selectedCompany.domain;
    }
    
    return email;
  };

  const handleAddEmail = () => {
    const email = generateEmail();
    if (email && firstName.trim() && lastName.trim() && selectedCompany) {
      const newEntry: EmailEntry = {
        id: Date.now().toString(),
        email,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        company: selectedCompany.name,
      };
      setEmailList(prev => [...prev, newEntry]);
      
      // Clear form
      setFirstName('');
      setLastName('');
      setSelectedCompany(null);
      setSearchTerm('');
    }
  };

  const handleDeleteEmail = (id: string) => {
    setEmailList(prev => prev.filter(entry => entry.id !== id));
  };

  const handleCompanySelect = (company: Company) => {
    setSelectedCompany(company);
    setSearchTerm(company.name);
    setIsDropdownOpen(false);
  };

  const previewEmail = generateEmail();

  return (
    <div className="content-section">
      <h2>Add Recruiters</h2>
      <p>Generate professional email addresses for candidates</p>
      
      {/* Input Section */}
      <div className="input-section">
        <div className="input-row">
          <div className="input-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter first name"
            />
          </div>

          <div className="input-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter last name"
            />
          </div>

          <div className="input-group company-dropdown">
            <label htmlFor="company">Company</label>
            <div className="dropdown-container">
              <input
                type="text"
                id="company"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setIsDropdownOpen(true);
                  if (!e.target.value) {
                    setSelectedCompany(null);
                  }
                }}
                onFocus={() => setIsDropdownOpen(true)}
                placeholder="Search company..."
              />
              {isDropdownOpen && (
                <div className="dropdown-list">
                  {filteredCompanies.map(company => (
                    <div
                      key={company.id}
                      className="dropdown-item"
                      onClick={() => handleCompanySelect(company)}
                    >
                      <span className="company-name">{company.name}</span>
                    </div>
                  ))}
                  {filteredCompanies.length === 0 && (
                    <div className="dropdown-item no-results">
                      No companies found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            className="add-button"
            onClick={handleAddEmail}
            disabled={!firstName.trim() || !lastName.trim() || !selectedCompany}
          >
            Add
          </button>
        </div>
      </div>

      {/* Real-time Email Preview */}
      <div className="email-preview">
        <h3>Email Preview</h3>
        <div className="preview-email">
          {previewEmail || 'Enter name and select company to see email preview'}
        </div>
      </div>

      {/* Email List */}
      <div className="email-list-section">
        <h3>Generated Emails ({emailList.length})</h3>
        <div className="email-list">
          {emailList.length === 0 ? (
            <div className="empty-state">
              <p>No emails generated yet. Add your first email above.</p>
            </div>
          ) : (
            emailList.map(entry => (
              <div key={entry.id} className="email-item">
                <div className="email-info">
                  <span className="email-address">{entry.email}</span>
                  <span className="email-details">
                    {entry.firstName} {entry.lastName} • {entry.company}
                  </span>
                </div>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteEmail(entry.id)}
                  title="Delete email"
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddRecruiter; 