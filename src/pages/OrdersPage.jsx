import React, { useState, useEffect } from 'react';
import CreateOrderForm from '../components/CreateOrderForm';
import { FiEdit2, FiTrash2, FiDollarSign, FiShoppingCart, FiCalendar, FiUser } from 'react-icons/fi';
import axios from '../utils/axios';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingOrder, setEditingOrder] = useState(null);
  const [customers, setCustomers] = useState([]);

  // Fetch orders and customers on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, customersResponse] = await Promise.all([
          axios.get('/api/orders'),
          axios.get('/api/customers')
        ]);
        setOrders(ordersResponse.data);
        setCustomers(customersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleOrderPlaced = (newOrder) => {
    setOrders([...orders, newOrder]);
  };

  const handleUpdateOrder = (updatedOrder) => {
    setOrders(orders.map(o => 
      o.order_id === updatedOrder.order_id ? updatedOrder : o
    ));
    setEditingOrder(null);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`/api/orders/${orderId}`);
      setOrders(orders.filter(order => order.order_id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const filteredOrders = orders.filter(order => {
    const customer = customers.find(c => c.id === order.customer_id);
    const customerName = customer ? customer.name.toLowerCase() : '';
    return (
      (order.order_id?.toString() || '').includes(searchTerm.toLowerCase()) ||
      customerName.includes(searchTerm.toLowerCase())
    );
  });

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : 'Unknown Customer';
  };

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
          <h1 className="text-3xl font-bold text-gray-800">Order Management</h1>
          <p className="text-gray-600 mt-2">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'} in your system
          </p>
        </div>
        <div className="mt-4 md:mt-0 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search orders..."
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <tr key={order.order_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <FiShoppingCart className="text-blue-600" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">Order #{order.id}</div>
                              <div className="text-sm text-gray-500">1 item</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FiUser className="text-gray-400 mr-2" />
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {getCustomerName(order.customer_id)}
                              </div>
                              <div className="text-sm text-gray-500">
                                ID: {order.customer_id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-semibold text-gray-900 flex items-center">
                            <FiDollarSign className="mr-1" />
                            {(Number(order.amount) || 0).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500 flex items-center">
                            <FiCalendar className="mr-1" />
                            {new Date().toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => setEditingOrder(order)}
                            className="text-blue-600 hover:text-blue-900 mr-4"
                          >
                            <FiEdit2 />
                          </button>
                          <button
                            onClick={() => handleDeleteOrder(order.order_id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                        No orders found
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
              {editingOrder ? 'Edit Order' : 'Create New Order'}
            </h2>
            <CreateOrderForm 
              onOrderPlaced={handleOrderPlaced}
              onOrderUpdated={handleUpdateOrder}
              editingOrder={editingOrder}
              setEditingOrder={setEditingOrder}
              customers={customers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;