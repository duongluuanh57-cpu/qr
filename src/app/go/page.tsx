'use client';

import { useEffect } from 'react';

export default function Go() {
  useEffect(() => {
    const placeId = 'ChIJRd8DOAApdTER8OSMpvARRLs';
    const reviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;
    
    // Force intent for Android to bypass in-app browser
    const androidIntent = `intent://search.google.com/local/writereview?placeid=${placeId}#Intent;scheme=https;package=com.google.android.apps.maps;end`;
    
    const ua = navigator.userAgent.toLowerCase();

    if (ua.indexOf('android') > -1) {
      // Immediate heavy execution
      window.location.href = androidIntent;
      
      // Micro-fallback just in case the intent doesn't fire immediately
      setTimeout(() => {
         window.location.replace(reviewUrl);
      }, 1500);
    } else {
      // Native universal redirection for iOS/Desktop
      window.location.replace(reviewUrl);
    }
  }, []);

  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#ffffff',
      color: '#888888',
      fontFamily: 'sans-serif'
    }}>
       <p style={{ fontSize: '14px' }}>Đang kết nối Google Maps...</p>
    </div>
  );
}
