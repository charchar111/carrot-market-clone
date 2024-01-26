import { IResponseReviews, ReviewWithCreateByUser } from "@/libs/types";
import { Review } from "@prisma/client";
import useSWR from "swr";

// interface ItemProfieReviewProps {
//   data: ReviewWithCreateByUser;
// }

export default function ItemProfieReview() {
  // { data }: ItemProfieReviewProps
  const { data: dataReview } = useSWR<IResponseReviews>("/api/users/reviews");
  return (
    <>
      {dataReview?.reviews?.map((data, index) => (
        <div className="user-rating__item" key={data.id}>
          <div className=" mb-5 flex  items-center ">
            <div className="mb mr-4 h-16 w-16 rounded-full bg-gray-500" />
            <div>
              <h4>{data.CreatedBy.name}</h4>
              <div className="rating-star flex">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`h-5 w-5 ${
                      data.score > index ? " text-yellow-400" : "text-gray-400"
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div>
            <p>{data.content}</p>
          </div>
        </div>
      ))}
    </>
  );
}
