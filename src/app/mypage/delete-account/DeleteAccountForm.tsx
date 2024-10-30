"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import Cookies from "js-cookie";
import { useUserInfo } from "@/types/UserInfo";

interface DeleteAccountFormData {
  password: string;
}

export default function DeleteAccountForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeleteAccountFormData>();
  const router = useRouter();
  const { logout } = useUserInfo();

  const handleDeleteAccount = async (data: DeleteAccountFormData) => {
    try {
      await axios.delete("/api/user/my-page", {
        data: { password: data.password },
        headers: {
          Authorization: `Bearer ${Cookies.get("accessToken")}`,
        },
      });
      logout();
      router.push("/login");
    } catch (error) {
      console.error("계정 삭제 실패:", error);
    }
  };

  return (
    <div className="delete-account-page">
      <h1>계정 탈퇴</h1>
      <p>계정 탈퇴를 위해 비밀번호를 입력하세요.</p>
      <form onSubmit={handleSubmit(handleDeleteAccount)}>
        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: "비밀번호는 필수 입력 항목입니다.",
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
            <input
              {...field}
              type="password"
              placeholder="비밀번호"
              className="password-input"
            />
          )}
        />
        {errors.password && (
          <span className="text-red-500 absolute">
            {errors.password?.message}
          </span>
        )}
        <button type="submit" className="btn btn-danger">
          계정 탈퇴
        </button>
      </form>
    </div>
  );
}
