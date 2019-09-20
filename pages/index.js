import React from 'react';
import {connect} from "react-redux";

import Link from 'next/link'


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
  <div>
    <p>Hello Next.js, this is your friend Brian from logrocket {this.props.query.id}</p>
    <button onClick={()=>console.log('im clicked')}>fsdfsd</button>
    <a href="#" onClick={()=>console.log('im clicked')}>fsdfsd</a>
    <a onClick={()=>this.getClick()}>asaassa</a>
    <br/>
    <a href="/users">users</a>
    <br/>
    <Link href="/users">
        <a>To Users</a>
    </Link>
  </div>
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
