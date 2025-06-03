import React, { useState, useEffect } from 'react';
import { FiDollarSign, FiActivity } from 'react-icons/fi';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const SegmentForm = ({ onSegmentCreated, onSegmentUpdated, editingSegment, setEditingSegment }) => {
  const [formData, setFormData] = useState({
    name: '',
    rules: {
      minSpent: '',
      minVisits: ''
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (editingSegment) {
      setFormData(editingSegment);
    } else {
      setFormData({
        name: '',
        rules: {
          minSpent: '',
          minVisits: ''
        }
      });
    }
  }, [editingSegment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'minSpent' || name === 'minVisits') {
      setFormData({
        ...formData,
        rules: {
          ...formData.rules,
          [name]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingSegment) {
        await axios.put(`/api/segments/${editingSegment.id}`, formData);
        onSegmentUpdated(formData);
        alert('Segment updated successfully!');
      } else {
        const response = await axios.post('/api/segments', formData);
        onSegmentCreated(response.data);
        alert('Segment created successfully!');
        setFormData({
          name: '',
          rules: {
            minSpent: '',
            minVisits: ''
          }
        });
        navigate('/campaigns');
      }
    } catch (error) {
      console.error('Error saving segment:', error);
      alert(`Failed to ${editingSegment ? 'update' : 'create'} segment.`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Segment Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Segment Rules</h3>
        
        <div className="space-y-4">
          <div className="flex items-center">
            <FiDollarSign className="text-gray-400 mr-2" />
            <div className="flex-1">
              <label htmlFor="minSpent" className="block text-xs font-medium text-gray-500">Minimum Amount Spent ($)</label>
              <input
                type="number"
                id="minSpent"
                name="minSpent"
                value={formData.rules.minSpent}
                onChange={handleChange}
                min="0"
                step="0.01"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 1000"
              />
            </div>
          </div>

          <div className="flex items-center">
            <FiActivity className="text-gray-400 mr-2" />
            <div className="flex-1">
              <label htmlFor="minVisits" className="block text-xs font-medium text-gray-500">Minimum Number of Visits</label>
              <input
                type="number"
                id="minVisits"
                name="minVisits"
                value={formData.rules.minVisits}
                onChange={handleChange}
                min="0"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 2"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editingSegment ? 'Update Segment' : 'Create Segment'}
        </button>
        {editingSegment && (
          <button
            type="button"
            onClick={() => setEditingSegment(null)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default SegmentForm;