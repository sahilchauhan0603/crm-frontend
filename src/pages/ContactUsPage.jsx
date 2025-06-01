import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import { MdSupportAgent } from 'react-icons/md';

const ContactUsPage = () => {
  const contactMethods = [
    {
      icon: <FaEnvelope className="text-2xl" />,
      title: "Email Us",
      details: "support@crmxeno.com",
      action: "mailto:support@crmxeno.com",
      actionText: "Send Message",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: <FaPhone className="text-2xl" />,
      title: "Call Us",
      details: "+1 (800) 276-9366",
      action: "tel:+18002769366",
      actionText: "Call Now",
      color: "bg-green-100 text-green-600"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl" />,
      title: "Visit Us",
      details: "123 Tech Park, San Francisco, CA 94107",
      action: "https://maps.google.com",
      actionText: "Get Directions",
      color: "bg-red-100 text-red-600"
    },
    {
      icon: <FaClock className="text-2xl" />,
      title: "Hours",
      details: "Monday-Friday: 9am-6pm PST",
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl lg:text-6xl">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700">CRM Xeno</span>
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-xl text-gray-600">
            We're here to help! Reach out to our team for any questions or support.
          </p>
        </div>

        {/* Contact Cards - Improved with hover effects */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mb-20">
          {contactMethods.map((method, index) => (
            <div 
              key={index} 
              className={`${method.color} p-6 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1`}
            >
              <div className="flex items-start mb-4">
                <div className={`p-3 rounded-lg ${method.color.replace('bg-', 'bg-opacity-20 ')} mr-4`}>
                  {method.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{method.title}</h3>
                  <p className="text-gray-700 mt-1">{method.details}</p>
                </div>
              </div>
              {method.action && (
                <a 
                  href={method.action} 
                  className="mt-4 inline-flex items-center text-sm font-medium group"
                >
                  {method.actionText}
                  <FaArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Contact Form Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            {/* Form */}
            <div className="md:w-1/2 p-8 md:p-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Send us a message</h2>
              <p className="text-gray-500 mb-6">We'll get back to you within 24 hours</p>
              
              <form className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="How can we help?"
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Support Info */}
            <div className="md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 text-white">
              <div className="h-full flex flex-col justify-center">
                <div className="flex items-start mb-8">
                  <div className="p-3 bg-white bg-opacity-20 rounded-lg mr-4 text-black">
                    <MdSupportAgent className="text-3xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Customer Support</h3>
                    <p className="text-blue-100">Our dedicated team is ready to assist you</p>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium uppercase tracking-wider text-blue-200 mb-2">Quick Help</h4>
                    <ul className="space-y-2">
                      <li>
                        <a href="/faq" className="flex items-center text-blue-50 hover:text-white transition-colors">
                          <FaArrowRight className="mr-2 text-xs" />
                          Frequently Asked Questions
                        </a>
                      </li>
                      <li>
                        <a href="/community" className="flex items-center text-blue-50 hover:text-white transition-colors">
                          <FaArrowRight className="mr-2 text-xs" />
                          Community Forum
                        </a>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="pt-6 border-t border-blue-500">
                    <h4 className="text-sm font-medium uppercase tracking-wider text-blue-200 mb-2">Emergency</h4>
                    <p className="text-blue-50">
                      For critical issues, call our 24/7 support line: <br />
                      <a href="tel:+18005551234" className="font-semibold hover:underline">+1 (800) 555-1234</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;