import React, { useMemo } from 'react';
import katex from 'katex';
import { ClickableText } from './ClickableText';

interface MathTextProps {
  text: string;
  onWordClick?: (word: string) => void;
  className?: string;
  displayMode?: boolean;
}

interface TextSegment {
  type: 'text' | 'inline-math' | 'block-math';
  content: string;
}

function splitMathSegments(input: string): TextSegment[] {
  if (!input) return [];
  const segments: TextSegment[] = [];
  // Match $$...$$ or $...$ (non-greedy)
  const regex = /(\$\$[\s\S]+?\$\$|\$[^$\n]+?\$)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      segments.push({
        type: 'text',
        content: input.slice(lastIndex, match.index),
      });
    }

    const token = match[0];
    if (token.startsWith('$$') && token.endsWith('$$')) {
      segments.push({
        type: 'block-math',
        content: token.slice(2, -2).trim(),
      });
    } else {
      segments.push({
        type: 'inline-math',
        content: token.slice(1, -1).trim(),
      });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < input.length) {
    segments.push({
      type: 'text',
      content: input.slice(lastIndex),
    });
  }

  return segments;
}

function renderLatexHtml(latex: string, displayMode: boolean): string {
  try {
    return katex.renderToString(latex, {
      displayMode,
      throwOnError: false,
      strict: false,
      trust: true,
    });
  } catch {
    return latex;
  }
}

export const MathText: React.FC<MathTextProps> = ({
  text,
  onWordClick,
  className = '',
  displayMode = false,
}) => {
  const segments = useMemo(() => {
    if (displayMode && !text.includes('$')) {
      return [{ type: 'block-math' as const, content: text }];
    }
    return splitMathSegments(text);
  }, [text, displayMode]);

  return (
    <span className={className}>
      {segments.map((seg, idx) => {
        if (seg.type === 'text') {
          return onWordClick ? (
            <ClickableText key={idx} text={seg.content} onWordClick={onWordClick} />
          ) : (
            <span key={idx}>{seg.content}</span>
          );
        }

        const isBlock = seg.type === 'block-math';
        const html = renderLatexHtml(seg.content, isBlock);
        return (
          <span
            key={idx}
            className={isBlock ? 'block my-2 overflow-x-auto py-1' : 'inline-block align-baseline mx-0.5'}
            dangerouslySetInnerHTML={{ __html: html }}
          />
        );
      })}
    </span>
  );
};
