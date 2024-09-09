import React from 'react';
import FileDetailsLabel from '@patternfly/virtual-assistant/dist/dynamic/FileDetailsLabel';

export const BasicDemo: React.FunctionComponent = () => (
  <div className="pf-chatbot__file-details-example">
    <FileDetailsLabel
      fileName="auth-operator"
      language="YAML"
      // eslint-disable-next-line no-console
      onClick={() => console.log('clicked entire button!')}
      // eslint-disable-next-line no-console
      onClose={() => console.log('clicked close button!')}
    />
  </div>
);
