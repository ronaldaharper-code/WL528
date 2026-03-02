"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignInClient() {
  const params = useSearchParams();
  const error = params.get("error");
  const callbackUrl = params.get("callbackUrl") ?? "/";

  return (
    <div className="mx-auto max-w-md p-6">
      <h1 className="text-2xl font-bold">Member Login</h1>

      {error ? (
        <p className="mt-3 rounded-md border p-3 text-sm">
          Sign-in error: {error}
        </p>
      ) : null}

      <p className="mt-3 text-sm opacity-80">
        This area is being finalized. If you need help, email{" "}
        <a className="underline" href="mailto:TEMPLEBOARD528@gmail.com">
          TEMPLEBOARD528@gmail.com
        </a>
        .
      </p>

      <div className="mt-6 flex gap-3">
        <Link className="underline" href={callbackUrl}>
          Go back
        </Link>
      </div>
    </div>
  );
}