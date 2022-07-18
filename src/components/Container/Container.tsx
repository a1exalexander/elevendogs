import React from 'react';
import clsx from 'clsx';
import styles from './Container.module.scss';

export interface ContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const Container = ({ className, children }: ContainerProps) => {
  return <div className={clsx(styles.container, className)}>{children}</div>;
};

export default Container;
