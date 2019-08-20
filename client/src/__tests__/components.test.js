import React from "react";
import { create } from "react-test-renderer";
import { BrowserRouter } from 'react-router-dom';

import UserCard from "../components/userCard";

describe("UserCard component", () => {
  test("Matches the snapshot", () => {
    const userCard = create(
      <BrowserRouter>
        <UserCard user={{name:"name"}}/>
      </BrowserRouter>
    );
    expect(userCard.toJSON()).toMatchSnapshot();
  });
});
