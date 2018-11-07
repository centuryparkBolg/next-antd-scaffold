import App, { Container } from 'next/app';
import Head from 'next/head';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import Layout from '../components/Layout';
import { RouterTitle } from '../constants/ConstTypes';
import '../asserts/styles.less';
class InTerViewSystem extends App {
  
  static async getInitialProps ({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }

  render () {
    const { Component, pageProps, store, router } = this.props;

    return (
      <Container>
        <Head>
          <title>Next-Antd-Scafflod</title>
        </Head>
        <Provider store={store}>
          <Layout title={RouterTitle[router.pathname]}>
            <Component {...pageProps} router={router} />
          </Layout>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(createStore)(withReduxSaga({ async: true })(InTerViewSystem));