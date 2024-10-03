export default function PostInfoPage({ params: { id } }: { params: { id: string } }) {
  console.log(id);
  return <div>{id}</div>;
}
