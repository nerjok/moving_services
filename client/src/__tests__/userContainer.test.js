import React from "react";
import { create } from "react-test-renderer";
import { BrowserRouter } from 'react-router-dom';

import { User } from "../containers/user/User";

describe("User container", () => {
  test("match snapshot", () => {
    const user = create(
      <BrowserRouter>
        <User user={{name:"name"}}/>
      </BrowserRouter>
    );

    const instance = user.getInstance();
    expect(user.toJSON()).toMatchSnapshot();
  });
});
