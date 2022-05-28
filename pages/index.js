import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import utilStyle from '../styles/utils.module.css'
import Layout, { siteTitle } from '../components/Layout'
import { getPostsData } from "../lib/post"

import Link from "next/link"

//SSGの場合
export async function getStaticProps() {
  const allPostsData = getPostsData(); // id, title, date, thumbnail
  console.log(allPostsData);

  return {
    props: {
      allPostsData,
    },
  };
}






export default function Home({ allPostsData }) {
  return <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyle.headingMd} >
      フロントエンドエンジニアのブログ。NEXT.JSが好き。
    </section>

    <section>
      <h2>++ My Posts ++</h2>
      <div className={styles.grid}>
        {allPostsData.map(({  id, title, date, thumbnail }) => (
          <article key={id}>
          <Link href={`/posts/${id}`}>
            <img src={`${thumbnail}`}
            className={styles.thumbnailImage}
            />
          </Link>
          <Link href={`/posts/${id}`}>
        <a className={utilStyle.boldText}>{title}</a>
          </Link>
          <br />
          <small className={utilStyle.lightText}>
            {date}
          </small>
        </article>
        ))}
    </div>
    </section>
  </Layout>
}
