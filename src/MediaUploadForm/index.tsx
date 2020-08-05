import React, { FC, HTMLAttributes, BlockquoteHTMLAttributes } from 'react';

import styles from './index.module.css';
import { DropZone } from './components/DropZone';
import { noop } from '../utils/noop';

// Depending on the real requirements, we can expose more API here
// like onError, onInvalidFileType, etc.
export interface Props extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  onPreviewLoad?: () => any;
  onUpload?: (file?: File) => any;
}

export const MediaFormContext = React.createContext<{
  currentFile?: File;
  compressionRate: number;
  setFile: (file: File) => any;
  uploadProgress: number;
  isUploading: boolean;
}>({
  compressionRate: 95,
  setFile: noop,
  uploadProgress: 0,
  isUploading: false,
});

// Please do not use types off of a default export module or else Storybook Docs will suffer.
// see: https://github.com/storybookjs/storybook/issues/9556
export const MediaUploadForm: FC<Props> = ({
  title = 'Upload an image',
  onPreviewLoad = noop,
  onUpload = noop,
}) => {
  const [currentFile, setFile] = React.useState<File>();
  const [compressionRate, setCompressionRate] = React.useState<number>(95);
  const [isUploading, setIsUploading] = React.useState(false);
  const [uploadProgress, setUploadProgress] = React.useState(0);

  const handleUpload = () => {
    onUpload(currentFile);

    // For now, just simulate upload progress
    // in a real world, we can listen to xhr progress event
    // https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/upload

    setIsUploading(true);
  };

  console.log({ isUploading, uploadProgress });

  React.useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (isUploading) {
      if (uploadProgress < 100) {
        timeout = setTimeout(() => {
          setUploadProgress(prev => prev + 20);
        }, 1000)
      } else {
        setIsUploading(false);
        setUploadProgress(0);
      }
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [isUploading, uploadProgress]);


  const handleCompressionRateChange = (e: React.FormEvent<HTMLInputElement>) => {
    if (e.target) {
      setCompressionRate(Number((e.target as HTMLInputElement).value));
    }
  }

  return (
    <MediaFormContext.Provider value={{ currentFile, setFile, compressionRate, uploadProgress, isUploading }}>
      <div className={styles['container']}>
        <p className={styles['title']}>{title}</p>
        <DropZone onPreviewLoad={onPreviewLoad} />
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
        <button disabled={!currentFile || isUploading} onClick={handleUpload} className={styles['upload-button']}>
          Upload
        </button>
      </div>
    </MediaFormContext.Provider>
  );
};
