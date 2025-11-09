import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TrustLink – Smart Verification Hub",
  description: "A Smart Verification Hub for Internships, Promotions & Scam Reports",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
          {children}
        </main>
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 py-8">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  TrustLink
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Empowering users to stay safe, stay informed, and stay smart online.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">About</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About Us</a></li>
                  <li><a href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact</a></li>
                  <li><a href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="/report" className="hover:text-blue-600 dark:hover:text-blue-400">Report Scam</a></li>
                  <li><a href="/faq" className="hover:text-blue-600 dark:hover:text-blue-400">FAQs</a></li>
                  <li><a href="/guidelines" className="hover:text-blue-600 dark:hover:text-blue-400">Guidelines</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Twitter</a></li>
                  <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">GitHub</a></li>
                  <li><a href="#" className="hover:text-blue-600 dark:hover:text-blue-400">Discord</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
              <p>&copy; {new Date().getFullYear()} TrustLink. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
