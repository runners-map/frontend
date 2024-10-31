"use client";
import MyPageButtons from "@/app/mypage/MypageButtons";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";
import { HiMiniUser } from "react-icons/hi2";

export default function MyPagePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/users", {
          params: { userId: 2 },
        });
        setUser(response.data[0]);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div className="bg-white shadow-md shadow-slate-300 rounded-b-3xl py-4 text-gray-500">
        <h1 className="text-xl font-semibold text-center">마이 페이지</h1>
      </div>
      <div className="px-4">
        <div className="bg-white shadow-md shadow-slate-300 rounded-2xl flex flex-col items-center py-10 gap-3 mt-8">
          <div className="w-36 h-36 rounded-full relative shadow-md shadow-slate-300">
            {user && user.profileImageUrl !== "" ? (
              <Image
                src={user.profileImageUrl}
                fill
                alt="profile"
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-400 text-gray-300 rounded-full">
                <HiMiniUser className="w-5/6 h-5/6" />
              </div>
            )}
          </div>
          <div className="flex items-center justify-center">
            <span className="text-center font-bold text-2xl">
              {user?.nickname}
            </span>
            {user?.gender === "M" ? (
              <TbGenderMale size={25} />
            ) : (
              <TbGenderFemale size={25} />
            )}
          </div>
          <span className="text-center text-xl">{user?.email}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md shadow-slate-300 space-y-4 mt-8">
          <MyPageButtons />
        </div>
      </div>
    </>
  );
}
