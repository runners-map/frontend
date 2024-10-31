import LoginForm from "@/app/login/LoginForm";

export const metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <>
      <div className="bg-white shadow-md shadow-slate-300 rounded-b-3xl py-4 text-gray-500">
        <h1 className="text-xl font-semibold text-center">로그인</h1>
      </div>
      <div className="mx-4 mt-20">
        <LoginForm />
      </div>
    </>
  );
}
