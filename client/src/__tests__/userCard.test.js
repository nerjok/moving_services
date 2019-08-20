import React from "react";
import UserCard from '../components/userCard';
import { create } from "react-test-renderer";
import { BrowserRouter, MemoryRouter } from 'react-router-dom';



describe('shouldTest UserCard', () => {

  test('should match snapshot', done => {
   const userCard = create(
     <MemoryRouter>
      <UserCard
        user={{}}
      />
     </MemoryRouter>
   );

   expect(userCard.toJSON()).toMatchSnapshot();
   done();
  });
});
