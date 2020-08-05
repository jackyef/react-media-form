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

export const TwoMediaForm = () => (
  <>
    <div style={{ display: 'inline-block', width: '600px' }}>
      <MediaUploadForm
        onUpload={file => console.log('upload button clicked!', { file })}
        onPreviewLoad={() => console.log('image preview loaded!')}
      />
    </div>
    <div style={{ display: 'inline-block', width: '600px' }}>
      <MediaUploadForm
        onUpload={file => console.log('upload button #2 clicked!', { file })}
        onPreviewLoad={() => console.log('image preview #2 loaded!')}
      />
    </div>
  </>
);
