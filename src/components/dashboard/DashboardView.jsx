import React from 'react';
import { Download, Share2, Filter, Calendar, RefreshCcw, Lightbulb, ChevronDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { salesData, productData, regionData } from '../../mockData/sampleData';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardView = ({ onReset }) => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white p-4 shadow-sm flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">DataInsight AI</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button className="bg-gray-100 px-3 py-1.5 rounded-md text-gray-600 text-sm flex items-center">
            <Calendar size={16} className="mr-1" /> Last 12 Months
          </button>
          <button className="bg-gray-100 px-3 py-1.5 rounded-md text-gray-600 text-sm flex items-center">
            <RefreshCcw size={16} className="mr-1" /> Refresh Data
          </button>
          <button className="bg-blue-600 px-4 py-1.5 rounded-md text-white text-sm flex items-center">
            <Download size={16} className="mr-1" /> Export
          </button>
        </div>
      </div>
      
      {/* Dashboard Title */}
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Sales Performance Dashboard</h2>
            <p className="text-gray-600">Based on sales_data_2024.csv • Last updated: April 22, 2025</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-gray-300 bg-white px-4 py-2 rounded-md text-gray-700 text-sm flex items-center">
              <Share2 size={16} className="mr-2" /> Share
            </button>
            <button className="border border-gray-300 bg-white px-4 py-2 rounded-md text-gray-700 text-sm flex items-center">
              <Filter size={16} className="mr-2" /> Filter
            </button>
          </div>
        </div>
        
        {/* Top Insights Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
            <p className="text-sm text-gray-500 mb-1">Total Sales</p>
            <h3 className="text-2xl font-bold">$1.28M</h3>
            <p className="text-sm text-green-600">↑ 12.4% vs Last Period</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
            <p className="text-sm text-gray-500 mb-1">Average Order Value</p>
            <h3 className="text-2xl font-bold">$892</h3>
            <p className="text-sm text-green-600">↑ 3.2% vs Last Period</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
            <p className="text-sm text-gray-500 mb-1">Conversion Rate</p>
            <h3 className="text-2xl font-bold">24.8%</h3>
            <p className="text-sm text-red-600">↓ 1.5% vs Last Period</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-amber-500">
            <p className="text-sm text-gray-500 mb-1">Top Performing Region</p>
            <h3 className="text-2xl font-bold">North</h3>
            <p className="text-sm text-gray-600">42% of Total Sales</p>
          </div>
        </div>
        
        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Sales Trend Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Sales Trend vs Target</h3>
              <button className="text-xs text-gray-500 flex items-center">
                Last 7 Months <ChevronDown size={14} className="ml-1" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeWidth={2} dot={{ r: 4 }} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Region Distribution Chart */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Sales by Region</h3>
              <button className="text-xs text-gray-500 flex items-center">
                All Regions <ChevronDown size={14} className="ml-1" />
              </button>
            </div>
            <div className="h-64 flex items-center justify-center">
              <div className="w-64">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={regionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {regionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Performance Chart */}
          <div className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Product Performance</h3>
              <button className="text-xs text-gray-500 flex items-center">
                All Products <ChevronDown size={14} className="ml-1" />
              </button>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" barSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Key Insights Panel */}
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Key Insights</h3>
              <button className="text-xs text-blue-600">View All</button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Lightbulb size={18} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">North region consistently outperforms all other regions by 32%</p>
                  <p className="text-xs text-gray-500 mt-1">Suggested Action: Analyze North region sales strategies</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Lightbulb size={18} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">Tuesday shows highest conversion rate (34.2%)</p>
                  <p className="text-xs text-gray-500 mt-1">Suggested Action: Increase promotion budget on Tuesdays</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Lightbulb size={18} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">Widget A + C frequently purchased together</p>
                  <p className="text-xs text-gray-500 mt-1">Suggested Action: Create bundle offer for these products</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Lightbulb size={18} className="text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-gray-800 font-medium">Sales dropped consistently during weekends</p>
                  <p className="text-xs text-gray-500 mt-1">Suggested Action: Test weekend-specific promotions</p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-100">
                <button 
                  className="w-full py-2 bg-blue-50 text-blue-600 rounded-md text-sm font-medium hover:bg-blue-100 transition-all"
                >
                  Generate More Insights
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <button
            onClick={onReset}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-all text-sm font-medium"
          >
            Start New Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardView;