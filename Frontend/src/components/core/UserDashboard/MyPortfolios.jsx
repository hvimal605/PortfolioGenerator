import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaCopy,
  FaCheck,
  FaExternalLinkSquareAlt,
  FaEdit,
} from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";

import { getPortfoliosForUser } from "../../../services/operations/PortfolioApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setTemplateId,
  setPortfolio,
} from "../../../slices/PortfolioSlice";
import { MdOutlineDone } from "react-icons/md";

export default function MyPortfolios() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [portfolios, setPortfolios] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  const handleCopy = (portfolioId, previewLink) => {
    navigator.clipboard.writeText(previewLink).then(() => {
      setCopiedId(portfolioId);
      setTimeout(() => setCopiedId(null), 3000);
    });
  };

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await getPortfoliosForUser(token);
        // console.log("ye hai ji response apka ok ", res);

        if (res?.success) {
          setStats({
            total: res.totalPortfolios,
            completed: res.completed,
            pending: res.pending,
          });

          const formatted = res.portfolios.map((p, index) => ({
            _id: p.portfolioId,
            portfolioId: p.portfolioId,
            templateId: p.templateId,
            name: `Portfolio ${index + 1}`,
            createdDate: new Date(p.createdAt).toISOString().split("T")[0],
            status: p.deployLink ? "completed" : "pending",
            previewLink: p.deployLink || null,
          }));

          setPortfolios(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
      }
    };

    fetchPortfolios();
  }, [token]);

  const handleComplete = (portfolio) => {
    dispatch(setTemplateId(portfolio.templateId));
    dispatch(setPortfolio(portfolio));
    // console.log("Saved to Redux:", portfolio);
  };
    
  const handleCreateNew = () =>{
    dispatch(setPortfolio(null));
  }
  return (
    <div className=" mb-1 bg-gradient-to-br from-black to-gray-900 text-white p-6 sm:p-8 space-y-8">

      <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r  pb-4 border-b-4 border-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 uppercase tracking-widest drop-shadow-2xl animate-fade-in">
        My Portfolios
      </h1>
      {/* Create Portfolio Button */}
      <div className="flex justify-center">
        <Link to="/portfolioCreate">
          <button onClick={handleCreateNew} className="bg-black border border-white/10 text-white px-6 py-3 rounded-2xl font-semibold text-lg tracking-wide shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:shadow-[0_0_25px_rgba(0,255,255,0.4)] hover:bg-gradient-to-r hover:from-cyan-700 hover:to-blue-800 transition-all duration-400 ease-in-out backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <span className="text-xl"><FaPlusCircle /></span>
              Create New Portfolio
            </span>
          </button>
        </Link>
      </div>


      {/* Portfolio Stats */}
      <div className="flex flex-wrap justify-center gap-6">
        {[
          { label: "Total", count: stats.total, gradient: "from-gray-700 via-gray-800 to-black" },
          { label: "Completed", count: stats.completed, gradient: "from-green-600 via-green-700 to-green-800" },
          { label: "Pending", count: stats.pending, gradient: "from-yellow-500 via-yellow-600 to-yellow-700" },
        ].map((stat, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${stat.gradient} p-6 sm:p-8 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center w-52 sm:w-64 border border-white/10 backdrop-blur-md transform hover:scale-105 transition-all duration-500 ease-out hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)]`}
          >
            <p className="text-sm sm:text-base font-semibold text-white/80 mb-2 tracking-wide uppercase">
              {stat.label}
            </p>
            <p className="text-4xl sm:text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
              {stat.count}
            </p>
            <div className="w-16 h-1 mx-auto bg-white/60 rounded-full"></div>
          </div>
        ))}
      </div>



      {/* Portfolio Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {portfolios.map((portfolio) => {
          const createdAt = new Date(portfolio.createdDate);
          const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')}-${(createdAt.getMonth() + 1)
            .toString()
            .padStart(2, '0')}-${createdAt.getFullYear().toString().slice(2)}`;

          return (
            <div
              key={portfolio._id}
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black p-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] border border-gray-700 relative backdrop-blur-sm hover:scale-[1.04] transition-transform duration-300"
            >
              {/* Preview Frame */}
              <div className="relative w-full h-44 rounded-xl overflow-hidden border border-gray-700 shadow-inner">
                {portfolio.previewLink ? (
                  <div className="w-full h-full  rounded-lg border border-gray-600">
                    <iframe
                      src={portfolio.previewLink}
                      title={portfolio.name}
                      className="w-[1400px] h-[900px] rounded-lg border-none"
                      sandbox="allow-scripts allow-same-origin allow-popups allow-forms"

                      style={{
                        transform: "scale(0.5)",
                        transformOrigin: "top left",
                        width: "200%",
                        height: "200%",

                        scrollbarColor: "black",
                        overflow: "hidden",
                        borderRadius: "8px",
                      }}
                    ></iframe>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700 text-gray-300 text-sm text-center px-4">
                    Preview not available. Please deploy your portfolio first.
                  </div>
                )}


                {/* Status Tag */}
                <span
                  className={`absolute top-2 right-2 text-xs font-bold px-3 py-1 rounded-full text-white shadow-md tracking-wide ${portfolio.status === 'completed'
                    ? 'bg-emerald-500/90'
                    : 'bg-yellow-400/90 text-black'
                    }`}
                >
                  {portfolio.status === 'completed' ? (
                    <span className="flex items-center gap-1">
                      <MdOutlineDone className="text-white text-md" />
                      Completed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <CgSandClock className="text-white text-xl" />
                      Pending
                    </span>
                  )}
                </span>

              </div>

              {/* Portfolio Title */}
              <h3 className="text-xl font-bold text-white mt-5 tracking-wide">
                {portfolio.name}
              </h3>
              <p className="text-blue-400 text-sm mt-1 truncate">{portfolio.previewLink}</p>
              <p className="text-sm text-gray-400 mt-1">
                Created: <span className="text-white font-medium">{formattedDate}</span>
              </p>

              {/* Buttons Section */}
              <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap sm:justify-center gap-3">
                {/* Copy Link */}
                {portfolio.previewLink && (
                  <button
                    onClick={() => handleCopy(portfolio._id, portfolio.previewLink)}
                    className={`flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition shadow-md ${copiedId === portfolio._id
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-100'
                      } w-full sm:w-auto`}
                  >
                    {copiedId === portfolio._id ? <FaCheck /> : <FaCopy />}
                    {copiedId === portfolio._id ? 'Copied!' : 'Copy Link'}
                  </button>
                )}

                {/* Preview / Deploy Button */}
                {portfolio.status === 'completed' ? (
                  <a
                    href={portfolio.previewLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 font-bold shadow-lg transition w-full sm:w-auto"
                  >
                    <FaExternalLinkSquareAlt /> Preview
                  </a>
                ) : (
                  <Link to={`/portfolio/deploy`} className="w-full sm:w-auto">
                    <button
                      onClick={() => handleComplete(portfolio)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black px-5 py-2 rounded-lg flex items-center justify-center gap-2 font-bold shadow-md transition w-full"
                    >
                      🚀 Complete / Deploy
                    </button>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>



    </div>
  );
}
