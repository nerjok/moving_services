import React from "react";
import { create } from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';


import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import configureMockStore from "redux-mock-store";

import { Users } from "../containers/users/Users";
import User from "../containers/users/user";
import Breadcrumb from "../components/breadcrumb";
import { Provider } from 'react-redux'

//import i18n from '../i18n/i18n';
//import { I18nextProvider } from 'react-i18next';
//import i18next from 'i18next';
//i18next.use(I18nextProvider);


const mockStore = configureMockStore();
const store = mockStore({});
configure({adapter: new Adapter()});//Enzyme


const onSubmitSpy = jest.fn();
const fetchUsers2 = onSubmitSpy;


/**
 * 
 * Public pages of users
 */
describe("User container test", () => {


  test("Matches the snapshot", () => {
    const user = create(
      <BrowserRouter>
        <Users 
          store={store} 
          match={{url:'/kuku'}}
          t={(text) => text}
        />
      </BrowserRouter>
    );
    
    const instance = user.getInstance();
    const tree = user.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should fetch users', (done) => {

    const users = [
        {
          "credits": 2,
          "_id": "5cbd8be47da35752f2cd2b63",
          "googleId": "106757080421622674052",
          "name": "Nerijus kukuska",
          "email": "neriejus@gmail.com",
          "createdAt": "2019-07-28T12:57:22.220Z",
          "updatedAt": "2019-08-17T21:20:35.690Z",
          "city": "dfgsdf dsfgds",
          "description": "dsfgsdgdfgsdg dsfgsdf",
          "available": "sdafsdafwqerwqevweqr",
          "id": "5cbd8be47da35752f2cd2b63"
          },
    ]

    const fetchProfiles = jest.fn(()=> users)

    const user = shallow(
      <Users 
        fetchUsers={fetchProfiles} 
        store={store} 
        users={users}
        match={{url:'/kuku'}}
        t={(text) => text}
      />
  );
    const userInstance = user.instance()
    
    expect(fetchProfiles).toHaveBeenCalled();
    expect(userInstance.props.users).toHaveLength(1);

    done();
  })
});



describe('Users User container test', () => {

  test('should match snapshot', (done) => {

    const user = create(
      <Provider store={store}>
        <BrowserRouter>
          <User 
            auth={{}}
            match={{url:'/kuku'}}
            t={(text) => text}
            user={{email: "email", name:"name", description: "Description", available: "available", city: "city"}}  
          />
        </BrowserRouter>
      </Provider>
    );
      
      const instance = user.getInstance();
      const tree = user.toJSON();

      expect(tree).toMatchSnapshot();
      done();
  })


  test('should have props equalTo', (done) => {
    const removeProfile = jest.fn()
    const userData = {email: "email", name:"name", description: "Description", available: "available", city: "city"};

    const user = mount(
      <Provider store={store}>
        <BrowserRouter>
          <User 
            store={store} 
            auth={{}}
            match={{url:'/kuku'}}
            user={userData}  
            t={(text) => text}
            removeUserProfile={removeProfile}
          />
        </BrowserRouter>
      </Provider>
  );
    const userInstance = user.instance()

    const userProfile = userInstance.props.children.props.children;
    
    expect(userProfile.props.user).toBe(userData)

    user.unmount();
    expect(removeProfile).toHaveBeenCalled();
    //expect(userInstance.props.user).toHaveLength(1);
    done();
  })
})