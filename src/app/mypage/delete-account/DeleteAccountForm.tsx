"use client";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { HiLockClosed, HiOutlineUserMinus } from "react-icons/hi2";
import Cookies from "js-cookie";
import axios from "axios";

interface DeleteAccountFormData {
  password: string;
}

export default function DeleteAccountForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteAccountFormData>({
    mode: "onChange",
  });

  const router = useRouter();

  const handleDeleteAccount = async (data: DeleteAccountFormData) => {
    try {
      const accessToken = Cookies.get("accessToken");

      const response = await axios.delete("/api/user/my-page", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {
          password: data.password,
        },
      });

      console.log("Account deletion successful:", response.data);
      // 성공 시 로그아웃이나 리다이렉트 로직 추가
      router.push("/login");
    } catch (error) {
      console.error("Account deletion failed:", error);
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
        </div>

        <button
          type="submit"
          className="btn btn-secondary text-base text-white w-full rounded-full mt-8 shadow-md shadow-slate-300"
        >
          <HiOutlineUserMinus size={25} />
          회원 탈퇴
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-primary text-base text-white w-full rounded-full mt-3 shadow-md shadow-slate-300"
        >
          뒤로 가기
        </button>
      </form>
    </div>
  );
}
