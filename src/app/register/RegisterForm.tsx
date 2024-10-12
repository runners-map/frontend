"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import {
  HiMiniUser,
  HiMiniEnvelope,
  HiLockClosed,
  HiCheckCircle,
} from "react-icons/hi2";
import { PiGenderIntersexBold } from "react-icons/pi";
import { RegisterFormData } from "@/types/ResisterForm";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      nickname: "",
      gender: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    console.log(data);
  };
  const password = watch("password");
  return (
    <>
      <div className="card border-2 border-primary">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body space-y-6">
            <div>
              <label className="input input-bordered input-primary flex items-center gap-2">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "이메일을 입력해 주세요.",
                    pattern: {
                      value:
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "올바른 이메일 형식을 입력해 주세요.",
                    },
                  }}
                  render={({ field }) => (
                    <>
                      <HiMiniEnvelope className="opacity-70" size={20} />
                      <input
                        type="email"
                        className="grow"
                        placeholder="이메일"
                        {...field}
                      />
                    </>
                  )}
                />
              </label>
              {errors.email && (
                <div role="alert" className="alert alert-error">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>
            <div>
              <label className="input input-bordered input-primary flex items-center gap-2">
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
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div>
              <label className="input input-bordered input-primary flex items-center gap-2">
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
                <span className="text-red-500">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div>
              <label className="input input-bordered input-primary flex items-center gap-2">
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
            <div>
              <div className="flex items-center border border-primary rounded-lg px-4 h-12">
                <PiGenderIntersexBold className="opacity-70" size={20} />
                {/* <span className="opacity-50">성별</span> */}
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: "성별을 선택해 주세요." }}
                  render={({ field }) => (
                    <>
                      <div className="form-control flex-grow items-center">
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            className="radio radio-primary"
                            value="M"
                            checked={field.value === "M"}
                            onChange={() => field.onChange("M")}
                          />
                          <span className="label-text ml-2">남성</span>
                        </label>
                      </div>
                      <div className="form-control flex-grow items-center">
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            className="radio radio-primary"
                            value="F"
                            checked={field.value === "F"}
                            onChange={() => field.onChange("F")}
                          />
                          <span className="label-text ml-2">여성</span>
                        </label>
                      </div>
                    </>
                  )}
                />
              </div>
              {errors.gender && (
                <span className="text-red-500">{errors.gender.message}</span>
              )}
            </div>

            <div className="card-actions">
              <button
                type="submit"
                className="btn btn-outline btn-primary w-full mt-4"
              >
                가입하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterForm;
