"use client";

import { redirect } from "next/navigation";
import React from "react";

export default function Home() {
  redirect("/onboarding");
  return <></>;
}
