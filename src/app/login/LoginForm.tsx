'use client';

import { LoginFormData } from '@/types/LoginForm';
import { UserInfoType, useUserInfo } from '@/types/UserInfo';
import { useRouter } from 'next/navigation';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { HiMiniEnvelope, HiLockClosed } from 'react-icons/hi2';
import Cookies from 'js-cookie';
import fetchCall from '@/lib/axios'; // fetchCall 사용

export default function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: ''
    }
  });
  const { saveUser, checkLogin } = useUserInfo();
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormData> = async data => {
    const { email, password } = data;

    try {
      // fetchCall을 사용하여 로그인 요청 처리
      const result = await fetchCall<{
        accessToken: string;
        refreshToken: string;
        userInfo: UserInfoType;
      }>('api/user/login', 'post', { email, password });

      const { accessToken, refreshToken, userInfo } = result;

      // Cookies 설정
      Cookies.set('accessToken', accessToken, { sameSite: 'strict' });
      Cookies.set('refreshToken', refreshToken, { sameSite: 'strict' });

      // saveUser 함수 호출하여 사용자 정보 저장
      saveUser(userInfo);

      // 로그인 상태 확인 후 페이지 이동
      checkLogin();
      router.push('/');
    } catch (error) {
      console.log('로그인 실패', error);
    }
  };

  const handleResister = () => {
    router.push('/register');
  };

  return (
    <div className="card border-2 border-primary">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="card-body space-y-6">
          <div>
            <label className="input input-bordered input-primary flex items-center gap-2 mb-1">
              <Controller
                name="email"
                control={control}
                rules={{
                  required: '이메일을 입력해 주세요.',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: '올바른 이메일 형식을 입력해 주세요.'
                  }
                }}
                render={({ field }) => (
                  <>
                    <HiMiniEnvelope className="opacity-70" size={20} />
                    <input type="email" className="grow" placeholder="이메일" {...field} />
                  </>
                )}
              />
            </label>
            {errors.email && <span className="text-red-500 absolute">{errors.email.message}</span>}
          </div>
          <div>
            <label className="input input-bordered input-primary flex items-center gap-2 mb-1">
              <Controller
                name="password"
                control={control}
                rules={{
                  required: '비밀번호를 입력해 주세요.',
                  minLength: {
                    value: 8,
                    message: '비밀번호는 최소 8자 이상이어야 합니다.'
                  }
                }}
                render={({ field }) => (
                  <>
                    <HiLockClosed className="opacity-70" size={20} />
                    <input type="password" className="grow" placeholder="비밀번호" {...field} />
                  </>
                )}
              />
            </label>
            {errors.password && <span className="text-red-500 absolute">{errors.password.message}</span>}
          </div>
          <div className="card-actions">
            <button type="submit" className="btn btn-primary w-full mb-2 text-base text-white">
              로그인
            </button>
            <button type="button" onClick={handleResister} className="btn btn-primary w-full text-base text-white">
              회원가입
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
