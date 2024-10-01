'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { PostType } from '@/types/Post';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function PostCreateForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<PostType>();

  const router = useRouter();

  const searchRoute = () => {
    console.log('searchRoute');
    router.push('/');
  };

  const onSubmit = (data: PostType) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-col-2 gap-4 pt-10 mx-20">
      {/* 성별 */}
      <div className="flex justify-between">
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <select
                {...field}
                id="gender"
                className={`select select-bordered w-full  focus:border-transparent ${
                  errors.gender ? 'border-red-500 focus:outline-red-500' : ''
                }`}>
                <option value="" disabled>
                  성별을 골라주세요
                </option>
                <option value="all">전체</option>
                <option value="male">남자</option>
                <option value="female">여자</option>
              </select>
            </>
          )}
        />
      </div>

      {/* 페이스 */}
      <div className="flex">
        <Controller
          name="paceKm"
          control={control}
          defaultValue={0}
          rules={{ required: true, validate: value => value > 0 }}
          render={({ field }) => (
            <>
              <select
                {...field}
                id="pace"
                className={`select select-bordered w-full focus:border-transparent mr-2 ${
                  errors.paceKm ? 'border-red-500 focus:outline-red-500' : ''
                }`}>
                <option value={0} disabled>
                  페이스(KM)를 설정해주세요
                </option>
                <option value={1}>1KM</option>
                <option value={3}>3KM</option>
                <option value={5}>5KM</option>
                <option value={10}>10KM</option>
              </select>
            </>
          )}
        />
        <Controller
          name="paceTime"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <select
                {...field}
                id="pace"
                className={`select select-bordered w-full focus:border-transparent ${
                  errors.paceTime ? 'border-red-500 focus:outline-red-500' : ''
                }`}>
                <option value="" disabled>
                  페이스(시간)를 설정해주세요
                </option>
                <option value="1분~2분">1분~2분</option>
                <option value="3분~5분">3분~5분</option>
                <option value="5분~10분">5분~10분</option>
              </select>
            </>
          )}
        />
      </div>
      {/* 달릴거리 */}
      <div className="flex justify-between">
        <Controller
          name="distance"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <select
                {...field}
                id="distance"
                className={`select select-bordered w-full focus:border-transparent ${
                  errors.distance ? 'border-red-500 focus:outline-red-500' : ''
                }`}>
                <option value="" disabled>
                  달릴거리를 설정해주세요
                </option>
                <option value="1km~3km">1km~3km</option>
                <option value="3km~5km">3km~5km</option>
                <option value="5km~10km">5km~10km</option>
              </select>
            </>
          )}
        />
      </div>
      {/* 달릴 날짜 */}
      <div className="flex items-center justify-center">
        <Controller
          name="start_date"
          control={control}
          defaultValue={null}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <DatePicker
                selected={field.value}
                onChange={date => field.onChange(date)}
                placeholderText="출발일자를 선택하세요"
                dateFormat="yyyy/MM/dd"
                customInput={
                  <div
                    className={`flex items-center border rounded p-2 ${
                      errors.start_date ? 'border-red-500 focus:outline-red-500' : ''
                    }`}>
                    <FaRegCalendarAlt className="mr-2" />
                    <input
                      type="text"
                      value={field.value ? field.value.toLocaleDateString() : ''}
                      id="start_date"
                      readOnly
                      placeholder="출발일자"
                      className="outline-none"
                    />
                  </div>
                }
              />
            </>
          )}
        />
      </div>
      {/* 출발 시간 */}
      <div className="flex items-center justify-center">
        <Controller
          name="start_hour"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="number"
                id="time"
                min="0"
                max="23"
                className={`input input-bordered w-full focus:border-transparent mr-1 `}
                placeholder="출발시간"
              />
              <p className="mr-2">시</p>
            </>
          )}
        />
        <Controller
          name="start_min"
          control={control}
          defaultValue={0}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="number"
                id="time"
                min="0"
                max="59"
                className={`input input-bordered w-full focus:border-transparent mr-1 `}
              />
              <p>분</p>
            </>
          )}
        />
      </div>

      <button type="button" onClick={searchRoute} className="btn btn-primary">
        경로 설정하기
      </button>
      {/* 제목 */}
      <div className="flex justify-center">
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <input
                {...field}
                type="text"
                className={`input input-bordered focus:border-transparent ${
                  errors.title ? 'border-red-500 focus:outline-red-500' : ''
                }`}
                placeholder="모집글 제목"
              />
            </>
          )}
        />
      </div>
      {/* 내용 */}
      <div>
        <Controller
          name="content"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <textarea
                {...field}
                id="content"
                placeholder="내용을 입력하세요"
                className={`w-full h-32 resize-none p-2 border border-gray-300 rounded-md ${
                  errors.content ? 'border-red-500 focus:outline-red-500' : ''
                }`}
              />
            </>
          )}
        />
      </div>
      <button type="submit" className="btn btn-primary " disabled={isSubmitting}>
        {isSubmitting ? '제출 중...' : '제출'}
      </button>
    </form>
  );
}
