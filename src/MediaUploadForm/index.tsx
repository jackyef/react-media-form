import React, { FC, HTMLAttributes } from 'react';

import styles from './index.module.css';
import { DropZone } from './components/DropZone';
import { noop } from '../utils/noop';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  onMediaLoad?: () => any;
  onUpload?: (file?: File) => any;
}

export const MediaFormContext = React.createContext<{
  currentFile?: File;
  compressionRate: number;
  setFile: (file: File) => any;
}>({
  compressionRate: 95,
  setFile: noop,
});

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const MediaUploadForm: FC<Props> = ({
  title = 'Upload an image',
  onMediaLoad = noop,
  onUpload = noop,
}) => {
  const [currentFile, setFile] = React.useState<File>();
  const [compressionRate, setCompressionRate] = React.useState<number>(95);
  const handleUpload = () => {
    onUpload(currentFile);
  };

  const handleCompressionRateChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.target) {
      setCompressionRate(Number((e.target as HTMLInputElement).value));
    }
  }

  return (
    <MediaFormContext.Provider value={{ currentFile, setFile, compressionRate }}>
      <div className={styles['container']}>
        <p className={styles['title']}>{title}</p>
        <DropZone onMediaLoad={onMediaLoad} />
        <div className={styles['slider-container']}>
          <label htmlFor="compression-rate">Compression rate ({compressionRate}) </label>
          <input
            type="range"
            min="1"
            max="100"
            value={compressionRate}
            onChange={handleCompressionRateChange}
            className={styles['slider']}
            id="compression-rate"
          />
        </div>
        <button onClick={handleUpload} className={styles['upload-button']}>
          Upload
        </button>
      </div>
    </MediaFormContext.Provider>
  );
};
