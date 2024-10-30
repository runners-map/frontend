/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useForm, Controller } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import { Post, usePostStore } from '@/types/Post';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendarAlt } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useUserInfo } from '@/types/UserInfo';
import { useRouter } from 'next/navigation';

export default function PostCreateForm() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<Post>();
  const accessToken = Cookies.get('accessToken');
  const router = useRouter();

  const { path, distance, startPosition } = usePostStore();
  const { userId } = useUserInfo();
  const onSubmit = async (data: Post) => {
    const { startDateTime, paceMin, paceSec, ...otherData } = data;
    const formattedDateTime = startDateTime
      ? new Date(startDateTime.getTime() - startDateTime.getTimezoneOffset() * 60000).toISOString()
      : null;

    const finalData = {
      ...otherData,
      startDateTime: formattedDateTime,
      adminId: userId,
      paceMin: Number(paceMin),
      paceSec: Number(paceSec),
      distance,
      startPosition,
      centerLat: path[0].lat,
      centerLng: path[0].lng,
      path: path.map(point => ({ lat: point.lat, lng: point.lng }))
    };

    try {
      const response = await axios.post('/api/posts', finalData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        },
        withCredentials: true
      });
      router.push('/post-list');
    } catch (error) {
      console.log('Error creating post', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-col-2 gap-4 pt-10 mx-10">
      {/* 성별 */}

      <div className="flex flex-col justify-between">
        <label className="text-primary font-bold mb-2">성별</label>
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
                🚻 성별을 골라주세요
              </option>
              <option value="null">🏃‍♀️🏃‍♂️전체</option>
              <option value="M">🏃‍♂️남자</option>
              <option value="F">🏃‍♀️여자</option>
            </select>
          )}
        />
      </div>
      <div className="flex flex-col">
        <label className="text-primary mb-2 font-bold">제한 인원</label>
        <Controller
          name="limitMemberCnt"
          control={control}
          defaultValue={0}
          rules={{ required: true, validate: value => value > 0 }}
          render={({ field }) => (
            <input
              {...field}
              type="number"
              className={`input input-bordered w-full ${
                errors.limitMemberCnt ? 'border-red-500 focus:outline-red-500' : ''
              }`}
              min={1}
              max={10}
              value={field.value === 0 ? '' : field.value}
              onChange={e => field.onChange(Number(e.target.value))}
              placeholder="🚶‍♂️제한인원 (1~10명)"
            />
          )}
        />
      </div>

      {/* 달릴 날짜 */}
      <div className="flex flex-col justify-center">
        <label className="text-primary mb-2 font-bold">달릴 날짜</label>
        <Controller
          name="startDateTime"
          control={control}
          defaultValue={undefined}
          rules={{ required: true }}
          render={({ field }) => (
            <>
              <DatePicker
                selected={field.value}
                onChange={date => {
                  if (date) {
                    const hours = field.value ? field.value.getHours() : 0;
                    const minutes = field.value ? field.value.getMinutes() : 0;
                    field.onChange(new Date(date.setHours(hours, minutes)));
                  } else {
                    field.onChange(null);
                  }
                }}
                placeholderText="출발일자를 선택하세요"
                dateFormat="yyyy/MM/dd"
                customInput={
                  <div
                    className={`flex items-center border border-gray-300 rounded-lg py-3 px-5 ${
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
              <div className="flex flex-col w-full mt-4">
                <label htmlFor="startDateTime" className="text-primary mb-2 font-bold">
                  달릴 시간
                </label>
                <input
                  type="time"
                  className={`input input-bordered w-full mr-2 ${
                    errors.startDateTime ? 'border-red-500 focus:outline-red-500' : ''
                  }`}
                  onChange={e => {
                    const [hours, minutes] = e.target.value.split(':').map(Number);
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

      {/* 페이스 */}
      <div>
        <label className="text-primary font-bold">페이스</label>
        <div className="flex gap-2 items-center justify-center mt-2">
          <Controller
            name="paceMin"
            control={control}
            defaultValue={0}
            rules={{ required: true, validate: value => value >= 1 }}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                className={`input input-bordered w-1/2 focus:border-transparent ${
                  errors.paceMin ? 'border-red-500 focus:outline-red-500' : ''
                }`}
                min={1}
                max={59}
                placeholder="최소 1"
                value={field.value === 0 ? '' : field.value}
              />
            )}
          />
          <p>분 </p>
          <Controller
            name="paceSec"
            control={control}
            defaultValue={0}
            rules={{ required: true, validate: value => value >= 1 }}
            render={({ field }) => (
              <input
                type="number"
                {...field}
                className={`input input-bordered w-1/2 focus:border-transparent ${
                  errors.paceSec ? 'border-red-500 focus:outline-red-500' : ''
                }`}
                value={field.value === 0 ? '' : field.value}
                min={1}
                max={59}
              />
            )}
          />
          <p>초</p>
        </div>
      </div>
      {/* 제목 */}
      <div className="flex flex-col justify-center">
        <label className="text-primary font-bold mb-2">글 작성</label>
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
              placeholder="✍️모집글 제목"
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
              placeholder="👟내용을 입력하세요"
              className={`w-full h-32 resize-none p-2 border border-gray-300 rounded-md ${
                errors.content ? 'border-red-500 focus:outline-red-500' : ''
              }`}
            />
          )}
        />
      </div>
      <button type="submit" className="btn btn-primary text-white" disabled={isSubmitting}>
        {isSubmitting ? '제출 중...' : '제출'}
      </button>
    </form>
  );
}
