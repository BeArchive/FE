import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// 여러 개의 Tailwind 클래스를 조건에 따라 합치거나 중복 제거
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
