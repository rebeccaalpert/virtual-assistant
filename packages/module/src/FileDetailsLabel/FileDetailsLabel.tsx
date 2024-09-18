import React, { PropsWithChildren } from 'react';
import { Button, Flex, FlexItem, Label } from '@patternfly/react-core';
import FileDetails from '../FileDetails';
import { Spinner } from '@patternfly/react-core';
import { TimesIcon } from '@patternfly/react-icons';

interface FileDetailsLabelProps {
  /** Name of file, including extension */
  fileName: string;
  /** Whether to display loading icon */
  isLoading?: boolean;
  /** Callback function for when label is clicked */
  onClick?: (event: React.MouseEvent) => void;
  /** Callback function for when close button is clicked */
  onClose?: (event: React.MouseEvent) => void;
  /** Aria label for close button */
  closeButtonAriaLabel?: string;
}

export const FileDetailsLabel = ({
  fileName,
  isLoading,
  onClick = undefined,
  onClose = undefined,
  closeButtonAriaLabel
}: PropsWithChildren<FileDetailsLabelProps>) => (
  <Label
    className="pf-chatbot__file-label"
    onClose={onClose}
    closeBtn={
      <Button
        type="button"
        variant="plain"
        onClick={onClose}
        aria-label={closeButtonAriaLabel ?? `Close ${fileName}`}
        icon={<TimesIcon />}
      />
    }
    onClick={onClick}
    textMaxWidth="370px"
  >
    <Flex
      justifyContent={{ default: 'justifyContentCenter' }}
      alignItems={{ default: 'alignItemsCenter' }}
      gap={{ default: 'gapMd' }}
    >
      <FlexItem>
        <FileDetails fileName={fileName} />
      </FlexItem>
      {isLoading && (
        <FlexItem>
          <Spinner size="sm" />
        </FlexItem>
      )}
    </Flex>
  </Label>
);

export default FileDetailsLabel;
