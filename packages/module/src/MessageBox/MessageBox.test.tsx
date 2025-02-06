import React from 'react';
import { render, screen } from '@testing-library/react';
import { MessageBox } from './MessageBox';

describe('MessageBox', () => {
  it('should render Message box', () => {
    render(
      <MessageBox>
        <>Chatbot Messages</>
      </MessageBox>
    );
    expect(screen.getByText('Chatbot Messages')).toBeTruthy();
  });

  it('should assign ref to Message box', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(
      <MessageBox ref={ref}>
        <div>Test message content</div>
      </MessageBox>
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});
