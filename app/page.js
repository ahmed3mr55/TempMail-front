"use client";
import CreateMail from "./Components/CreateMail";
import { logReferrerInfo } from "./Components/referrer";

export default function Home() {

  logReferrerInfo();

  return (
    <div className="min-h-screen p-4">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Left Sidebar */}
        <aside className="hidden md:block col-span-1 sticky top-4">
          <div className="bg-white  p-4 space-y-4">
            <h3 className="text-xl font-bold text-gray-800">Key Features</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
              <li>
                <span className="font-semibold">Instant Inbox Access</span> –
                Ready in seconds, no delays.
              </li>
              <li>
                <span className="font-semibold">Customizable Expiry</span> –
                Choose 1 to 24 hours lifespan.
              </li>
              <li>
                <span className="font-semibold">Unlimited Aliases</span> –
                Multiple addresses across domains.
              </li>
              <li>
                <span className="font-semibold">Anti‑Spam & Phishing</span> –
                Advanced filters against unwanted mail.
              </li>
              <li>
                <span className="font-semibold">Full Privacy</span> – No logs,
                no tracking.
              </li>
              <li>
                <span className="font-semibold">Mobile‑Ready & API</span> –
                Responsive UI and public API.
              </li>
            </ol>
          </div>
        </aside>

        {/* Main Content */}
        <main className="col-span-3">
          <CreateMail />
          {/* SEO Content Section */}
          <section className="mt-8 p-6 space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">About Misho</h2>
            <p className="text-gray-600 leading-relaxed">
              <strong>Misho</strong> is the premier free temporary email
              service, designed as the best alternative to Mohmal and other
              disposable email providers. With Misho, you can quickly generate a{" "}
              <em>temporary email</em> address to safeguard your primary inbox
              from spam, phishing, and unwanted newsletters.
            </p>
            <h3 className="text-xl font-semibold text-gray-800">
              Why Misho Over Mohmal?
            </h3>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>Faster Delivery:</strong> Misho's optimized servers
                ensure incoming emails appear instantly in your temporary inbox.
              </li>
              <li>
                <strong>Flexible Expiration:</strong> Set your email to
                self-destruct anytime between 1 and 24 hours, unlike Mohmal’s
                fixed timers.
              </li>
              <li>
                <strong>Unlimited Aliases:</strong> Create and manage multiple
                disposable addresses for various tasks and domains.
              </li>
              <li>
                <strong>Robust Security:</strong> Advanced anti-spam and
                phishing filters protect you from malicious content.
              </li>
              <li>
                <strong>Privacy-First:</strong> Zero tracking and strict no-logs
                policy guarantee complete anonymity.
              </li>
            </ul>
            <h3 className="text-xl font-semibold text-gray-800">
              Core Features
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Our service offers <em>throwaway email</em> creation without any
              registration or captcha, allowing you to get a disposable mailbox
              in under 5 seconds. The intuitive interface, responsive design,
              and robust public API make Misho suitable for both casual users
              and developers seeking to integrate <em>temp email</em>{" "}
              functionality into their projects.
            </p>
            <h3 className="text-xl font-semibold text-gray-800">
              How to Get Started
            </h3>
            <ol className="list-decimal list-inside text-gray-600 space-y-2">
              <li>
                Click on "Create New Email" to generate your first{" "}
                <em>temp mailbox</em>.
              </li>
              <li>
                Select your desired expiration time (1–24 hours) using the
                intuitive dropdown.
              </li>
              <li>
                Copy your disposable email address and use it anywhere online.
              </li>
            </ol>
            <p className="text-gray-600 leading-relaxed">
              Don’t let spam clutter your main inbox—switch to{" "}
              <strong>Misho</strong> today and experience the next level of{" "}
              <em>disposable email</em> services. Superior speed, security, and
              privacy ensure Misho ranks at the top of search results for anyone
              looking for a reliable <em>temp mail</em> solution.
            </p>
          </section>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden md:block col-span-1 sticky top-4">
          <div className=" p-4 text-sm text-gray-600 leading-relaxed space-y-4">
            <h4 className="text-lg font-bold text-gray-800">Quick Overview</h4>
            <p>
              Misho offers you a hassle-free way to protect your inbox from
              unwanted spam and maintain your online privacy with a single
              click.
            </p>
            <p>
              Generate a disposable email address, choose your expiry time, and
              forget about unsolicited emails!
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
