import React from "react";
import { create } from "react-test-renderer";
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';


import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import configureMockStore from "redux-mock-store";

import { Users } from "../containers/users/Users";
import User from "../containers/users/user";
import Breadcrumb from "../components/breadcrumb";

const mockStore = configureMockStore();
const store = mockStore({});
configure({adapter: new Adapter()});//Enzyme


const onSubmitSpy = jest.fn();
const fetchUsers2 = onSubmitSpy;

describe("User container test", () => {


  test("Matches the snapshot", () => {
    const user = create(
      <BrowserRouter>
        <Users store={store} />
      </BrowserRouter>
    );
    
    const instance = user.getInstance();
    const tree = user.toJSON();

    //console.log('TREE', tree)
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
        <BrowserRouter>
          <User 
            store={store} 
            auth={{}}
            user={{email: "email", name:"name", description: "Description", available: "available", city: "city"}}  
          />
        </BrowserRouter>
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
      <BrowserRouter>
      <User 
        store={store} 
        auth={{}}
        user={userData}  
        removeUserProfile={removeProfile}
      />
      </BrowserRouter>
  );
    const userInstance = user.instance()

    const userProfile = userInstance.props.children;
    //console.log('UserInstance', userProfile)
    
    expect(userProfile.props.user).toBe(userData)

    user.unmount();
    expect(removeProfile).toHaveBeenCalled();
    //expect(userInstance.props.user).toHaveLength(1);
    done();
  })
})