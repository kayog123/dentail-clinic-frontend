"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "aws-amplify/auth";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user.userId);
    } catch (error: unknown) {
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  return { isAuthenticated, isLoading };
}
