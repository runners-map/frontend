'use client';
import React from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { HiMiniUser, HiMiniEnvelope, HiLockClosed, HiCheckCircle } from 'react-icons/hi2';
import { PiGenderIntersexBold } from 'react-icons/pi';
import { RegisterFormData } from '@/types/ResisterForm';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      nickname: '',
      gender: ''
    }
  });
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterFormData> = async data => {
    try {
      const { email, password, confirmPassword, nickname, gender } = data;

      const res = await axios.post(`api/user/sign-up`, {
        email,
        password,
        confirmPassword,
        nickname,
        gender
      });

      console.log('회원가입 성공', res);
      router.push('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  const password = watch('password');
  return (
    <>
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
            <div>
              <label className="input input-bordered input-primary flex items-center gap-2 mb-1">
                <Controller
                  name="confirmPassword"
                  control={control}
                  rules={{
                    required: '비밀번호 확인을 입력해 주세요.',
                    validate: value => value === password || '비밀번호가 일치하지 않습니다.'
                  }}
                  render={({ field }) => (
                    <>
                      <HiCheckCircle className="opacity-70" size={20} />
                      <input type="password" className="grow" placeholder="비밀번호 확인" {...field} />
                    </>
                  )}
                />
              </label>
              {errors.confirmPassword && (
                <span className="text-red-500 absolute">{errors.confirmPassword.message}</span>
              )}
            </div>
            <div>
              <label className="input input-bordered input-primary flex items-center gap-2 mb-1">
                <Controller
                  name="nickname"
                  control={control}
                  rules={{
                    required: '닉네임을 입력해 주세요.',
                    maxLength: {
                      value: 10,
                      message: '닉네임은 최대 10자까지 가능합니다.'
                    }
                  }}
                  render={({ field }) => (
                    <>
                      <HiMiniUser className="opacity-70" size={20} />
                      <input type="text" className="grow" placeholder="닉네임" {...field} />
                    </>
                  )}
                />
              </label>
              {errors.nickname && <span className="text-red-500 absolute">{errors.nickname.message}</span>}
            </div>
            <div>
              <div className="flex items-center border border-primary rounded-lg px-4 h-12 mb-1 gap-2">
                <PiGenderIntersexBold className="opacity-70" size={20} />
                <span className="opacity-50">성별</span>
                <Controller
                  name="gender"
                  control={control}
                  rules={{ required: '성별을 선택해 주세요.' }}
                  render={({ field }) => (
                    <>
                      <div className="form-control flex-grow items-center">
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            className="radio radio-primary"
                            value="M"
                            checked={field.value === 'M'}
                            onChange={() => field.onChange('M')}
                          />
                          <span className="label-text ml-2">남성</span>
                        </label>
                      </div>
                      <div className="form-control flex-grow items-center">
                        <label className="label cursor-pointer">
                          <input
                            type="radio"
                            name="gender"
                            className="radio radio-primary"
                            value="F"
                            checked={field.value === 'F'}
                            onChange={() => field.onChange('F')}
                          />
                          <span className="label-text ml-2">여성</span>
                        </label>
                      </div>
                    </>
                  )}
                />
              </div>
              {errors.gender && <span className="text-red-500 absolute">{errors.gender.message}</span>}
            </div>

            <div className="card-actions">
              <button type="submit" className="btn btn-primary w-full text-base text-white">
                가입하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
