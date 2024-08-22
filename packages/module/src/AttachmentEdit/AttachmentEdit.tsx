// ============================================================================
// Attachment Edit - Chatbot Code Snippet Editor
// ============================================================================
import React from 'react';
import path from 'path';

// Import PatternFly components
import { CodeEditor, Language } from '@patternfly/react-code-editor';
import {
  Button,
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Stack,
  StackItem
} from '@patternfly/react-core';
import { CodeIcon } from '@patternfly/react-icons';

export interface AttachmentEditProps {
  /** Text shown in code editor */
  code: string;
  /** Filename, including extension, of file shown in editor */
  fileName: string;
  /** Function that runs when cancel button is clicked  */
  onCancel: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
  /** Function that runs when save button is clicked  */
  onSave: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
  /** Function that opens and closes modal */
  handleModalToggle: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
  /** Whether modal is open */
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
        <Stack hasGutter>
          <StackItem>
            <Flex>
              <Flex
                className="pf-chatbot__attachment-icon"
                justifyContent={{ default: 'justifyContentCenter' }}
                alignItems={{ default: 'alignItemsCenter' }}
                alignSelf={{ default: 'alignSelfCenter' }}
              >
                <Icon>
                  <CodeIcon color="white" />
                </Icon>
              </Flex>
              <Stack>
                <StackItem>{path.parse(fileName).name}</StackItem>
                <StackItem className="pf-chatbot__attachment-language">
                  {Language[path.extname(fileName).slice(1)].toUpperCase()}
                </StackItem>
              </Stack>
            </Flex>
          </StackItem>
          <StackItem>
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
          </StackItem>
        </Stack>
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
