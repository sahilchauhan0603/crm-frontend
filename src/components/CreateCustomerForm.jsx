import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';

const CreateCustomerForm = ({ onCustomerCreated, onCustomerUpdated, editingCustomer, setEditingCustomer }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    total_spent: 0,
    visits: 1,
    last_active: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    if (editingCustomer) {
      setFormData(editingCustomer);
    }
  }, [editingCustomer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCustomer) {
        await axios.put(`/api/customers/${editingCustomer.email}`, formData);
        onCustomerUpdated(formData);
        alert('Customer updated successfully!');
      } else {
        await axios.post('/api/customers', formData);
        onCustomerCreated(formData);
        alert('Customer created successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          total_spent: 0,
          visits: 1,
          last_active: new Date().toISOString().split('T')[0]
        });
      }
    } catch (error) {
      console.error('Error saving customer:', error);
      alert(`Failed to ${editingCustomer ? 'update' : 'create'} customer.`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
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
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
          disabled={!!editingCustomer}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="total_spent" className="block text-sm font-medium text-gray-700">Total Spent ($)</label>
        <input
          type="number"
          id="total_spent"
          name="total_spent"
          value={formData.total_spent}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="visits" className="block text-sm font-medium text-gray-700">Visits</label>
        <input
          type="number"
          id="visits"
          name="visits"
          value={formData.visits}
          onChange={handleChange}
          min="1"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="last_active" className="block text-sm font-medium text-gray-700">Last Active</label>
        <input
          type="date"
          id="last_active"
          name="last_active"
          value={formData.last_active}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editingCustomer ? 'Update Customer' : 'Create Customer'}
        </button>
        {editingCustomer && (
          <button
            type="button"
            onClick={() => setEditingCustomer(null)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateCustomerForm;