import Image from "next/image";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import React from "react";
import Logo from "../../public/images/main-logo.png";
import Menu from "../../components/Menu";
import Navbar from "../../components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";

// Initializing the Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className={`h-screen flex flex-col ${montserrat.className}`}>
            {/* Container Holding Navbar and Logo */}
            <div className="flex fixed z-1000 w-full">
              {/* Logo Section */}
              <div className="w-[20%] bg-[#EEF8FE] py-4 border-b border-[#D9D9D9]">
                <Link
                  href="/"
                  className="flex items-center justify-center mt-6"
                >
                  <Image src={Logo} alt="logo" width={182} height={35} />
                </Link>
              </div>

              {/* Navbar Section */}
              <div className="w-[80%] bg-white border-b border-[#D9D9D9]">
                <Navbar />
              </div>
            </div>

            {/* Horizontal line */}
            <div className="w-full border-b border-[#D9D9D9]"></div>

            {/* Menu Section and Content Section */}
            <div className="flex pt-[110px]">
              {/* Menu Section */}
              <div className="w-[20%] bg-[#EEF8FE] fixed h-screen flex flex-col">
              <div 
                  className="flex-1 overflow-y-auto py-6"
                  style={{scrollbarWidth: 'thin', scrollbarColor: 'rgba(135,140,141,0.15) transparent'}}
                >
                  <Menu />
                </div>
              </div>
              

              {/* Content Section */}
              <div className="w-[80%] ml-[20%] bg-white px-14">{children}</div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
