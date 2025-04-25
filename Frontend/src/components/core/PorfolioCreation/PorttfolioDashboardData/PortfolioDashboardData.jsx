import React, { useEffect, useState } from "react";
import { Projects } from "./Projects";
import { SoftwareApplications } from "./SoftwareApplications";
import { Timeline } from "./Timeline";
import { Link, useNavigate } from "react-router-dom";
import { getFullDetailsOfPortfolio } from "../../../../services/operations/PortfolioApi";
import { PersonalportfolioData } from "./PersonalportfolioData";
import AnimatedButton4 from "../../../common/AnimatedButton4";
import { useDispatch, useSelector } from "react-redux";
import { Skills } from "./skills";
import { setStep } from "../../../../slices/PortfolioSlice";

const PortfolioDashboardData = ({selectedPortfolio}) => {
  // console.log("ye dkeh le ",selectedPortfolio?.portfolioId)  
  const { token } = useSelector((state) => state.auth);
  const reduxPortfolio = useSelector((state) => state.portfolio.portfolio);
  const portfolioId = selectedPortfolio?.portfolioId || reduxPortfolio?._id;


  const navigate = useNavigate();
  const dispatch = useDispatch();
  


     useEffect(() => {
          if ( !reduxPortfolio) {
            navigate("/PortfolioCreate/UploadDetails");
            
            dispatch(setStep(0));
          }
        }, []);

  // console.log("Current Portfolio ID:", portfolioId);

  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    if (!portfolioId) return;

    const fetchPortfolio = async () => {
      try {
        const data = await getFullDetailsOfPortfolio(portfolioId, token);
        // console.log("Fetched Portfolio Data:", data);
        setPortfolioData(data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };

    fetchPortfolio();
  }, [portfolioId, token]);

  if (!portfolioData) {
    return <p className="text-center text-white">Loading Portfolio...</p>;
  }

  return (
    <div className="w-full bg-gray-900/50 backdrop-blur-md text-white p-2 md:p-5 mb-2 rounded-xl  border border-gray-600 shadow-[0_0_25px_5px_rgba(255,255,255,0.1)]">



<h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-cyan-200 via-gray-300 to-pink-500 text-transparent bg-clip-text drop-shadow-[0_2px_4px_rgba(255,255,255,0.1)] tracking-wide mb-6">
  Portfolio Dashboard
</h1>


      <PersonalportfolioData  portfolioData={portfolioData} />
      <Timeline  timeline={portfolioData.timeline} />
      <Skills  skills={portfolioData.skills} />
      <SoftwareApplications software={portfolioData.softwareApplications} />
      <Projects  projects={portfolioData.projects} />

      {portfolioData.deployLink === "" && (
        <div className="mt-3 flex justify-center">
          <Link to={"/portfolio/deploy"} className="rounded-xl border-cyan-300 border-2">
            <AnimatedButton4 text={"Deploy"} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default PortfolioDashboardData;
