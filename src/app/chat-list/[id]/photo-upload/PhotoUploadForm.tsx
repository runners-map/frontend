"use client";
import Image from "next/image";
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-full h-full border-2 border-primary rounded-xl mb-4 aspect-w-16 aspect-h-9">
        {preview ? (
          <Image
            src={`${preview}`}
            alt="review photo"
            layout="responsive"
            width={16} // 비율 유지: 16:9
            height={9}
            className="rounded-lg object-contain"
          />
        ) : (
          <div className="flex justify-center items-center bg-gray-300 w-full h-full rounded-lg text-gray-500">
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
            <button type="button" className="btn btn-secondary w-full">
              나가기
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
