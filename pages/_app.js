import React from "react";
import {createStore, applyMiddleware} from "redux";
import {Provider} from "react-redux";
import App, {Container} from "next/app";
import withRedux from "next-redux-wrapper";
import reduxThunk from 'redux-thunk'


import reducers from '../client/src/store/reducers'

const makeStore = (initialState, options) => {
  return createStore(reducers, {}, applyMiddleware(reduxThunk));
};

class MyApp extends App {

    static async getInitialProps({Component, ctx}) {

        // we can dispatch from here too
        ctx.store.dispatch({type: 'FOO', payload: 'foo'});

        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return {pageProps};

    }

    render() {
        const {Component, pageProps, store} = this.props;
        return (
                <Provider store={store}>
                    <Component {...pageProps} />
                </Provider>
        );
    }

}

export default withRedux(makeStore)(MyApp);
