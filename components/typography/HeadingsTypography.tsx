import React from "react";

export function H1({ H1 }: { H1: string }) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {H1}
    </h1>
  );
}

export function H2({ H2 }: { H2: string }) {
  return (
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
      {H2}
    </h2>
  );
}

export function P({ P }: { P: string }) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{P}</p>;
}
