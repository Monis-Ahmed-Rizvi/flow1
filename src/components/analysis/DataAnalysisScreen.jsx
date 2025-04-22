import React, { useState, useEffect } from 'react';
import { BarChart4, LineChart, PieChart, Lightbulb, ArrowRight, ChevronDown } from 'lucide-react';
import Papa from 'papaparse';

const DataAnalysisScreen = ({ csvData, onContinue }) => {
  const [parsedData, setParsedData] = useState([]);
  const [summary, setSummary] = useState({});
  const [columnTypes, setColumnTypes] = useState({});
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  
  useEffect(() => {
    if (csvData) {
      // Parse CSV data
      const results = Papa.parse(csvData, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
      });
      
      setParsedData(results.data);
      
      // Simulate analysis
      setTimeout(() => {
        // Analyze data and set summary
        const dataSummary = {
          rows: results.data.length,
          columns: Object.keys(results.data[0] || {}).length,
          missingValues: countMissingValues(results.data),
          duplicateRows: 0
        };
        
        // Detect column types
        const types = detectColumnTypes(results.data, Object.keys(results.data[0] || {}));
        
        setSummary(dataSummary);
        setColumnTypes(types);
        setIsAnalyzing(false);
        setAnalysisComplete(true);
      }, 2000);
    }
  }, [csvData]);
  
  const countMissingValues = (data) => {
    let count = 0;
    data.forEach(row => {
      Object.values(row).forEach(value => {
        if (value === null || value === undefined || value === '') {
          count++;
        }
      });
    });
    return count;
  };
  
  const detectColumnTypes = (data, columns) => {
    const types = {
      numeric: 0,
      categorical: 0,
      datetime: 0,
      columns: {}
    };
    
    columns.forEach(column => {
      const values = data.map(row => row[column]).filter(val => val !== null && val !== undefined && val !== '');
      
      if (values.length === 0) {
        types.columns[column] = 'unknown';
        types.categorical++;
        return;
      }
      
      // Check if datetime
      const datePattern = /^\d{4}[-/]\d{1,2}[-/]\d{1,2}|^\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/;
      if (typeof values[0] === 'string' && datePattern.test(values[0])) {
        types.columns[column] = 'datetime';
        types.datetime++;
        return;
      }
      
      // Check if numeric
      if (typeof values[0] === 'number') {
        types.columns[column] = 'numeric';
        types.numeric++;
        return;
      }
      
      // Default to categorical
      types.columns[column] = 'categorical';
      types.categorical++;
    });
    
    return types;
  };
  
  return (
    <div className="bg-gray-50 min-h-screen p-4">
      {/* Header */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">DataInsight AI</h1>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">sales_data_2024.csv</span>
          <button className="bg-gray-100 px-3 py-1 rounded-md text-gray-600 text-sm">Change File</button>
        </div>
      </div>
      
      {/* Analysis Status */}
      {isAnalyzing ? (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-6">
          <div className="mb-6">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Analyzing your data...</h2>
          <p className="text-gray-500">This will take just a moment</p>
          
          <div className="mt-6 bg-gray-100 rounded-lg p-4 text-left w-full max-w-md mx-auto">
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mr-2">✓</div>
              <span className="text-sm">Reading file: sales_data_2024.csv</span>
            </div>
            <div className="flex items-center mb-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center mr-2">✓</div>
              <span className="text-sm">Parsing CSV structure</span>
            </div>
            <div className="flex items-center mb-2">
              <div className={`w-6 h-6 rounded-full ${isAnalyzing ? 'bg-white border-2 border-blue-600 border-t-transparent animate-spin' : 'bg-blue-600 text-white text-xs flex items-center justify-center'} mr-2`}>
                {!isAnalyzing && '✓'}
              </div>
              <span className="text-sm">Analyzing data patterns</span>
            </div>
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded-full ${analysisComplete ? 'bg-blue-600 text-white text-xs flex items-center justify-center' : 'bg-gray-300'} mr-2`}>
                {analysisComplete && '✓'}
              </div>
              <span className="text-sm">Generating recommendations</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Data Summary</h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Rows</span>
                    <span className="font-medium">{summary.rows}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Columns</span>
                    <span className="font-medium">{summary.columns}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Missing Values</span>
                    <span className="font-medium">{summary.missingValues} ({((summary.missingValues / (summary.rows * summary.columns)) * 100).toFixed(2)}%)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Duplicate Rows</span>
                    <span className="font-medium">{summary.duplicateRows}</span>
                  </div>
                </div>
                
                <div className="pt-3 border-t border-gray-100">
                  <h3 className="text-sm font-medium mb-2">Column Types</h3>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-600 mr-1">Numeric:</span>
                    <span className="text-sm font-medium">{columnTypes.numeric}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600 mr-1">Categorical:</span>
                    <span className="text-sm font-medium">{columnTypes.categorical}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm text-gray-600 mr-1">Date/Time:</span>
                    <span className="text-sm font-medium">{columnTypes.datetime}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Data Preview</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      {parsedData.length > 0 && Object.keys(parsedData[0]).slice(0, 4).map((column, index) => (
                        <th key={index} className="px-3 py-2 text-left font-medium text-gray-600">{column}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {parsedData.slice(0, 4).map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-t border-gray-100">
                        {Object.keys(row).slice(0, 4).map((column, colIndex) => (
                          <td key={colIndex} className="px-3 py-2">{row[column]?.toString()}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-3 text-center">
                <button className="text-blue-600 text-sm font-medium">View Full Data</button>
              </div>
            </div>
          </div>
          
          {/* Right Panel */}
          <div className="w-full lg:w-2/3">
            {/* Analysis Models Recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Recommended Analysis Models</h2>
                <button className="text-sm text-blue-600 font-medium">View All</button>
              </div>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer">
                  <div className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-lg mr-4">
                      <LineChart size={24} className="text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold mb-1">Time Series Analysis</h3>
                        <span className="text-sm bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Highly Recommended</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Your data has strong temporal patterns with seasonal trends in sales. Time series forecasting could predict future performance.</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Accuracy: <span className="text-gray-700 font-medium">94%</span></span>
                        <button 
                          className="flex items-center text-sm text-blue-600 font-medium"
                        >
                          Apply Model <ArrowRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-200 hover:bg-blue-50 transition-all cursor-pointer">
                  <div className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-lg mr-4">
                      <BarChart4 size={24} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold mb-1">Regression Analysis</h3>
                        <span className="text-sm bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Recommended</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Identify relationships between sales and other variables like marketing spend, region, or product type.</p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">Accuracy: <span className="text-gray-700 font-medium">88%</span></span>
                        <button 
                          className="flex items-center text-sm text-blue-600 font-medium"
                        >
                          Apply Model <ArrowRight size={16} className="ml-1" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visualization Recommendations */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Visualization Suggestions</h2>
                <button className="text-sm text-blue-600 font-medium">View All</button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-200 hover:bg-purple-50 transition-all cursor-pointer">
                  <div className="flex items-center mb-2">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <LineChart size={20} className="text-purple-600" />
                    </div>
                    <h3 className="font-semibold">Sales Trend Over Time</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">A line chart showing sales fluctuations over the past 12 months with trend analysis.</p>
                  <button 
                    className="w-full py-1.5 border border-purple-600 text-purple-600 rounded-md text-sm font-medium hover:bg-purple-600 hover:text-white transition-all"
                  >
                    Add to Dashboard
                  </button>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-200 hover:bg-purple-50 transition-all cursor-pointer">
                  <div className="flex items-center mb-2">
                    <div className="bg-purple-100 p-2 rounded-lg mr-3">
                      <PieChart size={20} className="text-purple-600" />
                    </div>
                    <h3 className="font-semibold">Sales by Region</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">A pie chart showing the distribution of sales across different geographic regions.</p>
                  <button 
                    className="w-full py-1.5 border border-purple-600 text-purple-600 rounded-md text-sm font-medium hover:bg-purple-600 hover:text-white transition-all"
                  >
                    Add to Dashboard
                  </button>
                </div>
              </div>
            </div>
            
            {/* Automated Insights */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Automated Insights</h2>
                <button className="text-sm text-blue-600 font-medium">Generate More</button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start border-l-4 border-amber-400 pl-4 py-1">
                  <Lightbulb size={20} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Sales Spike on Tuesdays</h3>
                    <p className="text-sm text-gray-600">Sales consistently peak on Tuesdays, showing a 27% increase compared to other weekdays.</p>
                  </div>
                </div>
                
                <div className="flex items-start border-l-4 border-amber-400 pl-4 py-1">
                  <Lightbulb size={20} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Regional Performance Gap</h3>
                    <p className="text-sm text-gray-600">The North region consistently outperforms other regions by 32%, suggesting successful strategies that could be applied elsewhere.</p>
                  </div>
                </div>
                
                <div className="flex items-start border-l-4 border-amber-400 pl-4 py-1">
                  <Lightbulb size={20} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium mb-1">Product Cross-Selling Opportunity</h3>
                    <p className="text-sm text-gray-600">Customers who purchase Widget A are 3.5x more likely to also purchase Widget C within 30 days.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all text-sm font-medium flex items-center"
                  onClick={onContinue}
                >
                  Create Dashboard
                  <ArrowRight size={16} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataAnalysisScreen;