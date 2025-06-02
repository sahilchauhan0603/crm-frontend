import React, { useState, useEffect } from 'react';
import CampaignForm from '../components/CampaignForm';
import { FiEdit2, FiTrash2, FiMail, FiCalendar, FiUsers, FiBarChart2, FiDollarSign, FiActivity } from 'react-icons/fi';
import axios from '../utils/axios';

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingCampaign, setEditingCampaign] = useState(null);
  const [segments, setSegments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [campaignsResponse, segmentsResponse] = await Promise.all([
          axios.get('/api/campaigns'),
          axios.get('/api/segments')
        ]);
        setCampaigns(campaignsResponse.data);
        setSegments(segmentsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCampaignCreated = (newCampaign) => {
    setCampaigns([...campaigns, newCampaign]);
  };

  const handleUpdateCampaign = (updatedCampaign) => {
    setCampaigns(campaigns.map(c => 
      c.campaign_id === updatedCampaign.campaign_id ? updatedCampaign : c
    ));
    setEditingCampaign(null);
  };

  const handleDeleteCampaign = async (campaignId) => {
    try {
      await axios.delete(`/api/campaigns/${campaignId}`);
      setCampaigns(campaigns.filter(campaign => campaign.id !== campaignId));
    } catch (error) {
      console.error('Error deleting campaign:', error);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSegmentName = (segmentId) => {
    const segment = segments.find(s => s.id === segmentId);
    return segment ? segment.name : 'Unknown Segment';
  };

  const getSegmentRule = (segmentId) => {
    const segmentr = segments.find(s => s.id === segmentId);
    try{
      return typeof segmentr === 'string' ? JSON.parse(segmentr.rules) : segmentr.rules;
    } catch (error) {
        console.error('Failed to parse segment rules:', error);
        return {};
    } 
  };

  const renderDeliveryStats = (stats) => (
    <div className="text-sm text-gray-500">
      <div>Audience Size: {stats.audience_size}</div>
      <div>Sent: {stats.sent}</div>
      <div>Failed: {stats.failed}</div>
    </div>
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
          <h1 className="text-3xl font-bold text-gray-800">Marketing Campaigns</h1>
          <p className="text-gray-600 mt-2">
            {campaigns.length} active {campaigns.length === 1 ? 'campaign' : 'campaigns'}
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search campaigns..."
            className="px-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Campaign</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Segment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Stats</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCampaigns.length > 0 ? (
                    filteredCampaigns.map((campaign) => {
                      const segment = segments.find(s => s.id === campaign.segment_id);
                      const rules = segment ? getSegmentRule(campaign.segment_id) : {};

                      console.log('Segment:', segment);
                      console.log('Rules:', rules);

                      return (
                        <tr key={campaign.id} className="hover:bg-gray-50">
                          
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <FiMail className="text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{campaign.message}</div>
                                <div className="text-sm text-gray-500 flex items-center mt-1">
                                  <FiCalendar className="mr-1" />
                                  {new Date().toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">
                              {getSegmentName(campaign.segment_id)}
                            </div>
                          </td>

                          <td className="px-2 py-4">
                            <div className="text-sm text-gray-500">
                              {rules.minSpent ? (
                                <div className="flex items-center">
                                  <FiDollarSign className="mr-1 text-green-500" />
                                  Min spent: ${rules.minSpent}
                                </div>
                              ) : (
                                <div>No spending criteria</div>
                              )}
                              {rules.minVisits ? (
                                <div className="flex items-center mt-1">
                                  <FiActivity className="mr-1 text-purple-500" />
                                  Min visits: {rules.minVisits}
                                </div>
                              ) : (
                                <div>No visit criteria</div>
                              )}
                            </div>
                          </td>

                          <td className="px-2 py-4">
                            {renderDeliveryStats(campaign.deliveryStats)}
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <button
                              onClick={() => setEditingCampaign(campaign)}
                              className="text-blue-600 hover:text-blue-900 mr-4"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={() => handleDeleteCampaign(campaign.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No campaigns found
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
              {editingCampaign ? 'Edit Campaign' : 'Create New Campaign'}
            </h2>
            <CampaignForm 
              onCampaignCreated={handleCampaignCreated}
              onCampaignUpdated={handleUpdateCampaign}
              editingCampaign={editingCampaign}
              setEditingCampaign={setEditingCampaign}
              segments={segments}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignsPage;