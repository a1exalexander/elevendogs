import React, { FC } from 'react';
import clsx from 'clsx';
import styles from './Button.module.scss';

export interface ButtonProps {
  className?: string;
  children: string | number;
  href: string;
  type?: 'light' | 'dark';
}

export const Button = ({
  className,
  children,
  href,
  type = 'light',
}: ButtonProps) => {
  return (
    <a href={href} className={clsx(styles.button, styles[type], className)}>
      {children}
    </a>
  );
};

export default Button;
