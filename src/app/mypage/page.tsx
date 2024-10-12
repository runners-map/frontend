"use client";
import MyPageButtons from "@/app/mypage/MypageButtons";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { TbGenderFemale, TbGenderMale } from "react-icons/tb";

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
  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUserData,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">마이 페이지</h1>
      <div className="card border-2 border-primary">
        <div className="card-body items-center">
          <Image
            src="https://i.namu.wiki/i/zN7ASE4kyQNHO9jeAobgriDh2fqdbqiJVk5v7K-Tb_bCtOtem2v47wkFV4cQfYJYwbjr7bgoVqKVyHkp_Gy_6A.webp"
            width={100}
            height={100}
            alt="profile"
            className="rounded-full object-cover w-24 h-24 "
          />
          <div className="flex items-center">
            <span className="text-center font-bold text-xl">
              {data[0].nickname}
            </span>
            <TbGenderFemale size={20} />
          </div>
          <span className="text-center">{data[0].email}</span>
          <div className="card-actions mt-6 space-y-2">
            <MyPageButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
