import React from 'react';
import FeatureCard from '../../common/FeatureCard';
import { FaCheckCircle } from "react-icons/fa";
import { GrDeploy } from "react-icons/gr";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { RxUpdate } from "react-icons/rx";
import { CgInsights } from "react-icons/cg";
import { FaUpload } from "react-icons/fa"; // Icon for upload feature

const features = [
  {
    heading: "Different Types of Templates",
    desc: "Explore a variety of unique and stylish templates that cater to different needs and preferences. Choose one that fits your style!",
    borderColor: "border-blue-500",
    iconColor: "text-blue-500",
    icon: <FaCheckCircle />,
  },
  {
    heading: "Easy Deploy",
    desc: "Deploy your portfolio with just a click. Your portfolio will be live and ready to share in no time!",
    borderColor: "border-purple-500",
    iconColor: "text-purple-500",
    icon: <GrDeploy />,
  },
  {
    heading: "Portfolio Message & Insights",
    desc: "Get insights and feedback on your portfolio’s performance with our integrated messaging system. Stay connected with your audience!",
    borderColor: "border-amber-500",
    iconColor: "text-amber-500",
    icon: <CgInsights  />,
  },
  {
    heading: "Update Your Portfolio Anytime",
    desc: "Make updates to your portfolio as your work evolves. Keep your portfolio up-to-date and reflective of your latest achievements!",
    borderColor: "border-green-500",
    iconColor: "text-green-500",
    icon: <RxUpdate />,
  },
  {
    heading: "Developers Can Contribute Templates",
    desc: "Developers can upload their own portfolio templates to share with others, expanding the options available to users and contributing to the community.",
    borderColor: "border-teal-500",
    iconColor: "text-teal-500",
    icon: <FaUpload />, // Upload icon
  },
];


const ShowCaseFeatures = () => {
  return (
    <section className="bg-gray-900 text-white py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl md:text-4xl font-bold mb-8">Empower Your Portfolio with Our Advanced Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              heading={feature.heading}
              desc={feature.desc}
              borderColor={feature.borderColor}
              icon={feature.icon }
              iconColor={feature.iconColor}
           
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowCaseFeatures;
