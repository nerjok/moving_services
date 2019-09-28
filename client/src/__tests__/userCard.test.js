import React from "react";
import UserCard from '../components/userCard';
import { create } from "react-test-renderer";
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});

describe('shouldTest UserCard', () => {

  test('should match snapshot', done => {
   const userCard = create(
      <Provider store={store}>
        <MemoryRouter>
          <UserCard
            user={{}}
          />
        </MemoryRouter>
     </Provider>
   );

   expect(userCard.toJSON()).toMatchSnapshot();
   done();
  });
});
