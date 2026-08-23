import React from 'react';
import { FOOTER } from '../resume';

const ORB_CLASSES = ['orb-c1', 'orb-c2', 'orb-c3', 'orb-c4', 'orb-c5', 'orb-c6'];

const Footer: React.FC = () => (
  <footer className="footer" id="contact">
    <div className="container">
      <div className="footer-orbs" aria-hidden="true">
        {ORB_CLASSES.map(cls => (
          <span className={`orb ${cls}`} key={cls} />
        ))}
      </div>
      <h2 className="footer-title">
        {FOOTER.titleTop} <span className="script">{FOOTER.titleScript}</span>
      </h2>
      <p className="footer-sub">
        {FOOTER.sub}
        {FOOTER.contacts.map(c => (
          <a
            key={c.href}
            href={c.href}
            className={`chip${c.external ? ' chip-link' : ''}`}
            {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {c.label}
          </a>
        ))}
      </p>
      <p className="footer-copy">
        © {new Date().getFullYear()} 胡晨欣 &nbsp;·&nbsp; {FOOTER.copy}
      </p>
    </div>
  </footer>
);

export default Footer;
