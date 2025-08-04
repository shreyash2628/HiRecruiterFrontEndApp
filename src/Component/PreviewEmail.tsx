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

const PreviewEmail = () => {
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="content-section">
      <h2>Email Preview</h2>
      <p>Preview your email template before sending</p>

      <div className="preview-section">
        {/* Email Preview Container */}
        <div className="email-preview-container">
          <div className="email-preview-header">
            <strong>Subject:</strong> {emailTemplate.subject}
          </div>
          <div className="email-preview-content">
            <div className="email-body-preview">
              {emailTemplate.body.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
            {resumeFile && (
              <div className="attachment-preview">
                <span className="attachment-icon">📎</span>
                <div className="attachment-details">
                  <span className="attachment-name">{resumeFile.name}</span>
                  <span className="attachment-size">{formatFileSize(resumeFile.size)}</span>
                </div>
              </div>
            )}
            <div className="signature-preview">
              {emailTemplate.signature.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        </div>

        {/* Preview Actions */}
        <div className="preview-actions">
          <button className="send-button">📤 Send Email</button>
          <button className="edit-button">✏️ Edit Template</button>
          <button className="download-button">📥 Download Email</button>
        </div>
      </div>
    </div>
  );
};

export default PreviewEmail; 