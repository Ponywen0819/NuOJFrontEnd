"use client";

import { MathComponent } from "mathjax-react";
import { Box, Text } from "@/components/chakra";

export const TexSupport = ({ children }) => {
  let res = [];
  let from = 0;
  children.slice(from).replaceAll(/(\$.*\$)/g, (match, _, offset, string) => {
    if (offset !== 0) {
      res.push(string.slice(0, offset - 1));
    }
    res.push(
      <MathComponent
        tex={match.slice(1, -1)}
        display={false}
        key={`math-${offset}`}
      />
    );
    from += match.length + offset;
  });

  if (from !== children.length) {
    res.push(children.slice(from));
  }

  return <Text>{res}</Text>;
};
