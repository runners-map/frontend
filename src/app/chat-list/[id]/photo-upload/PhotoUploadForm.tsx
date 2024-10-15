"use client";
import Image from "next/image";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

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
      <div className="card border-2 border-primary">
        <figure className="px-4 pt-4">
          <div className="h-52 w-full border-2 border-primary relative rounded-xl">
            {preview ? (
              <Image
                src={`${preview}`}
                alt="review photo"
                fill
                className="rounded-xl"
                style={{ objectFit: "contain" }}
              />
            ) : (
              <Image
                src="https://i.namu.wiki/i/fWenvmJ3QN7ciEV-oypu67EEvZNRWTDn-XPVCDEW8LcxJT7igFFH8T-E0P8dfqOI9z0kZnw0cGTz8yPQIsPNB_LAzBBU7vwPXNEd19Xpoe3nn_j1OtjqbGojMv1wB6pt7h88bi3fVHcJEwNoIvktMA.webp"
                alt="default"
                className="rounded-xl"
                width={500}
                height={100}
              />
            )}
          </div>
        </figure>
        <div className="card-body p-4">
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
                  className="file-input file-input-primary"
                />
                {errors.file && (
                  <p className="text-red-500">파일을 업로드 해주세요!</p>
                )}
              </>
            )}
            rules={{ required: true }}
          />
          <div className="card-actions space-y-1 mt-1">
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
