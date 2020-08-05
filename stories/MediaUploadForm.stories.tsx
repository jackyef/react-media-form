import React from 'react';
import { MediaUploadForm } from '../src/MediaUploadForm';
import '../styles/reset.css';
import '../styles/global.css';

export default {
  title: 'Welcome',
};

export const Default = () => (
  <div style={{ maxWidth: '600px' }}>
    <MediaUploadForm
      onUpload={file => console.log('upload button clicked!', { file })}
      onPreviewLoad={() => console.log('image preview loaded!')}
    />
  </div>
);
