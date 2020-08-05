import React, { FC } from 'react';
import cx from 'classnames';

import { MediaFormContext } from '../index';

import { noop } from '../../utils/noop';

import styles from './DropZone.module.css';

// we can set this to be passed down as props if needed. For now, we hardcode this to image types
const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
const validFilesExts = validTypes.join(',');

interface Props {
  onMediaLoad?: () => any;
}

export const DropZone: FC<Props> = ({ onMediaLoad = noop }) => {
  const [state, setState] = React.useState<'idle' | 'hovered' | 'invalid'>(
    'idle'
  );
  const { currentFile, setFile, compressionRate } = React.useContext(
    MediaFormContext
  );
  const [dataUrl, setDataUrl] = React.useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const dragOver = (e: React.DragEvent) => {
    // we need to prevent default here to prevent default browser behavior that might open
    // the file immediately in new tab
    e.preventDefault();
  };

  const dragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    setState('hovered');
  };

  const dragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setState('idle');
  };

  const validateFile = (file: File) => {
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }

    return true;
  };

  const handleUpdateFile = (file: File) => {
    if (validateFile(file)) {
      // assume FileReader is supported, else we need to fallback gracefully
      // we use FileReader to get the DataURL
      const reader = new FileReader();

      reader.onload = () => {
        setFile(file);
        setDataUrl(reader.result as string);

        onMediaLoad();
      };

      reader.readAsDataURL(file);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length < 1) {
      setState('invalid');
    } else {
      // in real world case, with compressions and other stuffs (which we might move to web worker)
      // this could take quite a bit of time.
      // in that case, we can set it to another state like 'processing' instead of 'idle' here
      setState('idle');

      // for now just assume we only have 1 file
      handleUpdateFile(files[0]);
    }
  };

  const handleInputChange = () => {
    const file = fileInputRef.current?.files?.[0];

    if (file) {
      handleUpdateFile(file);
    }
  };

  const handleDropZoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <input
        className={styles['file-input']}
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        accept={validFilesExts}
      />
      <div
        className={cx({
          [styles['dropzone']]: true,
          [styles['dropzone-hover']]: state === 'hovered',
        })}
        onClick={handleDropZoneClick}
      >
        <div
          className={styles['dropzone-content']}
          onDragOver={dragOver}
          onDragEnter={dragEnter}
          onDragLeave={dragLeave}
          onDrop={handleFileDrop}
        >
          {dataUrl ? (
            <>
              <img
                src={dataUrl}
                // just for demo purposes, make the image blurred to show effect of compression
                style={{ filter: `blur(${(100 - compressionRate) / 20}px)` }}
              />
              {currentFile ? `${currentFile.size} bytes` : null}
            </>
          ) : (
            'Drag and drop your image here!'
          )}
        </div>
      </div>
    </>
  );
};
