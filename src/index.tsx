import React, { FC, HTMLAttributes, ReactChild } from 'react';

import styles from './index.module.css';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const Thing: FC<Props> = ({ children }) => {
  console.log({ styles })
  return <div className={styles['red']}>{children || `the snozzberrasdsadies taste like snozzberries`}</div>;
};
