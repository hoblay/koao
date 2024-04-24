import * as z from "zod";

export const SignInSchema = z.object({
  email: z.string().email({
    message: "Por favor insira um email valido",
  }),
  password: z.string(),
});

export type TSignInSchema = z.infer<typeof SignInSchema>;
export const plans = ["free", "basic", "pro", "premium"] as const;

export type Plans = (typeof plans)[number];

export const mappedPlans: { [key in Plans]: string } = {
  free: "Gratis",
  basic: "Basico",
  pro: "Profissional",
  premium: "Premium",
};

export const SignUpSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "O nome tem que ser maior a 3 carateres.",
      })
      .max(200, {
        message: "O nome tem que ser menor a 200 carateres.",
      })
      .transform((name) => {
        return name
          .trim()
          .split(" ")
          .map((word) => {
            return word[0].toLocaleUpperCase().concat(word.substring(1));
          })
          .join(" ");
      }),
    email: z
      .string()
      .email({
        message: "Por favor insira um email valido.",
      })
      .transform((email) => {
        return email.toLowerCase();
      }),
    password: z.string().min(6, {
      message: "A senha tem que ser maior a 6 carateres",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas devem ser identicas.",
    path: ["confirmPassword"],
  });

export type TSignUpSchema = z.infer<typeof SignUpSchema>;

export const CreateCourseSchema = z.object({
  title: z.string().min(10, {
    message: "O titulo tem que ser maior a 10 carateres.",
  }),
});

export type TCreateCourseSchema = z.infer<typeof CreateCourseSchema>;

export const CreateChapterSchema = z.object({
  courseId: z.string(),
  title: z.string().min(10, {
    message: "O titulo tem que ser maior a 10 carateres.",
  }),
  description: z.string().min(20, {
    message: "A descriççao tem que ser maior a 20 carateres.",
  }),
});

export type TCreateChapterschema = z.infer<typeof CreateChapterSchema>;

export const CreateChapterFront = z.object({
  title: z.string().min(10, {
    message: "O titulo tem que ser maior a 10 carateres.",
  }),
  description: z.string().min(20, {
    message: "A descriççao tem que ser maior a 20 carateres.",
  }),
});

export type TCreateChaptersFront = z.infer<typeof CreateChapterFront>;

export const UpdateDurationSchema = z.object({
  videoId: z.string(),
  duration: z.number(),
});

export type TUpdateDurationSchema = z.infer<typeof UpdateDurationSchema>;

export const UpdateLessonTitleSchema = z.object({
  lessonId: z.string(),
  title: z.string().min(3, {
    message: "O titulo tem que ser maior a 3 carateres.",
  }),
});

export type TUpdateLessonTitleSchema = z.infer<typeof UpdateLessonTitleSchema>;

export const CreateCategorySchema = z.object({
  categoryName: z.string().min(3, {
    message: "O nome tem que ser maior a 3 carateres.",
  }),
  slug: z.string().min(3, {
    message: "O slug tem que ser maior a 3 carateres.",
  }),
});

export type TCreateCategorySchema = z.infer<typeof CreateCategorySchema>;
