"use client";
import React, { useState } from "react";
import {
  useForm,
  Controller,
  SubmitHandler,
  ControllerRenderProps,
} from "react-hook-form";
import { HiMiniUser, HiLockClosed, HiCheckCircle } from "react-icons/hi2";
import Cookies from "js-cookie";
import Image from "next/image";
import { SettingFormData } from "@/types/SettingForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/types/UserInfo";

export default function SettingForm() {
  const { user, updateUser } = useUserInfo();
  const [preview, setPreview] = useState<string | null>(null);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SettingFormData>({
    defaultValues: {
      nickname: user?.nickname || "",
      password: "",
      confirmPassword: "",
      profileImage: "",
    },
  });
  const password = watch("password");

  const uploadProfileImage = async (file: File) => {
    try {
      const accessToken = Cookies.get("accessToken");
      const formData = new FormData();
      formData.append("file", file); // 파일 추가

      formData.forEach((value, key) => {
        console.log(`FormData key: ${key}, value:`, value); // 파일 정보 출력
      });
      // 프로필 사진 업로드 API 요청
      const response = await axios.put("/api/user/profile-image", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Bearer 토큰 추가
        },
      });

      const profileImageUrl = response.data.profileImageUrl;
      console.log("프로필 사진 업로드 성공:", profileImageUrl);

      updateUser({ profileImageUrl });
    } catch (error) {
      console.error("프로필 사진 업로드 실패:", error.response?.data || error);
    }
  };

  const updateUserInfo: SubmitHandler<SettingFormData> = async (data) => {
    try {
      const accessToken = Cookies.get("accessToken");

      // 나머지 정보 업데이트 API 요청
      const response = await axios.put(
        "/api/user/my-page",
        {
          newNickname: data.nickname,
          newPassword: data.password,
          newConfirmPassword: data.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Bearer 토큰 추가
          },
        }
      );

      updateUser({ nickname: data.nickname });
      router.push("/mypage");

      console.log("정보 업데이트 성공:", response.data);
    } catch (error) {
      console.error("정보 업데이트 실패:", error.response?.data || error);
    }
  };

  const onSubmit: SubmitHandler<SettingFormData> = async (data) => {
    // 프로필 사진이 있으면 먼저 업로드
    if (data.profileImage) {
      await uploadProfileImage(data.profileImage);
    }
    // 나머지 정보 업데이트
    await updateUserInfo(data);
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
    <>
      <div className="card rounded-2xl shadow-xl bg-white mt-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card-body space-y-6">
            <div className="flex flex-col items-center gap-y-8">
              <div className="w-36 h-36 relative">
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
                    className="file-input file-input-bordered file-input-primary w-full max-w-xs rounded-full"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                )}
              />
            </div>
            <div>
              <label className="input input-bordered input-primary flex items-center gap-2 mb-1 rounded-full">
                <Controller
                  name="nickname"
                  control={control}
                  rules={{
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
                      message:
                        "비밀번호는 영어, 숫자, 특수문자를 각각 하나 이상 포함해야 합니다.",
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
                <span className="text-red-500 absolute">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>
            <div className="card-actions space-y-4">
              <button
                type="submit"
                className="btn btn-primary w-full text-base text-white rounded-full"
              >
                변경하기
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-secondary w-full text-base text-white rounded-full"
              >
                뒤로가기
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
