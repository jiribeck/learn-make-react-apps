import React from 'react';
import { motion } from 'framer-motion';

export default function Message({ message }) {
  return (
    <motion.div
      className="message"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="avatar">
        <span aria-label="avatar" role="img">
          🐙
        </span>
      </div>
      <div className="text">{message.text}</div>

      <div className="avatar">
        <span aria-label="avatar" role="img">
          🐸
        </span>
      </div>
    </motion.div>
  );
}
