import React, { useState, useEffect } from 'react';
import SegmentForm from '../components/SegmentForm';
import DynamicRuleBuilder from '../components/DynamicRuleBuilder';
import { FiEdit2, FiTrash2, FiUsers, FiDollarSign, FiActivity } from 'react-icons/fi';
import axios from '../utils/axios';

const SegmentsPage = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingSegment, setEditingSegment] = useState(null);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const response = await axios.get('/api/segments');
        setSegments(response.data);
      } catch (error) {
        console.error('Error fetching segments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSegments();
  }, []);

  const handleSegmentCreated = (newSegment) => {
    setSegments([...segments, newSegment]);
  };

  const handleUpdateSegment = (updatedSegment) => {
    setSegments(segments.map(s => 
      s.id === updatedSegment.id ? updatedSegment : s
    ));
    setEditingSegment(null);
  };

  const handleDeleteSegment = async (segmentId) => {
    try {
      await axios.delete(`/api/segments/${segmentId}`);
      setSegments(segments.filter(segment => segment.id !== segmentId));
    } catch (error) {
      console.error('Error deleting segment:', error);
    }
  };

  // const handleSaveRules = async (rules) => {
  //   try {
  //     const response = await axios.post('/api/segments/rules', { rules });
  //     console.log('Rules saved successfully:', response.data);
  //   } catch (error) {
  //     console.error('Error saving rules:', error);
  //   }
  // };

  const filteredSegments = segments.filter(segment =>
    segment.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customer Segments</h1>
          <p className="text-gray-600 mt-2">
            {segments.length} {segments.length === 1 ? 'segment' : 'segments'} defined
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search segments..."
            className="px-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criteria</th>
                    {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Members</th> */}
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredSegments.length > 0 ? (
                    filteredSegments.map((segment) => (
                      <tr key={segment.id} className="hover:bg-gray-50">
                        
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FiUsers className="text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{segment.name}</div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {segment.rules.minSpent && (
                              <div className="flex items-center">
                                <FiDollarSign className="mr-1 text-green-500" />
                                Min spent: ${segment.rules.minSpent}
                              </div>
                            )}
                            {segment.rules.minVisits && (
                              <div className="flex items-center mt-1">
                                <FiActivity className="mr-1 text-purple-500" />
                                Min visits: {segment.rules.minVisits}
                              </div>
                            )}
                          </div>
                        </td>
                        
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setEditingSegment(segment)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDeleteSegment(segment.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                        No segments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-bold mb-4">
              {editingSegment ? 'Edit Segment' : 'Create New Segment'}
            </h2>
            <SegmentForm 
              onSegmentCreated={handleSegmentCreated}
              onSegmentUpdated={handleUpdateSegment}
              editingSegment={editingSegment}
              setEditingSegment={setEditingSegment}
            />
            {/* <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4">Define Audience Rules</h3>
              <DynamicRuleBuilder onSave={handleSaveRules} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SegmentsPage;