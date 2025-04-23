// ============================================================================
// Chatbot Main - Messages - Close Button
// ============================================================================
import type { FunctionComponent } from 'react';

// Import PatternFly components
import { Button, ButtonProps } from '@patternfly/react-core';
import { CloseIcon } from '@patternfly/react-icons';

export interface CloseButtonProps extends ButtonProps {
  /** Callback function for when close button is clicked */
  onClose?: () => void;
  /** Aria-label for button */
  ariaLabel?: string;
}

const CloseButton: FunctionComponent<CloseButtonProps> = ({ onClose, ariaLabel }: CloseButtonProps) => (
  <Button variant="plain" onClick={onClose} icon={<CloseIcon />} aria-label={ariaLabel} />
);

export default CloseButton;
