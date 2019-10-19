import React from "react";
import { create } from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';


import { BrowserRouter } from 'react-router-dom';
import configureMockStore from "redux-mock-store";

import { Advertisements } from "../containers/advertisements/Advertisements";


configure({ adapter: new Adapter() });//Enzyme


const onSubmitSpy = jest.fn();
const fetchUsers2 = onSubmitSpy;

describe('AdvertisementsContainer.js', () => {

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
    jest.resetAllMocks();

  });

  test("Matches the snapshot", () => {
    const snpShot = create(
      <BrowserRouter>
        <Advertisements
          match={{ url: '/kuku' }}
          t={(text) => text}
          advertisements={[]}
          total={0}
          page={0}
          filterAdvertisements={() => { }}
        />
      </BrowserRouter>
    );

    const tree = snpShot.toJSON();
    expect(tree).toMatchSnapshot();
  });


  test('should call props', done => {
    const filterAdv = jest.fn(() => {
      return [
        { _id: 'sdfsad', cityName: 'asdfsa', title: 'sdfasd', status: '4', description: 'sadf' }
      ]
    })
    const histories = jest.fn((hist) => { console.log('history', hist) });
    const updt = jest.fn();
    const advertisement = mount(
      <BrowserRouter>
        <Advertisements
          match={{ url: '/kuku' }}
          t={(text) => text}
          advertisements={[]}
          total={0}
          page={0}
          filterAdvertisements={filterAdv}
          history={{ push: histories }}
        />
      </BrowserRouter>
    )
    expect(filterAdv).toHaveBeenCalledTimes(1);

    const ads = advertisement.find(Advertisements).instance();

    const prSt = jest.spyOn(ads, "preventState")//.mockImplementationOnce(updt);
    ads.updatePage({ selected: 1 })


    expect(filterAdv).toHaveBeenCalledTimes(2);
    expect(ads.state.page).toBe(1)
    expect(histories).toHaveBeenLastCalledWith('/?page=1');
    expect(prSt).toHaveBeenCalled();



    done();
  })
})