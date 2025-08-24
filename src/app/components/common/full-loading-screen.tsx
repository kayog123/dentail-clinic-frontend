"use client";

export default function FullLoadingScreen({
  text = "Loading...",
}: {
  text?: string;
}) {
  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-start sm:justify-center relative py-8 px-4 gap-10 md:py-8 md:px-2 h-full min-h-screen min-w-full [--tw-gradient-position:135deg] bg-[#e8e8e8]">
        <div className="flex flex-col gap-6 items-center justify-center w-full sm:min-w-[400px] max-w-[400px]">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
