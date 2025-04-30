import { useState, useEffect } from "react";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { FaRegClock } from "react-icons/fa";
import { deleteTimeline, updateTimeline as updateTimelineAPI } from "../../../../services/operations/PortfolioApi";
import { useSelector } from "react-redux";

export const Timeline = ({ timeline }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [localTimeline, setLocalTimeline] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio._id;

  useEffect(() => {
    setLocalTimeline(timeline);
  }, [timeline]);

  const handleDelete = async (index, id) => {
    try {
      setLoadingIndex(index);
      const success = await deleteTimeline({
        Timelineid: id,
        portfolioId,
        token,
      });

      if (success) {
        const updatedTimeline = [...localTimeline];
        updatedTimeline.splice(index, 1);
        setLocalTimeline(updatedTimeline);
      }
    } catch (err) {
      console.error("Failed to delete timeline event:", err);
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleFieldChange = (index, field, value) => {
    const updatedTimeline = [...localTimeline];
    if (field === "from" || field === "to") {
      updatedTimeline[index].timeline[field] = value;
    } else {
      updatedTimeline[index][field] = value;
    }
    setLocalTimeline(updatedTimeline);
  };

  const handleUpdate = async (index, id) => {
    const item = localTimeline[index];
    const { title, description, timeline: { from, to } } = item;

    try {
      setLoadingIndex(index);
      const updated = await updateTimelineAPI({
        timelineId: id,
        title,
        description,
        from,
        to,
        token,
      });

      if (updated) {
        const updatedTimeline = [...localTimeline];
        updatedTimeline[index] = updated;
        setLocalTimeline(updatedTimeline);
      }
    } catch (err) {
      console.error("Error updating timeline:", err);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="mt-6 border border-pink-700 p-4 rounded-2xl bg-black shadow-[0_0_10px_#1f2937]">
      <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border-b border-pink-700 pb-3 gap-3">
        <h2 className="text-3xl font-bold flex items-center gap-2 text-pink-400">
          <FaRegClock size={26} className="text-pink-400" />
          Timeline
        </h2>

        <button
          className="bg-gradient-to-r from-blue-700 to-cyan-600 hover:brightness-125 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 mt-4 sm:mt-0"
          onClick={() => setIsEditMode(!isEditMode)}
        >
          {isEditMode ? <AiOutlineCheck size={20} /> : <AiOutlineEdit size={20} />}
          <span>{isEditMode ? "Done" : "Manage"}</span>
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden sm:block mt-4 overflow-x-auto rounded-xl bg-gray-900 p-2 shadow-inner">
        <table className="w-full border-collapse text-gray-300 text-sm sm:text-base border border-pink-500">
          <thead>
            <tr className="bg-gray-800 text-gray-400">
              <th className="px-4 py-2 text-left border border-pink-500">Title</th>
              <th className="px-4 py-2 text-left border border-pink-500">Description</th>
              <th className="px-4 py-2 text-center border border-pink-500">From</th>
              <th className="px-4 py-2 text-center border border-pink-500">To</th>
              {isEditMode && <th className="px-4 py-2 text-center border border-pink-500">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {localTimeline.map((event, index) => (
              <tr key={event._id || index} className="border-b border-pink-500 hover:bg-gray-800/50 transition-all">
                <td className="px-4 py-3 font-medium border border-pink-500">
                  {isEditMode ? (
                    <input
                      type="text"
                      value={event.title}
                      onChange={(e) => handleFieldChange(index, "title", e.target.value)}
                      className="bg-gray-800 text-white border border-gray-600 rounded-md px-2 py-1 w-full"
                    />
                  ) : (
                    event.title
                  )}
                </td>
                <td className="px-4 py-3 border border-pink-500">
                  {isEditMode ? (
                    <textarea
                      value={event.description}
                      onChange={(e) => handleFieldChange(index, "description", e.target.value)}
                      className="bg-gray-800 text-white border border-gray-600 rounded-md px-2 py-1 w-full"
                    />
                  ) : (
                    <div className="max-w-xs overflow-x-auto whitespace-nowrap text-gray-400 italic scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
                      {event.description || "—"}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-center border border-pink-500">
                  {isEditMode ? (
                    <input
                      type="date"
                      value={event.timeline.from}
                      onChange={(e) => handleFieldChange(index, "from", e.target.value)}
                      className="bg-gray-800 text-white border border-gray-600 rounded-md px-2 py-1"
                    />
                  ) : (
                    event.timeline.from
                  )}
                </td>
                <td className="px-4 py-3 text-center border border-pink-500">
                  {isEditMode ? (
                    <input
                      type="date"
                      value={event.timeline.to}
                      onChange={(e) => handleFieldChange(index, "to", e.target.value)}
                      className="bg-gray-800 text-white border border-gray-600 rounded-md px-2 py-1"
                    />
                  ) : (
                    event.timeline.to
                  )}
                </td>
                {isEditMode && (
                  <td className="px-4 py-3 text-center border border-pink-500 space-x-4">
                    <button
                      onClick={() => handleUpdate(index, event._id)}
                      disabled={loadingIndex === index}
                      className="text-green-400 hover:text-green-600"
                    >
                      <AiOutlineCheck size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(index, event._id)}
                      disabled={loadingIndex === index}
                      className="text-pink-500 hover:text-pink-700 disabled:opacity-50"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (Edit not added for mobile for now) */}
      <div className="sm:hidden mt-4 flex flex-col gap-4">
  {localTimeline.map((event, index) => (
    <div key={event._id || index} className="bg-gray-900 p-4 rounded-xl shadow-md border border-gray-800">
      {isEditMode ? (
        <>
          <input
            type="text"
            value={event.title}
            onChange={(e) => handleFieldChange(index, "title", e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-md px-2 py-1 w-full mb-2"
            placeholder="Title"
          />
          <textarea
            value={event.description}
            onChange={(e) => handleFieldChange(index, "description", e.target.value)}
            className="bg-gray-800 text-white border border-gray-600 rounded-md px-2 py-1 w-full mb-2"
            placeholder="Description"
          />
          <div className="flex justify-between gap-2 mb-2">
            <input
              type="date"
              value={event.timeline.from}
              onChange={(e) => handleFieldChange(index, "from", e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded-md px-2 py-1 w-full"
            />
            <input
              type="date"
              value={event.timeline.to}
              onChange={(e) => handleFieldChange(index, "to", e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="flex justify-end gap-5">
            <button
              onClick={() => handleUpdate(index, event._id)}
              disabled={loadingIndex === index}
              className="text-green-400 hover:text-green-600"
            >
              <AiOutlineCheck size={20} />
            </button>
            <button
              onClick={() => handleDelete(index, event._id)}
              disabled={loadingIndex === index}
              className="text-red-500 hover:text-red-700"
            >
              <AiOutlineDelete size={20} />
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className="text-lg font-semibold text-white">{event.title}</h3>
          <p className="text-gray-400 text-sm mt-1 italic whitespace-pre-line">
            {event.description || "No description"}
          </p>
          <div className="flex justify-between text-sm text-gray-300 mt-2">
            <span>From: {event.timeline.from}</span>
            <span>To: {event.timeline.to}</span>
          </div>
        </>
      )}
    </div>
  ))}
</div>

    </div>
  );
};
