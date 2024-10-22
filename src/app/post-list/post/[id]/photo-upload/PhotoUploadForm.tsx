"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuImage } from "react-icons/lu";

export default function PhotoUploadForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);

  const router = useRouter();

  const handleExit = () => {
    router.push("/");
  };

  const handlePreview = (file) => {
    if (file && file[0]) {
      // 파일이 유효한지 확인
      const fileObj = file[0];
      const previewUrl = URL.createObjectURL(fileObj);
      setPreview(previewUrl);
    } else {
      console.error("유효하지 않은 파일입니다.");
    }
  };

  const onSubmit = (data) => {
    console.log(data);
    // 사진 업로드
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[380px] h-[284px] mx-auto border-2 border-primary rounded-xl mb-4 relative">
        {preview ? (
          <Image
            src={`${preview}`}
            alt="review photo"
            fill
            className="rounded-lg object-cover"
          />
        ) : (
          <div className="flex justify-center items-center bg-gray-200 w-full h-full rounded-lg text-gray-400">
            <LuImage size={50} />
          </div>
        )}
      </div>

      <div className="card border-2 border-primary">
        <div className="card-body">
          <div className="card-actions space-y-1">
            <Controller
              name="file"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      handlePreview(e.target.files);
                    }}
                    className="file-input file-input-primary w-full"
                  />
                  {errors.file && (
                    <p className="text-red-500">파일을 업로드 해주세요!</p>
                  )}
                </>
              )}
              rules={{ required: true }}
            />
            <button type="submit" className="btn btn-primary w-full">
              업로드
            </button>
            <button
              type="button"
              onClick={handleExit}
              className="btn btn-secondary w-full"
            >
              나가기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
