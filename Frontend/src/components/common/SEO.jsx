// SEO.js
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

export default function SEO({ 
  title = "PortfolioCraft - Free Portfolio Generator", 
  description = "Create your online portfolio in minutes with PortfolioCraft. Free, no-code portfolio generator with customizable templates.", 
  keywords,
  image = "https://portfolioshub.in/icon.svg", // Default preview image
  type = "website"
}) {
  const location = useLocation();
  const canonicalUrl = `https://portfolioshub.in${location.pathname}`;

  return (
    <Helmet>
      {/* 🏷️ Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* 🌏 Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* 🐦 Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* 🚀 Mobile-Ready */}
      <meta name="theme-color" content="#4f46e5" />
    </Helmet>
  );
}
