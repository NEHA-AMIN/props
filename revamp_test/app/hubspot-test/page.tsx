'use client';

import { useState } from 'react';
import { submitContactToHubspot } from '@/app/actions/hubspot';

export default function HubSpotTestPage() {
  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testSubmission = async () => {
    setIsLoading(true);
    setResult('Submitting...');

    try {
      const formData = new FormData();
      formData.append('name', 'Test User');
      formData.append('email', 'test@example.com');
      formData.append('company', 'Test Company');
      formData.append('message', 'This is a test message from the debug page');
      formData.append('pageUri', window.location.href);

      const response = await submitContactToHubspot(formData);
      
      if (response.success) {
        setResult('✅ SUCCESS! Form submitted to HubSpot. Check your terminal logs and HubSpot dashboard.');
      } else {
        setResult(`❌ FAILED: ${response.message}`);
      }
    } catch (error: any) {
      setResult(`❌ ERROR: ${error.message}`);
      console.error('Test error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-teal-400">HubSpot Integration Test Page</h1>
        
        <div className="bg-slate-900 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Environment Variables</h2>
          <div className="space-y-2 font-mono text-sm">
            <p>✅ Portal ID: Set (check terminal for value)</p>
            <p>✅ Form GUID: Set (check terminal for value)</p>
          </div>
        </div>

        <div className="bg-slate-900 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Test Data</h2>
          <div className="space-y-2 font-mono text-sm">
            <p>Name: Test User</p>
            <p>Email: test@example.com</p>
            <p>Company: Test Company</p>
            <p>Message: This is a test message from the debug page</p>
          </div>
        </div>

        <button
          onClick={testSubmission}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-teal-400 to-teal-600 text-white font-bold py-4 px-6 rounded-lg hover:shadow-lg hover:shadow-teal-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
        >
          {isLoading ? 'Submitting...' : 'Test HubSpot Submission'}
        </button>

        {result && (
          <div className={`bg-slate-900 rounded-lg p-6 ${result.includes('✅') ? 'border-2 border-green-500' : 'border-2 border-red-500'}`}>
            <h2 className="text-2xl font-bold mb-4">Result</h2>
            <p className="text-lg">{result}</p>
          </div>
        )}

        <div className="bg-slate-900 rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4">Debug Checklist</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5" />
              <span>Check terminal for detailed logs</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5" />
              <span>Look for "=== HubSpot Submission Debug ===" in terminal</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5" />
              <span>Check HubSpot Dashboard → Contacts → Contacts</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5" />
              <span>Check HubSpot form submissions (Marketing → Forms → Your Form → Submissions)</span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5" />
              <span>Verify form fields match in HubSpot (firstname, lastname, email, company, message)</span>
            </label>
          </div>
        </div>

        <div className="bg-yellow-900/30 border border-yellow-500 rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4 text-yellow-400">Common Issues</h2>
          <ul className="space-y-3 list-disc list-inside">
            <li><strong>Form fields don't match:</strong> Make sure your HubSpot form has fields named exactly: firstname, lastname, email, company, message</li>
            <li><strong>Form not published:</strong> Ensure your HubSpot form is published (not draft)</li>
            <li><strong>Wrong credentials:</strong> Double-check Portal ID and Form GUID in .env file</li>
            <li><strong>CORS errors:</strong> This shouldn't happen with server actions, but check browser console</li>
            <li><strong>Form is for a different property:</strong> Make sure you're using the right HubSpot account</li>
          </ul>
        </div>

        <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-6 mt-6">
          <h2 className="text-2xl font-bold mb-4 text-blue-400">What to Check in HubSpot</h2>
          <ol className="space-y-3 list-decimal list-inside">
            <li>Go to HubSpot Dashboard</li>
            <li>Click <strong>Marketing</strong> → <strong>Lead Capture</strong> → <strong>Forms</strong></li>
            <li>Find your form and click on it</li>
            <li>Click <strong>Actions</strong> → <strong>View submissions</strong></li>
            <li>You should see test submissions appearing here</li>
            <li>Also check <strong>Contacts</strong> → <strong>Contacts</strong> to see if contact was created</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
