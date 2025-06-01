import React from 'react';
import { FaRocket, FaUsers, FaChartLine } from 'react-icons/fa';

const AboutUsPage = () => {
  const features = [
    {
      icon: <FaRocket className="text-4xl mb-4 text-blue-600" />,
      title: "Our Mission",
      description: "To revolutionize customer relationship management through intuitive tools and AI-driven insights."
    },
    {
      icon: <FaUsers className="text-4xl mb-4 text-green-600" />,
      title: "Who We Are",
      description: "A team of passionate developers and customer experience experts building since 2020."
    },
    {
      icon: <FaChartLine className="text-4xl mb-4 text-purple-600" />,
      title: "Our Impact",
      description: "Trusted by 5,000+ businesses to manage over 2 million customer relationships."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
            About <span className="text-blue-600">CRM Xeno</span>
          </h1>
          <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
            Pioneering the future of customer relationship management
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-center">
                {feature.icon}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img 
                className="h-full w-full object-cover md:w-96" 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" 
                alt="Our team working" 
              />
            </div>
            <div className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-gray-600 mb-4">
                Founded in 2020, CRM Xeno began as a small startup with a vision to simplify customer management. 
                Today, we're a leading SaaS platform helping businesses worldwide build meaningful customer relationships.
              </p>
              <p className="text-gray-600">
                What sets us apart is our commitment to continuous innovation and customer success. Every feature we build 
                is designed with real business needs in mind.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;