import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { useEffect } from "react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";

interface IUploadProduct {
  price: string;
  description: string;
  name: string;
  image: string;
}

export default function UploadDetail() {
  const {
    register,
    handleSubmit,
    formState: { errors: formError },
  } = useForm<IUploadProduct>();

  const [mutationProduct, { data, error, loading }] =
    useMutation("/api/products");

  const onValid: SubmitHandler<IUploadProduct> = function (data) {
    if (loading) return;
    console.log(data);
    mutationProduct(data);
  };
  const onInvalid = function (error: FieldErrors) {};
  return (
    <Layout canGoBack>
      <div className="px-4 py-16">
        <form onSubmit={handleSubmit(onValid, onInvalid)}>
          <div>
            <label className="mb-5 block w-full cursor-pointer border border-dashed border-gray-400 py-10 transition-all  hover:border-orange-400 hover:text-orange-400 ">
              <svg
                className="mx-auto h-12 w-12"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 48 48"
                aria-hidden="true"
              >
                <path
                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <input
                type="file"
                accept="image/*"
                className="hidden"
                {...register("image", { required: true })}
              />
            </label>
          </div>
          <div>
            <Input
              label="Name"
              kind="text"
              placeholder="0.00"
              register={register("name", { required: true })}
            />
          </div>

          <div>
            <Input
              label="Price"
              kind="price"
              placeholder="0.00"
              register={register("price", { required: true })}
            />
          </div>
          <div>
            <Textarea
              name="textarea-upload"
              label="Description"
              row="4"
              register={register("description", { required: true })}
            />
          </div>
          <ButtonDefault text={loading ? "loading..." : "Upload product"} />
        </form>
      </div>
    </Layout>
  );
}
