import DeleteAccountForm from "./DeleteAccountForm";

export default function DeleteAccountPage() {
  return (
    <>
      <div className="bg-white shadow-md shadow-slate-300 rounded-b-3xl py-4 text-gray-500">
        <h1 className="text-xl font-semibold text-center">회원 탈퇴</h1>
      </div>
      <div className="px-4 mt-24">
        <DeleteAccountForm />
      </div>
    </>
  );
}
