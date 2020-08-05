import React, { FC, HTMLAttributes } from 'react';

import styles from './index.module.css';
import { DropZone } from './components/DropZone';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
}

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const MediaUploadForm: FC<Props> = ({ title = 'Upload an image' }) => {
  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    console.log(files);
  }

  return (
    <div className={styles['container']}>
      <p className={styles['title']}>{title}</p>
      <DropZone onDrop={handleFileDrop} />
      <div className={styles['slider']}></div>
      <button className={styles['upload-button']}>Upload</button>
    </div>
  );
};
