import {
  Button,
  EmptyState,
  EmptyStateActions,
  EmptyStateBody,
  EmptyStateFooter,
  EmptyStateProps
} from '@patternfly/react-core';
import React from 'react';

export interface HistoryEmptyStateProps extends EmptyStateProps {
  onClick?: () => void;
  bodyText?: string | React.ReactNode;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
  hasButton?: boolean;
}

export const HistoryEmptyState: React.FunctionComponent<HistoryEmptyStateProps> = ({
  bodyText,
  buttonIcon,
  buttonText,
  status,
  titleText,
  headingLevel,
  onClick,
  hasButton = false,
  ...props
}: HistoryEmptyStateProps) => (
  <EmptyState status={status} titleText={titleText} headingLevel={headingLevel} {...props}>
    <EmptyStateBody>{bodyText}</EmptyStateBody>
    {hasButton && (
      <EmptyStateFooter>
        <EmptyStateActions>
          <Button icon={buttonIcon} variant="secondary" onClick={onClick}>
            {buttonText}
          </Button>
        </EmptyStateActions>
      </EmptyStateFooter>
    )}
  </EmptyState>
);

export default HistoryEmptyState;
