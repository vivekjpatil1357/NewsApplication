"use client";

import React from "react";
import { motion } from "framer-motion";


export default function NewsCard({ news }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
    <img
        src={news.urlToImage || "/placeholder.svg"}
        alt={news.title}
        className="w-full h-full object-cover"
    />
</div>

      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2 line-clamp-2">{news.title}</h2>
        <p className="text-gray-300 text-sm mb-4 line-clamp-3">
          {news.description}
        </p>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{news.author}</span>
          <span>{new Date(news.publishedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </motion.div>
  );
}
