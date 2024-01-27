import { Suspense } from "react";

const cache: { [key: string]: any[] } = {};

const fetchData = function (url: string) {
  if (!cache[url]) {
    throw Promise.all([
      fetch(url)
        .then((r) => r.json())
        .then((r) => (cache[url] = r)),
      new Promise((r) => setTimeout(r, Math.round(Math.random() * 10555))),
    ]);
  }
  return cache[url];
};
function CoinTicker({ id, name, symbol }: any) {
  const ticker: any = fetchData(`https://api.coinpaprika.com/v1/tickers/${id}`);
  // console.log(ticker);
  return (
    <li className="my-5">
      <p>
        {name} | {symbol}
      </p>

      <span>{ticker.quotes.USD.price}</span>

      <p></p>
    </li>
  );
}
// let finished = false;

function CoinList() {
  // console.log("서버 렌더링");
  // if (!finished) {
  //   throw Promise.all([
  //     new Promise((resolve) => setTimeout(resolve, 3000)),
  //     new Promise((resolve) => {
  //       finished = true;
  //       resolve("");
  //     }),
  //   ]);
  // }
  const data: any[] = fetchData("https://api.coinpaprika.com/v1/coins");
  // console.log(data);

  return (
    <ul>
      {data.slice(0, 5).map((element) => (
        <li key={element.id}>
          <Suspense
            fallback={<span>{element.name} is loading................</span>}
          >
            <CoinTicker
              id={element.id}
              name={element.id}
              symbol={element.symbol}
            />
          </Suspense>
        </li>
      ))}
    </ul>
  );
}

export default function Page() {
  return (
    <h1 className="text-red-600">
      Hello, Next js RSC
      <div>
        <CoinList />
      </div>
    </h1>
  );
}
