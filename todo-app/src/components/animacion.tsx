'use client'
import React from 'react'

const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      <div className="car car1"></div>
      <div className="car car2"></div>
      <div className="car car3"></div>
      <style jsx>{`
        .animated-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          overflow: hidden;
          background-color: limegreen ;
          background-image: url('https://e1.pxfuel.com/desktop-wallpaper/441/68/desktop-wallpaper-sameh-fathy-on-screen-in-2019-spongebob-weed.jpg');
          background-position: center;
          background-repeat: no-repeat;
        }
        .car {
          position: absolute;
          width: 100px;
          height: 60px;
          background-repeat: no-repeat;
          background-size: contain;
        }
        .car1 {
          background-image: url('https://pnghq.com/wp-content/uploads/download-free-porro-png-images-transparent-backgrounds-31762.png');
          animation: moveCar1 15s linear infinite;
        }
        .car2 {
          background-image: url('https://pnghq.com/wp-content/uploads/download-free-porro-png-images-transparent-backgrounds-31762.png');
          animation: moveCar2 20s linear infinite;
        }
        .car3 {
          background-image: url('https://pnghq.com/wp-content/uploads/download-free-porro-png-images-transparent-backgrounds-31762.png');
          animation: moveCar3 25s linear infinite;
        }
        @keyframes moveCar1 {
          0% { left: -100px; top: 20%; }
          100% { left: 100%; top: 20%; }
        }
        @keyframes moveCar2 {
          0% { right: -100px; top: 50%; }
          100% { right: 100%; top: 50%; }
        }
        @keyframes moveCar3 {
          0% { left: -100px; top: 80%; }
          100% { left: 100%; top: 80%; }
        }
      `}</style>
    </div>
  )
}

export default AnimatedBackground