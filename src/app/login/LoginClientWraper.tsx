"use client";

import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import LoginClient from "./LoginClient";

const CheckoutClient = dynamic(() => import("./LoginClientWraper"), {
  ssr: false,
});

export default function LoginClientWraper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <LoginClient />
    </Suspense>
  );
}
