import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface CelebrationAnimationProps {
  salary: number;
  isFirstPayslip: boolean;
  employeeName: string;
  quote: string;
}

export const CelebrationAnimation: React.FC<CelebrationAnimationProps> = ({
  salary,
  isFirstPayslip,
  employeeName,
  quote,
}) => {
  const [displayedSalary, setDisplayedSalary] = React.useState(0);

  useEffect(() => {
    const increment = salary / 60;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= salary) {
        setDisplayedSalary(salary);
        clearInterval(interval);
      } else {
        setDisplayedSalary(Math.floor(current));
      }
    }, 20);

    return () => clearInterval(interval);
  }, [salary]);

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-purple-900 via-black to-purple-900 overflow-hidden flex items-center justify-center">
      <motion.div
        className="text-center z-10"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, type: 'spring' }}
      >
        {isFirstPayslip && (
          <motion.div
            className="inline-block mb-6 px-6 py-2 bg-yellow-400 text-black font-bold rounded-full text-lg"
            animate={{ rotate: [0, 5, -5, 0], scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            🎉 FIRST PAYSLIP! 🎉
          </motion.div>
        )}

        <motion.h1
          className="text-4xl md:text-6xl font-bold text-white mb-4"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          🎊 Congratulations, {employeeName}! 🎊
        </motion.h1>

        <motion.div
          className="my-8 p-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl shadow-2xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 100 }}
        >
          <p className="text-white text-xl mb-4">Your Payslip Amount</p>
          <motion.div
            className="text-6xl md:text-7xl font-black text-white"
            key={displayedSalary}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 0.3 }}
          >
            ₹{displayedSalary.toLocaleString('en-IN')}
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 p-6 bg-white/10 backdrop-blur rounded-xl border border-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <p className="text-white text-2xl font-semibold italic">{quote}</p>
        </motion.div>

        <motion.div
          className="mt-12 flex gap-4 justify-center flex-wrap"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all transform hover:scale-105">
            📸 Share on LinkedIn
          </button>
          <button className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-lg transition-all transform hover:scale-105">
            🐦 Share on Twitter
          </button>
          <button className="px-8 py-4 bg-gray-700 hover:bg-gray-800 text-white font-bold rounded-lg transition-all transform hover:scale-105">
            💾 Save as Image
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CelebrationAnimation;