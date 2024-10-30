"use client";

import SettingForm from "./SettingForm";

export default function SettingPage() {
  return (
    <>
      <div className="bg-white shadow-md shadow-slate-300 rounded-b-3xl py-4 text-gray-500">
        <h1 className="text-xl font-semibold text-center">내 정보 변경</h1>
      </div>
      <div className="px-4">
        <SettingForm />
      </div>
    </>
  );
}
