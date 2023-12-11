import ButtonDefault from "@/components/button";
import Input from "@/components/input";
import { Layout } from "@/components/layouts";
import Textarea from "@/components/textarea";

export default function UploadDetail() {
  return (
    <Layout canGoBack>
      <div className="px-4 py-16">
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

            <input type="file" className="hidden" />
          </label>
        </div>
        <div>
          <Input
            label="Price"
            name="input-upload-price"
            kind="price"
            placeholder="0.00"
          />
        </div>
        <div>
          <Textarea name="textarea-upload" label="Description" row="4" />
        </div>
        <ButtonDefault text="Upload product" />
      </div>
    </Layout>
  );
}
