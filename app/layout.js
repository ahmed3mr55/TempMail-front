import "./globals.css";
import Navbar from "./Components/Navbar";
import { EmailProvider } from "./context/EmailContext";

export const metadata = {
  title: "Misho Temp Email – Free Temporary Email with Cross-Device Login",
  description:
    "Create a secure, free temporary email address in seconds. Access your disposable inbox from any device, perfect for sign-ups, testing, and avoiding spam. No registration required—expires in 1h to 30 days.",
  openGraph: {
    title: "Misho Temp Email – Free Temporary Email with Cross-Device Login",
    description:
      "Generate a free, secure disposable email in seconds and access it from any device. Ideal for one-time sign-ups, QA testing, and staying spam-free. Auto-expires in 1h to 30 days—no signup needed.",
    url: "https://misho.cfd/",
    siteName: "Misho Temp Email",
    images: [
      {
        url: "https://misho.cfd/og-image.png",
        width: 1200,
        height: 630,
        alt: "Misho Temp Email – Cross-Device Disposable Inbox",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@misho_temp",
    title: "Misho Temp Email – Free Disposable Email with Cross-Device Access",
    description:
      "Free temporary email addresses with secure cross-device login. No signup, spam-proof, and expires in 1h–30 days. Perfect for privacy, testing, and quick sign-ups.",
    images: ["https://misho.cfd/twitter-card.png"],
  },
  verification: {
    google: "YafA4fz1sulMQKC4YVRLD9mSLh9gtZt9nPHGaxU7DAc",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <EmailProvider>
          <Navbar />
          <div className="h-21"></div>
          {children}
        </EmailProvider>
      </body>
    </html>
  );
}
