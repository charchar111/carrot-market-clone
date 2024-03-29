import ItemProfieReview from "@/components/list-item/profile-review";
import { Layout } from "@/components/layouts";
import client from "@/libs/server/client";

import { IResponseReviews, globalProps } from "@/libs/types";
import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import useSWR, { SWRConfig } from "swr";
import { makeStringCloudflareImageUrl } from "@/libs/client/utils";
import { withApiSessionSSR } from "@/libs/server/withSession";
import { Suspense, useEffect, useState } from "react";
import useUser from "@/libs/client/useUser";
import Loading from "@/components/loading";
import { globalFetcher } from "../_app";
import dynamic from "next/dynamic";

const Profile: NextPage<globalProps> = ({
  user: { user, isLoading },
  // fallback,
}) => {
  // console.log(dataReview);
  // const user = !userData ? fallback.profile : userData;
  // const user = fallback["/api/users/me"]?.profile;
  // const dataReview = fallback["/api/users/reviews"];
  return (
    <Layout canGoBack user={!isLoading && user ? user : undefined}>
      <div id="profile-index" className="px-4 py-10">
        <div className="head mb-10 flex items-center space-x-2">
          <div className="h-16 w-16 overflow-hidden rounded-full bg-gray-500">
            {user?.avatar == "" || user?.avatar == null ? null : (
              <img
                className="h-full object-fill"
                src={makeStringCloudflareImageUrl({
                  id: user.avatar,
                  variant: "avatar",
                })}
              />
            )}
          </div>

          <div className="flex flex-col">
            <span className="font-semibold">{user?.name}</span>
            <Link href={`/profile/edit`}>
              <span className=" cursor-pointer text-gray-700 opacity-80 hover:opacity-100">
                Edit profile
              </span>
            </Link>
          </div>
        </div>

        <div className="list-SBL flex justify-around">
          <Link href={`/profile/0/sell`}>
            <div className="SBL__column1 group flex cursor-pointer flex-col items-center">
              <div className="mb-2 rounded-full bg-orange-400 p-4 text-white transition-all group-hover:bg-orange-500">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <span className="font-semibold text-gray-600 opacity-80 transition-all group-hover:opacity-100">
                판매내역
              </span>
            </div>
          </Link>

          <Link href={`/profile/0/buy`}>
            <div className="SBL__column2 group flex cursor-pointer flex-col items-center">
              <div className="mb-2 rounded-full bg-orange-400 p-4 text-white transition-all group-hover:bg-orange-500">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <span className="font-semibold text-gray-600 opacity-80 transition-all group-hover:opacity-100">
                구매내역
              </span>
            </div>
          </Link>

          <Link href={`/profile/0/love`}>
            <div className="SBL__column3 group flex cursor-pointer flex-col items-center">
              <div className="mb-2 rounded-full bg-orange-400 p-4 text-white transition-all group-hover:bg-orange-500">
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <span className="font-semibold text-gray-600 opacity-80 transition-all group-hover:opacity-100">
                관심목록
              </span>
            </div>
          </Link>
        </div>

        <section className="user-rating mt-10">
          <Suspense fallback={<Loading />}>
            <ItemProfieReview />
          </Suspense>
        </section>
      </div>
    </Layout>
  );
};

// export default Profile;

const Page: NextPage<globalProps> = ({
  user,
  //  fallback
}) => {
  // console.log("page \n \n \n");
  // console.log("window", globalThis);
  return (
    <SWRConfig
      value={{
        // fallback: {
        //   "/api/users/reviews": undefined,
        //   //  {
        //   //   //     // ok: true,
        //   //   // ok: false,
        //   //   // reviews: [],
        //   //   //     // reviews: [
        //   //   //     //   {
        //   //   //     //     id: 1,
        //   //   //     //     createdAt: "2024-01-03T00:22:31.703Z",
        //   //   //     //     updatedAt: "2024-01-05T21:47:37.236Z",
        //   //   //     //     content: "사장님이 친절해요 :)",
        //   //   //     //     score: 1,
        //   //   //     //     CreatedById: 2,
        //   //   //     //     CreatedForId: 3,
        //   //   //     //     CreatedBy: {
        //   //   //     //       id: 2,
        //   //   //     //       name: "anon",
        //   //   //     //       avatar: null,
        //   //   //     //     },
        //   //   //     //   },
        //   //   //     // ],
        //   // },
        // },
        suspense: true,
      }}
    >
      <Profile user={user} />
    </SWRConfig>
  );
};
export default dynamic(async () => Page, { ssr: false });
// export default Page;

// export const getServerSideProps = withApiSessionSSR(
//   async ({ req, res, query }: NextPageContext) => {
//     // console.log(req?.session);
//     if (!req?.session.user?.id) return;

//     const profile = await client.user.findUnique({
//       where: { id: req?.session.user?.id! },
//     });

//     const reviews = await client.review.findMany({
//       where: { CreatedFor: { id: req?.session.user?.id! } },
//       include: {
//         CreatedBy: { select: { id: true, name: true, avatar: true } },
//       },
//     });

//     return {
//       props: {
//         fallback: {
//           "/api/users/me": {
//             ok: true,
//             profile: JSON.parse(JSON.stringify(profile)),
//           },
//           "/api/users/reviews": {
//             ok: true,
//             reviews: JSON.parse(JSON.stringify(reviews)),
//           },
//         },
//       },
//     };
//   },
// );
