"use client";
import { HydrationBoundary } from "@tanstack/react-query";
import { ReactNode } from "react";

export default function HydrateClient({ state, children }: { state: unknown; children: ReactNode }) {
	return <HydrationBoundary state={state}>{children}</HydrationBoundary>;
}
