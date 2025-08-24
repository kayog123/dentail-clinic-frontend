"use client";

import Link from "next/link";
import { Button } from "../ui/button";

export default function UnauthorizedAccess({
  text = "Sorry. You are not allowed to access this page",
  authMode = "admin",
}: {
  text?: string;
  authMode: "auth" | "admin";
}) {
  return (
    <div className="w-full min-h-screen">
      <div className="flex justify-start sm:justify-center relative py-8 px-4 gap-10 md:py-8 md:px-2 h-full min-h-screen min-w-full [--tw-gradient-position:135deg] bg-[#e8e8e8]">
        <div className="flex flex-col gap-2 items-center justify-center w-full sm:min-w-[400px] max-w-[400px]">
          <h3 className="text-3xl font-bold">Unauthorized Access</h3>
          <p>{text}</p>
          <Link href={authMode == "admin" ? "/signin" : "/dashboard"}>
            <Button className="btn btn-primary mt-6">
              Go back to {authMode == "admin" ? "sign in" : "dashboard"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
