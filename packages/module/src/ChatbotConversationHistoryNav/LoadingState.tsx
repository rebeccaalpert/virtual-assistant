import { Skeleton } from '@patternfly/react-core';
import React from 'react';

export interface LoadingStateProps {
  'aria-label'?: string;
}
export const LoadingState: React.FunctionComponent<LoadingStateProps> = ({
  'aria-label': ariaLabel
}: LoadingStateProps) => (
  <div className="pf-chatbot__history-loading">
    <div className="pf-chatbot__history-loading-block">
      <Skeleton screenreaderText={ariaLabel ?? 'Loading'} fontSize="3xl" />
    </div>
    <div className="pf-chatbot__history-loading-block">
      <Skeleton fontSize="sm" width="70%" />
      <Skeleton fontSize="3xl" />
      <Skeleton fontSize="3xl" />
    </div>
    <div className="pf-chatbot__history-loading-block">
      <Skeleton fontSize="sm" width="70%" />
      <Skeleton fontSize="3xl" />
      <Skeleton fontSize="3xl" />
      <Skeleton fontSize="3xl" />
    </div>
    <div className="pf-chatbot__history-loading-block">
      <Skeleton fontSize="sm" width="70%" />
      <Skeleton fontSize="3xl" />
      <Skeleton fontSize="3xl" />
      <Skeleton fontSize="3xl" />
      <Skeleton fontSize="3xl" />
    </div>
    <div className="pf-chatbot__history-loading-block">
      <Skeleton fontSize="sm" width="70%" />
      <Skeleton fontSize="3xl" />
    </div>
  </div>
);

export default LoadingState;
