import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body ?? {};

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    // If the `auth` instance exposes a sign-in/authenticate method, try to use it.
    // Different versions of better-auth may expose different method names; we attempt a best-effort call
    // and fall back to a helpful 501 response if not available.
    const anyAuth = auth as any;

    if (typeof anyAuth.signIn === "function") {
      const result = await anyAuth.signIn({ email, password });
      return NextResponse.json(result ?? { ok: false }, { status: result?.ok ? 200 : 401 });
    }

    if (typeof anyAuth.authenticate === "function") {
      const result = await anyAuth.authenticate({ email, password });
      return NextResponse.json(result ?? { ok: false }, { status: result?.ok ? 200 : 401 });
    }

    // If neither method exists, instruct the developer how to proceed.
    return NextResponse.json(
      {
        error:
          "better-auth sign-in is not available on the imported `auth` instance. Implement server-side credential verification using your adapter (prisma) or upgrade better-auth.",
      },
      { status: 501 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? String(err) }, { status: 500 });
  }
}
