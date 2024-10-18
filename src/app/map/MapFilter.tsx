"use client";
import { HiOutlineFunnel } from "react-icons/hi2";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Controller, useForm } from "react-hook-form";
import { GetPostsRequest } from "@/types/Post";

export default function MapFilter({ queryParams, setQueryParams }) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      gender: queryParams.gender,
      limitMemberCnt: queryParams.limitMemberCnt,
      startDate: queryParams.startDate,
      startTime: queryParams.startTime,
      paceMinStart: queryParams.paceMinStart,
      paceMinEnd: queryParams.paceMinEnd,
      distanceStart: queryParams.distanceStart,
      distanceEnd: queryParams.distanceEnd,
    },
  });

  Modal.setAppElement("body");

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onSubmit = (data) => {
    console.log(data);
    setQueryParams({
      ...queryParams,
      gender: data.gender,
      limitMemberCnt: data.limitMemberCnt,
      startDate: data.startDate,
      startTime: data.startTime,
      paceMinStart: data.paceMinStart,
      paceMinEnd: data.paceMinEnd,
      distanceStart: data.distanceStart,
      distanceEnd: data.distanceEnd,
    });
    closeModal();
  };

  useEffect(() => {
    reset(queryParams);
  }, [queryParams, reset]);

  return (
    <>
      <button className="text-primary w-10 h-10 rounded-full bg-white flex justify-center items-center">
        <HiOutlineFunnel
          size={30}
          style={{ strokeWidth: 2 }}
          onClick={openModal}
        />
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        className="relative max-w-sm my-20 mx-auto max-h-[60vh] overflow-y-auto rounded-lg p-10 transition-transform duration-300 ease-in-out focus:outline-none bg-white"
      >
        <p
          onClick={closeModal}
          className="absolute top-0 left-2 cursor-pointer"
        >
          X
        </p>
        <h2 className="text-xl font-semibold">모집글 조회하기</h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-col-2 gap-4 pt-10 mx-10"
        >
          {/* 성별 */}
          <div className="flex justify-between">
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <select
                  {...field}
                  id="gender"
                  className={`select select-bordered w-full focus:border-transparent ${
                    errors.gender ? "border-red-500 focus:outline-red-500" : ""
                  }`}
                >
                  <option value="" disabled>
                    성별을 골라주세요
                  </option>
                  <option value="">무관</option>
                  <option value="M">남성</option>
                  <option value="F">여성</option>
                </select>
              )}
            />
          </div>

          {/* 제한인원 */}
          <div>
            <Controller
              name="limitMemberCnt"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="number"
                  className={`input input-bordered w-full focus:border-transparent ${
                    errors.limitMemberCnt
                      ? "border-red-500 focus:outline-red-500"
                      : ""
                  }`}
                  min={0}
                  max={10}
                  value={field.value === 0 ? "" : field.value} // 0일 때 값을 빈 문자열로 설정
                  onChange={(e) => field.onChange(Number(e.target.value))}
                  placeholder="최대인원 (1~10명)"
                />
              )}
            />
          </div>

          {/* 출발 날짜 선택 */}
          <div>
            <Controller
              name="startDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="date"
                  className={`input input-bordered w-full focus:border-transparent ${
                    errors.startDate
                      ? "border-red-500 focus:outline-red-500"
                      : ""
                  }`}
                />
              )}
            />
          </div>

          {/* 출발 시간 선택 */}
          <div className="flex gap-2 items-center justify-center">
            <Controller
              name="startTime"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="time"
                  {...field}
                  className={`input input-bordered w-full focus:border-transparent ${
                    errors.startTime
                      ? "border-red-500 focus:outline-red-500"
                      : ""
                  }`}
                />
              )}
            />
          </div>

          {/* 페이스 */}
          <div className="flex gap-2 items-center justify-center">
            <Controller
              name="paceMinStart"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className={`input input-bordered w-1/2 focus:border-transparent ${
                    errors.paceMinStart
                      ? "border-red-500 focus:outline-red-500"
                      : ""
                  }`}
                  min={1}
                  max={59}
                  value={field.value === 0 ? "" : field.value}
                  placeholder="시작"
                />
              )}
            />
            <p>~ </p>
            <Controller
              name="paceMinEnd"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className={`input input-bordered w-1/2 focus:border-transparent ${
                    errors.paceMinEnd
                      ? "border-red-500 focus:outline-red-500"
                      : ""
                  }`}
                  placeholder="끝"
                  value={field.value === 0 ? "" : field.value}
                  min={1}
                  max={59}
                />
              )}
            />
            <p>분</p>
          </div>

          {/* 거리 */}
          <div className="flex gap-2 items-center justify-center">
            <Controller
              name="distanceStart"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className={`input input-bordered w-1/2 focus:border-transparent ${
                    errors.paceMinStart
                      ? "border-red-500 focus:outline-red-500"
                      : ""
                  }`}
                  min={1}
                  max={59}
                  value={field.value === 0 ? "" : field.value}
                  placeholder="시작"
                />
              )}
            />
            <p>~ </p>
            <Controller
              name="distanceEnd"
              control={control}
              defaultValue={0}
              render={({ field }) => (
                <input
                  type="number"
                  {...field}
                  className={`input input-bordered w-1/2 focus:border-transparent ${
                    errors.paceMinEnd
                      ? "border-red-500 focus:outline-red-500"
                      : ""
                  }`}
                  placeholder="끝"
                  value={field.value === 0 ? "" : field.value}
                  min={1}
                  max={59}
                />
              )}
            />
            <p>KM</p>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "조회 중..." : "조회하기"}
          </button>
        </form>
      </Modal>
    </>
  );
}
