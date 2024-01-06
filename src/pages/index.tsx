import FloatingButtonLink from "@/components/floating-button-link";
import Item from "@/components/item";
import { Layout } from "@/components/layouts";
import useUser from "@/libs/client/useUser";
import { IResponse, globalProps } from "@/libs/types";
import { Product, User } from "@prisma/client";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import useSWR from "swr";

interface ProductWithCount extends Product {
  _count: { Records: number };
}

interface ResponseProduct extends IResponse {
  products: ProductWithCount[];
}

const RootHome: NextPage<globalProps> = ({ user }) => {
  // console.log("user", user);
  const {
    data,
    error,
    isLoading: isLoadingProduct,
  } = useSWR<ResponseProduct>(user ? "/api/products" : null);

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
        {data?.products?.map((product) => (
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
    </Layout>
  );
};

export default RootHome;
