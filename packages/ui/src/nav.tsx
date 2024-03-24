"use client";

import { APP_DOMAIN, HIDE_BACKGROUND_SEGMENTS, cn, fetcher } from "@dub/utils";
import va from "@vercel/analytics";
import Link from "next/link";
import { useParams, useSelectedLayoutSegment } from "next/navigation";
import useSWR from "swr";
import { useScroll } from "./hooks";
import { LogoType } from "./icons";
import { MaxWidthWrapper } from "./max-width-wrapper";

export function Nav() {
  const { domain = "7qr.codes" } = useParams() as { domain: string };
  const scrolled = useScroll(80);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(`sticky inset-x-0 top-0 z-30 w-full transition-all`, {
        "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
        "border-b border-gray-200 bg-white":
          selectedLayout && HIDE_BACKGROUND_SEGMENTS.includes(selectedLayout),
      })}
    >
      <MaxWidthWrapper
      >
        <div className="flex h-14 items-center justify-center">
          <div className="flex items-center space-x-4">
            <Link
              href={domain === "7qr.codes" ? "/" : `https://7qr.codes`}
              {...(domain !== "7qr.codes" && {
                onClick: () => {
                  va.track("Referred from custom domain", {
                    domain,
                    medium: "logo",
                  });
                },
              })}
            >
              <LogoType />
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
