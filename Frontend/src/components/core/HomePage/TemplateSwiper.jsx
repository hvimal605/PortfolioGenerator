import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import templateswiperbg from '../../../assets/images/TemplateSwiperbg.gif'

import TemplateCardFortemplates from "../Template/TempalteCardFortemplates";
import { getAllTemplates } from "../../../services/operations/TemplateApi";
import { setTemplateId } from "../../../slices/PortfolioSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../common/AnimatedButton";
import { useDispatch } from "react-redux";

const TemplateSwiper = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);


  useEffect(() => {
    const fetchTemplates = async () => {
      const result = await getAllTemplates();
      // console.log("Fetched templates:", result);
      if (result) {
        setTemplates(result);
      }
    };
    fetchTemplates();
  }, []);


  const handleStartBuilding = () => {

    dispatch(setTemplateId(selectedTemplate._id));
    navigate('/PortfolioCreate/UploadDetails')

  }

  return (
    <section
      className="py-14 relative"
      style={{
        backgroundImage: `url(${templateswiperbg})`,
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative container mx-auto px-6 md:px-12 z-10 ">
        <h2 className="text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-500">
          Portfolio Templates
        </h2>

        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ disableOnInteraction: false }}
          speed={1000}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="rounded-lg "
        >
          {templates.map((template, index) => (
            <SwiperSlide key={index} className="flex justify-center items-stretch h-auto ">
              <div
                className="w-full h-full border  max-w-md p-2"
                onMouseEnter={() =>
                  document.querySelector(".swiper").swiper.autoplay.stop()
                }
                onMouseLeave={() =>
                  document.querySelector(".swiper").swiper.autoplay.start()
                }
              >
                <TemplateCardFortemplates
                  template={template}
                  onSelect={setSelectedTemplate}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        {selectedTemplate && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-white/10 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <button
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-3 right-4 text-2xl text-white/60 hover:text-white transition"
              >
                ✖
              </button>
              <h2 className="text-3xl font-bold mb-2">{selectedTemplate.name}</h2>
              <p className="text-sm text-gray-300">{selectedTemplate.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Created by:{" "}
                <span className="font-semibold text-white">
                  {selectedTemplate.CreatedBy?.firstName}{" "}{selectedTemplate.CreatedBy?.lastName}
                </span>
              </p>
              <img
                src={selectedTemplate.previewImage}
                alt={selectedTemplate.name}
                className="mt-4 rounded-lg border border-white/10 shadow-lg w-full max-h-80 object-contain bg-black"

              />

              <div onClick={handleStartBuilding} className="mt-6 flex justify-center">
                <Button content="🚀 Start Building" />
              </div>
            </motion.div>
          </motion.div>
        )}


      </div>

      <style jsx>{`
        .swiper-pagination-bullet {
          background-color: rgba(255, 255, 255);
          transition: background-color 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background-color: #4caf50;
        }
      `}</style>
    </section>
  );
};

export default TemplateSwiper;
