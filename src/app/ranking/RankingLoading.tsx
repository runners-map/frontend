export default async function RankingLoading() {
  return (
    <>
      <ul className="space-y-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="skeleton h-20"></div>
        ))}
      </ul>
    </>
  );
}
