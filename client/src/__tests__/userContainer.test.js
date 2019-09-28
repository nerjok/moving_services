import React from "react";
import { create } from "react-test-renderer";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'

import { User } from "../containers/user/User";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});

/**
 * Testing Private User page
 * 
 */
describe("User container", () => {
  test("match snapshot", () => {
    const user = create(
      <Provider store={store}>
        <BrowserRouter>
          <User user={{name:"name"}}/>
        </BrowserRouter>
      </Provider>
    );

    const instance = user.getInstance();
    expect(user.toJSON()).toMatchSnapshot();
  });
});
