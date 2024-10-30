'use client';

import { Post } from '@/types/Post';
import Link from 'next/link';
import { FaClipboardList } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useUserInfo } from '@/types/UserInfo';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function ClientPostList() {
  const { userId } = useUserInfo();
  const [posts, setPosts] = useState<Post[]>([]);
  const accessToken = Cookies.get('accessToken');
  useEffect(() => {
    const getPostList = async () => {
      try {
        const response = await axios.get<Post[]>(`/api/posts/list`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          params: {
            userId: userId
          }
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };
    getPostList();
  }, [userId, accessToken]);

  console.log(posts);
  return (
    <ul className="p-10">
      <div className="bg-gradient-to-r from-primary p-5 via-blue-500 to-blue-400 shadow-2xl rounded-3xl text-white mb-10 ">
        <h1 className="text-2xl font-semibold border-b-2 border-gray-400 pb-4 mb-5">
          참여중인 러닝크루 <span className="text-3xl"> ({posts.length}) </span>
        </h1>
        <div>
          <p>곧 시작될 러닝</p>
          <p className="text-2xl text-bold">1개</p>
        </div>
      </div>
      <h2 className="text-xl text-extrabold border-b-2 border-primary flex mb-5">
        <FaClipboardList className="h-6 w-6 text-primary mr-2" />
        <p>모집글 목록</p>
      </h2>

      {posts.map((post: Post) => {
        let genderIcon;
        switch (post.gender) {
          case 'M':
            genderIcon = (
              <span role="img" aria-label="male">
                🏃‍♂️
              </span>
            );
            break;
          case 'F':
            genderIcon = (
              <span role="img" aria-label="female">
                🏃‍♀️
              </span>
            );
            break;
          case 'All':
            genderIcon = (
              <span role="img" aria-label="all-gender">
                🏃‍♀️🏃‍♂️
              </span>
            );
            break;
          default:
            genderIcon = null;
        }
        return (
          <li
            key={post.postId}
            className="rounded-3xl bg-gray-200 bg-opacity-70 shadow-lg transform transition-transform duration-300 mb-5 active:bg-gray-400 active:scale-95 active:transition-transform">
            <Link href={`/post-list/post/${post.postId}/post-info`} className="block p-6 rounded-3xl">
              <div className="flex">
                <div className="flex items-center">
                  {genderIcon && <div className="mr-2 p-5 rounded-full shadow-lg">{genderIcon}</div>}
                  <div className="ml">
                    <h2 className="text-lg font-semibold text-gray-800">{post.title}</h2>
                    <div className="text-xs text-gray-500">
                      {String(post.startDateTime).split('T')[0]} {String(post.startDateTime).split('T')[1]}{' '}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
