'use client';

export default function SocialLoginButtons() {
  const handleGoogle = () => {
    console.log('Google 로그인');
  };

  const handleKakao = () => {
    console.log('Kakao 로그인');
  };

  return (
    <div className="flex flex-col">
      <button onClick={handleGoogle} className="btn btn-primary my-6">
        Google로 로그인
      </button>
      <button onClick={handleKakao} className="btn btn-primary">
        Kakao로 로그인
      </button>
    </div>
  );
}
