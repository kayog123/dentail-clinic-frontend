import { Amplify } from "aws-amplify";
import { awsConfig } from "./aws-config";
import { signOut } from "aws-amplify/auth";
Amplify.configure(awsConfig);

export default async function signOutUser() {
  await signOut({ global: true });
}
