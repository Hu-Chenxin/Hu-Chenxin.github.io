import React from 'react';

/** 把 **强调** 渲染为 <b>，用于数据里的行内加粗 */
const RichText: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split(/\*\*(.+?)\*\*/g).map((part, i) => (i % 2 === 1 ? <b key={i}>{part}</b> : part))}
  </>
);

export default RichText;
