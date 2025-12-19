import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...inputs: ClassValue[]): string => {
  return twMerge(clsx(inputs));
};

export default cn;
