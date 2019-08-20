import React from "react";
import Breadcrumb from '../components/breadcrumb';
import { create } from "react-test-renderer";
import { BrowserRouter, MemoryRouter } from 'react-router-dom';



describe('shouldTest UserCard', () => {

  test('should match snapshot', done => {
   const breadCrumb = create(
     <MemoryRouter>
      <Breadcrumb
        links={[]}
      />
     </MemoryRouter>
   );

   expect(breadCrumb.toJSON()).toMatchSnapshot();
   done();
  });
});
