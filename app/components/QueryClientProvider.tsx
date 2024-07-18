// components/QueryClientProvider.tsx
"use client";

import { ReactNode } from "react";
import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

interface QueryClientProviderProps {
  children: ReactNode;
}

const QueryClientProvider: React.FC<QueryClientProviderProps> = ({
  children,
}) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};

export default QueryClientProvider;
