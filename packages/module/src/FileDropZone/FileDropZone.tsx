import { DropEvent, MultipleFileUpload, MultipleFileUploadMain } from '@patternfly/react-core';
import { UploadIcon } from '@patternfly/react-icons';
import React from 'react';

export interface FileDropZoneProps {
  /** Content displayed when the drop zone is not currently in use */
  children?: React.ReactNode;
  /** Custom classname for the outer dropzone component */
  className?: string;
  /** Informational text that shows below the title in the drop zone */
  infoText?: string;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** When files are dropped or uploaded this callback will be called with all accepted files */
  onFileDrop?: (event: DropEvent, data: File[]) => void;
}

const FileDropZone: React.FunctionComponent<FileDropZoneProps> = ({
  children,
  className,
  infoText = 'Maximum file size is 25 MB',
  maxSize = 25000000,
  onFileDrop
}: FileDropZoneProps) => {
  const [showDropZone, setShowDropZone] = React.useState(false);

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
        maxSize,
        maxFiles: 1,
        multiple: false,
        onDrop: () => setShowDropZone(false)
      }}
      onDragEnter={() => setShowDropZone(true)}
      onDragLeave={() => setShowDropZone(false)}
      onFileDrop={onFileDrop}
      className={className}
    >
      {showDropZone ? renderDropZone() : children}
    </MultipleFileUpload>
  );
};

export default FileDropZone;
