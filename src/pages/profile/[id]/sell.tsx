import FloatingButtonLink from "@/components/floating-button-link";
import Item from "@/components/list-item/product";
import ItemProductRecord from "@/components/list-item/product-record";
import { Layout } from "@/components/layouts";
import { IResponse, ProductWithCount, globalProps } from "@/libs/types";
import { Product, Record } from "@prisma/client";
import Link from "next/link";
import useSWR from "swr";

export default function profileSell({
  user: { user, isLoading: isLoadingUser },
}: globalProps) {
  // console.log(data, isLoading);
  return (
    <Layout canGoBack user={!isLoadingUser && user ? user : undefined}>
      <div>
        <ItemProductRecord kind="sale" />

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
    </Layout>
  );
}
