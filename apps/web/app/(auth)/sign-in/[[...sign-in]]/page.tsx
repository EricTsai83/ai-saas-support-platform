import { SignIn } from "@clerk/nextjs";

/**
 * Render the Clerk SignIn component as a full page.
 *
 * @returns A React element containing Clerk's SignIn component
 */
export default function SignInPage() {
  return <SignIn />;
}