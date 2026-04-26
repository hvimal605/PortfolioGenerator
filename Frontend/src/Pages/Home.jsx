import React from 'react'
import Hero from '../components/core/HomePage/Hero'
import ShowCaseFeatures from '../components/core/HomePage/ShowCaseFeatures'
import StepsGuide from '../components/core/HomePage/StepsGuide'
import ResponsiveShowCase from '../components/core/HomePage/ResponsiveShowCase'
import FAQSection from '../components/core/HomePage/FAQSection'
import TemplateSwiper from '../components/core/HomePage/TemplateSwiper'
import Footer from '../components/common/Footer'
import SEO from '../components/common/SEO.JSX'


const Home = () => {
  return (
    <div>
      {/* ✅ SEO Meta Info */}
      <SEO 
        title="PortfolioCraft - Free Portfolio Generator | Create Online Portfolio in Minutes"
        description="Create your online portfolio in minutes with PortfolioCraft. Free, no-code portfolio generator with customizable templates and one-click hosting."
        keywords="portfolio generator, free portfolio builder, create portfolio online, online portfolio maker, portfolio templates"
      />

      {/* ✅ Page Components */}
      <Hero />
      <ShowCaseFeatures />
      <TemplateSwiper />
      <StepsGuide />
      <ResponsiveShowCase />
      <FAQSection />
      <Footer />
    </div>
  )
}

export default Home
