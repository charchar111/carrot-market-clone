import ButtonDefault from "@/components/button";
import { Layout } from "@/components/layouts";
import Link from "next/link";

export default function ItemDetail() {
  return (
    <Layout canGoBack>
      <div id="item-detail">
        <div className="detail__main p-3">
          <div className="mb-5 h-44 w-full rounded-lg bg-gray-400" />
          <Link href={`/profile/0`}>
            <div className="profill mb-7 flex cursor-pointer items-center space-x-2 border-b-2 border-gray-100 pb-3 opacity-90 hover:opacity-100">
              <div className="aspect-square w-10  rounded-md bg-gray-400 " />
              <div>
                <p className="font-bold text-gray-900">Steve Jebs</p>
              </div>
            </div>
          </Link>

          <div className="">
            <h1 className="text-lg font-semibold text-gray-900">Galaxy S50</h1>
            <p className="mb-3 mt-1">$140</p>
            <p className="mb-5">
              My money&apos;s in that office, right? If she start giving me some
              bullshit about it ain&apos;t there, and we got to go someplace
              else and get it, I&apos;m gonna shoot you in the head then and
              there. Then I&apos;m gonna shoot that bitch in the kneecaps, find
              out where my goddamn money is. She gonna tell me too. Hey, look at
              me when I&apos;m talking to you, motherfucker. You listen: we go
              in there, and that ni**a Winston or anybody else is in there, you
              the first motherfucker to get shot. You understand?
            </p>
            <div className="mb-5 flex space-x-3">
              <ButtonDefault text="Talk to seller" />

              <button className="p-2 shadow-sm transition-all hover:bg-gray-100">
                <svg
                  className="h-6 w-6 "
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="detail__footer p-3">
          <h2 className="mb-3 text-lg font-semibold">Similar items</h2>
          <div className="grid grid-cols-2 gap-2 ">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i} className="mb-2">
                <div className="h-32 w-full rounded-lg bg-gray-300" />
                <h3 className="mt-1 px-1 font-semibold text-gray-700">
                  Galaxy S60
                </h3>
                <p className="px-1 text-sm font-semibold text-gray-600">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
