"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LuImage } from "react-icons/lu";
import axios from "axios";
import Cookies from "js-cookie";

export default function PhotoUploadForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [preview, setPreview] = useState(null);
  const router = useRouter();
  const { id } = useParams();

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

  const onSubmit = async (data) => {
    if (!data.file || data.file.length === 0) {
      console.error("파일이 업로드되지 않았습니다.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", data.file[0]); // FormData에 파일 추가

      const accessToken = Cookies.get("accessToken");

      const response = await axios.post(
        `/api/posts/${id}/after-run-pictures`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log("사진 업로드 성공:", response.data);
      // 업로드 성공 시 메인 페이지로 이동
      router.push("/");
    } catch (error) {
      console.error("사진 업로드 실패:", error.response?.data || error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="w-[328px] h-[256px] mx-auto border-primary rounded-xl mb-8 relative shadow-md shadow-slate-300">
        {preview ? (
          <Image
            src={`${preview}`}
            alt="review photo"
            fill
            className="rounded-xl object-cover"
          />
        ) : (
          <div className="flex justify-center items-center bg-white w-full h-full rounded-lg text-gray-300">
            <LuImage size={50} />
          </div>
        )}
      </div>

      <div className="mx-4 rounded-2xl bg-white shadow-md shadow-slate-300">
        <div className="flex flex-col p-8 gap-y-4">
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
                  className="file-input file-input-primary rounded-full"
                />
                {errors.file && (
                  <p className="text-red-500">파일을 업로드 해주세요!</p>
                )}
              </>
            )}
            rules={{ required: true }}
          />
          <button
            type="submit"
            className="btn btn-primary rounded-full text-white"
          >
            업로드
          </button>
          <button
            type="button"
            onClick={handleExit}
            className="btn btn-secondary rounded-full text-white"
          >
            나가기
          </button>
        </div>
      </div>
    </form>
  );
}
