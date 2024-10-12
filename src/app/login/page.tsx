import LoginForm from "@/app/login/LoginForm";

export const metadata = {
  title: "로그인",
};

export default function LoginPage() {
  return (
    <>
      <div className="px-8 py-36">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Runner&apos;s Map
        </h1>
        <h2 className="text-2xl font-bold mb-8 text-center">로그인</h2>
        <LoginForm />
        <div className="text-sm position: absolute right-0 bottom-0">
          E와I들
        </div>
      </div>
    </>
  );
}
