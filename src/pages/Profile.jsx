import React from 'react';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { FiUser, FiMail, FiCalendar, FiMapPin, FiPhone, FiEdit2, FiLogOut } from 'react-icons/fi';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Profile = () => {
  const { user, isAuthenticated, logout } = useKindeAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please log in to view your profile</p>
          <a 
            href="/login" 
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const profileItems = [
    {
      icon: <FiMail className="text-blue-500" />,
      label: "Email",
      value: user.email || 'Not provided'
    },
    {
      icon: <FiCalendar className="text-purple-500" />,
      label: "Member since",
      value: formatDate(user.created_at)
    },
    {
      icon: <FiMapPin className="text-green-500" />,
      label: "Location",
      value: user.address?.country || 'Not specified'
    },
    {
      icon: <FiPhone className="text-red-500" />,
      label: "Phone",
      value: user.phone || 'Not provided'
    }
  ];

  const socialLinks = [
    {
      icon: <FaTwitter className="text-blue-400" />,
      url: "#",
      name: "Twitter"
    },
    {
      icon: <FaLinkedin className="text-blue-600" />,
      url: "#",
      name: "LinkedIn"
    },
    {
      icon: <FaGithub className="text-gray-800" />,
      url: "#",
      name: "GitHub"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <div className="flex flex-col md:flex-row items-center">
              <div className="relative mb-4 md:mb-0 md:mr-6">
                <img 
                  src={user.picture || 'https://via.placeholder.com/150'} 
                  alt="User" 
                  className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
                />
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition">
                  <FiEdit2 className="text-blue-600" />
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {user.given_name || user.firstName || 'User'} {user.family_name || user.lastName || ''}
                </h1>
                <p className="text-blue-100">{user.email}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="bg-blue-500 bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    Premium Member
                  </span>
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm text-black">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Personal Info */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FiUser className="mr-2 text-gray-600" />
                Personal Information
              </h2>
              <div className="space-y-4">
                {profileItems.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="mr-4 mt-1">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500">{item.label}</p>
                      <p className="text-gray-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-8">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Social Profiles</h2>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index} 
                      href={social.url} 
                      className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                  <button className="bg-gray-100 p-3 rounded-full hover:bg-gray-200 transition">
                    <FiEdit2 className="text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Account Actions */}
            <div className="space-y-6">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-medium text-blue-800 mb-2">Account Status</h3>
                <p className="text-sm text-gray-700 mb-3">Your account is active and in good standing</p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Profile completeness: 85%</p>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <h3 className="font-medium text-gray-800 mb-3">Quick Actions</h3>
                <button className="w-full mb-2 px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition">
                  Edit Profile
                </button>
                <button className="w-full px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition">
                  Change Password
                </button>
              </div>

              <button 
                onClick={logout}
                className="w-full flex items-center justify-center px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-md hover:bg-red-100 transition"
              >
                <FiLogOut className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center py-8 text-gray-400">
              <p>No recent activity to display</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;