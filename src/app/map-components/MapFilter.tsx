"use client";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { GetPostsRequest } from "@/types/Post";

export default function MapFilter() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GetPostsRequest>();

  const onSubmit = (data: GetPostsRequest) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-col px-3 space-y-4">
      <fieldset className="flex gap-2">
        <legend className="text-gray-400">성별</legend>
        <Controller
          name="gender"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-lg ${
                  field.value === ""
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value=""
                  checked={field.value === ""}
                  onChange={() => field.onChange("")}
                  className="hidden"
                />
                🏃‍♀️🏃‍♂️ 혼성
              </label>
              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
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
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
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

      <fieldset className="flex gap-2">
        <legend className="text-gray-400">거리 (km)</legend>
        <Controller
          name="distance"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
                  field.value === "0-5"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="0-5"
                  checked={field.value === "0-5"}
                  onChange={() => field.onChange("0-5")}
                  className="hidden"
                />
                💧 3~5
              </label>

              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
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
                  onChange={() => field.onChange("5-10")}
                  className="hidden"
                />
                💦 5~10
              </label>

              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
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
                  onChange={() => field.onChange("10-15")}
                  className="hidden"
                />
                ⚡️ 10~15
              </label>

              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
                  field.value === "15+"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="15+"
                  checked={field.value === "15+"}
                  onChange={() => field.onChange("15+")}
                  className="hidden"
                />
                🔥 15~
              </label>
            </>
          )}
        />
      </fieldset>

      <fieldset className="flex gap-2">
        <legend className="text-gray-400">페이스 (분)</legend>
        <Controller
          name="pace"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
                  field.value === "6+"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="6+"
                  checked={field.value === "6+"}
                  onChange={() => field.onChange("6+")}
                  className="hidden"
                />
                🐢 6~
              </label>

              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
                  field.value === "5-6"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="5-6"
                  checked={field.value === "5-6"}
                  onChange={() => field.onChange("5-6")}
                  className="hidden"
                />
                🐇 5~6
              </label>

              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
                  field.value === "4-5"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="4-5"
                  checked={field.value === "4-5"}
                  onChange={() => field.onChange("4-5")}
                  className="hidden"
                />
                🐈 4~5
              </label>

              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
                  field.value === "4-"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="4-"
                  checked={field.value === "4-"}
                  onChange={() => field.onChange("4-")}
                  className="hidden"
                />
                🐆 4~
              </label>
            </>
          )}
        />
      </fieldset>
      <fieldset className="flex gap-2">
        <legend className="text-gray-400">제한 인원 (명)</legend>
        <Controller
          name="groupSize"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <>
              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
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
                  onChange={() => field.onChange("2")}
                  className="hidden"
                />
                🌱 2
              </label>
              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
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
                  onChange={() => field.onChange("3-5")}
                  className="hidden"
                />
                🍀 3~4
              </label>
              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
                  field.value === "6-8"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="6-8"
                  checked={field.value === "6-8"}
                  onChange={() => field.onChange("6-8")}
                  className="hidden"
                />
                🌿 5~7
              </label>
              <label
                className={`cursor-pointer px-4 py-2 rounded-full shadow-md ${
                  field.value === "9-10"
                    ? "bg-primary text-white"
                    : "text-gray-700 bg-gray-50"
                }`}
              >
                <input
                  type="radio"
                  {...field}
                  value="9-10"
                  checked={field.value === "9-10"}
                  onChange={() => field.onChange("9-10")}
                  className="hidden"
                />
                🌳 8~10
              </label>
            </>
          )}
        />
      </fieldset>
      <fieldset>
        <legend className="text-gray-400">출발 날짜</legend>
        <Controller
          name="startDate"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <input
              {...field}
              type="date"
              className={`input input-bordered w-full focus:border-transparent ${
                errors.startDate ? "border-red-500 focus:outline-red-500" : ""
              }`}
            />
          )}
        />
      </fieldset>
      <div className="flex gap-2 items-center justify-center">
        <Controller
          name="startTime"
          control={control}
          defaultValue=""
          rules={{ required: true }}
          render={({ field }) => (
            <input
              type="time"
              {...field}
              className={`input input-bordered w-full focus:border-transparent ${
                errors.startTime ? "border-red-500 focus:outline-red-500" : ""
              }`}
            />
          )}
        />
      </div>

      <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "조회 중..." : "조회하기"}
      </button>
    </form>
  );
}
