import Link from "next/link";

interface propsListItemLives {
  element: any;
}

export default function ListItemLives({ element }: propsListItemLives) {
  return (
    <div className="list__element  border-b-2    last:border-b-0 ">
      <Link href={`/lives/${element.id}`}>
        <div className="mt-5 px-4 pb-10">
          <div className="video mb-2 aspect-video rounded-lg bg-gray-400"></div>
          <div className="info">
            <h2 className="text-lg font-semibold text-gray-800">
              {element.name}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}
