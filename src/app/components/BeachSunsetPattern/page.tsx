"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const BeachSunsetPattern: React.FC = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', updateDimensions)
    updateDimensions()

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  const generateWaves = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      d: `M0,${dimensions.height - i * 15} C${dimensions.width / 4},${dimensions.height - 20 - i * 15} ${dimensions.width / 2},${dimensions.height + 20 - i * 15} ${dimensions.width},${dimensions.height - i * 15}`,
      color: `rgba(0, 153, 255, ${0.05 + i * 0.03})`,
    }))
  }

  const generateClouds = (count: number) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * dimensions.width,
      y: Math.random() * (dimensions.height / 2),
      size: 50 + Math.random() * 100,
    }))
  }

  const waves = generateWaves(8)
  const clouds = generateClouds(6)

  return (
    <div className="fixed inset-0 bg-gradient-to-b from-orange-300 via-red-400 to-pink-500 overflow-hidden">
      <svg width="100%" height="100%" preserveAspectRatio="none">
        {/* Sun */}
        <motion.circle
          cx={dimensions.width / 2}
          cy={dimensions.height * 0.7}
          r={100}
          fill="url(#sunsetGradient)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        {/* Clouds */}
        {clouds.map((cloud) => (
          <motion.g
            key={cloud.id}
            initial={{ x: -cloud.size }}
            animate={{ x: dimensions.width + cloud.size }}
            transition={{
              duration: 100 + Math.random() * 100,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <motion.ellipse
              cx={cloud.x}
              cy={cloud.y}
              rx={cloud.size * 0.6}
              ry={cloud.size * 0.4}
              fill="rgba(255, 255, 255, 0.8)"
            />
            <motion.ellipse
              cx={cloud.x - cloud.size * 0.3}
              cy={cloud.y + cloud.size * 0.1}
              rx={cloud.size * 0.4}
              ry={cloud.size * 0.3}
              fill="rgba(255, 255, 255, 0.8)"
            />
            <motion.ellipse
              cx={cloud.x + cloud.size * 0.3}
              cy={cloud.y + cloud.size * 0.1}
              rx={cloud.size * 0.4}
              ry={cloud.size * 0.3}
              fill="rgba(255, 255, 255, 0.8)"
            />
          </motion.g>
        ))}

        {/* Ocean */}
        <rect x="0" y={dimensions.height * 0.65} width={dimensions.width} height={dimensions.height * 0.35} fill="url(#oceanGradient)" />

        {/* Waves */}
        {waves.map((wave) => (
          <motion.path
            key={wave.id}
            d={wave.d}
            fill={wave.color}
            initial={{ x: 0 }}
            animate={{ x: [-dimensions.width / 2, 0] }}
            transition={{
              duration: 10 + wave.id * 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}

        {/* Beach */}
        <motion.path
          d={`M0,${dimensions.height} 
             L${dimensions.width},${dimensions.height} 
             L${dimensions.width},${dimensions.height * 0.85} 
             Q${dimensions.width * 0.75},${dimensions.height * 0.83} 
             ${dimensions.width * 0.5},${dimensions.height * 0.84}
             Q${dimensions.width * 0.25},${dimensions.height * 0.85}
             0,${dimensions.height * 0.87} 
             Z`}
          fill="url(#sandGradient)"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        />

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="sunsetGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#FFD700" />
            <stop offset="100%" stopColor="#FF6347" />
          </radialGradient>
          <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4682B4" />
            <stop offset="100%" stopColor="#000080" />
          </linearGradient>
          <linearGradient id="sandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#F4A460" />
            <stop offset="50%" stopColor="#DEB887" />
            <stop offset="100%" stopColor="#F4A460" />
          </linearGradient>
        </defs>
      </svg>

      {/* Seagulls */}
      {[1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute text-white text-4xl"
          initial={{ x: -50, y: Math.random() * dimensions.height / 3 }}
          animate={{ x: dimensions.width + 50 }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
            delay: i * 2,
          }}
        >
          &#x28;
        </motion.div>
      ))}
    </div>
  )
}

export default BeachSunsetPattern

