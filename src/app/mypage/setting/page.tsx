"use client";

import SettingForm from "./SettingForm";

export default function SettingPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">내 정보 변경</h1>
      <SettingForm />
    </div>
  );
}
