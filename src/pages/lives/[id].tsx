import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import Messages from "@/components/message";
import useMutation from "@/libs/client/useMutation";
import { IResponse, globalProps } from "@/libs/types";
import { Message, Stream } from "@prisma/client";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import useSWR, { MutatorCallback } from "swr";

interface MessageWithUser extends Message {
  user: { name: string; avatar: string | null; id: number };
}

interface StreamWithUserMessage extends Stream {
  user: { id: number; name: string; avatar: string | null };
  Messages: MessageWithUser[];
}

interface IResponseLiveDetail extends IResponse {
  live?: StreamWithUserMessage;
}

interface MessageForm {
  message: string;
}

export default function livesDetail({
  user: { isLoading, user },
}: globalProps) {
  const router = useRouter();

  const {
    data,
    isLoading: isLoadingLive,
    mutate: mutateLiveDetail,
  } = useSWR<IResponseLiveDetail>(
    router.query.id ? `/api/lives/${router.query.id}` : null,
    { refreshInterval: 1000 },
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors: formError },
  } = useForm<MessageForm>({ reValidateMode: "onSubmit" });

  const [mutationChat, { data: mutationChatData, error, loading }] =
    useMutation<IResponse>(`/api/lives/${router.query.id}/messages`);

  const onValid: SubmitHandler<MessageForm> = function (formData) {
    console.log(formData);
    if (loading) return;
    mutationChat(formData);
    reset();
    mutateLiveDetail(
      (data) =>
        !router.query.id || !user
          ? data
          : data && {
              ...data,
              live: data.live && {
                ...data.live,
                Messages: [
                  ...data.live.Messages,
                  {
                    content: formData.message,
                    createdAt: new Date(),
                    id: Date.now(),
                    streamId: +router.query?.id.toString(),
                    updatedAt: new Date(),
                    user: { ...user },
                    userId: user.id,
                  },
                ],
              },
            },
      { revalidate: false, rollbackOnError: true },
    );
  };

  const onInvalid = function (error: FieldErrors) {
    console.log(error);
  };

  // useEffect(() => {
  //   if (mutationChatData && mutationChatData.ok)
  //     mutateLiveDetail((data) => {
  //       return {
  //         ...data,
  //         live: {
  //           ...data?.live,
  //           Messages: data?.live?.Messages ? [...data?.live?.Messages,{}] : [],
  //         },
  //       };
  //     });
  // }, [mutationChatData, mutateLiveDetail]);

  const messagesSection = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesSection?.current) {
      messagesSection.current.scrollTop = messagesSection.current?.scrollHeight;
    }
  }, [mutationChatData]);

  return (
    <Layout canGoBack user={!isLoading && user ? user : undefined}>
      <div className="px-4">
        <div className="mt-5 px-4 pb-10">
          <div className="video mb-5 aspect-video rounded-lg bg-gray-400"></div>
          <div className="info space-y-2">
            <h2 className="pl-2 text-lg font-semibold text-gray-800">
              {data?.live?.name}
            </h2>

            <p className="pl-2">${data?.live?.price}</p>
            <p className="pl-2 pt-2">{data?.live?.description}</p>
          </div>
        </div>

        <section
          ref={messagesSection}
          className="chat-log h-[50vh] space-y-4 overflow-auto border-2 border-gray-100 p-2"
        >
          {data?.live?.Messages?.map((element, i) => {
            return (
              <Messages
                id={element.id}
                key={i}
                text={element.content}
                avatarUrl={element.user.name}
                reverse={user?.id === element.userId || false}
              />
            );
          })}

          <div className="scroll-bottom"></div>
        </section>

        <div className="chat-input inset-x-2  bottom-0 mt-7 pb-5 ">
          <form
            className="relative mx-auto flex max-w-lg items-center justify-center"
            onSubmit={handleSubmit(onValid, onInvalid)}
          >
            <Input
              kind="chat"
              register={register("message", { required: true })}
            />
          </form>
        </div>
      </div>
    </Layout>
  );
}
