"use client";

import React, { useEffect, useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  ControllerRenderProps,
} from "react-hook-form";
import { HiMiniUser, HiLockClosed, HiCheckCircle } from "react-icons/hi2";
import Image from "next/image";
import { SettingFormData } from "@/types/SettingForm";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SettingForm() {
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<SettingFormData>({
    mode: "onChange", // 전체 폼에 대해 onChange 모드로 설정
    defaultValues: {
      nickname: "",
      password: "",
      confirmPassword: "",
      profileImage: "",
    },
  });

  const password = watch("password");

  // onSubmit 핸들러 내에서 중복 검사 실행
  const onSubmit: SubmitHandler<SettingFormData> = async (data) => {
    // 닉네임 중복 검사를 onSubmit에서만 수행
    // if (data.nickname === "제로러너") {
    //   setError("nickname", {
    //     type: "manual",
    //     message: "중복된 닉네임입니다",
    //   });
    //   return;
    // }

    router.push("/mypage");
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<SettingFormData, "profileImage">
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      field.onChange(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="rounded-2xl shadow-xl bg-white mt-8 px-4 pt-10 pb-6">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center gap-y-6">
          <div className="w-36 h-36 relative rounded-full shadow-md shadow-slate-300">
            {preview ? (
              <Image
                src={preview}
                fill
                alt="profile preview"
                className="object-cover rounded-full"
              />
            ) : user?.profileImageUrl ? (
              <Image
                src={user.profileImageUrl}
                fill
                alt="profile"
                className="object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-400 text-gray-300 rounded-full">
                <HiMiniUser className="w-5/6 h-5/6" />
              </div>
            )}
          </div>
          <Controller
            name="profileImage"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                className="file-input file-input-bordered file-input-primary w-full rounded-full"
                onChange={(e) => handleFileChange(e, field)}
              />
            )}
          />

          <div className="w-full">
            <label className="input input-bordered input-primary flex items-center gap-2 mb-1 rounded-full ">
              <Controller
                name="nickname"
                control={control}
                rules={{
                  required: "닉네임을 입력해 주세요.",
                  maxLength: {
                    value: 10,
                    message: "닉네임은 최대 10자까지 가능합니다.",
                  },
                }}
                render={({ field }) => (
                  <>
                    <HiMiniUser className="opacity-70" size={20} />
                    <input
                      type="text"
                      className="grow"
                      placeholder="닉네임"
                      {...field}
                    />
                  </>
                )}
              />
            </label>
            {errors.nickname && (
              <span className="text-red-500">{errors.nickname.message}</span>
            )}
          </div>

          <div className="w-full">
            <label className="input input-bordered input-primary flex items-center gap-2 mb-1 rounded-full">
              <Controller
                name="password"
                control={control}
                rules={{
                  minLength: {
                    value: 8,
                    message: "비밀번호는 최소 8자 이상이어야 합니다.",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                    message: "영어, 숫자, 특수문자를 모두 포함해야 합니다.",
                  },
                }}
                render={({ field }) => (
                  <>
                    <HiLockClosed className="opacity-70" size={20} />
                    <input
                      type="password"
                      className="grow"
                      placeholder="비밀번호"
                      {...field}
                    />
                  </>
                )}
              />
            </label>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="w-full">
            <label className="input input-bordered input-primary flex items-center gap-2 mb-1 rounded-full">
              <Controller
                name="confirmPassword"
                control={control}
                rules={{
                  validate: (value) =>
                    password && !value
                      ? "비밀번호 확인을 입력해 주세요."
                      : !password ||
                        value === password ||
                        "비밀번호가 일치하지 않습니다.",
                }}
                render={({ field }) => (
                  <>
                    <HiCheckCircle className="opacity-70" size={20} />
                    <input
                      type="password"
                      className="grow"
                      placeholder="비밀번호 확인"
                      {...field}
                    />
                  </>
                )}
              />
            </label>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div className="space-y-4 w-full">
            <button
              type="submit"
              className="btn btn-primary w-full text-base text-white rounded-full shadow-md shadow-slate-300"
            >
              변경하기
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="btn btn-secondary w-full text-base text-white rounded-full shadow-md shadow-slate-300"
            >
              뒤로가기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
