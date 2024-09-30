import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "회원가입",
};

export default function RegisterPage() {
  return (
    <>
      <h1>
        Runners&apos; Map에 오신걸 환영합니다.
        <br />
        아래 정보를 기입해 주세요.
      </h1>
      <RegisterForm />
    </>
  );
}
