"use client";

import {
  useMutation,
  useQuery,
  Authenticated,
  Unauthenticated,
} from "convex/react";
import { api } from "@workspace/backend/_generated/api";
import { Button } from "@workspace/ui/components/button";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

/**
 * Renders the page UI that shows user data and controls when authenticated, and a sign-in prompt when not.
 *
 * When authenticated, queries and displays the list of users, shows a Clerk UserButton, and provides an "Add User" button that invokes the backend add-user mutation. When unauthenticated, shows a prompt and a Sign In button.
 *
 * @returns The component's React element tree.
 */
export default function Page() {
  const users = useQuery(api.user.getMany);
  const addUser = useMutation(api.user.add);

  return (
    <>
      <Authenticated>
        <div className="flex flex-col items-center justify-center min-h-svh">
          <p>apps/web</p>
          <UserButton />
          <Button onClick={() => addUser()}>Add User</Button>
          <div className="max-w-sm w-full mx-auto">
            {JSON.stringify(users, null, 2)}
          </div>
        </div>
      </Authenticated>
      <Unauthenticated>
        <p>Please sign in to continue</p>
        <SignInButton>Sign In</SignInButton>
      </Unauthenticated>
    </>
  );
}