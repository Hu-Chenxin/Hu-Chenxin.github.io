import React from 'react';

interface SectionTitleProps {
  cn: string;
  en: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ cn, en }) => (
  <h2 className="section-title">
    {cn} <span className="en">{en}</span>
  </h2>
);

export default SectionTitle;
