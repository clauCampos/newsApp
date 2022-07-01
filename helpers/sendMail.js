const { MAILJET_PUBLIC_KEY, MAILJET_PRIVATE_KEY, SENDER_EMAIL, SENDER_NAME } = process.env;

import Mailjet from "node-mailjet";
const mailjet = Mailjet.connect(MAILJET_PUBLIC_KEY, MAILJET_PRIVATE_KEY);

export const sendMail = async (subject, content, recipient) => {
  await mailjet.post("send").request({
    FromEmail: SENDER_EMAIL,
    FromName: SENDER_NAME,
    Subject: subject,
    "Html-part": content,
    Recipients: [{ Email: recipient }],
  });
};
