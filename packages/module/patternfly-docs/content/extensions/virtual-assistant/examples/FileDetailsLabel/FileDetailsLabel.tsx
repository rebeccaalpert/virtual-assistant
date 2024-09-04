import React from 'react';
import FileDetailsLabel from '@patternfly/virtual-assistant/dist/dynamic/FileDetailsLabel';

export const BasicDemo: React.FunctionComponent = () => (
  <div className="pf-chatbot__file-details-example">
    {/* eslint-disable-next-line no-console */}
    <FileDetailsLabel fileName="auth-operator" language="YAML" onClose={() => console.log('clicked close button!')} />
  </div>
);
