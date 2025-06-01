import React from 'react';
import { useParams } from 'react-router-dom';
import CommunicationLog from '../components/CommunicationLog';

const CommunicationLogsPage = () => {
  const { campaignId } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Communication Logs</h1>
      </div>
      <CommunicationLog campaignId={campaignId} />
    </div>
  );
};

export default CommunicationLogsPage;