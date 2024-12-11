import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { monitorSampleAppQuickStart } from './monitor-sampleapp-quickstart';
import QuickStartTileDescription, { pluralizeWord } from './QuickStartTileDescription';

describe('pluralizeWord function', () => {
  it('should render no plural correctly', () => {
    expect(pluralizeWord(2, 'pizza')).toBe('pizzas');
  });
});

describe('QuickStart tile description', () => {
  it('should render no prereqs correctly', () => {
    render(<QuickStartTileDescription description={monitorSampleAppQuickStart.spec.description} />);
    expect(screen.queryByRole('heading')).toBeFalsy();
  });
  it('should render singular prereq correctly', () => {
    render(
      <QuickStartTileDescription
        description={monitorSampleAppQuickStart.spec.description}
        prerequisites={[`You completed the "Getting started with a sample" quick start.`]}
      />
    );
    expect(screen.getByRole('heading', { name: /1 Prerequisite/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Show prerequisite/i })).toBeTruthy();
  });
  it('should render plural prereq correctly', () => {
    render(
      <QuickStartTileDescription
        description={monitorSampleAppQuickStart.spec.description}
        prerequisites={[
          `You completed the "Getting started with a sample" quick start.`,
          `You completed the app quick start`
        ]}
      />
    );
    expect(screen.getByRole('heading', { name: /2 Prerequisites/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Show prerequisites/i })).toBeTruthy();
  });
  it('should be able to click prereqs link', async () => {
    render(
      <QuickStartTileDescription
        description={monitorSampleAppQuickStart.spec.description}
        prerequisites={[`You completed the "Getting started with a sample" quick start.`]}
      />
    );
    const button = screen.getByRole('button', { name: /Show prerequisites/i });
    expect(screen.queryByRole('dialog', { name: /Prerequisite/i })).toBeFalsy();
    await userEvent.click(button);

    expect(screen.getByRole('dialog', { name: /Prerequisite/i })).toBeTruthy();
    expect(screen.getByRole('button', { name: /Close/i })).toBeTruthy();
    expect(screen.getByText(/You completed the "Getting started with a sample" quick start./i)).toBeTruthy();
  });
});
