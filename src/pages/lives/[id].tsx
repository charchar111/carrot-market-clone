import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import Message from "@/components/message";

export default function livesDetail() {
  return (
    <Layout canGoBack>
      <div className="px-4">
        <div className="mt-5 px-4 pb-10">
          <div className="video mb-5 aspect-video rounded-lg bg-gray-400"></div>
          <div className="info">
            <h2 className="pl-2 text-lg font-semibold text-gray-800">
              We want happy
            </h2>
          </div>
        </div>

        <section className="chat-log h-[50vh] space-y-4 overflow-auto border-2 border-gray-100 p-2">
          {[...Array(14)].map((_, i) => {
            if (i % 3 === 0)
              return (
                <Message
                  id={i}
                  text="Hi how much are you selling them for?"
                  avatarUrl=""
                />
              );
            if (i % 3 === 1)
              return (
                <Message id={i} text="I want 20,000₩" reverse avatarUrl="" />
              );

            if (i % 3 === 2)
              return <Message id={i} text="미쳤어" avatarUrl="" />;
            return null;
          })}
        </section>

        <div className="chat-input inset-x-2  bottom-0 mt-7  pb-5 ">
          <div className="relative mx-auto flex max-w-lg items-center justify-center  ">
            <Input kind="chat" />
          </div>
        </div>
      </div>
    </Layout>
  );
}
