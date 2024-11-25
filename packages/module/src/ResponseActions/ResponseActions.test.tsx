import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResponseActions from './ResponseActions';
import userEvent from '@testing-library/user-event';
import { DownloadIcon, InfoCircleIcon, RedoIcon } from '@patternfly/react-icons';

const ALL_ACTIONS = [
  { type: 'positive', label: 'Good response' },
  { type: 'negative', label: 'Bad response' },
  { type: 'copy', label: 'Copy' },
  { type: 'share', label: 'Share' },
  { type: 'listen', label: 'Listen' }
];

const CUSTOM_ACTIONS = [
  {
    regenerate: {
      ariaLabel: 'Regenerate',
      onClick: jest.fn(),
      tooltipContent: 'Regenerate',
      icon: <RedoIcon />
    },
    download: {
      ariaLabel: 'Download',
      onClick: jest.fn(),
      tooltipContent: 'Download',
      icon: <DownloadIcon />
    },
    info: {
      ariaLabel: 'Info',
      onClick: jest.fn(),
      tooltipContent: 'Info',
      icon: <InfoCircleIcon />
    }
  }
];

describe('ResponseActions', () => {
  it('should render buttons correctly', () => {
    ALL_ACTIONS.forEach(({ type, label }) => {
      render(<ResponseActions actions={{ [type]: { onClick: jest.fn() } }} />);
      expect(screen.getByRole('button', { name: label })).toBeTruthy();
    });
  });

  it('should be able to call onClick correctly', async () => {
    ALL_ACTIONS.forEach(async ({ type, label }) => {
      const spy = jest.fn();
      render(<ResponseActions actions={{ [type]: { onClick: spy } }} />);
      await userEvent.click(screen.getByRole('button', { name: label }));
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  it('should be able to change aria labels', () => {
    const actions = [
      { type: 'positive', ariaLabel: 'Thumbs up' },
      { type: 'negative', ariaLabel: 'Thumbs down' },
      { type: 'copy', ariaLabel: 'Copy the message' },
      { type: 'share', ariaLabel: 'Share it with friends' },
      { type: 'listen', ariaLabel: 'Listen up' }
    ];
    actions.forEach(({ type, ariaLabel }) => {
      render(<ResponseActions actions={{ [type]: { onClick: jest.fn(), ariaLabel } }} />);
      expect(screen.getByRole('button', { name: ariaLabel })).toBeTruthy();
    });
  });

  it('should be able to disable buttons', () => {
    ALL_ACTIONS.forEach(({ type, label }) => {
      render(<ResponseActions actions={{ [type]: { onClick: jest.fn(), isDisabled: true } }} />);
      expect(screen.getByRole('button', { name: label })).toBeDisabled();
    });
  });

  it('should be able to add class to buttons', () => {
    ALL_ACTIONS.forEach(({ type, label }) => {
      render(<ResponseActions actions={{ [type]: { onClick: jest.fn(), className: 'test' } }} />);
      expect(screen.getByRole('button', { name: label })).toHaveClass('test');
    });
  });

  it('should be able to add custom actions', () => {
    CUSTOM_ACTIONS.forEach((action) => {
      const key = Object.keys(action)[0];
      render(
        <ResponseActions
          actions={{
            [key]: {
              tooltipContent: action[key].tooltipContent,
              onClick: action[key].onClick,
              // doing this just because it's easier to test without a regex for the button name
              ariaLabel: action[key].ariaLabel.toLowerCase(),
              icon: action[key].icon
            }
          }}
        />
      );
      expect(screen.getByRole('button', { name: key })).toBeTruthy();
    });
  });
});
