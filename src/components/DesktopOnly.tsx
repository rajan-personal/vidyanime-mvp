"use client";

import { useEffect, useState } from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";

interface DesktopOnlyProps {
  children: React.ReactNode;
}

export default function DesktopOnly({ children }: DesktopOnlyProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const checkDevice = () => {
      const width = window.innerWidth;
      
      // Mobile: < 768px
      // Tablet: 768px - 1023px
      // Desktop: >= 1024px
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };

    // Check on mount
    checkDevice();

    // Add resize listener
    window.addEventListener("resize", checkDevice);
    
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  // Don't render anything on server side to avoid hydration mismatch
  if (!isClient) {
    return null;
  }

  // Show warning for mobile or tablet
  if (isMobile || isTablet) {
    const deviceType = isMobile ? "mobile" : "tablet";
    const DeviceIcon = isMobile ? Smartphone : Tablet;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-red-100 p-4 rounded-full">
              <DeviceIcon className="w-12 h-12 text-red-600" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Desktop Only
          </h1>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            This application is optimized for desktop viewing only. 
            Please visit this page on a desktop or laptop computer for the best experience.
          </p>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Current Device:</strong> {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)}
            </p>
            <p className="text-sm text-yellow-800 mt-1">
              <strong>Required:</strong> Desktop (1024px or wider)
            </p>
          </div>
          
          <div className="flex items-center justify-center text-blue-600">
            <Monitor className="w-5 h-5 mr-2" />
            <span className="text-sm font-medium">Switch to desktop to continue</span>
          </div>
        </div>
      </div>
    );
  }

  // Show content for desktop
  return <>{children}</>;
}
