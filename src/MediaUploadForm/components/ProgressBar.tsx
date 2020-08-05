import React, { FC } from 'react';

import styles from './ProgressBar.module.css';

interface Props {
  progress: number; // number from 0-100
}

export const ProgressBar: FC<Props> = ({ progress }) => {
  return (
    <div className={styles['container']}>
      <div
        className={styles['fill']}
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
};
