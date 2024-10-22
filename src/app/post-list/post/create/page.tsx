import React from 'react';
import PostCreateForm from './PostCreateForm';

export const metadata = {
  title: '모집글 작성하기'
};

export default function CreatePostPage() {
  return (
    <div>
      <PostCreateForm />
    </div>
  );
}
