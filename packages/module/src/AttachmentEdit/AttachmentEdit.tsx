// ============================================================================
// Attachment Edit - Chatbot Code Snippet Editor
// ============================================================================
import React from 'react';
import path from 'path';

// Import PatternFly components
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import { Button, Flex, FlexItem, Icon, Modal, ModalBody, ModalFooter, ModalHeader } from '@patternfly/react-core';
import { CodeIcon } from '@patternfly/react-icons';

export interface AttachmentEditProps {
  /** Text shown in code editor */
  code: string;
  /** Filename, including extension, of file shown in editor */
  fileName: string;
  onCancel: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
  onSave: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
  handleModalToggle: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
  isModalOpen: boolean;
  /** Title of modal */
  title?: string;
}

export const AttachmentEdit: React.FunctionComponent<AttachmentEditProps> = ({
  fileName,
  code,
  handleModalToggle,
  isModalOpen,
  onCancel,
  onSave,
  title = 'Edit attachment',
  ...props
}: AttachmentEditProps) => {
  const handleSave = (_event: React.MouseEvent | MouseEvent | KeyboardEvent) => {
    handleModalToggle(_event);
    onSave(_event);
  };

  const handleCancel = (_event: React.MouseEvent | MouseEvent | KeyboardEvent) => {
    handleModalToggle(_event);
    onCancel(_event);
  };

  const onEditorDidMount = (editor, monaco) => {
    editor.layout();
    editor.focus();
    monaco.editor.getModels()[0].updateOptions({ tabSize: 5 });
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleModalToggle}
      ouiaId="EditAttachmentModal"
      aria-labelledby="edit-attachment-title"
      aria-describedby="edit-attachment-modal"
      width="25%"
    >
      <ModalHeader title={title} labelId="edit-attachment-title" />
      <ModalBody id="edit-attachment-body">
        <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsMd' }}>
          <FlexItem>
            <Flex spaceItems={{ default: 'spaceItemsMd' }}>
              <Flex alignSelf={{ default: 'alignSelfCenter' }}>
                <FlexItem className="pf-chatbot__attachment-icon">
                  <Icon>
                    <CodeIcon color="white" />
                  </Icon>
                </FlexItem>
              </Flex>
              <Flex direction={{ default: 'column' }} spaceItems={{ default: 'spaceItemsNone' }}>
                <FlexItem>{path.parse(fileName).name}</FlexItem>
                <FlexItem className="pf-chatbot__attachment-language">
                  {Language[path.extname(fileName).slice(1)].toUpperCase()}
                </FlexItem>
              </Flex>
            </Flex>
          </FlexItem>
          <FlexItem>
            <CodeEditor
              isDarkTheme
              isLineNumbersVisible
              isLanguageLabelVisible
              code={code}
              language={Language[path.extname(fileName).slice(1)]}
              onEditorDidMount={onEditorDidMount}
              height="400px"
              {...props}
            />
          </FlexItem>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button isBlock key="confirm" variant="primary" onClick={handleSave}>
          Save
        </Button>
        <Button isBlock key="cancel" variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default AttachmentEdit;
