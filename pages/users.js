import React, {Component} from "react";
import {connect} from "react-redux";

import * as actions from '../client/src/store/actions'
import {Test} from '../clients/test';
import Router from 'next/router'
import Link from 'next/link'


class Page extends Component {
    static getInitialProps({store, isServer, pathname, query}) {
      console.log('store', store.getState());
        return {custom: 'custom'};
    }

    constructor(props) {
      super(props);
      this.getClick = this.getClick.bind(this);
    }
/*
    componentDidMount() {
      this.props.fetchUser()
  }
*/
  getClick() {
console.log('onClick');
this.props.fetchUser()
  }
    render() {
      const { auth } = this.props
      console.log('renderStore', auth)

        return (
            <div>Users
                <div>Prop from Redux {this.props.foo}</div>
                <div>Prop from getInitialProps {this.props.custom}</div>
                <a onClick={()=>this.getClick()}>fetchUser</a>
                {auth.user && auth.user._id}

                <Link href="/">
                    <a>To main</a>
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

export default connect(mapStateToProps, actions)(Page);
