import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import { getAllPostIds, getPostData, FullPostData } from "../../lib/posts";
import Layout from "../../components/Layout";
import Date from "../../components/Date";

import utilStyles from "../../styles/utils.module.css";

interface Props {
  postData: FullPostData;
}

const Post: React.FC<Props> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData,
    },
  };
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const postData = await getPostData(params.id as string);
//   return {
//     props: {
//       postData,
//     },
//   };
// };
