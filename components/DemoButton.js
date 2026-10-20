"use client";
import { useDemo } from "./DemoProvider";
export default function DemoButton({ id, className = "btn", children }) {
  const { openDemo } = useDemo();
  return <button type="button" className={className} onClick={() => openDemo(id)}>{children}</button>;
}
