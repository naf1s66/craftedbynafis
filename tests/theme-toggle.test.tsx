import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ThemeToggle from '../app/components/theme-toggle';

const resetDom = () => {
  document.documentElement.className = '';
  window.localStorage.clear();
};

describe('ThemeToggle', () => {
  it('toggles the theme even if localStorage throws', async () => {
    resetDom();
    document.documentElement.classList.add('dark');

    const setItemSpy = vi
      .spyOn(Storage.prototype, 'setItem')
      .mockImplementation(() => {
        throw new Error('Storage blocked');
      });

    render(<ThemeToggle />);

    const button = await screen.findByRole('button', {
      name: /switch to light/i,
    });

    fireEvent.click(button);

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    expect(
      screen.getByRole('button', { name: /switch to dark/i }),
    ).toBeInTheDocument();

    setItemSpy.mockRestore();
  });

  it('updates when storage events fire', async () => {
    resetDom();
    document.documentElement.classList.add('dark');

    render(<ThemeToggle />);

    await screen.findByRole('button', { name: /switch to light/i });

    act(() => {
      window.dispatchEvent(
        new StorageEvent('storage', { key: 'theme', newValue: 'light' }),
      );
    });

    await waitFor(() => {
      expect(document.documentElement.classList.contains('dark')).toBe(false);
    });

    expect(
      screen.getByRole('button', { name: /switch to dark/i }),
    ).toBeInTheDocument();
  });
});
