import React from "react";
import { BarChart as MUIBarChart } from '@mui/x-charts/BarChart';
import { motion, AnimatePresence } from "framer-motion";

export default function OrderDetailsModal({ isOpen, onClose, modalMonth, monthNames }) {
  if (!isOpen) return null;

  // Mock daily data for demonstration
  const getMockDailyData = (monthIndex) => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: `Day ${i + 1}`,
      orders: Math.floor(Math.random() * 100) + 10,
      subscriptions: Math.floor(Math.random() * 50) + 5,
    }));
  };

  const dailyData = getMockDailyData(modalMonth);
  const totalOrders = dailyData.reduce((sum, d) => sum + d.orders, 0);
  const totalSubscriptions = dailyData.reduce((sum, d) => sum + d.subscriptions, 0);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="bg-gradient-to-br from-white via-gray-50 to-white p-6 rounded-3xl shadow-2xl border border-gray-100 w-full max-w-2xl relative overflow-hidden"
          style={{
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
          }}
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-30 -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-100 to-blue-100 rounded-full opacity-30 translate-y-12 -translate-x-12"></div>
          
          {/* Close button */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-red-500 text-2xl font-bold focus:outline-none focus:ring-4 focus:ring-red-200 rounded-full w-12 h-12 flex items-center justify-center bg-white hover:bg-red-50 transition-all duration-300 z-10 shadow-lg border border-gray-100"
            aria-label="Close details modal"
          >
            ✕
          </motion.button>

          <div className="relative z-10">
            {/* Chart Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="bg-white rounded-xl p-4 shadow-xl border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-gray-800">Daily Performance</h4>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                    <span className="text-gray-600">Orders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span className="text-gray-600">Subscriptions</span>
                  </div>
                </div>
              </div>
              
              <div className="w-full h-80 flex items-center justify-center">
                <MUIBarChart
                  dataset={dailyData}
                  xAxis={[{ scaleType: 'band', dataKey: 'day', label: 'Day' }]}
                  series={[
                    { 
                      dataKey: 'orders', 
                      label: 'Orders', 
                      color: '#3b82f6', 
                      highlightScope: { highlighted: 'series', faded: 'global' } 
                    },
                    { 
                      dataKey: 'subscriptions', 
                      label: 'Subscriptions', 
                      color: '#a21caf', 
                      highlightScope: { highlighted: 'series', faded: 'global' } 
                    },
                  ]}
                  height={250}
                  sx={{
                    '.MuiChartsAxis-label': { 
                      fontWeight: 600, 
                      fill: '#374151',
                      fontSize: '0.875rem'
                    },
                    '.MuiChartsLegend-root': { 
                      mt: 2, 
                      display: 'flex', 
                      justifyContent: 'center', 
                      gap: 3 
                    },
                    '.MuiBarElement-root:hover': { 
                      filter: 'brightness(1.2)', 
                      stroke: '#6366f1', 
                      strokeWidth: 2 
                    },
                    '.MuiChartsAxis-tick': {
                      fontSize: '0.75rem'
                    }
                  }}
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 