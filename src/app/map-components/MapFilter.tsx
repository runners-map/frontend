"use client";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { PostFilter } from "@/types/Post";

export default function MapFilter({ setQueryParams, setIsFilterOpen }) {
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PostFilter>();

  const onSubmit = (data: PostFilter) => {
    console.log(data);
    const processedData = {
      gender: data.gender === "All" ? "" : data.gender,
      distanceStart: data.distanceStart || null,
      distanceEnd: data.distanceEnd || null,
      paceMinStart: data.paceMinStart || null,
      paceMinEnd: data.paceMinEnd || null,
      limitMemberCntStart: data.limitMemberCntStart || null,
      limitMemberCntEnd: data.limitMemberCntStart || null,
      startDate: data.startDate || null,
      startTime: data.startTime || null,
    };
    setQueryParams(processedData);
    setIsFilterOpen(false);
  };

  const handleDistanceChange = (value: string) => {
    switch (value) {
      case "3-5":
        setValue("distanceStart", 3);
        setValue("distanceEnd", 5);
        break;
      case "5-10":
        setValue("distanceStart", 5);
        setValue("distanceEnd", 10);
        break;
      case "10-15":
        setValue("distanceStart", 10);
        setValue("distanceEnd", 15);
        break;
      case "15+":
        setValue("distanceStart", 15);
        setValue("distanceEnd", null); // 상한 없음
        break;
    }
  };

  const handlePaceChange = (value: string) => {
    switch (value) {
      case "6+":
        setValue("paceMinStart", 6);
        setValue("paceMinEnd", null); // 상한 없음
        break;
      case "6-5":
        setValue("paceMinStart", 5);
        setValue("paceMinEnd", 6);
        break;
      case "5-4":
        setValue("paceMinStart", 4);
        setValue("paceMinEnd", 5);
        break;
      case "4↓":
        setValue("paceMinStart", null); // 하한 없음
        setValue("paceMinEnd", 4);
        break;
    }
  };

  const handleGroupSizeChange = (value: string) => {
    switch (value) {
      case "2":
        setValue("limitMemberCntStart", 2);
        setValue("limitMemberCntEnd", null);
        break;
      case "3-4":
        setValue("limitMemberCntStart", 3);
        setValue("limitMemberCntEnd", 4);
        break;
      case "5-7":
        setValue("limitMemberCntStart", 5);
        setValue("limitMemberCntEnd", 7);
        break;
      case "8-10":
        setValue("limitMemberCntStart", 8);
        setValue("limitMemberCntEnd", 10);
        break;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col px-3 space-y-4">
      <fieldset className="flex gap-2">
        <legend className="text-gray-400 mb-2">성별</legend>
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "All"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="All" // 혼성 옵션을 "All"로 설정
                  checked={field.value === "All"} // 시각적으로 "All"일 때만 파란색으로 표시
                  onChange={() => field.onChange("All")}
                  className="hidden"
                />
                🏃‍♀️🏃‍♂️ 혼성
              </label>
              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "M"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="M"
                  checked={field.value === "M"}
                  onChange={() => field.onChange("M")}
                  className="hidden"
                />
                🏃‍♂️ 남성
              </label>
              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "F"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="F"
                  checked={field.value === "F"}
                  onChange={() => field.onChange("F")}
                  className="hidden"
                />
                🏃‍♀️ 여성
              </label>
            </>
          )}
        />
      </fieldset>

      <fieldset className="flex gap-1">
        <legend className="text-gray-400 mb-2">거리 (km)</legend>
        <Controller
          name="distance"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <label
                className={`text-base cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "3-5"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="3-5"
                  checked={field.value === "3-5"}
                  onChange={() => {
                    field.onChange("3-5");
                    handleDistanceChange("3-5");
                  }}
                  className="hidden"
                />
                💧 3-5
              </label>

              <label
                className={`text-base cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "5-10"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="5-10"
                  checked={field.value === "5-10"}
                  onChange={() => {
                    field.onChange("5-10");
                    handleDistanceChange("5-10");
                  }}
                  className="hidden"
                />
                💦 5-10
              </label>

              <label
                className={`text-base cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "10-15"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="10-15"
                  checked={field.value === "10-15"}
                  onChange={() => {
                    field.onChange("10-15");
                    handleDistanceChange("10-15");
                  }}
                  className="hidden"
                />
                ⚡️ 10-15
              </label>

              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "15↑"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="15↑"
                  checked={field.value === "15↑"}
                  onChange={() => {
                    field.onChange("15↑");
                    handleDistanceChange("15↑");
                  }}
                  className="hidden"
                />
                🔥 15↑
              </label>
            </>
          )}
        />
      </fieldset>

      <fieldset className="flex gap-2">
        <legend className="text-gray-400 mb-2">페이스 (분)</legend>
        <Controller
          name="pace"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "6↑"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="6↑"
                  checked={field.value === "6↑"}
                  onChange={() => {
                    field.onChange("6↑");
                    handlePaceChange("6↑");
                  }}
                  className="hidden"
                />
                🐢 6↑
              </label>

              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "6-5"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="6-5"
                  checked={field.value === "6-5"}
                  onChange={() => {
                    field.onChange("6-5");
                    handlePaceChange("6-5");
                  }}
                  className="hidden"
                />
                🐇 6-5
              </label>

              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "5-4"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="5-4"
                  checked={field.value === "5-4"}
                  onChange={() => {
                    field.onChange("5-4");
                    handlePaceChange("5-4");
                  }}
                  className="hidden"
                />
                🐈 5-4
              </label>

              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "4↓"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="4↓"
                  checked={field.value === "4↓"}
                  onChange={() => {
                    field.onChange("4↓");
                    handlePaceChange("4↓");
                  }}
                  className="hidden"
                />
                🐆 4↓
              </label>
            </>
          )}
        />
      </fieldset>
      <fieldset className="flex gap-2">
        <legend className="text-gray-400 mb-2">제한 인원 (명)</legend>
        <Controller
          name="groupSize"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "2"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="2"
                  checked={field.value === "2"}
                  onChange={() => {
                    field.onChange("2");
                    handleGroupSizeChange("2");
                  }}
                  className="hidden"
                />
                🌱 2
              </label>
              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "3-4"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="3-4"
                  checked={field.value === "3-4"}
                  onChange={() => {
                    field.onChange("3-4");
                    handleGroupSizeChange("3-4");
                  }}
                  className="hidden"
                />
                🍀 3-4
              </label>
              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "5-7"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="5-7"
                  checked={field.value === "5-7"}
                  onChange={() => {
                    field.onChange("5-7");
                    handleGroupSizeChange("5-7");
                  }}
                  className="hidden"
                />
                🌿 5-7
              </label>
              <label
                className={`cursor-pointer px-3 py-2 rounded-full shadow-md shadow-slate-300 ${
                  field.value === "8-10"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="8-10"
                  checked={field.value === "8-10"}
                  onChange={() => {
                    field.onChange("8-10");
                    handleGroupSizeChange("8-10");
                  }}
                  className="hidden"
                />
                🌳 8-10
              </label>
            </>
          )}
        />
      </fieldset>

      <fieldset>
        <legend className="text-gray-400 mb-2">출발 날짜</legend>
        <div className="flex gap-2">
          <Controller
            name="startDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                {...field}
                type="date"
                className={`input input-bordered w-full rounded-full focus:border-transparent border-0 shadow-md shadow-slate-300 bg-gray-50 ${
                  errors.startDate ? "border-red-500 focus:outline-red-500" : ""
                }`}
              />
            )}
          />
          {/* <Controller
            name="startTime"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <input
                type="time"
                {...field}
                className={`input input-bordered w-full rounded-full focus:border-transparent border-0 shadow-md shadow-slate-300 bg-gray-50 ${
                  errors.startTime ? "border-red-500 focus:outline-red-500" : ""
                }`}
              />
            )}
          /> */}
        </div>
      </fieldset>

      <div className="flex justify-end pb-5 gap-2">
        <button
          type="button"
          onClick={() =>
            reset({
              gender: null,
              distanceStart: null,
              distanceEnd: null,
              paceMinStart: null,
              paceMinEnd: null,
              limitMemberCntStart: null,
              limitMemberCntEnd: null,
              startDate: null,
              startTime: null,
            })
          }
          className="btn btn-secondary text-white rounded-full shadow-md shadow-slate-300"
        >
          초기화
        </button>
        <button
          type="submit"
          className="btn btn-primary text-white rounded-full shadow-md shadow-slate-300"
        >
          조회하기
        </button>
      </div>
    </form>
  );
}
