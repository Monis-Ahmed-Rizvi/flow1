import React, { useState } from 'react';
import { Upload, FileType } from 'lucide-react';
import { mockCSVData } from '../../mockData/sampleData';

const LandingPage = ({ onFileUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  
  // Handle drag events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Handle drop event
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // For demo purposes, we'll use mock data instead of real file
      handleMockUpload();
    }
  };
  
  // Handle file input change
  const handleChange = (e) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      // For demo purposes, we'll use mock data instead of real file
      handleMockUpload();
    }
  };
  
  // Mock file upload function
  const handleMockUpload = () => {
    // Simulate processing time
    setTimeout(() => {
      onFileUpload(mockCSVData);
    }, 800);
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl font-bold text-blue-600 mb-2">DataInsight AI</h1>
          <p className="text-lg text-gray-600">Automated analysis and insights for your data</p>
        </div>
        
        {/* Upload Area */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div 
            className={`flex flex-col items-center justify-center border-2 ${dragActive ? "border-blue-500 bg-blue-50" : "border-dashed border-gray-300"} rounded-lg p-12 cursor-pointer hover:bg-gray-50 transition-all`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-upload').click()}
          >
            <input 
              type="file" 
              id="file-upload" 
              accept=".csv" 
              onChange={handleChange} 
              className="hidden" 
            />
            <div className="bg-blue-100 p-4 rounded-full mb-4">
              <Upload size={48} className="text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Upload your CSV file</h2>
            <p className="text-gray-500 text-center mb-4">Drag and drop your file here or click to browse</p>
            <button 
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-all"
              onClick={(e) => { 
                e.stopPropagation(); 
                document.getElementById('file-upload').click(); 
              }}
            >
              Select File
            </button>
          </div>
          <div className="mt-4 text-center text-sm text-gray-500">
            Supported format: CSV (up to 100MB)
          </div>
        </div>
        
        {/* Features Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-green-100 p-3 rounded-full inline-block mb-3">
              <FileType size={24} className="text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Model Recommendations</h3>
            <p className="text-gray-600 text-sm">Get AI-powered suggestions for the best analysis models for your data</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-purple-100 p-3 rounded-full inline-block mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-600">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Visualization Suggestions</h3>
            <p className="text-gray-600 text-sm">Discover the most effective charts and graphs for your data</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <div className="bg-blue-100 p-3 rounded-full inline-block mb-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-600">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3 className="font-semibold mb-2">Automated Insights</h3>
            <p className="text-gray-600 text-sm">Get instant, meaningful insights from your data without coding</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;