import React from 'react';

import { Header as HeaderBtn, HeaderHeading} from '../client/src/components/header';

import { Footer } from '../client/src/containers/footer';
import  Header  from './static/header';
import Head from 'next/head';
//require('bootstrap/dist/css/bootstrap.css');
//import 'bootstrap';

const Layout = (props) => {

  return (
    <>
    <Head>
    <title>My styled page</title>
    <link href="/public/styles/style.css" rel="stylesheet" />
    <link rel="stylesheet" href="/css/bootstrap.min.css" />

  </Head>
  <Header auth={props.auth}/>
  <HeaderHeading/>
  <HeaderBtn/>
  {props.children}
  <Footer/>
  </>
  )
}

export default Layout;
