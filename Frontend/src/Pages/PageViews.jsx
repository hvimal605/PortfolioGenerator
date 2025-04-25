import { useState, useEffect } from "react";

const PageViewCounter = () => {
  const [views, setViews] = useState(0);

  useEffect(() => {
    let count = parseInt(localStorage.getItem("pageViews") || "0", 10);
    count += 1;
    localStorage.setItem("pageViews", count);
    setViews(count);
  }, []);

  return (
    <div className="p-4 text-center bg-gray-100 rounded-md shadow-md">
      <h2 className="text-lg font-semibold">Page Views: {views}</h2>
    </div>
  );
};

export default PageViewCounter;
