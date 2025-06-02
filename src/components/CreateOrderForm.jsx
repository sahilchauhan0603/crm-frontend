import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { FiUser, FiShoppingCart, FiDollarSign, FiCalendar } from 'react-icons/fi';

const CreateOrderForm = ({ onOrderPlaced, onOrderUpdated, editingOrder, setEditingOrder, customers }) => {
  const [formData, setFormData] = useState({
    customer_id: '',
    amount: 0,
    order_date: new Date().toISOString().split('T')[0],
    status: 'pending'
  });

  useEffect(() => {
    if (editingOrder) {
      setFormData(editingOrder);
    }
  }, [editingOrder]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingOrder) {
        await axios.put(`/api/orders/${editingOrder.order_id}`, formData);
        onOrderUpdated(formData);
        alert('Order updated successfully!');
      } else {
        const response = await axios.post('/api/orders', formData);
        onOrderPlaced(response.data); // Trigger callback for new order creation
        alert('Order created successfully!');
        setFormData({
          customer_id: '',
          amount: 0,
          order_date: new Date().toISOString().split('T')[0],
          status: 'pending'
        });
      }
    } catch (error) {
      console.error('Error saving order:', error);
      alert(`Failed to ${editingOrder ? 'update' : 'create'} order.`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="customer_id" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          <FiUser className="mr-2" /> Customer
        </label>
        <select
          id="customer_id"
          name="customer_id"
          value={formData.customer_id}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="">Select a customer</option>
          {customers.map(customer => (
            <option key={`customer-${customer.id}`} value={customer.id}>
              {customer.name} (ID: {customer.id})
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          <FiDollarSign className="mr-2" /> Amount
        </label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="order_date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          <FiCalendar className="mr-2" /> Order Date
        </label>
        <input
          type="date"
          id="order_date"
          name="order_date"
          value={formData.order_date}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
          <FiShoppingCart className="mr-2" /> Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        >
          <option value="pending">Pending</option>
          <option value="processing">Processing</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="flex justify-between">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {editingOrder ? 'Update Order' : 'Create Order'}
        </button>
        {editingOrder && (
          <button
            type="button"
            onClick={() => setEditingOrder(null)}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default CreateOrderForm;