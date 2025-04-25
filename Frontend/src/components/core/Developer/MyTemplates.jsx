import React, { useEffect, useState } from 'react';
import TemplateCardDeveloper from '../Template/TemplateCardDeveloper';
import { useSelector } from 'react-redux';
import { getDeveloperTemplates } from '../../../services/operations/TemplateApi';

const MyTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  const { token } = useSelector((state) => state.auth);

  // Fetch templates on mount
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getDeveloperTemplates(token);
        setTemplates(data);
        setFilteredTemplates(data);
      } catch (error) {
        console.error("❌ Failed to fetch developer templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [token]);

  // Filter templates based on status
  useEffect(() => {
    if (selectedStatus === 'All') {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(
        templates.filter(template => template.status === selectedStatus)
      );
    }
  }, [selectedStatus, templates]);

  return (
    <div className="min-h-screen  text-white p-10 flex flex-col items-center">
      <h2
  className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent"
>
  My Templates
</h2>


      {/* Filter Dropdown */}
      <div className="relative w-72 mb-8">
  <select
    value={selectedStatus}
    onChange={(e) => setSelectedStatus(e.target.value)}
    className="w-full appearance-none bg-black/40 backdrop-blur-md text-white px-6 py-4 pr-10 rounded-xl border border-pink-600 shadow-[0_0_20px_#ec489955] hover:shadow-[0_0_25px_#ec4899aa] focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 text-base font-semibold tracking-wide"
    size="1"
  >
    <option value="All" className="py-3 text-base text-black">🌐 All Templates</option>
    <option value="Approved" className="py-3 text-base  text-black">✅ Approved</option>
    <option value="Pending" className="py-3 text-base  text-black">🕒 Pending</option>
    <option value="Rejected" className="py-3 text-base  text-black">❌ Rejected</option>
  </select>

  {/* Custom Arrow */}
  <div className="pointer-events-none absolute top-4 right-5 text-pink-400 text-lg">
    ▼
  </div>
</div>


      {/* Templates Grid */}
      {loading ? (
        <p className="text-gray-300 text-lg animate-pulse">Loading your templates...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 p-4 w-full">
          {filteredTemplates.length > 0 ? (
            filteredTemplates.map(template => (
              <TemplateCardDeveloper key={template._id} template={template} />
            ))
          ) : (
            <p className="text-gray-400 col-span-3 text-center">No templates found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyTemplates;
