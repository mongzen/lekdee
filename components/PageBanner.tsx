import React from 'react';

interface PageBannerProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  imgSrc: string;
  theme?: 'gold' | 'purple' | 'blue' | 'pink' | 'teal';
}

export default function PageBanner({ eyebrow, title, subtitle, imgSrc, theme = 'purple' }: PageBannerProps) {
  return (
    <div className={`page-banner theme-${theme}`}>
      <div className="pb-content">
        <div className="pb-eyebrow">{eyebrow}</div>
        <h1 className="pb-title">{title}</h1>
        <p className="pb-subtitle">{subtitle}</p>
      </div>
      <div className="pb-visual" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc} alt="" className="pb-img" />
      </div>
    </div>
  );
}
