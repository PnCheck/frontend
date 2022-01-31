import 'notyf/notyf.min.css';
import '@/css/styles.css';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

Router.events.on('routeChangeStart', NProgress.start);
Router.events.on('routeChangeError', NProgress.done);
Router.events.on('routeChangeComplete', NProgress.done);

function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
