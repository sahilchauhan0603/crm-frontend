import React, { useState } from 'react';

const DynamicRuleBuilder = ({ onSave }) => {
  const [rules, setRules] = useState([]);

  const addRule = () => {
    setRules([...rules, { field: '', operator: '', value: '' }]);
  };

  const updateRule = (index, key, value) => {
    const updatedRules = [...rules];
    updatedRules[index][key] = value;
    setRules(updatedRules);
  };

  const removeRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const saveRules = () => {
    onSave(rules);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Dynamic Rule Builder</h2>
      {rules.map((rule, index) => (
        <div key={index} className="flex-col items-center mb-4 space-x-4 space-y-2">
          <select
            value={rule.field}
            onChange={(e) => updateRule(index, 'field', e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Field</option>
            <option value="spend">Spend</option>
            <option value="visits">Visits</option>
            <option value="inactive">Inactive Days</option>
          </select>

          <select
            value={rule.operator}
            onChange={(e) => updateRule(index, 'operator', e.target.value)}
            className="p-2 border border-gray-300 rounded-md"
          >
            <option value="">Select Operator</option>
            <option value=">">Greater Than</option>
            <option value="<">Less Than</option>
            <option value="=">Equal To</option>
          </select>

          <input
            type="text"
            value={rule.value}
            onChange={(e) => updateRule(index, 'value', e.target.value)}
            placeholder="Enter Value"
            className="p-2 border border-gray-300 rounded-md"
          />

          <button
            onClick={() => removeRule(index)}
            className="px-4 py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Remove
          </button>
        </div>
      ))}

      <div className="space-x-4">
        <button
          onClick={addRule}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Rule
        </button>
        <button
          onClick={saveRules}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Save Rules
        </button>
      </div>
    </div>
  );
};

export default DynamicRuleBuilder;
