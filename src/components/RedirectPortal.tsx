'use client';

import React, { useEffect, useState } from 'react';
import { MapPin, ExternalLink, ChevronRight, Star } from 'lucide-react';

export default function RedirectPortal() {
  const placeId = 'ChIJRd8DOAApdTER8OSMpvARRLs';
  const bizName = 'The Chill Buffet';
  const reviewUrl = `https://search.google.com/local/writereview?placeid=${placeId}`;
  
  // Intent formatting for Android to force open Google Maps App directly
  const androidIntent = `intent://search.google.com/local/writereview?placeid=${placeId}#Intent;scheme=https;package=com.google.android.apps.maps;end`;
  
  // Direct App scheme for iOS (Fallback)
  const iosScheme = `comgooglemaps://?q=${encodeURIComponent(bizName)}&center=0,0&views=satellite&zoom=15`; 

  const [isZalo, setIsZalo] = useState(false);
  const [os, setOs] = useState<'android' | 'ios' | 'other'>('other');

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    
    // Detect OS
    if (/android/i.test(ua)) setOs('android');
    else if (/iPad|iPhone|iPod/.test(ua) && !(window as any).MSStream) setOs('ios');

    // Detect Zalo In-app browser
    if (/Zalo/i.test(ua)) {
      setIsZalo(true);
    }

    // Aggressive Auto-redirect for Android users on load
    if (/android/i.test(ua)) {
        window.location.href = androidIntent;
    } else {
        // Standard redirect fallback
        const timer = setTimeout(() => {
            // Non-android fallback auto redirect
            // (Disabled for Zalo iOS to prevent sandbox blocking, let user click instead for safety)
            if (!/Zalo/i.test(ua)) {
               window.location.href = reviewUrl;
            }
        }, 1000);
        return () => clearTimeout(timer);
    }
  }, []);

  const handleRedirect = () => {
    if (os === 'android') {
      window.location.href = androidIntent;
    } else {
      // Force explicit browser navigation via User Click to break Zalo sandboxing on iOS
      window.location.href = reviewUrl;
    }
  };

  return (
    <div style={{
      minHeight: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#0f172a',
      color: 'white',
      fontFamily: 'var(--font-body)'
    }}>
      
      {/* Animated background */}
      <div className="bg-blobs" style={{ opacity: 0.3 }}>
         <div className="blob blob-1" style={{ background: 'radial-gradient(circle, #4285F4 0%, transparent 70%)' }}></div>
         <div className="blob blob-2" style={{ background: 'radial-gradient(circle, #34A853 0%, transparent 70%)' }}></div>
      </div>

      {/* Dynamic Content */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '32px',
        padding: '40px 24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
        animation: 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        
        {/* Animated Success/Loading Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          background: 'rgba(66, 133, 244, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#4285F4',
          position: 'relative'
        }}>
           <MapPin size={40} style={{ zIndex: 2 }} />
           <div style={{
             position: 'absolute',
             width: '100%',
             height: '100%',
             borderRadius: '50%',
             border: '2px solid #4285F4',
             animation: 'pulse 2s infinite',
             opacity: 0.6
           }} />
        </div>

        <div>
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: 800, 
            marginBottom: '8px',
            fontFamily: 'var(--font-primary)'
          }}>
            {bizName}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5 }}>
            Vui lòng nhấn nút bên dưới để mở trang đánh giá 5 sao ngay lập tức!
          </p>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {[1,2,3,4,5].map(i => <Star key={i} fill="#F4B400" color="#F4B400" size={20} />)}
        </div>

        {/* The Master Action Button to Break Sandboxes */}
        <button 
          onClick={handleRedirect}
          style={{
            width: '100%',
            padding: '18px',
            background: 'linear-gradient(135deg, #4285F4, #3b82f6)',
            border: 'none',
            borderRadius: '16px',
            color: 'white',
            fontWeight: 700,
            fontSize: '1.1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            cursor: 'pointer',
            boxShadow: '0 10px 25px rgba(66, 133, 244, 0.4)',
            transition: 'transform 0.2s'
          }}
          onTouchStart={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onTouchEnd={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          ĐÁNH GIÁ 5 SAO <ChevronRight size={20} />
        </button>

        {isZalo && (
           <div style={{
             marginTop: '10px',
             fontSize: '0.75rem',
             color: 'rgba(255,255,255,0.4)',
             display: 'flex',
             alignItems: 'center',
             gap: '6px'
           }}>
             <ExternalLink size={14} /> Tự động phá chặn trình duyệt Zalo
           </div>
        )}
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
