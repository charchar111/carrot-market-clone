import FloatingButtonLink from "@/components/floating-button-link";
import Item from "@/components/item";
import { Layout } from "@/components/layouts";
import Link from "next/link";

export default function profileSell() {
  return (
    <Layout canGoBack>
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

        <FloatingButtonLink href="/products/upload" bottom="10">
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
