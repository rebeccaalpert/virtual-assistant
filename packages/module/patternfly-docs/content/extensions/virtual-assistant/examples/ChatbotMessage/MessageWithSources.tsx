import React from 'react';

import Message from '@patternfly/virtual-assistant/dist/dynamic/Message';

export const AttachmentMenuExample: React.FunctionComponent = () => {
  const onSetPage = (_event: React.MouseEvent | React.KeyboardEvent | MouseEvent, newPage: number) => {
    // eslint-disable-next-line no-console
    console.log(`Page changed to ${newPage}`);
  };

  return (
    <Message
      role="bot"
      content="Example content with updated timestamp text"
      timestamp="1 hour ago"
      sources={{
        sources: [
          {
            title: <a href="#">Getting started with Red Hat OpenShift</a>,
            body: 'Red Hat OpenShift on IBM Cloud is a managed offering to create your own cluster of compute hosts where you can deploy and manage containerized apps on IBM Cloud ...'
          },
          {
            title: <a href="#">Azure Red Hat OpenShift documentation</a>,
            body: 'Microsoft Azure Red Hat OpenShift allows you to deploy a production ready Red Hat OpenShift cluster in Azure ...'
          },
          {
            title: <a href="#">OKD Documentation: Home</a>,
            body: 'OKD is a distribution of Kubernetes optimized for continuous application development and multi-tenant deployment. OKD also serves as the upstream code base upon ...'
          }
        ],
        onSetPage
      }}
    />
  );
};
