import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import NewsCard from "../components/NewsCard";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("world");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getNews = async () => {
    setLoading(true);
    fetch(
      `https://newsapi.org/v2/everything?q=${searchTerm}&sortBy=publishedAt&apiKey=b9e01e893a7c40e8b6ed48449be5898b`
    )
      .then((data) => data.json())
      .then((data) => {
        setNewsData(data.articles);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getNews();
    console.log("RErender");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-100 tracking-wide">
        📰 Latest News
      </h1>

      {/* Search Section */}
      <div className="max-w-md mx-auto mb-8 flex gap-2">
        <input
          type="text"
          placeholder="Search news..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-blue-500 transition-all duration-300"
        />
        <button
          onClick={getNews}
          className="px-4 py-3 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 transition-all duration-300"
        >
          🔍 Search
        </button>
      </div>

      {/* Loading Indicator */}
      {loading && (
        <p className="text-xl text-center text-blue-400 animate-pulse">
          Fetching latest news...
        </p>
      )}

      {/* News Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {newsData.map((news, index) => (
          <a href={news.url}><NewsCard key={index} news={news} /></a>
          
        ))}
      </motion.div>
    </div>
  );
}
