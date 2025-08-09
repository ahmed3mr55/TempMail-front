import "./globals.css";
import Navbar from "./Components/Navbar";
import { EmailProvider } from "./context/EmailContext";

export const metadata = {
  title: "Misho Temp Email – Instant Disposable Email Inbox",
  description:
    "Generate a secure, temporary email address in seconds—perfect for sign‑ups, testing, and protecting your privacy. Free, no sign‑up, auto‑expires in up to 24 hours.",
  openGraph: {
    title: "Misho Temp Email – Instant Disposable Email Inbox",
    description:
      "Get a free, secure disposable email address in seconds. Perfect for one‑time sign‑ups, QA testing, and staying spam‑free. Auto‑expires up to 24h—no registration needed.",
    url: "https://misho.cfd/",
    siteName: "Misho Temp Email",
    images: [
      {
        url: "https://misho.cfd/og-image.png",
        width: 1200,
        height: 630,
        alt: "Misho Temp Email",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@misho_temp",
    title: "Misho Temp Email – Instant Disposable Email Inbox",
    description:
      "Free temporary email addresses—no signup required, auto‑delete in up to 24h. Perfect for privacy, spam avoidance, and quick testing.",
    images: ["https://misho.cfd/twitter-card.png"],
  },
  verification: {
    google: "YafA4fz1sulMQKC4YVRLD9mSLh9gtZt9nPHGaxU7DAc",
  }
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
