import Head from "next/head";
import Link from "next/link";
Head

export default function FirstPost () {
    return (
        <div>
            <Head>
                <title>first post</title>
            </Head>
            <h1>This is a first post</h1>
            <Link href="/">Back to home</Link>
        </div>
    );
}