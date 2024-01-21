import { Layout } from "@/components/layouts";
import { globalProps } from "@/libs/types";
import { readFileSync, readdirSync } from "fs";
import matter from "gray-matter";
import { GetStaticPropsContext } from "next";
import Link from "next/link";
import path from "path";

interface Post {
  title: string;
  date: string;
  category: string;
  slug: string;
}

interface BlogPageProps extends globalProps {
  posts: Post[];
}

export default function Blog({ user, posts }: BlogPageProps) {
  return (
    <Layout
      title="블로그"
      hasTabBar
      user={!user.isLoading && user.user ? user.user : undefined}
    >
      <div className="px-4">
        {posts.map((element, index) => (
          <Link href={`/blog/${element.slug}`} key={index}>
            <div className="mb-5 border-b-2 pb-3 last-of-type:border-0">
              <h3 className="text-lg font-semibold text-orange-700">
                {element.title}
              </h3>
              <div>
                <p>{element.date}</p>
                <p>{element.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export const getStaticProps = function (context: GetStaticPropsContext) {
  const postDirectory = path.join(process.cwd(), "/src/posts/blog");

  const files = readdirSync(postDirectory).map((element) => {
    const file = readFileSync(`${postDirectory}/${element}`, "utf-8");
    // console.log(file);
    return { ...matter(file).data, slug: element.split(".")[0] };
    // console.log(mat);
  });
  // console.log(files);

  return { props: { posts: files } };
};
