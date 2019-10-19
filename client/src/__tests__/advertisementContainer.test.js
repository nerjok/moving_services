import React from "react";
import { create } from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';


import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { Advertisement } from "../containers/advertisements/Advertisement";


configure({ adapter: new Adapter() });//Enzyme


describe('AdvertisementContainer', () => {

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();

  });

  test("Matches the snapshot", () => {
    const snpShot = create(
      <BrowserRouter>
        <Advertisement
          match={{ url: '/kuku', params: { id: 1 } }}
          t={(text) => text}
          advertisements={[]}
          total={0}
          page={0}
          fetchAdvertisement={() => { }}
        />
      </BrowserRouter>
    );

    const tree = snpShot.toJSON();
    expect(tree).toMatchSnapshot();
  });

})