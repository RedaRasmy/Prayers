'use client'
import Buttom from "./components/Buttom";
import Top from "./components/Top";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient()

export default function Home() {

    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-[100dvh]">
                
                <Top/>
                <Buttom/>
            </div>
        </QueryClientProvider>
    )
}
