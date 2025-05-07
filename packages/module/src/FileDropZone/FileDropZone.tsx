import { DropEvent, MultipleFileUpload, MultipleFileUploadMain } from '@patternfly/react-core';
import type { FunctionComponent } from 'react';
import { useState } from 'react';
import { ChatbotDisplayMode } from '../Chatbot';
import { UploadIcon } from '@patternfly/react-icons';

export interface FileDropZoneProps {
  /** Content displayed when the drop zone is not currently in use */
  children?: React.ReactNode;
  /** Custom classname for the outer dropzone component */
  className?: string;
  /** Informational text that shows below the title in the drop zone */
  infoText?: string;
  /** When files are dropped or uploaded this callback will be called with all accepted files */
  onFileDrop: (event: DropEvent, data: File[]) => void;
  /** Display mode for the Chatbot parent; this influences the styles applied */
  displayMode?: ChatbotDisplayMode;
}

const FileDropZone: FunctionComponent<FileDropZoneProps> = ({
  children,
  className,
  infoText = 'Maximum file size is 25 MB',
  onFileDrop,
  displayMode = ChatbotDisplayMode.default,
  ...props
}: FileDropZoneProps) => {
  const [showDropZone, setShowDropZone] = useState(false);

  const renderDropZone = () => (
    <>
      <MultipleFileUploadMain
        titleIcon={<UploadIcon />}
        titleText="Drag and drop your file here"
        infoText={infoText}
        isUploadButtonHidden
      />
    </>
  );

  return (
    <MultipleFileUpload
      dropzoneProps={{
        onDrop: () => setShowDropZone(false),
        ...props
      }}
      onDragEnter={() => setShowDropZone(true)}
      onDragLeave={() => setShowDropZone(false)}
      onFileDrop={onFileDrop}
      className={`pf-chatbot__dropzone pf-chatbot__dropzone--${displayMode} pf-chatbot__dropzone--${showDropZone ? 'visible' : 'invisible'} ${className ? className : ''}`}
    >
      {showDropZone ? renderDropZone() : children}
    </MultipleFileUpload>
  );
};

export default FileDropZone;
