import { render } from "@react-email/render";
import { Client } from "postmark";
import { JSXElementConstructor, ReactElement } from "react";

export const client = new Client(process.env.POSTMARK_API_KEY as string);

export const sendEmail = async ({
  email,
  subject,
  from,
  text,
  react,
  marketing,
}: {
  email: string;
  subject: string;
  from?: string;
  text?: string;
  react?: ReactElement<any, string | JSXElementConstructor<any>>;
  marketing?: boolean;
}) => {
  if (!process.env.POSTMARK_API_KEY) {
    console.log(
      "Postmark is not configured. You need to add a POSTMARK_API_KEY in your .env file for emails to work.",
    );
    return Promise.resolve();
  }

  return client.sendEmail({
    From: "contact@7qr.codes",
    To: email,
    Subject: subject,
    ...(text && { TextBody: text }),
    ...(react && { HtmlBody: render(react) }),
    ...(marketing && {
      MessageStream: "broadcast",
    }),
  });
};
