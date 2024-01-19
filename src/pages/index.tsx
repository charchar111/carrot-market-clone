import FloatingButtonLink from "@/components/floating-button-link";
import Item from "@/components/list-item/product";
import { Layout } from "@/components/layouts";
// import useUser from "@/libs/client/useUser";
import { IResponse, globalProps } from "@/libs/types";
import { Product, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse, NextPage } from "next";
import Head from "next/head";
// import { useEffect, useState } from "react";
import useSWR, { SWRConfig } from "swr";
import { useRouter } from "next/router";
import useIncludeQuery from "@/libs/client/useIncludeQuery";
import Pagination from "@/components/pagination";
// import Image from "next/image";
// import localImageCoffee from "../../public/coffee-8406187_1280.jpg";
// import { ITEM_PER_PAGE } from "@/libs/constant";
import client from "@/libs/server/client";
import { ITEM_PER_PAGE } from "@/libs/constant";

interface ProductWithCount extends Product {
  _count: { Records: number };
}

interface ResponseProduct extends IResponse {
  products: ProductWithCount[];
  countTotalProduct: number;
}

const RootHome: NextPage<globalProps> = ({ user }) => {
  // console.log("fallback", fallback);
  const router = useRouter();

  const {
    data,
    error,
    isLoading: isLoadingProduct,
  } = useSWR<ResponseProduct>(
    user && router.query.page
      ? `/api/products?page=${router.query.page}`
      : null,
  );

  // console.log(data);

  return (
    <Layout
      title="홈"
      hasTabBar
      user={!user.isLoading && user.user ? user.user : undefined}
    >
      <Head>
        <title>Home</title>
      </Head>
      <div>
        <div>
          {/* <div className="local-img">
            <Image
              src={localImageCoffee}
              alt="coffee"
              placeholder="blur"
              quality={50}
            />
          </div> */}
          {!data
            ? "loading"
            : data?.products?.map((product) => (
                <Item
                  key={product.id}
                  title={product.name}
                  price={product.price}
                  id={product.id}
                  // comment={1}
                  heart={product._count?.Records}
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
      </div>

      <Pagination
        countTotal={data?.countTotalProduct}
        query="page"
        pathname="/"
      />
    </Layout>
  );
};

const Page: NextPage<globalProps> = ({ user, fallback }) => {
  const router = useRouter();

  useIncludeQuery("page", "1");

  const cashKey =
    user && router.query.page
      ? `/api/products?page=${router.query.page}`
      : null;

  const fallbackObj = {};
  if (cashKey) fallbackObj[cashKey] = fallback;

  // console.log(fallbackObj);

  return (
    <SWRConfig
      value={{
        fallback: fallbackObj,
      }}
    >
      {!router.query.page ? null : <RootHome user={user} />}
    </SWRConfig>
  );
};

export default Page;

export async function getServerSideProps(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const page = req.query.page;

  const fallback = {
    ok: false,
    products: await client?.product.findMany({
      include: {
        _count: { select: { Records: { where: { kind: "FAVORITE" } } } },
      },
      take: ITEM_PER_PAGE,
      skip: !page ? 0 : (+page.toString() - 1) * ITEM_PER_PAGE,
      orderBy: { id: "desc" },
    }),
    countTotalProduct: await client?.product.count({}),
  };

  if (fallback.products && fallback.countTotalProduct) fallback.ok = true;

  return { props: { fallback: JSON.parse(JSON.stringify(fallback)) } };
}
