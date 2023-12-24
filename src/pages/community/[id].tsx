import ButtonDefault from "@/components/button";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";
import { IResponse, IResponsePostDetail } from "@/libs/types";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();
  const { data, error, isLoading } = useSWR<IResponsePostDetail>(
    router.query.id ? `/api/community/posts/${router.query.id}` : null,
  );
  useEffect(() => {
    console.log(data);
    if (!data) return;
    if (!data?.ok) router.replace("/community");
  }, [data, router]);

  return (
    <Layout canGoBack>
      <div>
        <span className="my-3 ml-4 inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
          동네질문
        </span>
        <div className="profill mb-3 flex cursor-pointer items-center space-x-3  border-b px-4 pb-3">
          <div className="h-10 w-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.post?.user.name}
            </p>
            <Link href={`/profile/${data?.post?.user.id}`}>
              <p className="text-xs font-medium text-gray-500">
                View profile &rarr;
              </p>
            </Link>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-lg text-gray-700">
            <span className="font-medium text-orange-500">Q </span>
            <span>{data?.post?.title}</span>
          </div>
          <div>
            <p className="mt-4 px-4 text-gray-700">{data?.post?.content}</p>
          </div>
          <div className="mt-3 flex w-full space-x-5 border-b-[2px] border-t px-4 py-2.5  text-gray-700">
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                {`궁금해요 `}
                {data?.post?._count.Wonderings
                  ? data?.post?._count.Wonderings
                  : 0}
              </span>
            </span>
            <span className="flex items-center space-x-2 text-sm">
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>
                {`답변 `}
                {data?.post?._count.Answers ? data?.post?._count.Answers : 0}
              </span>
            </span>
          </div>
        </div>
        {data?.post?.Answers.map((element, i) => (
          <div className="community-answer my-5 space-y-5 px-4">
            <div className="flex items-start space-x-3">
              <div className="h-8 w-8 rounded-full bg-slate-200" />
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  {element.user.name}
                </span>
                <span className="block text-xs text-gray-500 ">
                  {element.createdAt.toDateString()}
                </span>
                <p className="mt-2 text-gray-700">{element.content}</p>
              </div>
            </div>
          </div>
        ))}

        <div className="mt-5 px-4">
          <Textarea placeholder="Answer this question!" rows={10} />

          <ButtonDefault text="Reply" />
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
