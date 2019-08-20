import React from "react";
import Table from '../components/table';
import { create } from "react-test-renderer";
import { BrowserRouter, MemoryRouter } from 'react-router-dom';



describe('shouldTest Table', () => {

  test('should match snapshot', done => {
   const table = create(
     <MemoryRouter>
      <Table
        items={[]}
      />
     </MemoryRouter>
   );

   expect(table.toJSON()).toMatchSnapshot();
   done();
  });
});
