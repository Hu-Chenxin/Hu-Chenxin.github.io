import React from 'react';
import RichText from './RichText';
import { Bullet } from '../types';

const Bullets: React.FC<{ items: Bullet[] }> = ({ items }) => (
  <ul className="bullet-list">
    {items.map((item, i) => (
      <li key={i}>
        {item.label && <b>{item.label}</b>}
        <RichText text={item.text} />
      </li>
    ))}
  </ul>
);

export default Bullets;
