import z from "zod";

export const nicknameSchema = z.object({
  nickname: z
    .string()
    .min(1, { message: "이름은 1글자 이상이어야 합니다." })
    .max(15, { message: "이름은 15자 이하여야 합니다." })
    .refine((val) => !val.includes(" "), {
      message: "이름에 공백이 포함되어서는 안 됩니다.",
    }),
});

export const usernameSchema = z.object({
  username: z
    .string()
    .min(3, { message: "아이디는 1글자 이상이어야 합니다." })
    .max(15, { message: "아이디는 15자 이하여야 합니다." })
    .refine((val) => !val.includes(" "), {
      message: "이름에 공백이 포함되어서는 안 됩니다.",
    }),
});

export const mailSchema = z.object({
  mail: z
    .string()
    .nonempty({ message: "메일을 입력해주세요." })
    .email({ message: "올바르지 않은 메일 형식입니다." }),
});

export const pwSchema = z.object({
  pw: z
    .string()
    .min(6, { message: "비밀번호는 최소 6자 이상이어야 합니다." })
    .nonempty({ message: "비밀번호를 입력해주세요." })
    .regex(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_\-+=\[{\]};:'",<.>/?\\|`~]).{6,}$/,
      "올바르지 않은 비밀번호 형식입니다."
    ),
});
