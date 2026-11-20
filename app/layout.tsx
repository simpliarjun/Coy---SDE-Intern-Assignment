import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Coy",
  description: "Find out if your crush likes you back. If they don't, nobody ever knows.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#FFFFFF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-[100vh] h-[100dvh] bg-[#F6F4FA] flex flex-col items-center justify-center md:py-3 md:px-4 selection:bg-pink-100 selection:text-pink-600 font-sans text-coy-dark antialiased overflow-hidden">
        
        <div
          data-impeccable-ignore="hard-offset-shadow"
          className="w-full max-w-[430px] h-[100dvh] min-h-[100vh] md:h-[min(844px,calc(100dvh-1.5rem))] md:min-h-0 md:max-h-[844px] bg-white relative flex flex-col md:rounded-[36px] md:border-[2.5px] md:border-coy-dark md:shadow-[4px_4px_0px_#15121D] overflow-hidden"
        >
          {children}
        </div>
      </body>
    </html>
  );
}
