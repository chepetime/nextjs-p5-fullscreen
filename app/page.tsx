import ClientOnly from "@/components/client-only";

import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import { mySketch } from "@/sketches/mysketch";

// Use dynamic import to prevent server-side rendering of p5.js component
const P5Container = dynamic(() => import("@/components/p5-container"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="h-screen w-screen m-0 p-0">
      <Suspense>
        <ClientOnly>
          <P5Container sketch={mySketch} />
        </ClientOnly>
      </Suspense>
    </div>
  );
}
