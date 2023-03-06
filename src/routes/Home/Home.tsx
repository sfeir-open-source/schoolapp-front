import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Schools from "./components/Schools";
import { QueryClient, QueryClientProvider } from "react-query";


export default function Home() {
  const queryClient = new QueryClient();

  return (
    <div className="p-4">
      <Header/>
      <QueryClientProvider client={queryClient}>
      <Schools/>
      </QueryClientProvider>
    </div>
  );
}
