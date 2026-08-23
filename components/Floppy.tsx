import React from 'react';

/** 灰线软盘轮廓：存储与读取的视觉母题 */
const Floppy: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={`floppy ${className}`} viewBox="0 0 100 100" aria-hidden="true">
    <path className="fl-shell" d="M11 9 H80 L89 18 V91 H11 Z" />
    <path className="fl-shutter" d="M34 9 H66 V35 H34 Z" />
    <path className="fl-shutter-slide" d="M54 11 H64 V33 H54 Z" />
    <path className="fl-label" d="M25 51 H75 V87 H25 Z" />
    <path className="fl-line" d="M31 62 H69" />
    <path className="fl-line" d="M31 71 H61" />
  </svg>
);

export default Floppy;
