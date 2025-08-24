import { createServerRunner } from "@aws-amplify/adapter-nextjs";
import { getCurrentUser } from "aws-amplify/auth/server";
import { cookies } from "next/headers";
import { awsConfig } from "./aws-config";

// This function can be marked `async` if using `await` inside
export const { runWithAmplifyServerContext, createAuthRouteHandlers } =
  createServerRunner({
    config: awsConfig,
  });

export async function getAuthCurrentUserServer() {
  try {
    const currentUser = await runWithAmplifyServerContext({
      nextServerContext: { cookies },
      operation: (context) => getCurrentUser(context),
    });
    return currentUser;
  } catch (err) {
    console.log(err);
    return false;
  }
}
