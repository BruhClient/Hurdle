

import type { Metadata } from "next";
import { Jua } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Providers from "@/components/providers/provider";
import { EdgeStoreProvider } from "@/lib/edgestore";
import { Toaster } from "@/components/ui/toaster";


const jua = Jua({
  weight : ["400"], 
  variable: "--font-jua",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hurdle",
  description: "Created by Next.js",
};

export default function RootLayout({
  children,
  authModal
}: Readonly<{
  children: React.ReactNode;
  authModal : React.ReactNode
}>) {


  
  return (

    
    <html lang="en">
      <Providers>
        
        <EdgeStoreProvider>
        <body
          className={`${jua.variable} font-jua antialiased`}
        >

          
          <Navbar /> 
          {children}
          
          {authModal}
          <Toaster />
        </body>
        
        </EdgeStoreProvider>
      </Providers>
      
    </html>
  );
}
