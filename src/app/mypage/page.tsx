import MyPageButtons from "@/app/mypage/MypageButtons";

export default function MyPagePage() {
  return (
    <div className="p-8">
      <h1>마이 페이지</h1>
      <div className="card border-2 border-primary">
        <div className="card-body">
          <span>안녕하세요 </span>
          <div className="card-actions">
            <MyPageButtons />
          </div>
        </div>
      </div>
    </div>
  );
}
