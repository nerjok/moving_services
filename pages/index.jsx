import React from 'react';
import {connect} from "react-redux";

import Link from 'next/link'
import { HeaderBtn } from '../components/layout/headerBtn/headerBtn';
import { HeaderHeading} from '../components/layout/headerHeading/headerHeading';
import Layout from '../components/layout/layout';

import { Advertisements } from '../components/advertisements/Advertisements';
import TableList from '../components/table';

class Index  extends React.Component  {
  
  static getInitialProps ({ query}) {
    return { query}
  }
  
  constructor(props) {
    super(props);
    this.getClick = this.getClick.bind(this);
  }

  getClick() {
    console.log('onClick');
  }

 render() {
  const { auth } = this.props
  console.log('props', this.props.query, auth)
  return (
    <Layout auth={auth}>
  <HeaderBtn/>
    <div className="container">
      <div className="row">

        <div className="col-md-6 p-4">
          <h5>Advertisements</h5>

          <Advertisements advertisements={this.props.query.advertisements} activeAdvertisement={{}}/>
        </div>
        <div className="col-md-6 p-4">
          <h5>Users</h5>
          <TableList 
            items={this.props.query.users} 
          />
        </div>
      </div>
    </div>
  
      <div className="m-5">
        <p>Hello Next.js, this is your friend Brian from logrocket {this.props.query.id}</p>
        <button onClick={()=>console.log('im clicked')}>fsdfsd</button>
        <a href="#" onClick={()=>console.log('im clicked')}>fsdfsd</a>
        <a onClick={()=>this.getClick()}>asaassa</a>
        <br/>
        <a href="/users">users</a>
        <br/>
        <Link href="/users" as="/blog/hello-world">
            <a>To Users</a>
        </Link>
      </div>
    </Layout>
  )
 }
}

function mapStateToProps({auth}) {
  return {
      auth
  }
}

export default connect(mapStateToProps, null)(Index);
















/*
import withRedux from "next-redux-wrapper";
import makeStore from "../clients/store";
const Page = ({foo, custom}) => (
  <div>
    <div>Prop from Redux {foo}</div>
    <div>Prop from getInitialProps {custom}</div>
  </div>
);
Page.getInitialProps = ({store, isServer, pathname, query}) => {
  // component will read from store's state when rendered
  store.dispatch({type: 'FOO', payload: 'foo'});
  // pass some custom props to component from here
  return {custom: 'custom'}; 
};

Page = withRedux(makeStore, (state) => ({foo: state.foo}))(Page);

export default Page;
*/
