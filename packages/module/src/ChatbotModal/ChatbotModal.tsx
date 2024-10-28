// ============================================================================
// Modal - Chatbot Modal
// ============================================================================
import React from 'react';
import path from 'path-browserify';

// Import PatternFly components
import { CodeEditor } from '@patternfly/react-code-editor';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, Stack, StackItem } from '@patternfly/react-core';
import FileDetails, { extensionToLanguage } from '../FileDetails';
import { ChatbotDisplayMode } from '../Chatbot';

export interface ChatbotModalProps {
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
  /** Display mode for the Chatbot parent; this influences the styles applied */
  displayMode?: ChatbotDisplayMode;
}

export const ChatbotModal: React.FunctionComponent<ChatbotModalProps> = ({
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
  displayMode = ChatbotDisplayMode.default,
  ...props
}: ChatbotModalProps) => {
  const [newCode, setNewCode] = React.useState(code);

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

  /* eslint-disable indent */
  const getHeight = (displayMode: ChatbotDisplayMode) => {
    switch (displayMode) {
      case ChatbotDisplayMode.docked:
        return '100vh';
      default:
        return '45vh';
    }
  };
  /* eslint-enable indent */

  const modal = (
    <Modal
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      ouiaId="ChatbotModal"
      aria-labelledby="chatbot-modal-title"
      aria-describedby="chatbot-modal"
      className={`pf-chatbot__modal pf-chatbot__modal--${displayMode}`}
      backdropClassName="pf-chatbot__modal-backdrop"
    >
      <ModalHeader title={title} labelId="chatbot-modal-title" />
      <ModalBody id="chatbot-modal-body">
        <Stack className="pf-chatbot__modal-body">
          <StackItem className="pf-chatbot__modal-file-details">
            <FileDetails fileName={fileName} />
          </StackItem>
          <StackItem>
            <CodeEditor
              isDarkTheme
              isLineNumbersVisible={isLineNumbersVisible}
              isLanguageLabelVisible
              isCopyEnabled={isCopyEnabled}
              isReadOnly={isReadOnly}
              code={newCode}
              language={extensionToLanguage[path.extname(fileName).slice(1)]}
              onEditorDidMount={onEditorDidMount}
              onCodeChange={onCodeChange}
              className={codeEditorClassName}
              height={getHeight(displayMode)}
              options={{
                glyphMargin: false,
                folding: false
              }}
              {...props}
            />
          </StackItem>
        </Stack>
      </ModalBody>
      <ModalFooter>
        <Button
          isBlock
          key="chatbot-modal-primary"
          variant="primary"
          onClick={handlePrimaryAction}
          form="chatbot-modal-form"
        >
          {primaryActionBtn}
        </Button>
        <Button isBlock key="chatbot-modal-secondary" variant="link" onClick={handleSecondaryAction}>
          {secondaryActionBtn}
        </Button>
      </ModalFooter>
    </Modal>
  );

  if ((displayMode === ChatbotDisplayMode.fullscreen || displayMode === ChatbotDisplayMode.embedded) && isModalOpen) {
    return <div className="pf-v6-c-backdrop pf-chatbot__backdrop">{modal}</div>;
  }
  return modal;
};

export default ChatbotModal;
