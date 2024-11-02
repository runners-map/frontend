import RegisterForm from './RegisterForm';

export const metadata = {
  title: '회원가입'
};

export default function RegisterPage() {
  return (
    <>
      <div className="bg-white shadow-md shadow-slate-300 rounded-b-3xl py-4 text-gray-500">
        <h1 className="text-xl font-semibold text-center">회원가입</h1>
      </div>
      <RegisterForm />
    </>
  );
}
