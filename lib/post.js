import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "posts");

//mdファイルのデータを取り出す関数
export function getPostsData() {
    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const id = fileName.replace(/\.md$/, "");

        //マークダウンファイルを文字列として読み取る
        const fullpath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullpath, "utf-8");

        const matterResult = matter(fileContents);

        //idとデータを返す
        return {
            id, 
            ...matterResult.data,
        };
    });
    return allPostsData;
}

//getStaticPathでpathを取得
export function getAllPostIds() {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames.map((fileName) => {
        return {
            params: {
                id: fileName.replace(/\.md$/, ""),
            },
        }
    })
}

//idに基づいてブログ用データを返す
export async function getPostData(id) {
    const fullpath = path.join(postsDirectory, `${id}.md`);
    const fileContent = fs.readFileSync(fullpath, "utf-8");

    const matterResult = matter(fileContent);

    const blogContent = await remark().use(html).process(matterResult.content);

    const blogContentHTML = blogContent.toString();

    return {
        id,
        blogContentHTML,
        ...matterResult.data,
    };
}
