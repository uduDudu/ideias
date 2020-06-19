import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider, CSSReset, theme } from "@chakra-ui/core";

import { useApollo } from "../lib/apolloClient";
import "../styles/global.css";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />;
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
