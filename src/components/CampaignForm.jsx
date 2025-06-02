import React, { useState, useEffect } from 'react';
import { FiMail, FiUsers, FiCalendar, FiDollarSign, FiActivity } from 'react-icons/fi';
import axios from '../utils/axios';
import MessageSuggestions from './MessageSuggestions';

const CampaignForm = ({ onCampaignCreated, onCampaignUpdated, editingCampaign, setEditingCampaign, segments, campaignObjective }) => {
  const [formData, setFormData] = useState({
    segment_id: '',
    message: '',
    segmentRules: JSON.stringify({
      minSpent: '',
      minVisits: ''
    })
  });

  useEffect(() => {
    if (editingCampaign) {
      setFormData(editingCampaign);
    } else {
      setFormData({
        segment_id: '',
        message: '',
        segmentRules: JSON.stringify({
          minSpent: '',
          minVisits: ''
        })
      });
    }
  }, [editingCampaign]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minSpent' || name === 'minVisits') {
      const rules = JSON.parse(formData.segmentRules);
      setFormData({
        ...formData,
        segmentRules: JSON.stringify({
          ...rules,
          [name]: value
        })
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSegmentChange = (e) => {
    const segmentId = e.target.value;
    const selectedSegment = segments.find(s => s.segment_id == segmentId);
    
    setFormData({
      ...formData,
      segment_id: segmentId,
      segmentRules: selectedSegment ? selectedSegment.rules : JSON.stringify({
        minSpent: '',
        minVisits: ''
      })
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCampaign) {
        await axios.put(`/api/campaigns/${editingCampaign.campaign_id}`, formData);
        onCampaignUpdated(formData);
        alert('Campaign updated successfully!');
      } else {
        const response = await axios.post('/api/campaigns', formData);
        onCampaignCreated(response.data);
        alert('Campaign created successfully!');
        setFormData({
          segment_id: '',
          message: '',
          segmentRules: JSON.stringify({
            minSpent: '',
            minVisits: ''
          })
        });
      }
    } catch (error) {
      console.error('Error saving campaign:', error);
      alert(`Failed to ${editingCampaign ? 'update' : 'create'} campaign.`);
    }
  };

  const currentRules = JSON.parse(formData.segmentRules || '{}');

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="segment_id" className="flex text-sm font-medium text-gray-700 mb-1 items-center">
          <FiUsers className="mr-2" /> Target Segment
        </label>
        <select
          id="segment_id"
          name="segment_id"
          value={formData.segment_id}
          onChange={handleSegmentChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select a segment</option>
          {segments.map(segment => (
            <option key={segment.id} value={segment.id}>
              {segment.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="flex text-sm font-medium text-gray-700 mb-1 items-center">
          <FiMail className="mr-2" /> Campaign Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="3"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
          placeholder="Special offer for our valued customers..."
        ></textarea>
      </div>

      <MessageSuggestions campaignObjective={campaignObjective} />

      {formData.segment_id && (
        <div className="mb-4 bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Segment Rules</h3>
          <div className="space-y-3">
            {currentRules.minSpent !== undefined && (
              <div className="flex items-center">
                <FiDollarSign className="text-gray-400 mr-2" />
                <div className="flex-1">
                  <label htmlFor="minSpent" className="block text-xs font-medium text-gray-500">Minimum Amount Spent ($)</label>
                  <input
                    type="number"
                    id="minSpent"
                    name="minSpent"
                    value={currentRules.minSpent || ''}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled
                  />
                </div>
              </div>
            )}
            {currentRules.minVisits !== undefined && (
              <div className="flex items-center">
                <FiActivity className="text-gray-400 mr-2" />
                <div className="flex-1">
                  <label htmlFor="minVisits" className="block text-xs font-medium text-gray-500">Minimum Number of Visits</label>
                  <input
                    type="number"
                    id="minVisits"
                    name="minVisits"
                    value={currentRules.minVisits || ''}
                    onChange={handleChange}
                    min="0"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    disabled
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editingCampaign ? 'Update Campaign' : 'Create Campaign'}
        </button>
        {editingCampaign && (
          <button
            type="button"
            onClick={() => setEditingCampaign(null)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CampaignForm;