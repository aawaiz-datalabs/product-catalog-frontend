import React from "react";

export default function h1({ h1 }: { h1: string }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {h1}
    </h1>
  );
}
