import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
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
});
