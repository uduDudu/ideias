import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";

import { useApollo } from "../lib/apolloClient";
import "../styles/global.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />;
    </ApolloProvider>
  );
};

export default App;
