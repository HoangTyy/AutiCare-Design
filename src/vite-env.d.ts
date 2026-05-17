/// <reference types="vite/client" />

declare module 'react-tilt-button' {
  import React from 'react';
  
  export interface TiltButtonProps {
    elevation?: number;
    radius?: number;
    surfaceColor?: string;
    textColor?: string;
    tilt?: number;
    padding?: string;
    className?: string;
    children?: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  }
  
  export const TiltButton: React.FC<TiltButtonProps>;
}
