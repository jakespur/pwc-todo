import { LocalStorageMock } from '../test/helpers/localStorageMock';

Object.defineProperty(window, 'localStorage', {
  value: new LocalStorageMock(),
});

import '@testing-library/jest-dom';
