'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './QRBuilder.module.css';
import { Settings, Eye, Download, Copy, MapPin, Link as LinkIcon, Upload, Star, Store } from 'lucide-react';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';

// Define type for QRCodeStyling dynamically
type QRCodeStyling = any;

export default function QRBuilder() {
  const [placeId, setPlaceId] = useState('ChIJRd8DOAApdTER8OSMpvARRLs');
  const [directUrl, setDirectUrl] = useState('');
  const [bizName, setBizName] = useState('The Chill Buffet');
  const [cta, setCta] = useState('Quét mã để gửi đánh giá 5 sao nhé!');
  const [brandColor, setBrandColor] = useState('#4285F4');
  const [theme, setTheme] = useState<'light' | 'dark' | 'glass'>('light');
  const [logo, setLogo] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const qrRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const qrCodeStylingRef = useRef<QRCodeStyling | null>(null);

  const [origin, setOrigin] = useState('');
  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // THE QR CODE NOW POINTS DIRECTLY TO THE ROOT DOMAIN FOR MAXIMUM SIMPLICITY!
  const finalUrl = origin || 'https://search.google.com/local/writereview';

  // Load dynamic library on client
  useEffect(() => {
    import('qr-code-styling').then(({ default: QRCodeStyling }) => {
      const qrCode = new QRCodeStyling({
        width: 220,
        height: 220,
        data: finalUrl,
        margin: 0,
        qrOptions: { typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'Q' },
        dotsOptions: { color: brandColor, type: 'extra-rounded' },
        backgroundOptions: { color: 'transparent' },
        cornersSquareOptions: { color: brandColor, type: 'extra-rounded' },
        cornersDotOptions: { color: brandColor, type: 'dot' },
      });
      
      qrCodeStylingRef.current = qrCode;
      if (qrRef.current) {
        qrRef.current.innerHTML = '';
        qrCode.append(qrRef.current);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update QR when properties change
  useEffect(() => {
    if (qrCodeStylingRef.current) {
      qrCodeStylingRef.current.update({
        data: finalUrl,
        dotsOptions: { color: brandColor },
        cornersSquareOptions: { color: brandColor },
        cornersDotOptions: { color: brandColor },
        image: logo || undefined,
        imageOptions: { crossOrigin: 'anonymous', margin: 5 },
      });
    }
  }, [finalUrl, brandColor, logo]);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      if (evt.target?.result) {
        setLogo(evt.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(finalUrl);
      alert('Đã sao chép đường dẫn!');
    } catch (err) {
      console.error('Fail to copy', err);
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setIsDownloading(true);
    
    try {
      // Slight buffer to ensure layout settling
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        cacheBust: true,
      });
      
      const link = document.createElement('a');
      link.download = `google-review-qr-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#4285F4', '#DB4437', '#F4B400', '#0F9D58']
      });

    } catch (err) {
      console.error('Snapshot generation failed', err);
      alert('Có lỗi khi xuất hình ảnh, hãy thử lại.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Construct proper classes for rendering card
  const getThemeClass = () => {
    switch (theme) {
      case 'dark': return styles.cardDark;
      case 'glass': return styles.cardGlass;
      default: return styles.cardLight;
    }
  };

  return (
    <div className={styles.container} style={{ height: '100dvh', display: 'flex', flexDirection: 'column', padding: '12px' }}>
      <div className={styles.grid} style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: 0, gap: '12px', height: '100%' }}>



        <section className={`${styles.previewPanel} glass-panel`}>
          <div className={styles.viewport}>
            {/* The actual rendering object for screenshot */}
            <div ref={cardRef} className={`${styles.card} ${getThemeClass()}`} style={{ justifyContent: 'center', gap: '32px' }}>
              <div className={styles.stars}>
                {[1,2,3,4,5].map(i => <Star key={i} size={32} fill="#F4B400" color="#F4B400" />)}
              </div>

              <div className={styles.qrWrapper}>
                <div ref={qrRef}></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
