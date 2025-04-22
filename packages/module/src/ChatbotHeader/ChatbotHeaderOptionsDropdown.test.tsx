import React from 'react';
import { DropdownItem } from '@patternfly/react-core';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ChatbotHeaderOptionsDropdown } from './ChatbotHeaderOptionsDropdown';
import '@testing-library/jest-dom';

describe('ChatbotHeaderOptionsDropdown', () => {
  const dropdownItems = (
    <>
      <DropdownItem>Option 1</DropdownItem>
      <DropdownItem>Option 2</DropdownItem>
      <DropdownItem>Option 3</DropdownItem>
    </>
  );

  it('should render ChatbotHeaderOptionsDropdown', () => {
    render(<ChatbotHeaderOptionsDropdown>{dropdownItems}</ChatbotHeaderOptionsDropdown>);

    expect(screen.getByRole('button', { name: 'Chatbot options' })).toBeTruthy();
  });

  it('should call onselect handler when a dropdown item is clicked', async () => {
    const onSelect = jest.fn();
    const { container } = render(
      <ChatbotHeaderOptionsDropdown className="custom-header-options-dropdown" onSelect={onSelect}>
        {dropdownItems}
      </ChatbotHeaderOptionsDropdown>
    );

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Chatbot options' }));
    });

    await waitFor(() => {
      expect(container.querySelector('.custom-header-options-dropdown')).toBeTruthy();

      expect(screen.getByText('Option 1'));
      expect(screen.getByText('Option 2'));
      expect(screen.getByText('Option 3'));

      fireEvent.click(screen.getByText('Option 3'));

      expect(onSelect).toHaveBeenCalled();
    });
  });

  it('should handle isCompact', () => {
    render(<ChatbotHeaderOptionsDropdown isCompact>{dropdownItems}</ChatbotHeaderOptionsDropdown>);
    expect(screen.getByRole('button', { name: 'Chatbot options' })).toHaveClass('pf-m-compact');
  });
});
