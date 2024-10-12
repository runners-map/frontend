import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "회원가입",
};

export default function RegisterPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">회원 가입</h1>
      <RegisterForm />
    </div>
  );
}
