import { fireEvent, render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PreviewAttachment } from './PreviewAttachment';

describe('PreviewAttachment', () => {
  it('should render PreviewAttachment', () => {
    render(
      <PreviewAttachment
        code="Hello world"
        fileName="greetings.txt"
        isModalOpen={true}
        onEdit={jest.fn()}
        handleModalToggle={jest.fn()}
      />
    );
    expect(screen.getByText('Preview attachment')).toBeTruthy();
    expect(screen.getByText('greetings')).toBeTruthy();
    expect(screen.getAllByText('TEXT')).toBeTruthy();
  });

  it('should call onEdit handler when edit button is pressed', () => {
    const onEdit = jest.fn();
    render(
      <PreviewAttachment
        code="Hello world"
        fileName="greetings.txt"
        isModalOpen={true}
        onEdit={onEdit}
        handleModalToggle={jest.fn()}
      />
    );
    fireEvent.click(screen.getByText('Edit'));

    expect(onEdit).toHaveBeenCalled();
  });
  it('should call onDismiss handler when dismiss button is pressed', () => {
    const onDismiss = jest.fn();
    render(
      <PreviewAttachment
        code="Hello world"
        fileName="greetings.txt"
        isModalOpen={true}
        onEdit={jest.fn()}
        handleModalToggle={onDismiss}
      />
    );
    fireEvent.click(screen.getByText('Dismiss'));

    expect(onDismiss).toHaveBeenCalled();
  });

  it('should render custom button text for footer actions buttons', () => {
    render(
      <PreviewAttachment
        code="Hello world"
        fileName="greetings.txt"
        isModalOpen={true}
        onEdit={jest.fn()}
        handleModalToggle={jest.fn()}
        primaryActionButtonText="Edit"
        secondaryActionButtonText="Close"
      />
    );

    screen.getByText('Edit');
    screen.getByText('Close');
  });

  it('should render PreviewAttachment with custom classNames', async () => {
    render(
      <PreviewAttachment
        code="Hello world"
        fileName="greetings.txt"
        isModalOpen={true}
        onEdit={jest.fn()}
        handleModalToggle={jest.fn()}
        primaryActionButtonText="Edit"
        secondaryActionButtonText="Close"
        modalHeaderClassName="custom-header-class"
        modalBodyClassName="custom-body-class"
        modalFooterClassName="custom-footer-class"
      ></PreviewAttachment>
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
