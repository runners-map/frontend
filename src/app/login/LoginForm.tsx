"use client";

import { LoginFormData } from "@/types/LoginForm";
import { useRouter } from "next/navigation";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { HiMiniEnvelope, HiLockClosed } from "react-icons/hi2";

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: "onChange", // onChange 이벤트로 유효성 검사 설정
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    router.push("/");
  };

  const handleResister = () => {
    router.push("/register");
  };

  return (
    <div className="shadow-md shadow-slate-300 rounded-2xl px-4 py-20 bg-white">
      <h2 className="text-3xl font-bold mb-8 text-center text-primary">
        Runner&apos;s Map
      </h2>
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
                      autoComplete="off"
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
                      autoComplete="off"
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
          <div className="card-actions pt-8">
            <button
              type="submit"
              className="btn btn-primary w-full mb-2 text-base text-white rounded-full shadow-md shadow-slate-300"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={handleResister}
              className="btn btn-primary w-full text-base text-white rounded-full  shadow-md shadow-slate-300"
            >
              회원가입
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
