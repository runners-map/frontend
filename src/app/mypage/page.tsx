"use client";
import MyPageButtons from "@/app/mypage/MypageButtons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { TbGenderFemale } from "react-icons/tb";

const fetchUserData = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    params: {
      userId: 1,
    },
  });
  console.log(response.data);
  return response.data;
};

export default function MyPagePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserData,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="bg-white shadow-md shadow-slate-300 rounded-b-3xl py-4 text-gray-500">
        <h1 className="text-xl font-semibold text-center">마이 페이지</h1>
      </div>
      <div className="px-4">
        <div className="bg-white shadow-md shadow-slate-300 rounded-2xl flex flex-col items-center py-10 gap-3 mt-8">
          <Image
            src="https://i.namu.wiki/i/zN7ASE4kyQNHO9jeAobgriDh2fqdbqiJVk5v7K-Tb_bCtOtem2v47wkFV4cQfYJYwbjr7bgoVqKVyHkp_Gy_6A.webp"
            width={100}
            height={100}
            alt="profile"
            className="rounded-full object-cover w-36 h-36 "
          />
          <div className="flex items-center">
            <span className="text-center font-bold text-2xl">
              {data[0].nickname}
            </span>
            <TbGenderFemale size={20} />
          </div>
          <span className="text-center text-xl">{data[0].email}</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-md shadow-slate-300 space-y-4 mt-8">
          <MyPageButtons />
        </div>
      </div>
    </>
  );
}
