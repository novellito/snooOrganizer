import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Authenticate, { getAuthUrl } from '../src/components/LandingPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../src/store/store';
import crypto from 'crypto';

// @ts-ignore
Object.defineProperty(global.self, 'crypto', {
  value: {
    getRandomValues: (arr: any) => crypto.randomBytes(arr.length)
  }
});

// examaple of how to use redux in test suite
// function renderWithRedux(ui: JSX.Element) {
//   const store = createStore(rootReducer);
//   return {
//     ...render(<Provider store={store}>{ui}</Provider>),
//     store,
//   };
// }

describe('Authenticate test suite', () => {
  it('should return the proper authUrl', () => {
    const endpointDomain = 'reddit.com';
    const clientId = '1234';
    const scope = ['edit'];
    const state = 'fei3vfRV/HgHTJCu8wXBZPNLocVYSBB+O1/l8+z33ZI=';

    expect(getAuthUrl({ clientId, scope, state, endpointDomain })).toEqual(
      'https://www.reddit.com/api/v1/authorize?client_id=1234&response_type=code&state=fei3vfRV%2FHgHTJCu8wXBZPNLocVYSBB%2BO1%2Fl8%2Bz33ZI%3D&redirect_uri=http%3A%2F%2Flocalhost%2F&duration=temporary&scope=edit'
    );
  });
});
