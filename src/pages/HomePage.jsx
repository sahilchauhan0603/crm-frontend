import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheckCircle, FiBarChart2, FiUsers, FiMail, FiTarget } from 'react-icons/fi';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const heroImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80";
const dashboardImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";
const analyticsImage = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80";

const HomePage = () => {
  const { isAuthenticated, login } = useKindeAuth();
  const navigate = useNavigate();

  const features = [
    {
      icon: <FiUsers className="text-4xl mb-4 text-blue-600" />,
      title: 'Customer Management',
      description: 'Organize and track all customer interactions with our intuitive interface',
      link: '/customers',
      color: 'bg-blue-50 hover:bg-blue-100'
    },
    {
      icon: <FiBarChart2 className="text-4xl mb-4 text-green-600" />,
      title: 'Order Tracking',
      description: 'Real-time monitoring of orders and fulfillment status',
      link: '/orders',
      color: 'bg-green-50 hover:bg-green-100'
    },
    {
      icon: <FiMail className="text-4xl mb-4 text-purple-600" />,
      title: 'Campaigns',
      description: 'Create and analyze marketing campaigns with powerful tools',
      link: '/campaigns',
      color: 'bg-purple-50 hover:bg-purple-100'
    },
    {
      icon: <FiTarget className="text-4xl mb-4 text-yellow-600" />,
      title: 'Segmentation',
      description: 'Build targeted customer segments for personalized marketing',
      link: '/segments',
      color: 'bg-yellow-50 hover:bg-yellow-100'
    },
    {
      icon: <FiCheckCircle className="text-4xl mb-4 text-red-600" />,
      title: 'Communication Logs',
      description: 'Track all customer communications in one centralized place',
      link: '/communication-logs',
      color: 'bg-red-50 hover:bg-red-100'
    },
    {
      icon: <FiBarChart2 className="text-4xl mb-4 text-indigo-600" />,
      title: 'Analytics',
      description: 'Powerful insights and reporting to drive your business forward',
      link: '/analytics',
      color: 'bg-indigo-50 hover:bg-indigo-100'
    }
  ];

  const benefits = [
    "Increase customer retention by 40%",
    "Reduce manual data entry by 80%",
    "Boost marketing campaign effectiveness",
    "Gain real-time business insights",
    "Scale your operations effortlessly"
  ];

  const handleFeatureClick = (e, link) => {
    if (!isAuthenticated) {
      e.preventDefault();
      login();
    } else {
      navigate(link);
    }
  };

  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features-grid');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-50">
      {/* Hero Section */}
      <div className="w-full">
        <section className="relative py-20 px-4 overflow-hidden">
          <div className="max-w-full mx-auto">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
                <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  Transform Your <span className="text-blue-600">Customer Relationships</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  CRM Xeno helps you build stronger connections with advanced segmentation,
                  automation, and analytics tools designed for modern businesses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link 
                    to="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToFeatures();
                    }}
                    className="flex items-center justify-center px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    Get Started <FiArrowRight className="ml-2" />
                  </Link>
                  <Link 
                    to="/about-us" 
                    className="flex items-center justify-center px-8 py-4 bg-white text-gray-800 rounded-lg font-medium hover:bg-gray-100 transition duration-300 shadow hover:shadow-md"
                  >
                    Learn More
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center bg-white px-4 py-2 rounded-full shadow-sm">
                      <FiCheckCircle className="text-green-500 mr-2" />
                      <span className="text-sm font-medium">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 relative">
                <img 
                  src={heroImage} 
                  alt="CRM Dashboard" 
                  className="w-full rounded-xl shadow-2xl border-8 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300"
                />
                <div className="absolute -bottom-8 -left-8 bg-white p-4 rounded-lg shadow-lg hidden lg:block">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <FiCheckCircle className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-bold">1,200+</p>
                      <p className="text-sm text-gray-500">Happy Customers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Logo Cloud Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-gray-500 mb-8">Trusted by innovative companies worldwide</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {["Google", "Microsoft", "aceCloud", "Amazon", "Accenture"].map((company, index) => (
              <div key={index} className="text-2xl font-bold text-gray-400 opacity-70 hover:opacity-100 transition-opacity">
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features-grid" className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to manage customer relationships effectively
            </p>
            {!isAuthenticated && (
              <p className="text-sm text-gray-500 mt-2">
                Sign in to access all features
              </p>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-8 rounded-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${feature.color} ${
                  !isAuthenticated ? 'cursor-pointer' : ''
                }`}
                onClick={!isAuthenticated ? (e) => {
                  e.preventDefault();
                  login();
                } : undefined}
              >
                <Link 
                  to={isAuthenticated ? feature.link : '#'}
                  onClick={(e) => handleFeatureClick(e, feature.link)}
                  className="flex flex-col items-center text-center"
                >
                  {feature.icon}
                  <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <div className="text-blue-600 font-medium flex items-center">
                    {isAuthenticated ? (
                      <>
                        Learn more <FiArrowRight className="ml-1" />
                      </>
                    ) : (
                      <>
                        Sign in to access <FiArrowRight className="ml-1" />
                      </>
                    )}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Intuitive Dashboard
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Get a complete overview of your customer relationships with our beautifully designed dashboard.
              </p>
              <ul className="space-y-4">
                {[
                  "Real-time customer activity",
                  "Customizable widgets",
                  "Performance metrics",
                  "Quick action shortcuts"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2">
              <img 
                src={dashboardImage} 
                alt="Dashboard Preview" 
                className="w-full rounded-xl shadow-xl border-8 border-white transform -rotate-1 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Analytics Preview */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 order-2 lg:order-1 mt-12 lg:mt-0">
              <img 
                src={analyticsImage} 
                alt="Analytics Preview" 
                className="w-full rounded-xl shadow-xl border-8 border-white transform rotate-1 hover:rotate-0 transition-transform duration-300"
              />
            </div>
            <div className="lg:w-1/2 lg:pl-12 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Advanced Analytics
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Make data-driven decisions with our powerful analytics tools and visualizations.
              </p>
              <ul className="space-y-4">
                {[
                  "Customer lifetime value tracking",
                  "Conversion funnel analysis",
                  "Custom report generation",
                  "Export to PDF/Excel"
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                quote: "CRM Xeno transformed our customer management. Our retention rates have never been higher!",
                name: "Sarah Johnson",
                title: "Marketing Director, TechCorp",
                rating: 5
              },
              {
                quote: "The analytics tools alone are worth the price. Incredible insights with minimal setup.",
                name: "Michael Chen",
                title: "CEO, Startup Ventures",
                rating: 5
              },
              {
                quote: "We've tried many CRMs but none compare to the ease of use and power of CRM Xeno.",
                name: "Emily Rodriguez",
                title: "Sales Manager, Global Solutions",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-lg text-gray-700 mb-6">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-600 font-bold rounded-full w-10 h-10 flex items-center justify-center mr-4">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{testimonial.name}</p>
                    <p className="text-gray-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-50 to-gray-50 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-black">Ready to revolutionize your CRM?</h2>
          <p className="text-xl mb-8 text-black">Join thousands of businesses growing with CRM Xeno.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/contact-us" 
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition duration-300 shadow-lg hover:shadow-xl"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;