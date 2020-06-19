import Head from "next/head";
import { GetServerSideProps } from "next";

import { initializeApollo } from "../lib/apolloClient";

import Layout, { siteTitle } from "../components/Layout";
import UsersList, { USERS_QUERY } from "../components/users/UsersList";

const Home: React.FC = () => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <UsersList />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: USERS_QUERY,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
};
