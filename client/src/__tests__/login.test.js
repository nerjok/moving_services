import React from "react";
import { create } from "react-test-renderer";
import { BrowserRouter, MemoryRouter } from 'react-router-dom';

import { Provider } from 'react-redux'
import configureMockStore from "redux-mock-store";

import { LoginPassword } from '../containers/auth/password/LoginPassword';
import { RecalPswd } from '../containers/auth/password/recalPswd/recalPswd';
import { ResetPassword } from '../containers/auth/password/ResetPassword';

import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure, mount } from 'enzyme';
configure({adapter: new Adapter()});//Enzyme

const mockStore = configureMockStore();
const store = mockStore({});

import { Register } from '../containers/auth/password/register/register';

const onSubmitSpy = jest.fn();

/**
 * Should test all Login components
 * 
 */
describe('shouldTest Login Components', () => {
  var login;

  test('should match snapshot', done => {
   const login = create(
     <MemoryRouter>
      <LoginPassword
        loginPassword={onSubmitSpy}
        history={[]}
      />
     </MemoryRouter>
   );

   expect(login.toJSON()).toMatchSnapshot();
   done();
  });


  test('should click Login', done => {
    
    login = mount(
      <Provider store={store}>
        <BrowserRouter>
          <LoginPassword
          loginPassword={onSubmitSpy}
          history={[]}
          />
        </BrowserRouter>
      </Provider>
    );

  
    let email = login.find('#login-mail');
    expect(email.length).toEqual(1);
    email.instance().value = 'adas@asdas.lt';
    email.simulate('change', { target: { value: 'Changed@mail.com' } });


    let pswd = login.find('#login-password');
    expect(pswd.length).toEqual(1);
    pswd.instance().value = 'password';
    pswd.simulate('change', {target: {value: 'password'}});

    let btn = login.find('#login_button');
    expect(btn.length).toEqual(1);
    btn.simulate('click');

    expect(onSubmitSpy).toHaveBeenCalled();
   done();
  });


  test.skip('should call register Prop', done => {

    let register = login.find('#entrance-points-tab-register')
    expect(register.length).toEqual(1);
    register.simulate('click');
    done();
    return

    let email = login.find('input[type="email"]')
    expect(email.length).toEqual(1);
    email.instance().value = 'adas@asdas.lt'

    let pswd = login.find('input[name="password"]')
    expect(pswd.length).toEqual(1);
    //pswd.simulate('change', {target: {value: 'password'}});
    pswd.instance().value = 'password';

    let pswd2 = login.find('input[name="password2"]')
    expect(pswd.length).toEqual(1);
    //pswd2.simulate('change', {target: {value: 'password'}});
    pswd2.instance().value = 'password';
    
    done();
  })

  test('should click Register prop', done => {
    
    let register = mount(
          <Register
            login={onSubmitSpy}
            email={''}
            pswd={'this.state.password'}
            pswd2={'this.state.password2'}
            change={()=>{}}
            signupErr={''}
          />
    );


    let email = register.find('#register-mail')
    expect(email.length).toEqual(1);
    email.instance().value = 'adas@asdas.lt'


    let pswd = register.find('input[name="password"]')
    expect(pswd.length).toEqual(1);
    pswd.instance().value = 'password';
    pswd.simulate('change', {target: {value: 'password'}});

    let pswd2 = register.find('input[name="password2"]')
    expect(pswd.length).toEqual(1);
    pswd2.instance().value = 'password';
    pswd2.simulate('change', {target: {value: 'password'}});


    expect(onSubmitSpy).toHaveBeenCalled();
   done();
  });


  test('should click Recal password btn and call props', done => {
    
    let register = mount(
          <RecalPswd
            forgotPswd={onSubmitSpy}
            history={{}}
          />
    );


    let email = register.find('input[name="email"]')
    expect(email.length).toEqual(1);
    email.instance().value = 'adas@asdas.lt'
    email.simulate('change', {target: {value: 'asdas@asdas.lt'}});

    let btn = login.find('#recall-button');
    expect(btn.length).toEqual(1);
    btn.simulate('click');


    expect(onSubmitSpy).toHaveBeenCalled();
    done();
  });


  test('should click resset password btn and call props', done => {
    
    let register = mount(
          <ResetPassword
           resetPassword={onSubmitSpy}
            history={{}}
          />
    );


    let email = register.find('input[name="email"]')
    expect(email.length).toEqual(1);
    email.instance().value = 'adas@asdas.lt'


    let pswd = register.find('input[name="password"]')
    expect(pswd.length).toEqual(1);
    pswd.instance().value = 'password';
    pswd.simulate('change', {target: {value: 'password'}});

    let pswd2 = register.find('input[name="password2"]')
    expect(pswd.length).toEqual(1);
    pswd2.instance().value = 'password';
    pswd2.simulate('change', {target: {value: 'password'}});


    let btn = register.find('#reset-button');
    expect(btn.length).toEqual(1);
    btn.simulate('click');


    expect(onSubmitSpy).toHaveBeenCalled();
    done();
  });
});
