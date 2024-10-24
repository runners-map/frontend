import axios from 'axios';

export default async function Loading() {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/ChatRoom`);

  return (
    <div className="p-14">
      {Array.from({ length: response.data.length }).map((_, index) => (
        <div
          key={index}
          className="bg-gradient-to-r from-primary p-5 via-blue-500 to-blue-400 shadow-lg rounded-lg w-full h-20 mb-5 skeleton"></div>
      ))}
    </div>
  );
}
