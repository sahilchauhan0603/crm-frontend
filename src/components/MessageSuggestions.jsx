import React, { useState } from 'react';
import axios from '../utils/axios';

const MessageSuggestions = ({ campaignObjective }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSuggestions = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/ai/message-suggestions', { campaignObjective });
      setSuggestions(response.data.suggestions);
    } catch (err) {
      setError(`Failed to fetch message suggestions: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="message-suggestions">
      <button
        onClick={fetchSuggestions}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Generate Message Suggestions
      </button>

      {loading && <p>Loading suggestions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {suggestions.length > 0 && (
        <ul className="mt-4">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="p-2 border-b border-gray-300">
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessageSuggestions;
