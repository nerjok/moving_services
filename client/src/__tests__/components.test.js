import React from "react";
import { create } from "react-test-renderer";
import { BrowserRouter } from 'react-router-dom';

import UserCard from "../components/userCard";
import { Header } from '../components/header/header';
import { HeaderHeading } from '../components/header/headerHeading';
import { StatusBtn, WorkTypeBtn } from '../components/statusBtn/statusBtn';
import { Footer } from '../containers/footer';
import { Header as HeaderMenu } from '../containers/Header';
import { GetStarted } from '../containers/GetStarted';
import { BlogSlider } from '../containers/BlogSlider';
import { Dashboard } from '../containers/Dashboard';
import { RecentAdds } from '../containers/recentAdds';

import { Provider } from 'react-redux'

import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});



describe("UserCard component", () => {
  test("Matches the snapshot", () => {
    const userCard = create(
      <Provider store={store}>
        <BrowserRouter>
          <UserCard user={{name:"name"}}/>
        </BrowserRouter>
      </Provider>
    );
    expect(userCard.toJSON()).toMatchSnapshot();
  });
});


describe('Header component Test', () => {

  test('Header Matches Snapshot', (done) => {
    const header = create(
        <BrowserRouter>
          <Header user={{name:"name"}}/>
        </BrowserRouter>
    );
    expect(header.toJSON()).toMatchSnapshot();
    done()
  });

  test('Header button links Matches Snapshot', done => {
    const headerHeading = create(
        <BrowserRouter>
          <HeaderHeading user={{name:"name"}}/>
        </BrowserRouter>
    );
    expect(headerHeading.toJSON()).toMatchSnapshot();
    done()
  })
})

describe('Status components Test', () => {

  test('Status Btn Matches Snapshot', (done) => {
    const statusBtn = create(
          <StatusBtn status={2}/>
    );
    expect(statusBtn.toJSON()).toMatchSnapshot();
    done()
  });

  test('WorkType button Matches Snapshot', done => {
    const workType = create(
          <WorkTypeBtn user={3}/>
    );
    expect(workType.toJSON()).toMatchSnapshot();
    done()
  })
})

describe('PagePArts test' , () => {

  test('Footer Matches Snapshot', done => {
    const footer = create(
      <BrowserRouter>
          <Footer/>
      </BrowserRouter>
    );
    expect(footer.toJSON()).toMatchSnapshot();
    done()
  })


  test("HeaderMenu Matches the snapshot", () => {
    const headerMenu = create(
      <Provider store={store}>
        <BrowserRouter>
          <HeaderMenu auth={{name:"name"}} match={{url: '/'}}/>
        </BrowserRouter>
      </Provider>
    );
    expect(headerMenu.toJSON()).toMatchSnapshot();
  });

  test("GetStarted Matches the snapshot", () => {
    const getStarted = create(<GetStarted/>);
    expect(getStarted.toJSON()).toMatchSnapshot();
  });

  test("BlogSlideer Matches the snapshot", () => {
    const blogSlider = create(<BlogSlider/>);
    expect(blogSlider.toJSON()).toMatchSnapshot();
  });

  test.skip("Dashboard Matches the snapshot", () => {
    const dashboard = create(
      <Provider store={store}>
        <BrowserRouter>
          <Dashboard surveys={[]}/>
        </BrowserRouter>
      </Provider>
    );
    expect(dashboard.toJSON()).toMatchSnapshot();
  });

  test("GetStarted Matches the snapshot", () => {
    const recentAdds = create(<RecentAdds/>);
    expect(recentAdds.toJSON()).toMatchSnapshot();
  });
})
