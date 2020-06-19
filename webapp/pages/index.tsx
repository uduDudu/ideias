import Head from "next/head";
import { GetServerSideProps } from "next";

import { initializeApollo } from "../lib/apolloClient";

import { siteTitle } from "../components/Layout";
import UsersList, { USERS_QUERY } from "../components/users/UsersList";
import Header from "../components/_commons/Header";

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <Header />
      <UsersList />
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apolloClient = initializeApollo(null, ctx);
  await apolloClient.query({
    query: USERS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
