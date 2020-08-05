import React from 'react';
import { MediaUploadForm, Props } from '../src/MediaUploadForm';
import '../styles/reset.css';
import '../styles/global.css';

export default {
  title: 'Welcome',
};

// By passing optional props to this story, you can control the props of the component when
// you consume the story in a test.
export const Default = (props?: Partial<Props>) => <MediaUploadForm {...props} />;
