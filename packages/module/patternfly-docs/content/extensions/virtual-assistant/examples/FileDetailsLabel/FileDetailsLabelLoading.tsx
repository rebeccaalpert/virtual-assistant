import React from 'react';
import FileDetailsLabel from '@patternfly/virtual-assistant/dist/dynamic/FileDetailsLabel';

export const BasicDemo: React.FunctionComponent = () => (
  <div className="pf-chatbot__file-details-example">
    <FileDetailsLabel fileName="auth-operator.yml" isLoading />
  </div>
);
