import React, { useState, useEffect } from 'react';
import { MONTHS } from '../utils/dates';
import { getMonthImage } from '../utils/images';
import './HeroPanel.css';

export default function HeroPanel({ viewYear, viewMonth, onPrev, onNext }) {
  const [loaded, setLoaded] = useState(false);
  const [currentImg, setCurrentImg] = useState(null);
  const [prevImg, setPrevImg] = useState(null);
  const [flipping, setFlipping] = useState(false);
  const imgData = getMonthImage(viewMonth);

  useEffect(() => {
    if (currentImg && currentImg !== imgData) {
      setPrevImg(currentImg);
      setFlipping(true);
      const t = setTimeout(() => {
        setFlipping(false);
        setPrevImg(null);
      }, 500);
      return () => clearTimeout(t);
    }
    setCurrentImg(imgData);
  }, [imgData]);

  useEffect(() => {
    setCurrentImg(imgData);
    setLoaded(false);
  }, [viewMonth, viewYear]);

  return (
    <div className="hero-panel" style={{ '--hero-color': imgData.color }}>
      {/* Spiral binding */}
      <div className="hero-spiral" aria-hidden="true">
        {Array.from({ length: 13 }).map((_, i) => (
          <div key={i} className="hero-spiral__ring" />
        ))}
      </div>

      {/* Image area */}
      <div className={`hero-img-wrap ${flipping ? 'hero-img-wrap--flip' : ''}`}>
        {prevImg && (
          <img
            src={prevImg.url}
            alt=""
            className="hero-img hero-img--prev"
            aria-hidden="true"
          />
        )}
        <img
          src={imgData.url}
          alt={`${MONTHS[viewMonth]} ${viewYear} — ${imgData.credit}`}
          className={`hero-img ${loaded ? 'hero-img--loaded' : ''}`}
          onLoad={() => setLoaded(true)}
        />
        {!loaded && <div className="hero-img-skeleton" />}

        {/* Diagonal overlay */}
        <div className="hero-overlay" />
      </div>

      {/* Month + Year title */}
      <div className="hero-title-block">
        <div className="hero-year">{viewYear}</div>
        <div className="hero-month">{MONTHS[viewMonth]}</div>
        <div className="hero-credit">{imgData.credit}</div>
      </div>

      {/* Navigation arrows */}
      <button className="hero-nav hero-nav--prev" onClick={onPrev} aria-label="Previous month">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button className="hero-nav hero-nav--next" onClick={onNext} aria-label="Next month">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}
