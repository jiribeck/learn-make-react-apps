import React from 'react';
import { motion } from 'framer-motion';

export default function Typing({ even }) {
  return (
    <motion.div
      className={`typing ${even ? 'is-right' : 'is-left'}`}
      initial={{ scale: 0.3 }}
      animate={{ scale: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="dots">
        <div />
        <div />
        <div />
      </div>
    </motion.div>
  );
}
