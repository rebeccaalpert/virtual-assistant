import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import AttachmentEdit, { AttachmentEditProps } from './AttachmentEdit';

describe('AttachmentEdit', () => {
  it('should open AttachmentEdit modal', () => {
    const props: AttachmentEditProps = {
      code: 'code',
      fileName: 'fileName',
      onCancel: jest.fn(),
      onSave: jest.fn(),
      isModalOpen: true,
      handleModalToggle: jest.fn()
    };

    render(<AttachmentEdit {...props} />);
    expect(screen.getByText('Edit attachment')).toBeTruthy();
  });

  it('should call onSave handler when the save button is clicked', () => {
    const onSaveHandler = jest.fn();
    const props: AttachmentEditProps = {
      code: 'code',
      fileName: 'fileName',
      onCancel: jest.fn(),
      onSave: onSaveHandler,
      isModalOpen: true,
      handleModalToggle: jest.fn()
    };

    render(<AttachmentEdit {...props} />);

    // Click on save button
    fireEvent.click(screen.getByText('Save'));
    expect(onSaveHandler).toHaveBeenCalledWith(expect.any(Object), 'code');
  });

  it('should call cancel handler when the cancel button is clicked', () => {
    const onCancelHandler = jest.fn();
    const props: AttachmentEditProps = {
      code: 'code',
      fileName: 'fileName',
      onCancel: onCancelHandler,
      onSave: jest.fn(),
      isModalOpen: true,
      handleModalToggle: jest.fn()
    };

    render(<AttachmentEdit {...props} />);

    // Click on cancel button
    fireEvent.click(screen.getByText('Cancel'));
    expect(onCancelHandler).toHaveBeenCalled();
  });

  it('should render custom button text for footer actions buttons', () => {
    render(
      <AttachmentEdit
        code="Hello world"
        fileName="greetings.txt"
        isModalOpen={true}
        onCancel={jest.fn()}
        onSave={jest.fn()}
        handleModalToggle={jest.fn()}
        primaryActionButtonText="Save"
        secondaryActionButtonText="Close"
      />
    );

    expect(screen.getByText('Save')).toBeInTheDocument();
    expect(screen.getByText('Close')).toBeInTheDocument();
  });

  it('should render AttachmentEdit with custom classNames', async () => {
    render(
      <AttachmentEdit
        code="Hello world"
        fileName="greetings.txt"
        isModalOpen={true}
        onCancel={jest.fn()}
        onSave={jest.fn()}
        handleModalToggle={jest.fn()}
        primaryActionButtonText="Save"
        secondaryActionButtonText="Close"
        modalHeaderClassName="custom-header-class"
        modalBodyClassName="custom-body-class"
        modalFooterClassName="custom-footer-class"
      ></AttachmentEdit>
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
