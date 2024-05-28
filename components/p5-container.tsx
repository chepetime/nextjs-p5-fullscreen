"use client";

import React, { useRef, useEffect } from "react";
import p5 from "p5";
import useIsMounted from "@/hooks/useIsMounted";

interface P5jsContainerProps {
  sketch: (p: p5) => void;
}

const P5Container: React.FC<P5jsContainerProps> = ({ sketch }) => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted && typeof window !== "undefined" && parentRef.current) {
      const canvas = new p5(sketch, parentRef.current);
      return () => {
        canvas.remove();
      };
    }
  }, [isMounted, sketch]);

  return <div ref={parentRef}></div>;
};

export default P5Container;
