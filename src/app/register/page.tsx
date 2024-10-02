<<<<<<< Updated upstream
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
=======
// 서버 컴포넌트
import RegisterForm from "./RegisterForm";

export const metadata = {
  title: "회원가입 페이지",
  description: "새로운 사용자를 위한 회원가입 페이지입니다.",
};

const RegisterPage = () => {
  return (
    <div>
      <h1>Runners&apos; Map에 오신걸 환영합니다.</h1>
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
>>>>>>> Stashed changes
