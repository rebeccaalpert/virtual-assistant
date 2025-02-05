import React from 'react';
import { Button } from '@patternfly/react-core';
import { render, screen } from '@testing-library/react';
import { SettingsForm } from './SettingsForm';

describe('SettingsForm', () => {
  it('should render settingsForm with custom classname', () => {
    const { container } = render(<SettingsForm className="custom-settings" />);
    expect(container.querySelector('.custom-settings')).toBeTruthy();
  });

  it('should render settingsForm with fields', () => {
    const fields = [
      {
        id: 'archived-chat',
        label: 'Archive chat',
        field: (
          <Button id="archived-chat" variant="secondary">
            Archive chat
          </Button>
        )
      }
    ];
    render(<SettingsForm fields={fields} />);

    expect(screen.getByRole('button', { name: 'Archive chat' })).toBeTruthy();
  });
});
