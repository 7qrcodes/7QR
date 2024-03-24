import Link from "next/link";
import { LogoType } from "./icons";

const navigation = {
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Report Abuse", href: "/abuse" },
    { name: "Imprint", href: "/imprint" },
  ],
};

export function Footer() {
  const createHref = (href: string) => `https://7qr.codes${href}`;

  return (
    <footer className="bg-primary text-primary-foreground z-10 py-8">
      <div className="flex w-full flex-col items-center">
        <LogoType className="h-[28px] w-[100px]" />
        <p className="text-primary-foreground mt-8 px-4 text-sm leading-5">
          © {new Date().getFullYear()} 7QR.CODES | Made in Switzerland | Av.
          des Grandes-Communes 8 | Geneva 🇨🇭
        </p>
      </div>
      <div className="my-6 flex md:items-center">
        <ul role="list" className="mx-auto flex flex-wrap justify-center gap-4">
          {navigation.legal.map((item) => (
            <li key={item.name}>
                <Link href={createHref(item.href)} className="text-sm">
                  {item.name}
                </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
