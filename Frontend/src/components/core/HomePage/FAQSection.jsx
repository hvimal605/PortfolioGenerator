import React from "react";
import { motion } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";

const faqs = [
  {
    question: "How do I create my portfolio?",
    answer:
      "First, sign up on our platform. Then click on 'Start Building', select your favorite template, and add your details like skills, projects, timeline and software apps. Once you're done, your dashboard will appear with a 'Deploy' button. Just click it, and your portfolio will be live within seconds!",
  },
  {
    question: "Can I edit and manage my portfolio after deploying it?",
    answer:
      "Yes, absolutely! After deploying, you can easily manage and update your portfolio anytime. Just go to your dashboard by clicking on your profile picture in the navbar. From there, you can edit your portfolio details, add new details, view messages from visitors, and check insights—all in one place.",
  },
  {
    question: "I'm a developer. Can I submit my own templates?",
    answer:
      "Yes! We welcome developers to submit custom templates. Once reviewed and approved, your template will be available for all users—and you can track how many people are using it from your dashboard.",
  }
  ,
  {
    question: "Who should use this platform?",
    answer:
      "This platform is perfect for students, developers, designers, freelancers, or anyone looking to showcase their work and skills with a stunning portfolio website.",
  },
  {
    question: "Is this platform free to use?",
    answer:
      "Yes! You can create and deploy your portfolio for free. Premium features like exclusive designer templates and advanced analytics will be available in our upcoming Pro plan.",
  }

];

const FAQSection = () => {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-800/20 via-black to-black blur-3xl opacity-60" />

  <div className="container mx-auto px-6 md:px-12 max-w-5xl">
    {/* Heading */}
    <motion.h2
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="text-5xl font-extrabold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-green-300 to-lime-400"
    >
      Frequently Asked Questions
    </motion.h2>

    {/* FAQ Items */}
    <div className="space-y-7">
      {faqs.map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.15 }}
          viewport={{ once: true }}
          className="relative bg-gradient-to-br from-gray-900/70 to-gray-800/80 backdrop-blur-lg border border-cyan-500/20 rounded-2xl shadow-[0_0_40px_-10px_rgba(0,255,180,0.3)] hover:shadow-[0_0_50px_5px_rgba(0,255,180,0.25)] transition-shadow duration-500 group overflow-hidden"
        >
          <details className="group p-6 md:p-8 cursor-pointer transition-all">
            <summary className="flex items-center justify-between text-xl font-semibold text-cyan-300 hover:text-lime-400 transition-colors duration-300">
              <span>{faq.question}</span>
              <IoIosArrowDown className="w-6 h-6 transform transition-transform duration-300 group-open:rotate-180 group-hover:text-lime-400" />
            </summary>
            <div className="mt-4 text-gray-300 text-lg leading-relaxed">
              {faq.answer}
            </div>
          </details>
          {/* Glow Effect */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-400/10 to-lime-300/10 opacity-0 group-hover:opacity-100 rounded-2xl blur-md transition duration-500" />
        </motion.div>
      ))}
    </div>
  </div>
</section>

  );
};

export default FAQSection;
