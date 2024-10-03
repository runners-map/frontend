"use client";
import React from "react";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { HiUser } from "react-icons/hi";
import { PiGenderIntersexBold } from "react-icons/pi";
import { RegisterFormData } from "@/types/ResisterForm";

const RegisterForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      nickname: "",
      gender: "",
    },
  });

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
                <HiUser className="opacity-70" />
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
        <label className="flex">
          <PiGenderIntersexBold className="opacity-70" />
          <span className="opacity-70">성별</span>
        </label>
        <div className="flex space-x-4">
          <Controller
            name="gender"
            control={control}
            rules={{ required: "성별을 선택해 주세요." }}
            render={({ field }) => (
              <>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    className="radio radio-primary"
                    value="M"
                    checked={field.value === "M"}
                    onChange={() => field.onChange("M")}
                  />
                  <span className="ml-2">남성</span>
                </label>
                <label className="label cursor-pointer">
                  <input
                    type="radio"
                    className="radio radio-primary"
                    value="F"
                    checked={field.value === "F"}
                    onChange={() => field.onChange("F")}
                  />
                  <span className="ml-2">여성</span>
                </label>
              </>
            )}
          />
        </div>
        {errors.gender && (
          <span className="text-red-500">{errors.gender.message}</span>
        )}
      </div>

      <button type="submit" className="btn btn-outline btn-primary">
        가입하기
      </button>
    </form>
  );
};

export default RegisterForm;
