"use client";
import { QueryClient, QueryClientProvider } from "react-query";
export const client = new QueryClient();
const QueryClientProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
export default QueryClientProviderWrapper;
