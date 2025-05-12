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

    const modalHeader = document.querySelector('header.custom-header-class');
    expect(modalHeader).toBeInTheDocument();
    const modalBody = document.querySelector('.custom-body-class');
    expect(modalBody).toBeInTheDocument();
    const modalfooter = document.querySelector('.custom-footer-class');
    expect(modalfooter).toBeInTheDocument();
  });
});
