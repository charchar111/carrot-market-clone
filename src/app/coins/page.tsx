import { Suspense } from "react";

let finished = false;

function CoinList() {
  if (!finished) {
    throw Promise.all([
      new Promise((resolve) => setTimeout(resolve, 3000)),
      new Promise((resolve) => {
        finished = true;
        resolve("");
      }),
    ]);
  }

  return <ul>xxxx</ul>;
}

export default function Page() {
  return (
    <h1 className="text-red-600">
      Hello, Next js RSC
      <div>
        <Suspense fallback={<ul>nothing</ul>}>
          <CoinList />
        </Suspense>
      </div>
    </h1>
  );
}
