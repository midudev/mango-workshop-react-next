'use client'

import { useState } from "react";

export function Counter() {
  console.log('<Counter />')

  const [count, setCount] = useState(0);

  return (
    <div className="flex font-bold text-6xl">
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <span>{count}</span>
    </div>
  );
}