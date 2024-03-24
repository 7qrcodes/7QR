"use client";

import { InlineSnippet } from "@dub/ui";
import va from "@vercel/analytics";
import { useParams } from "next/navigation";

export default function PlaceholderContent() {
  const { domain } = useParams() as { domain: string };

  return (
      <div className="flex flex-col justify-center">
        <div className="mx-auto flex max-w-xs flex-col space-y-10 sm:max-w-lg">
          <h1 className="font-display text-2xl font-bold">
            Hey there, this is a Custom Domain from 7QR
          </h1>
          <p className="text-sm">
            The link you clicked may not be working. Please make sure the link
            you clicked on or typed contains letters or numbers after the
            forward-slash (“/”).
          </p>
          <p className="text-sm">
            <InlineSnippet>{domain}</InlineSnippet> is a custom domain on{" "}
            <a
              className="bg-clip-text font-semibold hover:underline"
              href="https://7qr.codes"
              onClick={() =>
                va.track("Referred from custom domain", {
                  domain,
                  medium: "text",
                })
              }
            >
              7QR
            </a>{" "}
            - a great platform to boost your businesses with QR Codes.
          </p>
          <p className="text-sm">
            Want to create your own QR Codes with 7QR?{" "}
            <a
              href="https://7qr.codes"
              className="text-pink-medium font-medium hover:underline"
            >
              Click here
            </a>{" "}
            to discover how it can help you grow!
          </p>
        </div>
      </div>
  );
}
