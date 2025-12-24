import { Resend } from "resend";
import { createWelcomeEmailTemplate } from "./emailTemplete.js";
import { Env } from "../config/env.js";

const resend = new Resend(Env.RESEND_KEY);

export const sendNewUser = async function (newUserName) {
  const { data, error } = await resend.emails.send({
    from: `${newUserName} ${Env.RESEND_EMAIL}`,
    to: "mohanedhatem44@gmail.com",
    subject: "Wellcome To Tello",
    html: createWelcomeEmailTemplate(newUserName),
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
};
