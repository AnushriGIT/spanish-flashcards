import { afterEach, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

// Extend Vitest's expect with jest-dom matchers (toBeInTheDocument, etc.)
expect.extend(matchers);

// Polyfill localStorage in case the environment doesn't provide a full implementation
if (typeof window !== 'undefined') {
	const needsPolyfill =
		typeof window.localStorage === 'undefined' ||
		typeof window.localStorage.setItem !== 'function';
	if (needsPolyfill) {
		const store: Record<string, string> = {};
		Object.defineProperty(window, 'localStorage', {
			value: {
				getItem: (key: string) => (key in store ? store[key] : null),
				setItem: (key: string, value: string) => {
					store[key] = String(value);
				},
				removeItem: (key: string) => {
					delete store[key];
				},
				clear: () => {
					for (const k of Object.keys(store)) delete store[k];
				},
				key: (index: number) => Object.keys(store)[index] ?? null,
				get length() {
					return Object.keys(store).length;
				}
			},
			configurable: true
		});
	}
}

// Cleanup the DOM after each test to avoid side effects
afterEach(() => {
	cleanup();
});


