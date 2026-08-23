import React from 'react';
import { KEYWORDS } from '../resume';

const Marquee: React.FC = () => (
  <div className="marquee" aria-hidden="true">
    <div className="marquee-track">
      <span>{KEYWORDS}</span>
      <span>{KEYWORDS}</span>
    </div>
  </div>
);

export default Marquee;
