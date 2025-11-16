'use client';
import React, { useState, useRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'icon' | 'shiny' | 'glow' | 'gradient';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  children?: React.ReactNode;
  fullWidth?: boolean;
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      href,
      icon,
      iconPosition = 'right',
      children,
      className = '',
      fullWidth = false,
      disabled = false,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
      if (variant !== 'shiny' || !buttonRef.current) return;
      
      const rect = buttonRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    };

    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    // Base styles for all buttons
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant styles
    const variants: Record<ButtonVariant, string> = {
      primary: 'bg-teal-500 text-white hover:bg-teal-400 shadow-md hover:shadow-lg hover:shadow-teal-500/20 focus:ring-teal-400/40 hover:scale-105',
      secondary: 'bg-transparent border border-slate-700 hover:border-teal-400 hover:bg-slate-800/50 text-slate-300 hover:text-teal-400 focus:ring-teal-400/50 hover:scale-105',
      ghost: 'bg-transparent text-teal-400 hover:bg-teal-500/10 focus:ring-teal-400/30',
      icon: 'bg-transparent border border-teal-500/40 text-teal-400 hover:border-teal-400 hover:bg-teal-500/10 focus:ring-teal-400/30',
      shiny: 'relative overflow-visible bg-transparent border-0 hover:scale-105 hover:shadow-[0_0_40px_rgba(20,184,166,0.4)] focus:ring-teal-400/50',
      glow: 'bg-gradient-to-r from-teal-400 to-cyan-400 text-slate-950 shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:from-teal-300 hover:to-cyan-300 active:scale-[0.99] focus:ring-cyan-400/50',
      gradient: 'relative overflow-hidden text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] hover:shadow-[0_14px_38px_rgba(0,0,0,0.45)] hover:scale-[1.03] focus:ring-teal-400/30',
    };

    // Size styles
    const sizes: Record<ButtonSize, string> = {
      sm: 'px-4 py-2 text-xs',
      md: 'px-6 py-3 text-sm',
      lg: 'px-8 py-3 text-base',
      icon: 'h-10 w-10 p-2',
    };

    const classes = `
      ${baseStyles}
      ${variants[variant]}
      ${size !== 'icon' ? sizes[size] : sizes.icon}
      ${fullWidth ? 'w-full' : ''}
      ${className}
    `.trim().replace(/\s+/g, ' ');

    // Shiny button special content
    const shinyContent = variant === 'shiny' && (
      <>
        {/* Edge glows */}
        <div 
          className={`absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-full transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: 'radial-gradient(ellipse 60px 100% at right center, rgba(20, 184, 166, 0.6) 0%, rgba(20, 184, 166, 0.3) 40%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
        <div 
          className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-full opacity-60 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: 'radial-gradient(ellipse 60px 100% at left center, rgba(20, 184, 166, 0.6) 0%, rgba(20, 184, 166, 0.3) 40%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full"></div>
        <div 
          className={`absolute inset-0 rounded-full transition-opacity duration-200 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            background: `radial-gradient(circle 80px at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(255, 255, 255, 0.4) 0%, 
              rgba(255, 255, 255, 0.2) 30%, 
              rgba(255, 255, 255, 0.1) 60%, 
              transparent 100%)`,
            pointerEvents: 'none'
          }}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-t from-teal-600/20 to-transparent"></div>
      </>
    );

    const gradientContent = variant === 'gradient' && (
      <>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(135deg, var(--color-2, #1f3f6d) 0%, var(--color-3, #469396) 45%, var(--color-1, #000022) 85%, var(--color-2, #1f3f6d) 100%)',
            borderRadius: '18px'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(220px 160px at 20% 80%, rgba(70,147,150,0.55) 0%, rgba(70,147,150,0.25) 40%, transparent 70%)',
            borderRadius: '18px'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(180px 140px at 85% 8%, var(--color-4, #f1ffa5) 0%, rgba(241,255,165,0.6) 20%, rgba(70,147,150,0.45) 42%, transparent 65%)',
            borderRadius: '18px'
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 28%, transparent 60%)',
            borderRadius: '18px',
            mixBlendMode: 'soft-light'
          }}
        />
        <div
          className="absolute inset-0 rounded-[18px]"
          style={{
            background:
              'linear-gradient(var(--border-angle, 200deg), var(--border-color-1, hsla(320,75%,90%,.6)), var(--border-color-2, hsla(320,50%,90%,.15)))',
            padding: '1px',
            boxSizing: 'border-box',
            WebkitMask:
              'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            WebkitMaskComposite: 'xor' as any,
            maskComposite: 'exclude' as any,
            borderRadius: '18px'
          }}
        />
      </>
    );

    // Button content
    const content = (
      <>
        {shinyContent}
        {gradientContent}
        <span className={variant === 'shiny' || variant === 'gradient' ? 'relative z-10 flex items-center gap-2' : 'flex items-center gap-2'}>
          {icon && iconPosition === 'left' && icon}
          {children && <span className={variant === 'shiny' ? 'text-white uppercase tracking-wider font-semibold' : ''}>{children}</span>}
          {icon && iconPosition === 'right' && icon}
        </span>
      </>
    );

    const gradientVars = variant === 'gradient' ? ({
      ['--color-1' as any]: '#000022',
      ['--color-2' as any]: '#1f3f6d',
      ['--color-3' as any]: '#469396',
      ['--color-4' as any]: '#f1ffa5',
      ['--border-angle' as any]: '200deg',
      ['--border-color-1' as any]: 'hsla(320, 75%, 90%, .6)',
      ['--border-color-2' as any]: 'hsla(320, 50%, 90%, .15)'
    }) : undefined;

    const commonProps = {
      className: classes,
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      'aria-disabled': disabled,
      style: gradientVars
    };

    if (href && !disabled) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          {...commonProps}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled}
        {...commonProps}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
