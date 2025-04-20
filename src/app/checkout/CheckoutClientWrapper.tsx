"use client";

import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const CheckoutClient = dynamic(() => import("./CheckoutClient"), {
  ssr: false,
});

export default function CheckoutClientWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <CheckoutClient />
    </Suspense>
  );
}
