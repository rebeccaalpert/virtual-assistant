// ============================================================================
// Code Modal - Chatbot Modal with Code Editor
// ============================================================================
import React, { useState } from 'react';
import path from 'path';

// Import PatternFly components
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Stack, StackItem } from '@patternfly/react-core';
import FileDetails from '../FileDetails';

export interface CodeModalProps {
  /** Class applied to code editor */
  codeEditorControlClassName?: string;
  /** Text shown in code editor */
  code: string;
  /** Filename, including extension, of file shown in editor */
  fileName: string;
  /** Whether copying code is allowed */
  isCopyEnabled?: boolean;
  /** Whether line numbers show in the code editor */
  isLineNumbersVisible?: boolean;
  /** Whether code is read-only */
  isReadOnly?: boolean;
  /** Action assigned to primary modal button */
  onPrimaryAction: (event: React.MouseEvent | MouseEvent | KeyboardEvent, code?: string) => void;
  /** Action assigned to secondary modal button */
  onSecondaryAction: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
  /** Name of primary modal button */
  primaryActionBtn: string;
  /** Name of secondary modal button */
  secondaryActionBtn: string;
  /** Function that handles modal toggle */
  handleModalToggle: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
  /** Whether modal is open */
  isModalOpen: boolean;
  /** Title of modal */
  title: string;
}

export const CodeModal: React.FunctionComponent<CodeModalProps> = ({
  fileName,
  code,
  codeEditorControlClassName: codeEditorClassName,
  handleModalToggle,
  isCopyEnabled,
  isLineNumbersVisible,
  isModalOpen,
  isReadOnly,
  onPrimaryAction,
  onSecondaryAction,
  primaryActionBtn,
  secondaryActionBtn,
  title,
  ...props
}: CodeModalProps) => {
  const [newCode, setNewCode] = useState(code);

  const handlePrimaryAction = (_event: React.MouseEvent | MouseEvent | KeyboardEvent) => {
    handleModalToggle(_event);
    if (!isReadOnly) {
      onPrimaryAction(_event, newCode);
    } else {
      onPrimaryAction(_event);
    }
  };

  const handleSecondaryAction = (_event: React.MouseEvent | MouseEvent | KeyboardEvent) => {
    handleModalToggle(_event);
    onSecondaryAction(_event);
  };

  const onEditorDidMount = (editor, monaco) => {
    editor.layout();
    editor.focus();
    monaco.editor.getModels()[0].updateOptions({ tabSize: 5 });
  };

  const onCodeChange = (value: string) => {
    if (!isReadOnly) {
      setNewCode(value);
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      ouiaId="CodeModal"
      aria-labelledby="code-modal-title"
      aria-describedby="code-modal"
      width="25%"
      className="pf-chatbot__code-modal"
    >
      <ModalHeader title={title} labelId="code-modal-title" />
      <ModalBody id="code-modal-body">
        <Stack hasGutter>
          <StackItem>
            <FileDetails
              fileName={path.parse(fileName).name}
              language={Language[path.extname(fileName).slice(1)].toUpperCase()}
            />
          </StackItem>
          <StackItem>
            <CodeEditor
              isDarkTheme
              isLineNumbersVisible={isLineNumbersVisible}
              isLanguageLabelVisible
              isCopyEnabled={isCopyEnabled}
              isReadOnly={isReadOnly}
              code={newCode}
              language={Language[path.extname(fileName).slice(1)]}
              onEditorDidMount={onEditorDidMount}
              height="400px"
              onCodeChange={onCodeChange}
              className={codeEditorClassName}
              {...props}
            />
          </StackItem>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button isBlock key="code-modal-primary" variant="primary" onClick={handlePrimaryAction} form="code-modal-form">
          {primaryActionBtn}
        </Button>
        <Button isBlock key="code-modal-secondary" variant="secondary" onClick={handleSecondaryAction}>
          {secondaryActionBtn}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default CodeModal;
