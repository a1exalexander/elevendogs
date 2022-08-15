import React, { FC } from "react";
import clsx from "clsx";
import styles from "./Button.module.scss";

export interface ButtonProps {
  className?: string;
  children: string | number;
  href: string;
  type?: "light" | "dark";
  backgroundColor?: string;
}

export const Button = ({
  className,
  children,
  href,
  type = "light",
  backgroundColor = "#e6e6e6",
}: ButtonProps) => {
  return (
    <a
      href={href}
      className={clsx(styles.button, styles[type], className)}
      style={{ backgroundColor }}
    >
      {children}
    </a>
  );
};

export default Button;
