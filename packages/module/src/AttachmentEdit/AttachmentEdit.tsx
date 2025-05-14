// ============================================================================
// Attachment Edit - Chatbot Code Snippet Editor
// ============================================================================
import type { FunctionComponent, MouseEvent as ReactMouseEvent } from 'react';
import CodeModal from '../CodeModal';
import { ChatbotDisplayMode } from '../Chatbot';

export interface AttachmentEditProps {
  /** Text shown in code editor */
  code: string;
  /** Filename, including extension, of file shown in editor */
  fileName: string;
  /** Function that runs when cancel button is clicked  */
  onCancel: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
  /** Function that runs when save button is clicked; allows consumers to use the edited code string  */
  onSave: (event: React.MouseEvent | MouseEvent | KeyboardEvent, code: string) => void;
  /** Function that opens and closes modal */
  handleModalToggle: (event: React.MouseEvent | MouseEvent | KeyboardEvent) => void;
  /** Whether modal is open */
  isModalOpen: boolean;
  /** Title of modal */
  title?: string;
  /** Display mode for the Chatbot parent; this influences the styles applied */
  displayMode?: ChatbotDisplayMode;
  /** Sets modal to compact styling. */
  isCompact?: boolean;
  /** Primary action button text */
  primaryActionButtonText?: string;
  /** Secondary action button text */
  secondaryActionButtonText?: string;
  /** Class applied to modal header */
  modalHeaderClassName?: string;
  /** Class applied to modal body */
  modalBodyClassName?: string;
  /** Class applied to modal footer */
  modalFooterClassName?: string;
}

export const AttachmentEdit: FunctionComponent<AttachmentEditProps> = ({
  fileName,
  code,
  handleModalToggle,
  isModalOpen,
  onCancel,
  onSave,
  title = 'Edit attachment',
  displayMode = ChatbotDisplayMode.default,
  isCompact,
  modalHeaderClassName,
  modalBodyClassName,
  modalFooterClassName,
  primaryActionButtonText = 'Save',
  secondaryActionButtonText = 'Cancel'
}: AttachmentEditProps) => {
  const handleSave = (_event: ReactMouseEvent | MouseEvent | KeyboardEvent, code) => {
    handleModalToggle(_event);
    onSave(_event, code);
  };

  const handleCancel = (_event: ReactMouseEvent | MouseEvent | KeyboardEvent) => {
    handleModalToggle(_event);
    onCancel(_event);
  };

  return (
    <CodeModal
      code={code}
      fileName={fileName}
      handleModalToggle={handleModalToggle}
      isModalOpen={isModalOpen}
      onPrimaryAction={handleSave}
      onSecondaryAction={handleCancel}
      primaryActionBtn={primaryActionButtonText}
      secondaryActionBtn={secondaryActionButtonText}
      title={title}
      displayMode={displayMode}
      isCompact={isCompact}
      modalHeaderClassName={modalHeaderClassName}
      modalBodyClassName={modalBodyClassName}
      modalFooterClassName={modalFooterClassName}
    />
  );
};

export default AttachmentEdit;
