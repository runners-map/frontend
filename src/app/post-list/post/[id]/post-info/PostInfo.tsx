<<<<<<< HEAD
'use client';

import Header from '@/components/Header';
import { FaUsers, FaTransgender, FaClock, FaMapMarkerAlt, FaRoad, FaRunning } from 'react-icons/fa';
import EditButton from './EditButton';
import ChatButton from './CommentButton';
import DeleteButton from './DeleteButton';
import { Post } from '@/types/Post';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const getPost = async (id: string) => {
  const accessToken = Cookies.get('accessToken');
  const response = await axios.get<Post>(`/api/posts`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    params: {
      postId: id
    }
=======
"use client";

import Header from "@/components/Header";
import {
  FaUsers,
  FaTransgender,
  FaClock,
  FaMapMarkerAlt,
  FaRoad,
  FaRunning,
} from "react-icons/fa";
import EditButton from "./EditButton";
import ChatButton from "./CommentButton";
import DeleteButton from "./DeleteButton";
import { Post } from "@/types/Post";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const getPost = async (id) => {
  const response = await axios.get(`http://localhost:3001/post`, {
    params: { postId: id },
>>>>>>> c3cc66b (fix : 충돌해결)
  });
  return response.data;
};

export default function PostInfo({ id }: { id: string }) {
  const [post, setPost] = useState<Post | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isExit, setIsExit] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const fetchedPost = await getPost(id);
<<<<<<< HEAD
      setPost(fetchedPost);
=======
      setPost(fetchedPost[0]);
      console.log(fetchedPost);
>>>>>>> c3cc66b (fix : 충돌해결)
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
<<<<<<< HEAD
        setTimeElapsed(prevTime => prevTime + 1);
=======
        setTimeElapsed((prevTime) => prevTime + 1);
>>>>>>> c3cc66b (fix : 충돌해결)
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleButtonClick = () => {
<<<<<<< HEAD
    setIsRunning(prev => !prev);
=======
    setIsRunning((prev) => !prev);
>>>>>>> c3cc66b (fix : 충돌해결)
  };

  const handleStopClick = () => {
    setShowConfirmModal(true);
  };

  const confirmExit = () => {
    setIsRunning(false);
    setTimeElapsed(0);
<<<<<<< HEAD
    router.push(`/post-list/post/${id}/post-info/result?timeElapsed=${timeElapsed}`);
=======
    router.push(
      `/post-list/post/${id}/post-info/result?timeElapsed=${timeElapsed}`
    );
>>>>>>> c3cc66b (fix : 충돌해결)
    setShowConfirmModal(false);
  };

  const cancelExit = () => {
    setShowConfirmModal(false);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

<<<<<<< HEAD
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`;
=======
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
>>>>>>> c3cc66b (fix : 충돌해결)
  };

  const handleExit = () => {
    setIsExit(true);
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <header className="flex justify-center relative p-10 shadow-md">
        <Header />
<<<<<<< HEAD
        <h1 className="text-4xl text-white font-bold text-center">{post.title}</h1>
=======
        <h1 className="text-2xl text-white font-bold text-center">
          {post.title}
        </h1>
>>>>>>> c3cc66b (fix : 충돌해결)
      </header>
      <main className="flex-1 p-6 bg-white shadow-2xl rounded-t-3xl">
        <section className="mb-6 bg-white p-4 rounded-2xl shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">채팅방 정보</h2>
            <div className="flex space-x-2">
              <EditButton id={id} />
              <ChatButton id={id} />
              <DeleteButton id={id} />
            </div>
          </div>
          <p className="text-lg flex items-center mb-4">
            <FaUsers className="mr-2 text-primary" />
            제한인원: <span className="font-bold">{post.limitMemberCnt}</span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaTransgender className="mr-2 text-primary" />
<<<<<<< HEAD
            제한성별:{' '}
            <span className="font-bold">
              {post.gender === 'All' ? '제한없음' : post.gender === 'M' ? '남자' : '여자'}
=======
            제한성별:{" "}
            <span className="font-bold">
              {post.gender === "All"
                ? "제한없음"
                : post.gender === "M"
                ? "남자"
                : "여자"}
>>>>>>> c3cc66b (fix : 충돌해결)
            </span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaClock className="mr-2 text-primary" />
<<<<<<< HEAD
            출발시간:{' '}
            <span className="font-bold">
              {String(post.startDateTime).split('T')[0]} {String(post.startDateTime).split('T')[1]}{' '}
            </span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaMapMarkerAlt className="mr-2 text-primary" />
            출발위치: <span className="font-bold">{post.startPosition}</span>
=======
            출발시간:{" "}
            <span className="font-bold">
              {String(post.startDateTime).split("T")[0]}{" "}
              {String(post.startDateTime).split("T")[1]}{" "}
            </span>
          </p>
          <p className="text-lg items-center mb-4">
            <div className="flex place-items-center">
              <FaMapMarkerAlt className="mr-2 text-primary" />
              출발위치:
            </div>
            <span className="font-bold">{post.startPosition}</span>
>>>>>>> c3cc66b (fix : 충돌해결)
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaRoad className="mr-2 text-primary" />
            거리: <span className="font-bold">{post.distance}km</span>
          </p>
          <p className="text-lg flex items-center mb-4">
            <FaRunning className="mr-2 text-primary" />
<<<<<<< HEAD
            페이스:{' '}
            <span className="font-bold">
              {post.paceSec ? `${post.paceMin}분 ${post.paceSec}초` : `${post.paceMin}분`}
=======
            페이스:{" "}
            <span className="font-bold">
              {post.paceSec
                ? `${post.paceMin}분 ${post.paceSec}초`
                : `${post.paceMin}분`}
>>>>>>> c3cc66b (fix : 충돌해결)
            </span>
          </p>
          <p className="mt-4 text-lg text-gray-800 leading-relaxed bg-gray-100 p-4 rounded-md border-2 border-primary border-dotted shadow-md">
            {post.content}
          </p>
          <div className="mt-4 text-lg text-gray-800 leading-relaxed bg-gray-100 p-4 rounded-md border-2 border-primary border-dotted shadow-md">
<<<<<<< HEAD
            {!isExit && (
              <div className="flex justify-between">
                <p>김제로</p>
=======
            <div className="flex justify-between">
              <p>runnersMap</p>
              <button onClick={handleExit}>방장</button>
            </div>
            {!isExit && (
              <div className="flex justify-between">
                <p>퇴근하고싶다</p>
>>>>>>> c3cc66b (fix : 충돌해결)
                <button onClick={handleExit}>강퇴</button>
              </div>
            )}
            <div className="flex justify-between">
<<<<<<< HEAD
              <p>러너스하이</p>
              <button>강퇴</button>
            </div>
            <div className="flex justify-between">
              <p>sky_runners</p>
              <button>강퇴</button>
=======
              <p>MintyJoy</p>
              <button onClick={handleExit}>강퇴</button>
>>>>>>> c3cc66b (fix : 충돌해결)
            </div>
          </div>
        </section>
        <section className="flex flex-col items-center">
          {isRunning ? (
            <>
              <button className="btn btn-danger" onClick={handleStopClick}>
                종료하기
              </button>
              <div className="mt-4">
                <p>타이머: {formatTime(timeElapsed)}</p>
              </div>
            </>
          ) : (
            <button className="btn btn-primary" onClick={handleButtonClick}>
              출발하기
            </button>
          )}
        </section>
      </main>

      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-lg shadow-lg">
            <h2 className="text-lg">종료하시겠습니까?</h2>
            <div className="flex justify-end mt-4">
              <button className=" btn btn-primary mr-2" onClick={confirmExit}>
                확인
              </button>
              <button onClick={cancelExit} className="btn btn-primary">
                취소
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
