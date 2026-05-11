'use client';

import { useEffect } from 'react';

export default function HomeRedirect() {
  useEffect(() => {
    const placeId = 'ChIJRd8DOAApdTER8OSMpvARRLs';
    const reviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;
    
    // Master Intent hack to Force Break Zalo/External Sandboxes
    const androidIntent = `intent://search.google.com/local/writereview?placeid=${placeId}#Intent;scheme=https;package=com.google.android.apps.maps;end`;
    
    const ua = navigator.userAgent.toLowerCase();

    if (ua.indexOf('android') > -1) {
      // Trigger instant Android shell breakaway
      window.location.href = androidIntent;
      
      // Rapid safety fallback
      setTimeout(() => {
         window.location.replace(reviewUrl);
      }, 1500);
    } else {
      // Direct jump for desktop, chrome, iOS and fallback browsers
      window.location.replace(reviewUrl);
    }
  }, []);

  return (
    <div style={{ 
      height: '100dvh', 
      width: '100vw', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#ffffff',
      color: '#888888',
      fontFamily: 'sans-serif'
    }}>
       <p style={{ fontSize: '14px' }}>Đang mở Google Maps...</p>
    </div>
  );
}
