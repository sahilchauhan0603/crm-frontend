import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import useChatbase from '../hooks/useChatbase';
import { FiArrowRight } from 'react-icons/fi';

const MessageSuggestions = ({ campaignObjective }) => {
  useChatbase(); // loads the Chatbase widget

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    setShowPopup(false); // Ensure popup is hidden initially
  }, []);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/ai/message-suggestions', { campaignObjective });
      setSuggestions(response.data.suggestions);
      setShowPopup(true); // Display popup after fetching suggestions
    } catch (err) {
      setError(`Failed to fetch message suggestions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="message-suggestions relative">
      <button
        onClick={fetchSuggestions}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex items-center"
      >
        Generate Message Suggestions <FiArrowRight className="ml-2" />
      </button>

      {showPopup && (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg border border-gray-300 p-4 rounded-lg z-50 animate-slideIn">
          <p className="text-sm mb-2 text-gray-800">
            Need help crafting better messages? Chat with our AI assistant!
          </p>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          {loading && <p className="text-gray-500 text-sm mb-2">Loading...</p>}
          {suggestions.length > 0 && (
            <ul className="mb-2">
              {suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-gray-700 text-sm mb-1">
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
          <button
            onClick={() => setShowPopup(false)}
            className="text-xs text-gray-400 mt-2 block hover:text-gray-600"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageSuggestions;
