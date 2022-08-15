import styles from './HiddenTitle.module.scss';

export interface HiddenTitleProps {
  children: string;
}

export const HiddenTitle = ({ children }: HiddenTitleProps) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default HiddenTitle;
