import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import ChatbotFootnote from './ChatbotFootnote';

describe('ChatbotFooternote', () => {
  const onClick = jest.fn();
  const popoverProps = {
    title: 'Verify accuracy',
    description: 'description',
    bannerImage: {
      src: 'src',
      alt: 'alt'
    },
    cta: {
      label: 'Got it',
      onClick
    },
    link: {
      label: 'label',
      url: 'url'
    }
  };

  it('should render ChatbotFooternote', () => {
    render(<ChatbotFootnote label="Chatbot footer" />);
    expect(screen.getByText('Chatbot footer')).toBeTruthy();
  });

  it('should render ChatbotFooternote with popover', async () => {
    render(<ChatbotFootnote label="Chatbot footer" popover={popoverProps} />);

    // click on the footer button
    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      // Check if the popover is visible and click on the cta button
      screen.getByLabelText('More information');
      screen.getByText('Verify accuracy');
      fireEvent.click(screen.getByRole('button', { name: 'Got it' }));
      expect(onClick).toHaveBeenCalled();
    });
  });
  it('should call onClick handler when popover cta button is clicked', async () => {
    render(<ChatbotFootnote label="Chatbot footer" popover={popoverProps} />);

    // click on the footer button
    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      // Check if the popover is visible and click on the cta button
      screen.getByLabelText('More information');
      screen.getByText('Verify accuracy');
      fireEvent.click(screen.getByRole('button', { name: 'Got it' }));
      expect(onClick).toHaveBeenCalled();
    });
  });
  it('should close the popover when escape is pressed', async () => {
    render(<ChatbotFootnote label="Chatbot footer" popover={popoverProps} />);

    // click on the footer button
    act(() => {
      fireEvent.click(screen.getByRole('button'));
    });

    await waitFor(() => {
      // Check if the popover is visible and click on the cta button
      screen.getByLabelText('More information');
      screen.getByText('Verify accuracy');
    });

    act(() => {
      // trigger escape to close the popover
      fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    });

    await waitFor(() => {
      expect(screen.queryByText('Verify accuracy')).toBeFalsy();
    });
  });
});
