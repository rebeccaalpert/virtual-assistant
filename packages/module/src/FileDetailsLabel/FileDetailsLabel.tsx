import React, { PropsWithChildren } from 'react';
import { Label } from '@patternfly/react-core';
import FileDetails from '../FileDetails';

interface FileDetailsLabelProps {
  fileName: string;
  language: string;
}

export const FileDetailsLabel = ({ fileName, language }: PropsWithChildren<FileDetailsLabelProps>) => (
  <Label onClose={() => Function.prototype}>
    <FileDetails fileName={fileName} language={language} />
  </Label>
);

export default FileDetailsLabel;
