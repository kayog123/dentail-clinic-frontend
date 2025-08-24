export const awsConfig = {
  Auth: {
    Cognito: {
      userPoolId: process.env.NEXT_PUBLIC_AUTH_USER_POOL_ID || "",
      userPoolClientId: process.env.NEXT_PUBLIC_AUTH_USER_POOL_CLIENT_ID || "",
    },
    oauth: {
      scope: ["email", "openid", "phone", "profile"], // Adjust scopes as needed
      redirectSignIn: `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard`, // Sign-in redirect (must match Cognito Callback URL(s))
      redirectSignOut: `${process.env.NEXT_PUBLIC_API_BASE_URL}/signin`, // Sign-out redirect (must match Cognito Sign out URL(s))
      responseType: "code", //
      options: {
        // Additional options like PKCE: true for enhanced security
      },
    },
  },
};
