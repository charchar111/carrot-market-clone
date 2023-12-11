import FloatingButtonLink from "@/components/floating-button-link";
import Item from "@/components/item";
import { Layout } from "@/components/layouts";
import useUser from "@/libs/client/useUser";
import type { NextPage } from "next";
import Head from "next/head";
import { useForm } from "react-hook-form";

const Home: NextPage = () => {
  const { user, isLoading } = useUser();

  // const user = useUser();
  // 유저의 로그인 여부 확인용 훅, 로그인 쿠키 존재 시, 유저 정보 반환, 없을 시 /enter로 push

  console.log(user);

  return (
    <Layout title="홈" hasTabBar>
      <Head>
        <title>Home</title>
      </Head>
      <div>
        {[...Array(14)].map((_, i) => (
          <Item
            key={i}
            title="New iPhone 14"
            price={95}
            id={i}
            comment={2}
            heart={3}
          >
            <span className="mb-2 text-xs text-gray-400">Black</span>
          </Item>
        ))}
      </div>
      <FloatingButtonLink href="/products/upload">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </FloatingButtonLink>
    </Layout>
  );
};

export default Home;
