'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';

interface ChatFormData {
  message: string;
}

export default function ChatRoomContainer() {
  const { control, handleSubmit, reset } = useForm<ChatFormData>();
  const [messages, setMessages] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const onSubmit = (data: ChatFormData) => {
    if (data.message.trim() === '') {
      return;
    }
    setMessages([...messages, data.message]);
    reset();
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="w-full h-[80vh] flex flex-col">
      {/* 채팅 메시지 영역 */}
      <div className="flex-grow mb-4 space-y-2 overflow-y-auto p-4">
        {messages.map((message, index) => (
          <div key={index} className="chat chat-end">
            <div className="chat-bubble bg-green-500 text-white rounded-lg p-2 max-w-[80%] break-words">{message}</div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* 메시지 입력 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex w-full p-2">
        <Controller
          name="message"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              {...field}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full focus:outline-none"
            />
          )}
        />
      </form>
    </div>
  );
}
