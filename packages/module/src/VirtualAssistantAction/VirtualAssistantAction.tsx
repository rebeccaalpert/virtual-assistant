import * as React from 'react';
import { Button, ButtonProps, ButtonVariant } from '@patternfly/react-core';

export type VirtualAssistantActionProps = ButtonProps;

export const VirtualAssistantAction: React.FunctionComponent<ButtonProps> = ({
  variant = ButtonVariant.plain,
  className,
  ...otherProps
}) => <Button variant={variant} className={className} {...otherProps} />;

export default VirtualAssistantAction;
