'use client';
import React from 'react';
import Button, { ButtonProps } from './Button';

export const GradientButton: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button variant="gradient" size={props.size || 'lg'} {...props}>
      {children}
    </Button>
  );
};

export default GradientButton;