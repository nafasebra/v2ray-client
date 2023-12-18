import { useGradientStyle } from "@/theme/utils/gradient";
import { useSearchParams } from "react-router-dom";

const NotFound = () => {
  const [search] = useSearchParams();
  const { backgroundImage } = useGradientStyle();

  return (
    <div className="min-h-[85vh] flex items-center justify-center">
      <div className="border-4 border-solid border-white px-6 py-10 rounded-2xl w-full max-w-sm">
        <h2
          style={{ backgroundImage: backgroundImage }}
          className="bg-clip-text text-transparent text-center text-xl">
          {search.get("message") ? search.get("message") : "Page Not Found"}
        </h2>
      </div>
    </div>
  );
};

export default NotFound;
