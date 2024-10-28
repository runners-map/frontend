"use client";
import { UserInfoType, useUserInfo } from "@/types/UserInfo";
import { LoginFormData } from "@/types/LoginForm";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { HiMiniEnvelope, HiLockClosed } from "react-icons/hi2";

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const { saveUser, user } = useUserInfo();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    const { email, password } = data;

    try {
      const result = await axios.post("/api/user/login", {
        email: email,
        password: password,
      });

      const { accessToken, refreshToken } = result.data;

      Cookies.set("accessToken", accessToken, {
        sameSite: "strict",
      });
      Cookies.set("refreshToken", refreshToken, {
        sameSite: "strict",
      });

      saveUser({
        userId: result.data.userId,
        nickname: result.data.nickname,
        email: result.data.email,
        gender: result.data.gender,
        lastPosition: result.data.lastPosition || "", // null 값 처리
        profileImageUrl: result.data.profileImageUrl || "", // null 값 처리
      });

      console.log("Zustand에 저장된 유저 정보:", user);
      const storedAccessToken = Cookies.get("accessToken");
      const storedRefreshToken = Cookies.get("refreshToken");

      console.log("저장된 accessToken:", storedAccessToken);
      console.log("저장된 refreshToken:", storedRefreshToken);

      router.push("/");
    } catch (error) {
      console.log("로그인 실패", error);
    }
  };
  const handleResister = () => {
    router.push("/register");
  };

  return (
    <div className="shadow-md shadow-slate-300 rounded-2xl px-4 py-20">
      <h2 className="text-3xl font-bold mb-8 text-center">Runner&apos;s Map</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-8">
          <div>
            <label className="input input-bordered input-primary flex items-center gap-2 mb-1 rounded-full">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: "이메일을 입력해 주세요.",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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
              <span className="text-red-500 absolute">
                {errors.email.message}
              </span>
            )}
          </div>
          <div>
            <label className="input input-bordered input-primary flex items-center gap-2 mb-1 rounded-full">
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
          <div className="flex flex-col gap-y-2">
            <button
              type="submit"
              className="btn btn-primary w-full mb-2 text-base text-white rounded-full"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={handleResister}
              className="btn btn-primary w-full text-base text-white rounded-full"
            >
              회원가입
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
