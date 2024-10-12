"use client";
import React, { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  ControllerRenderProps,
} from "react-hook-form";
import { HiMiniUser, HiLockClosed, HiCheckCircle } from "react-icons/hi2";

import Image from "next/image";
import { SettingFormData } from "@/types/SettingForm";

export default function SettingForm() {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SettingFormData>({
    defaultValues: {
      nickname: "",
      password: "",
      confirmPassword: "",
      profileImage: undefined,
    },
  });

  const onSubmit: SubmitHandler<SettingFormData> = async (data) => {
    console.log(data);
  };

  const password = watch("password");

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
    <>
      <div className="card border-2 border-primary">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body space-y-6">
            <div className="flex flex-col items-center space-y-6">
              <Image
                src={
                  preview
                    ? preview
                    : "https://i.namu.wiki/i/zN7ASE4kyQNHO9jeAobgriDh2fqdbqiJVk5v7K-Tb_bCtOtem2v47wkFV4cQfYJYwbjr7bgoVqKVyHkp_Gy_6A.webp"
                }
                width={100}
                height={100}
                alt="profile"
                className="rounded-full object-cover w-24 h-24 "
              />
              <Controller
                name="profileImage"
                control={control}
                render={({ field }) => (
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                )}
              />
            </div>
            <div>
              <label className="input input-bordered input-primary flex items-center gap-2 mb-1">
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
                <span className="text-red-500 absolute">
                  {errors.nickname.message}
                </span>
              )}
            </div>
            <div>
              <label className="input input-bordered input-primary flex items-center gap-2 mb-1">
                <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "비밀번호를 입력해 주세요.",
                    minLength: {
                      value: 8,
                      message: "비밀번호는 최소 8자 이상이어야 합니다.",
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
                <span className="text-red-500 absolute">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div>
              <label className="input input-bordered input-primary flex items-center gap-2 mb-1">
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: "비밀번호 확인을 입력해 주세요.",
                    validate: (value) =>
                      value === password || "비밀번호가 일치하지 않습니다.",
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
                <span className="text-red-500 absolute">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="card-actions">
              <button
                type="submit"
                className="btn btn-primary w-full text-base text-white"
              >
                변경하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
