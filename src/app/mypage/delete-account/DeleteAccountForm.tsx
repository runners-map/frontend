"use client";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import {
  HiMiniUser,
  HiLockClosed,
  HiCheckCircle,
  HiOutlineCog6Tooth,
  HiOutlineUserMinus,
} from "react-icons/hi2";
interface DeleteAccountFormData {
  password: string;
}

export default function DeleteAccountForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteAccountFormData>({
    mode: "onChange", // onChange로 유효성 검사 트리거 설정
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const router = useRouter();

  const handleDeleteAccount = async (data: DeleteAccountFormData) => {
    setPasswordError(null); // 이전 오류 메시지 초기화

    // 특정 비밀번호 확인 - 여기서만 검사
    if (data.password !== "qwer1234!") {
      setPasswordError("비밀번호가 틀렸습니다."); // 오류 메시지 설정
      return; // 서버 요청 방지
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-md shadow-slate-300 space-y-4 items-center py-20">
      <h2 className="text-base"> 회원 탈퇴를 위해 비밀번호를 입력하세요.</h2>
      <form
        onSubmit={handleSubmit(handleDeleteAccount)}
        className="flex-col flex w-full px-4"
      >
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
            <span className="text-red-500 absolute">
              {errors.password.message}
            </span>
          )}
          {passwordError && (
            <span className="text-red-500 absolute">{passwordError}</span>
          )}
        </div>

        <button
          type="submit"
          className="btn btn-secondary text-base text-white w-full rounded-full mt-8 shadow-md shadow-slate-300"
        >
          <HiOutlineUserMinus size={25} />
          회원 탈퇴
        </button>
        <button
          type="submit"
          className="btn btn-primary text-base text-white w-full rounded-full mt-3 shadow-md shadow-slate-300"
        >
          뒤로 가기
        </button>
      </form>
    </div>
  );
}
