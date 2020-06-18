import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";

import "../styles/global.css";
import { gqlClient } from "../lib/withGraphqlClient";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ApolloProvider client={gqlClient}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
};

export default App;
