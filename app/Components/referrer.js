"use client";
export function logReferrerInfo() {
    const referer = document.referrer || "direct";

    const params = new URLSearchParams(window.location.search);
    const utm_source = params.get("utm_source") || "";
    const utm_medium = params.get("utm_medium") || "";
    const utm_campaign = params.get("utm_campaign") || "";

    console.log("=== Source Tracking ===");
    console.log("Referer header:", referer);

    if (referer.includes("facebook.com")) {
      console.log("from: facebook");
    } else if (referer.includes("instagram.com")) {
      console.log("from: instagram");
    } else if (referer.includes("tiktok.com")) {
      console.log("from: tiktok");
    } else if (referer.includes("google.com")) {
      console.log("from: google search");
    } else if (referer === "direct") {
      console.log("from: direct");
    } else {
      console.log("from: unknown", referer);
    }

    if (utm_source || utm_medium || utm_campaign) {
      console.log("--- UTM params ---");
      console.log("utm_source:", utm_source);
      console.log("utm_medium:", utm_medium);
      console.log("utm_campaign:", utm_campaign);
    }
  }