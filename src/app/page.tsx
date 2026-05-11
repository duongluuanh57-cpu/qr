'use client';

import { useEffect } from 'react';
import { ExternalLink, MapPin, ChevronRight } from 'lucide-react';

export default function HomeRedirect() {
  const placeId = 'ChIJRd8DOAApdTER8OSMpvARRLs';
  // The magical optimized URL that research shows reliable application interception!
  const reviewUrl = `https://search.google.com/local/writereview/mobile?placeid=${placeId}`;
  
  useEffect(() => {
    // Use standard high-level assignment which robust mobile browsers intercept naturally!
    window.location.assign(reviewUrl);

    // Secondary fire backup
    const timer = setTimeout(() => {
      window.location.href = reviewUrl;
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ 
      height: '100dvh', 
      width: '100vw', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'sans-serif',
      textAlign: 'center',
      padding: '24px'
    }}>
       <div style={{
         background: 'rgba(255,255,255,0.05)',
         padding: '40px 20px',
         borderRadius: '24px',
         border: '1px solid rgba(255,255,255,0.1)',
         width: '100%',
         maxWidth: '350px',
         display: 'flex',
         flexDirection: 'column',
         alignItems: 'center',
         gap: '20px'
       }}>
          <div style={{ color: '#4285F4', opacity: 0.8 }}><MapPin size={48} /></div>
          <div>
            <h2 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Đang mở Google Maps</h2>
            <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>Nếu máy không tự nhảy, hãy bấm nút:</p>
          </div>
          <a href={reviewUrl} style={{
            background: '#4285F4',
            color: 'white',
            textDecoration: 'none',
            padding: '16px 24px',
            borderRadius: '12px',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            width: '100%',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(66,133,244,0.3)'
          }}>
            ẤN VÀO ĐÂY ĐỂ ĐÁNH GIÁ <ChevronRight size={18} />
          </a>
       </div>
    </div>
  );
}
