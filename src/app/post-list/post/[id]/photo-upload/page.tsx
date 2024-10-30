import PhotoUploadForm from "./PhotoUploadForm";

export default function PhotoUploadPage() {
  return (
    <>
      <div className="bg-white shadow-md shadow-slate-300 rounded-b-3xl py-4 text-gray-500">
        <h1 className="text-xl font-semibold text-center">인증샷 업로드</h1>
      </div>
      <div className="mt-8">
        <PhotoUploadForm />
      </div>
    </>
  );
}
