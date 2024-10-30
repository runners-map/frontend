'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface CommentFormData {
  comment: string;
}

interface Comment {
  id: number;
  text: string;
}

export default function CommentSection() {
  const { control, handleSubmit, reset } = useForm<CommentFormData>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState<string>('');
  const commentsEndRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = (data: CommentFormData) => {
    if (data.comment.trim() === '') {
      return;
    }

    if (editingCommentId !== null) {
      setComments(prevComments =>
        prevComments.map(comment => (comment.id === editingCommentId ? { ...comment, text: data.comment } : comment))
      );
      setEditingCommentId(null);
    } else {
      setComments(prevComments => [...prevComments, { id: Date.now(), text: data.comment }]);
    }

    reset();
    setEditingText('');
  };

  const handleEdit = (comment: Comment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const handleDelete = (id: number) => {
    setComments(prevComments => prevComments.filter(comment => comment.id !== id));
  };

  useEffect(() => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  return (
    <div className="w-full h-[80vh] flex flex-col bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-grow mb-4 space-y-2 overflow-y-auto p-4">
        {comments.map(comment => (
          <div key={comment.id} className="flex items-start space-x-2 border-b pb-2 mb-2">
            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-black">👤</div>
            <div className="flex-grow">
              <div className="bg-gray-100 text-black rounded-lg p-2">{comment.text}</div>
              <div className="flex text-gray-500 text-sm mt-1 justify-end">
                <button className="hover:text-blue-500 mr-2" onClick={() => handleEdit(comment)}>
                  수정
                </button>
                <button className="hover:text-red-500" onClick={() => handleDelete(comment.id)}>
                  삭제
                </button>
              </div>
            </div>
          </div>
        ))}
        <div ref={commentsEndRef} />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full p-2 border-t">
        <Controller
          name="comment"
          control={control}
          defaultValue={editingText}
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="댓글을 입력하세요"
              className="input input-bordered w-full focus:outline-none"
              value={editingCommentId !== null ? editingText : field.value}
              onChange={e => {
                field.onChange(e);
                setEditingText(e.target.value);
              }}
            />
          )}
        />
        <button type="submit" className="ml-2 btn btn-primary text-white">
          {editingCommentId !== null ? '수정 완료' : '댓글 작성'}
        </button>
      </form>
    </div>
  );
}
