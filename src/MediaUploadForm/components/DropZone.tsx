import React, { FC } from 'react';
import cx from 'classnames';
import styles from './DropZone.module.css';

interface Props {
  onDrop: React.DragEventHandler;
}

export const DropZone: FC<Props> = () => {
  const [state, setState] = React.useState<'idle' | 'hovered' | 'invalid'>(
    'idle'
  );
  const [currentFile, setFile] = React.useState<File | null>(null);
  const [dataUrl, setDataUrl] = React.useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null)

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
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
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
      };

      reader.readAsDataURL(file);
    }
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    if (files.length < 1) {
      setState('invalid');
    } else {
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
  }

  const handleDropZoneClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  return (
    <>
      <input className={styles['file-input']} type="file" ref={fileInputRef} onChange={handleInputChange} /> 
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
              <img src={dataUrl} />
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
