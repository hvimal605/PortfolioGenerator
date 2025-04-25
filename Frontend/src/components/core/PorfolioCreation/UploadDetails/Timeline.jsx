import React, { useEffect, useState } from "react";

import { toast } from "react-hot-toast";
import { createTimeline } from "../../../../services/operations/PortfolioApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../../../slices/PortfolioSlice";
import { FaCalendarAlt, FaRegClock } from "react-icons/fa";


const Timeline = () => {
  const { token } = useSelector((state) => state.auth);
  const {portfolio} = useSelector((state)=>state.portfolio)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("ye aagya porfolio time line ke ander  ",portfolio)


     useEffect(() => {
          if ( !portfolio) {
            navigate("/PortfolioCreate/UploadDetails");
            
            dispatch(setStep(0));
          }
        }, []);

  const [timeLine, setTimeLine] = useState({
    title: "",
    description: "",
    from: "",
    to: "",
  });

  const handleChange = (e) => {
    setTimeLine({ ...timeLine, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const portfolioId = portfolio._id;
    if (!portfolioId) {
      toast.error("Portfolio ID not found. Please try again.");
      return;
    }
    try {
      const timeLineData = { ...timeLine, portfolioId };
      await createTimeline(timeLineData, token);

      setTimeLine({
        title: "",
        description: "",
        from: "",
        to: "",
      });


    } catch (error) {
      console.error("Error adding timeline:", error);
    }
  };



  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#1a1a1a] border mb-3 border-pink-400/30 text-white p-8 rounded-2xl shadow-[0_0_15px_#ec4899] max-w-3xl mx-auto">

    <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-center text-pink-400 flex justify-center items-center gap-3">
    <FaRegClock  /> Timeline
    </h2>

    <form onSubmit={handleSubmit} className="space-y-8">
  {/* Title */}
  <div>
    <label className="block text-pink-300 font-semibold mb-1">Timeline Title</label>
    <input
      type="text"
      name="title"
      value={timeLine.title}
      onChange={handleChange}
      placeholder="Timeline Title"
      required
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-pink-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  </div>

  {/* Description */}
  <div>
    <label className="block text-pink-300 font-semibold mb-1">Description</label>
    <textarea
      name="description"
      value={timeLine.description}
      onChange={handleChange}
      placeholder="Description of the timeline item..."
      required
      rows={5}
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-pink-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
    />
  </div>

  {/* From & To with Date Icons */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div>
      <label className="block text-pink-300 font-semibold mb-1">From</label>
      <div>
        <input
          type="date"
          name="from"
          value={timeLine.from}
          onChange={handleChange}
          required
          className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-pink-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
        />
      </div>
    </div>
    <div>
      <label className="block text-pink-300 font-semibold mb-1">To</label>
      <div>
        <input
          type="date"
          i
          name="to"
          value={timeLine.to}
          onChange={handleChange}
          required
          className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-pink-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
        />
      </div>
    </div>
  </div>

  {/* Submit */}
  <div className="text-center">
    <button
      type="submit"
      className="mt-6 px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-xl shadow-lg transition duration-300 ease-in-out"
    >
      Add Timeline 
    </button>
  </div>
</form>

  </div>
  );
};

export default Timeline;