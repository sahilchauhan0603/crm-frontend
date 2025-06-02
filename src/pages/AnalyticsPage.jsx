import React, { useEffect, useState } from 'react';
import { FiBarChart2, FiUsers, FiMail, FiTarget, FiCheckCircle } from 'react-icons/fi';
import axios from '../utils/axios';
import useChatbase from './../hooks/useChatbase';

const iconMap = {
  FiUsers: <FiUsers />,
  FiMail: <FiMail />,
  FiTarget: <FiTarget />,
  FiCheckCircle: <FiCheckCircle />,
};

const AnalyticsPage = () => {
  useChatbase();
  const [summaryData, setSummaryData] = useState([]);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        const response = await axios.get('/api/analytics/summary');
        const mappedData = response.data.map((data) => ({
          ...data,
          icon: iconMap[data.icon] || null,
        }));
        setSummaryData(mappedData);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    fetchSummaryData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">Website Analytics</h1>
        <p className="text-lg text-gray-600 mb-12 text-center">
          Gain insights into the performance and usage of CRM Xeno.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {summaryData.map((data, index) => (
            <div key={index} className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-center mb-4">
                {data.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2 text-center">{data.title}</h3>
              <p className="text-3xl font-bold text-center text-blue-600 mb-2">{data.value}</p>
              <p className="text-sm text-gray-500 text-center">{data.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Summary of CRM Xeno</h2>
          <p className="text-lg text-gray-600 mb-8 text-center">
            CRM Xeno empowers businesses to manage customer relationships, create impactful campaigns, and gain actionable insights.
          </p>
          <ul className="space-y-4 text-gray-700 text-lg">
            <li>✔️ Intuitive customer management interface.</li>
            <li>✔️ Advanced segmentation and targeting tools.</li>
            <li>✔️ Real-time analytics and reporting.</li>
            <li>✔️ Seamless order tracking and fulfillment.</li>
            <li>✔️ Comprehensive communication logs.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
