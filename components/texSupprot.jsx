"use client";

import { MathComponent } from "mathjax-react";

export const TexSupport = ({ children }) => {
  let res = [];
  let from = 0;
  children.slice(from).replaceAll(/(\$.*\$)/g, (match, _, offset, string) => {
    if (offset !== 0) {
      res.push(<span key={offset}>{string.slice(0, offset - 1)}</span>);
    }
    res.push(
      <MathComponent
        key={`math-${offset}`}
        display={false}
        tex={match.slice(1, -1)}
      />
    );
    from += match.length + offset;
  });

  if (from !== children.length) {
    res.push(<span key={children.length}>{children.slice(from)}</span>);
  }

  return <p className="py-1">{res}</p>;
};
