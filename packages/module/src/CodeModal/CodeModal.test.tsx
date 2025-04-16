import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CodeModal from './CodeModal';

describe('ChatbotModal', () => {
  it('should render compact modal', () => {
    render(
      <CodeModal
        isCompact
        code="Hello world"
        fileName="greetings.txt"
        isModalOpen={true}
        handleModalToggle={jest.fn()}
        onPrimaryAction={jest.fn()}
        onSecondaryAction={jest.fn()}
        title="Preview attachment"
        primaryActionBtn="Submit"
        secondaryActionBtn="Cancel"
      ></CodeModal>
    );
    expect(screen.getByRole('dialog')).toHaveClass('pf-chatbot__chatbot-modal-compact');
  });
});
