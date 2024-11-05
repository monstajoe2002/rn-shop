import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

const query = new QueryClient();

import React from "react";

export default function QueryProvider({ children }: PropsWithChildren) {
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}
