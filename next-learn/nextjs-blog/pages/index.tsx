import Head from "next/head";
import Link from "next/link";

import { getSortedPostsData, PostData } from "../lib/posts";

import Date from "../components/date";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { GetStaticProps } from "next";

interface Props {
  allPostsData: PostData[];
}

const Home: React.FC<Props> = ({ allPostsData }) => {
  // EFFECTIVE CLIENT SIDE RENDERER
  // const { data, error } = useSWR('/api/user', fetch)

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
    </Layout>
  );
};

export default Home;

// BUILD TIME - (AHEAD OF USER REQUEST) - CAN'T READ REQUEST PARAMS
export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

// XOR: REQUEST TIME Server Side Rendering!
// the result cannot be cached by a CDN without extra configuration.
// extra configuration might solve caching?
// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {
//       // props for your component
//     },
//   };
// }
