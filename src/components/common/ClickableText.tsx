import React from 'react';

interface ClickableTextProps {
  text: string;
  onWordClick?: (word: string) => void;
  className?: string;
}

export const ClickableText: React.FC<ClickableTextProps> = ({
  text,
  onWordClick,
  className = '',
}) => {
  if (!text) return null;

  // Split keeping spaces and punctuations
  const tokens = text.split(/(\s+|[.,!?;:()""''])/);

  return (
    <span className={className}>
      {tokens.map((token, index) => {
        const isWord = /^[a-zA-Z]{2,}$/.test(token);
        if (isWord && onWordClick) {
          return (
            <span
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                onWordClick(token.toLowerCase());
              }}
              className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/60 dark:hover:bg-blue-900/30 rounded px-0.5 cursor-pointer transition-colors"
              title={`Tra cứu nhanh: "${token}"`}
            >
              {token}
            </span>
          );
        }
        return <span key={index}>{token}</span>;
      })}
    </span>
  );
};
