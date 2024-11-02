import Result from './Result';

export const metadata = {
  title: "러닝 결과",
};

export default function ResultPage({
  params: { id },
}: {
  params: { id: string };
}) {
  return <Result id={id} />;
}
