# Project Name

### [러닝 메이트 매칭 앱 프로젝트](https://github.com/runners-map)

`위치 기반 러닝 메이트 매칭 (Runner’s Map)`
- 최근 러닝의 인기가 증가하면서, 함께 달리는 러닝 크루 활동이 활발해지고 있습니다.
- 하지만 기존의 러닝 크루는 일정한 참여를 요구하거나, 구성원 간의 스케줄을 맞추는 것이 어렵다는 부담감이 있습니다.
- 정기적인 참여나 스케줄을 맞출 필요 없이, 사용자는 자신의 일정에 맞춰 원할 때 러닝 메이트를 찾아 일회성으로 활동할 수 있습니다.
- 현재 위치를 기반으로 가까운 러닝 메이트들을 찾을 수 있어, 새로운 사람들과 편리하게 만날 수 있습니다.
- 개인 맞춤형 조건을 설정해 자신에게 맞는 러닝 메이트를 찾을 수 있습니다.
- 달릴 경로를 시각적으로 확인할 수 있어, 참여자들은 러닝 경로를 미리 파악하고 자신의 달리기 스타일에 맞는 경로를 선택할 수 있습니다.
- 실시간 채팅 기능을 통해 러닝 메이트들과 편리하게 소통하고, 러닝 일정 및 계획을 조율할 수 있습니다.
- 사용자가 직접 리마인드 알림 시간을 설정할 수 있어, 러닝 일정을 놓치지 않도록 도와줍니다.
- 러닝 종료 후, 러닝 메이트 그룹장이 올린 인증샷이 포함된 리뷰에 같이 달렸던 러닝 메이트들이 댓글을 달 수 있어, 경험 공유와 피드백을 할 수 있습니다.

## Installation

`npm install`을 통해 설치를 진행하고 `npm run dev`을 하면 실행이 됩니다, 초반에 mock데이터로 작업을 수행할때는, `db.json`파일이 있는데 같이 실행이 되게 설정을 해놨습니다. `json-server --watch ./db.json --port 3001`

## Project Doc

### Built With

| package name     | version |
| ---------------- | ------- |
| React            | 18  |
| typescript       | 5   |
| tailwindcss     | 3.4.1 |
| daisyui        | 4.12.10 |
| js-cookie | 3.0.5 |
| next | 14.2.13 |
| react-confetti | 6.1.0 |
| react-hook-form | 7.53.0 |
| react-modal | 3.16.1 |
| react-icons | 5.3.0 |
| react-datepicker | 7.4.0 |
| react-calendar | 5.0.0 |
| @tanstack/react-query | 5.59.8 |
| axios            | 1.7.7   |
| chart.js         | 4.4.4   |
| react-chartjs-2  | 5.2.0   |
| zustand             | 5.0.0  |
| react-dom        | 18  |
| react-icons      | 5.3.0   |
| react-toastify | 10.0.5  |

### Pages

1. `src/app/chart`: 기록조회 페이지
2. `src/app/login`: 로그인 페이지
3. `src/app/register`: 회원가입 페이지
4. `src/app/map-components`: 지도에 필요한 컴포넌트 폴더
5. `src/app/mypage`: 마이 페이지
6. `src/app/mypage/setting`: 개인정보 변경 페이지
7. `src/app/post-list`: 모집글 리스트 조회 페이지
8. `src/app/post-list/post/create`: 모집글 작성 페이지
9. `src/app/post-list/post/[id]/comment`: 모집글 댓글 작성 페이지 
10. `src/app/post-list/post/[id]/edit`: 모집글 수정 페이지 
11. `src/app/post-list/post/[id]/photo-upload`: 모집글 인증사진 업로드 페이지
12. `src/app/post-list/post/[id]/post-info`: 모집글 상세정보 페이지
13. `src/app/ranking`: 러닝 기록 랭킹 페이지
14. `src/app`: 홈 페이지(지도)
17. `src/lib/axios.ts`: axios 인터셉터 파일
18. `src/types`: 모든 변수 타입 정의 파일(목데이터로 할때 + 서버연동할때)

### Configurations

### `src/app/layout.tsx`: 모든 페이지 공통 레이아웃 화면(경로 설정과 경로 수정 페이지 제외)

```tsx
'use client';
import './globals.css';
import Navigation from '@/components/Navigation';
import { usePathname } from 'next/navigation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const noNavPaths = ['/login', '/register', '/mypage/setting', '/404'];
  const hideNav = noNavPaths.includes(pathname) || pathname.startsWith('/post-list/');

  return (
    <html lang="ko" className="bg-gray-200">
      <body className="max-w-md mx-auto min-h-screen relative bg-gray-50">
        <QueryClientProvider client={queryClient}>
          {children}
          {!hideNav && <Navigation />}
        </QueryClientProvider>
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
          draggable
        />
      </body>
    </html>
  );
}
```
### `src/components/Header.tsx`: 뒤로가기 헤더 컴포넌트
``` tsx
'use client';

import { useRouter } from 'next/navigation';
import { IoIosArrowBack } from 'react-icons/io';

export default function Header() {
  const router = useRouter();

  return (
    <header>
      <button
        onClick={() => router.back()}
        className="absolute left-0 rounded-full w-12 h-12 active:bg-gray-500 transition-colors duration-150 ease-in-out z-50">
        <IoIosArrowBack size={35} color="black" />
      </button>
    </header>
  );
}
```
### `src/components/Navigation.tsx`: 하위 네비게이션 컴포넌트
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HiMap,
  HiChatBubbleOvalLeftEllipsis,
  HiChartBar,
  HiMiniTrophy,
  HiMiniUser,
} from "react-icons/hi2";

export default function Navigation() {
  const currentPath = usePathname();
  return (
    <nav className="btm-nav max-w-md mx-auto rounded-t-3xl shadow-2xl shadow-black">
      <Link
        href={"/"}
        className={`${currentPath === "/" ? "text-primary" : "text-gray-400"}`}
      >
        <HiMap size={25} />
      </Link>
      <Link
        href={"/post-list"}
        className={`${
          currentPath === "/post-list" ? "text-primary" : "text-gray-400"
        }`}
      >
        <HiChatBubbleOvalLeftEllipsis size={25} />
      </Link>
      <Link
        href={"/ranking"}
        className={`${
          currentPath === "/ranking" ? "text-primary" : "text-gray-400"
        }`}
      >
        <HiMiniTrophy size={25} />
      </Link>
      <Link
        href={"/chart"}
        className={`${
          currentPath === "/chart" ? "text-primary" : "text-gray-400"
        }`}
      >
        <HiChartBar size={25} />
      </Link>
      <Link
        href={"/mypage"}
        className={`${
          currentPath === "/mypage" ? "text-primary" : "text-gray-400"
        }`}
      >
        <HiMiniUser size={25} />
      </Link>
    </nav>
  );
}
```


## Information

- [프로젝트 개발일지](https://lapis-shrimp-bc5.notion.site/Runner-s-Map-E-I-2-10b9afba92f980c6beafeaa910a01b4e)


## Author

-   [박찬정](https://github.com/Chanjeong)
-   [서준범](https://github.com/Teddy-Suh)
