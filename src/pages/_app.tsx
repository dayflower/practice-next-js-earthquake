import 'fomantic-ui-css/semantic.min.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <SWRConfig
    value={{
      revalidateOnFocus: false,
      refreshInterval: 0,
    }}
  >
    <Component {...pageProps} />
  </SWRConfig>
);

export default MyApp;
