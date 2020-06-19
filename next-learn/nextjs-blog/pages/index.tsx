import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

import { getSortedPostsData, PostData } from "../lib/posts";
import { initializeApollo } from "../lib/apolloClient";

import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

interface Props {
  allPostsData: PostData[];
}

const EXCHANGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`;

const Home: React.FC<Props> = ({ allPostsData }) => {
  const { loading, error, data } = useQuery(EXCHANGE_RATES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const rates = data.rates.slice(0, 10).map(({ currency, rate }) => (
    <div key={currency}>
      <p>
        {currency}: {rate}
      </p>
    </div>
  ));

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>[Your Self Introduction]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{" "}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href="/posts/[id]" as={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>

      <section>{rates}</section>
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const apolloClient = initializeApollo();
  await apolloClient.query({
    query: EXCHANGE_RATES,
  });

  const allPostsData = getSortedPostsData();
  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
      allPostsData,
    },
  };
};
