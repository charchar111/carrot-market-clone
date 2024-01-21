import { readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import path from "path";
import remarkHtml from "remark-html";
import remarkParse from "remark-parse";
import { unified } from "unified";

const BlogDetail: NextPage = ({ post }) => {
  return (
    <div
      className="blog-detail"
      dangerouslySetInnerHTML={{ __html: post }}
    ></div>
  );
};

export default BlogDetail;

export const getStaticPaths: GetStaticPaths = async () => {
  const postPath = path.join(process.cwd(), "/src/posts/blog");
  const files = readdirSync(postPath).map((e) => {
    return { params: { slug: e.split(".")[0] } };
  });
  return { paths: files, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const postPath = path.join(
    process.cwd(),
    `/src/posts/blog/${context.params?.slug}.md`,
  );
  const mat = matter.read(postPath);

  const { value: postHtml } = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(mat.content);

  console.log("param", context.params, mat.content, postHtml);

  return { props: { post: postHtml } };
};
