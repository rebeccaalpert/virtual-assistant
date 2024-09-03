import { DropEvent, MultipleFileUpload, MultipleFileUploadMain } from '@patternfly/react-core';
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
        titleIcon={
          <svg width="50" height="50" viewBox="0 0 50 50" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M48.1116 47.0088H1.88933C1.597 47.0088 1.31665 47.1249 1.10994 47.3316C0.903236 47.5383 0.787109 47.8187 0.787109 48.111C0.787109 48.4033 0.903236 48.6837 1.10994 48.8904C1.31665 49.0971 1.597 49.2132 1.88933 49.2132H48.1116C48.4039 49.2132 48.6842 49.0971 48.8909 48.8904C49.0977 48.6837 49.2138 48.4033 49.2138 48.111C49.2138 47.8187 49.0977 47.5383 48.8909 47.3316C48.6842 47.1249 48.4039 47.0088 48.1116 47.0088Z"
              fill="currentColor"
            />
            <path
              d="M10.7778 17.2132C10.9229 17.214 11.0666 17.1861 11.2008 17.1312C11.3351 17.0763 11.4571 16.9954 11.5601 16.8932L23.8978 4.57324V40.9999C23.8978 41.2922 24.014 41.5726 24.2207 41.7793C24.4274 41.986 24.7077 42.1021 25.0001 42.1021C25.2924 42.1021 25.5727 41.986 25.7794 41.7793C25.9861 41.5726 26.1023 41.2922 26.1023 40.9999V4.57324L38.4401 16.8932C38.6475 17.1007 38.9289 17.2173 39.2223 17.2173C39.5157 17.2173 39.797 17.1007 40.0045 16.8932C40.212 16.6858 40.3285 16.4044 40.3285 16.111C40.3285 15.8176 40.212 15.5363 40.0045 15.3288L25.7823 1.10658C25.5798 0.92418 25.317 0.823242 25.0445 0.823242C24.772 0.823242 24.5092 0.92418 24.3067 1.10658C24.2001 1.10658 10.0845 15.3288 10.0845 15.3288C9.93358 15.4775 9.82872 15.6665 9.78246 15.8733C9.7362 16.08 9.7505 16.2957 9.82365 16.4945C9.89681 16.6934 10.0257 16.8669 10.1949 16.9944C10.3642 17.1218 10.5665 17.1978 10.7778 17.2132Z"
              fill="currentColor"
            />
          </svg>
        }
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
      className={`pf-chatbot__dropzone ${className ? className : ''}`}
    >
      {showDropZone ? renderDropZone() : children}
    </MultipleFileUpload>
  );
};

export default FileDropZone;
