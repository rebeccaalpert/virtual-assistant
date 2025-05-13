import { render, screen, within } from '@testing-library/react';
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
    expect(screen.getByRole('dialog')).toHaveClass('pf-m-compact');
  });

  it('should render CodeModal with custom classNames', async () => {
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
        modalHeaderClassName="custom-header-class"
        modalBodyClassName="custom-body-class"
        modalFooterClassName="custom-footer-class"
      ></CodeModal>
    );

    const modal = screen.getByRole('dialog');
    const modalHeader = within(modal).getByRole('banner');
    expect(modalHeader).toHaveClass('custom-header-class');
    const modalBody = modal.querySelector('#code-modal-body');
    expect(modalBody).toHaveClass('custom-body-class');
    const modalfooter = within(modal).getByRole('contentinfo');
    expect(modalfooter).toHaveClass('custom-footer-class');
  });
});
