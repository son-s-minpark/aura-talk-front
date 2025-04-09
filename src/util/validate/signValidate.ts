import { mailSchema, pwSchema } from "@/schema/signSchema";

export function validateMail(mail: string) {
  const result = mailSchema.shape.mail.safeParse(mail);
  if (!result.success) {
    return result.error.errors[0].message;
  }
  return;
}

export function validatePw(pw: string) {
  const result = pwSchema.shape.pw.safeParse(pw);
  if (!result.success) {
    return result.error.errors[0].message;
  }
  return;
}
