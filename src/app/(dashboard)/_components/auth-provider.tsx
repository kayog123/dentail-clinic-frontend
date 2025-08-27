"use client";

import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { awsConfig } from "@/app/lib/aws-config";
import { getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";
import FullLoadingScreen from "@/app/components/common/full-loading-screen";
import UnauthorizedAccess from "@/app/components/common/unauthorized-access";

Amplify.configure(awsConfig);

export default function AuthProvider({
  children,
  authMode = "admin",
}: {
  children: React.ReactNode;
  authMode: "auth" | "admin";
}) {
  const [isUserSignIn, setIsUserSignIn] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [firstLoad, setFirstLoad] = useState<boolean>(false);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      const userSignInDetails = await getCurrentUser();
      setIsUserSignIn(!!userSignInDetails.userId);
    } catch (error: unknown) {
      //console.log(error);
      setIsUserSignIn(false);
    }
    setLoading(false);
    setFirstLoad(true);
  };

  if (isLoading || !firstLoad) {
    return <FullLoadingScreen />;
  }
  {
    /*if (!isLoading && !isUserSignIn && firstLoad) return <p>Please login</p>;
  if (isUserSignIn && !isLoading) return <div>{children}</div>; */
  }

  const allowAdminChildrenShow =
    authMode == "admin" && isUserSignIn && !isLoading; //show dashboard component if authenticated
  const allowAuthChildrenShow =
    authMode == "auth" && !isUserSignIn && !isLoading; //show auth component if not authenticated

  if (authMode == "auth" && isUserSignIn && !isLoading && firstLoad) {
    return (
      <UnauthorizedAccess
        text="Can't access this page. You are currently login. "
        authMode={authMode}
      />
    );
  }

  if (authMode == "admin" && !isLoading && !isUserSignIn && firstLoad) {
    return (
      <UnauthorizedAccess
        text="Can't access this page. Please sign in. "
        authMode={authMode}
      />
    );
  }

  if (allowAdminChildrenShow || allowAuthChildrenShow) {
    return <div>{children}</div>;
  }
}
