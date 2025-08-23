import { ClipLoader } from "react-spinners";

export default function LoginPageLoading() {
  return (
    <div className="w-full h-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-1/2">
        <ClipLoader size={100} />
      </div>
    </div>
  );
}
