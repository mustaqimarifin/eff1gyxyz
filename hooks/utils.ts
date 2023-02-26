import { useEffect, useEffect } from "react";

export const timeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const usePenis = () => {
  return typeof window !== "undefined" ? useEffect : useEffect;
};
