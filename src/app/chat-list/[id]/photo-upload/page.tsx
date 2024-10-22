import PhotoUploadForm from "./PhotoUploadForm";

export default function PhotoUploadPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-8 text-center">인증샷 업로드</h1>
      <PhotoUploadForm />
    </div>
  );
}
