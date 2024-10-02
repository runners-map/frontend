'use client';

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Post } from '@/types/Post';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function PostCreateForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<Post>();

  const router = useRouter();

  const searchRoute = () => {
    console.log('searchRoute');
    router.push('/');
  };

  const onSubmit = (data: Post) => {
    const { startDateTime } = data;
    // 현지 시간대로 변환하여 ISO 형식으로 저장
    const formattedDateTime = startDateTime
      ? new Date(startDateTime.getTime() - startDateTime.getTimezoneOffset() * 60000).toISOString()
      : null;

    const finalData = {
      ...data,
      startDateTime: formattedDateTime
    };

    console.log(finalData);
    // 제출 로직 추가
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
            <select
              {...field}
              id="gender"
              className={`select select-bordered w-full focus:border-transparent ${
                errors.gender ? 'border-red-500 focus:outline-red-500' : ''
              }`}>
              <option value="" disabled>
                성별을 골라주세요
              </option>
              <option value="all">All</option>
              <option value="male">M</option>
              <option value="female">F</option>
            </select>
          )}
        />
      </div>
      <div>
        <Controller
          name="limitMemberCount"
          control={control}
          defaultValue={0}
          rules={{ required: true, validate: value => value > 0 }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className={`input input-bordered w-full ${
                errors.limitMemberCount ? 'border-red-500 focus:outline-red-500' : ''
              }`}
              min={1}
              max={10}
              value={field.value === 0 ? '' : field.value}
              onChange={e => field.onChange(Number(e.target.value))}
              placeholder="제한인원 (1~10명)"
            />
          )}
        />
      </div>

      {/* 달릴 날짜 */}
      <div className="flex flex-col items-center justify-center">
        <Controller
          name="startDateTime"
          control={control}
          defaultValue={null}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <DatePicker
                selected={field.value}
                onChange={date => {
                  if (date) {
                    // 날짜가 null이 아닐 때만 업데이트
                    const hours = field.value ? field.value.getHours() : 0;
                    const minutes = field.value ? field.value.getMinutes() : 0;
                    field.onChange(new Date(date.setHours(hours, minutes)));
                  } else {
                    field.onChange(null); // 날짜가 null인 경우
                  }
                }}
                placeholderText="출발일자를 선택하세요"
                dateFormat="yyyy/MM/dd"
                customInput={
                  <div
                    className={`flex items-center border rounded p-2 ${
                      errors.startDateTime ? 'border-red-500 focus:outline-red-500' : ''
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
              <div className="flex w-full mt-4">
                <input
                  type="number"
                  min="0"
                  max="23"
                  placeholder="출발시간"
                  className={`input input-bordered w-full mr-2 ${
                    errors.startDateTime ? 'border-red-500 focus:outline-red-500' : ''
                  }`}
                  onChange={e => {
                    const hours = Number(e.target.value);
                    const minutes = field.value ? field.value.getMinutes() : 0;
                    const newDate = field.value ? new Date(field.value) : new Date();
                    newDate.setHours(hours, minutes);
                    field.onChange(newDate);
                  }}
                />
                <input
                  type="number"
                  min="0"
                  max="59"
                  placeholder="출발시간"
                  className={`input input-bordered w-full ${
                    errors.startDateTime ? 'border-red-500 focus:outline-red-500' : ''
                  }`}
                  onChange={e => {
                    const minutes = Number(e.target.value);
                    const hours = field.value ? field.value.getHours() : 0;
                    const newDate = field.value ? new Date(field.value) : new Date();
                    newDate.setHours(hours, minutes);
                    field.onChange(newDate);
                  }}
                />
              </div>
            </>
          )}
        />
      </div>

      <button type="button" onClick={searchRoute} className="btn btn-primary">
        경로 설정하기
      </button>
      {/* 페이스 */}
      <div className="flex">
        <Controller
          name="paceTime"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <select
              {...field}
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
          )}
        />
      </div>
      {/* 제목 */}
      <div className="flex justify-center">
        <Controller
          name="title"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              className={`input input-bordered focus:border-transparent ${
                errors.title ? 'border-red-500 focus:outline-red-500' : ''
              }`}
              placeholder="모집글 제목"
            />
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
            <textarea
              {...field}
              id="content"
              placeholder="내용을 입력하세요"
              className={`w-full h-32 resize-none p-2 border border-gray-300 rounded-md ${
                errors.content ? 'border-red-500 focus:outline-red-500' : ''
              }`}
            />
          )}
        />
      </div>
      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? '제출 중...' : '제출'}
      </button>
    </form>
  );
}
