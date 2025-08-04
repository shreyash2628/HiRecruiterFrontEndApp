import { useState } from 'react';
import './Dashboard.css';

interface EmailTemplate {
  subject: string;
  body: string;
  signature: string;
}

interface ResumeFile {
  name: string;
  size: number;
  type: string;
  url: string;
}

const EmailTemplates = () => {
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate>({
    subject: 'Application for Software Engineer Position',
    body: `Dear Hiring Manager,

I hope this email finds you well. I am writing to express my interest in the Software Engineer position at your company.

I am a passionate software developer with experience in modern web technologies and a strong foundation in problem-solving and collaborative development.

I have attached my resume for your review. I would welcome the opportunity to discuss how my skills and experience can contribute to your team.

Thank you for considering my application.

Best regards,
[Your Name]`,
    signature: `Best regards,
[Your Name]
[Your Phone Number]
[Your Email]`
  });

  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);

  const handleInputChange = (field: keyof EmailTemplate, value: string) => {
    setEmailTemplate(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      if (!file.type.includes('pdf') && !file.type.includes('doc') && !file.type.includes('docx')) {
        alert('Please upload a PDF, DOC, or DOCX file.');
        return;
      }

      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB.');
        return;
      }

      const fileUrl = URL.createObjectURL(file);
      setResumeFile({
        name: file.name,
        size: file.size,
        type: file.type,
        url: fileUrl
      });
    }
  };

  const removeResume = () => {
    if (resumeFile) {
      URL.revokeObjectURL(resumeFile.url);
      setResumeFile(null);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleAttachResume = () => {
    if (resumeFile) {
      // If resume is already attached, remove it
      removeResume();
    } else {
      // If no resume is attached, trigger file upload
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = '.pdf,.doc,.docx';
      fileInput.onchange = (event) => {
        const target = event.target as HTMLInputElement;
        if (target.files && target.files[0]) {
          const file = target.files[0];
          // Check file type
          if (!file.type.includes('pdf') && !file.type.includes('doc') && !file.type.includes('docx')) {
            alert('Please upload a PDF, DOC, or DOCX file.');
            return;
          }

          // Check file size (5MB limit)
          if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB.');
            return;
          }

          const fileUrl = URL.createObjectURL(file);
          setResumeFile({
            name: file.name,
            size: file.size,
            type: file.type,
            url: fileUrl
          });
        }
      };
      fileInput.click();
    }
  };

  return (
    <div className="content-section">
      <h2>Email Template Builder</h2>
      <p>Create professional email templates for your job applications</p>

      <div className="template-section">
        {/* Subject Line */}
        <div className="template-group">
          <label htmlFor="subject">Subject Line</label>
          <input
            type="text"
            id="subject"
            value={emailTemplate.subject}
            onChange={(e) => handleInputChange('subject', e.target.value)}
            placeholder="Enter email subject"
            className="template-input"
          />
        </div>

        {/* Email Body */}
        <div className="template-group">
          <label htmlFor="body">Email Body</label>
          <textarea
            id="body"
            value={emailTemplate.body}
            onChange={(e) => handleInputChange('body', e.target.value)}
            placeholder="Enter your email content"
            className="template-textarea"
            rows={12}
          />
        </div>

        {/* Signature */}
        <div className="template-group">
          <label htmlFor="signature">Email Signature</label>
          <textarea
            id="signature"
            value={emailTemplate.signature}
            onChange={(e) => handleInputChange('signature', e.target.value)}
            placeholder="Enter your email signature"
            className="template-textarea"
            rows={6}
          />
        </div>

        {/* Action Buttons */}
        <div className="template-actions">
          <button className="save-button">Save Template</button>
          <button className="preview-button">Preview Email</button>
          <button 
            className={`attach-button ${resumeFile ? 'attached' : ''}`}
            onClick={handleAttachResume}
          >
            {resumeFile ? '📎 Resume Attached' : '📎 Attach Resume'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailTemplates; 