import React from 'react';

import { HeaderBtn } from './headerBtn/headerBtn';
import { HeaderHeading} from './headerHeading/headerHeading';

import { Footer } from './footer/footer';
import  Header  from './header/header';
import Head from 'next/head';

const headerFunc = () => {
  window.addEventListener('scroll', function(e) {
    let sY = window.scrollY;
    if (sY > 180) {
      document.getElementsByClassName('to-top')[0].style.opacity = 1;
    } else {
    document.getElementsByClassName('to-top')[0].style.opacity = 0;
    }
  })
} 
const Layout = (props) => {

  return (
    <>
    <Head>
    <title>My styled page</title>
    <link href="/public/styles/style.css" rel="stylesheet" />
    <link rel="stylesheet" href="/css/bootstrap.min.css" />
    <script>

    </script>
  </Head>
  <Header auth={props.auth}/>
  <HeaderHeading/>
  {props.children}
  <Footer/>
  </>
  )
}

export default Layout;
