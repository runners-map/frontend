"use client";
import MyPageButtons from "@/app/mypage/MypageButtons";
import { useQuery } from "@tanstack/react-query";

import axios from "axios";

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
        <div className="card-body">
          <span className="text-center font-bold text-xl">{data.nickname}</span>
          <span className="text-center">{data.email}</span>
          <span className="text-center">리마인드 알림 30분</span>
          <div className="card-actions mt-8 space-y-2">
            <MyPageButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
