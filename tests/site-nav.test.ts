import { describe, expect, it } from 'vitest';
import { isActivePath } from '../app/components/site-nav';

describe('isActivePath', () => {
  it('matches the root path exactly', () => {
    expect(isActivePath('/', '/')).toBe(true);
    expect(isActivePath('/projects', '/')).toBe(false);
  });

  it('matches nested routes for non-root paths', () => {
    expect(isActivePath('/projects/taskforge', '/projects')).toBe(true);
    expect(isActivePath('/projects', '/projects')).toBe(true);
  });

  it('does not match unrelated routes', () => {
    expect(isActivePath('/about', '/projects')).toBe(false);
  });
});
