import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  });

  return (
    <div className="min-h-screen bg-green-200 font-normal border-white border-[1px]">
      <div className="flex flex-col md:p-5 md:flex-row lg:flex-row">
        <div className="flex-row">
          <div className="sm:basis-full md:basis-1/3 lg:basis-1/3 justify-center m-2 p-3 shadow-md rounded-lg bg-white min-w-[250px] min-h-[50px] border-black border-[1px]">
            <span className="text-center">Ruh roh. 404.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
