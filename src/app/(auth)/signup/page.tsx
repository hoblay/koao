"use client";

import { SignUpSchema, TSignUpSchema, mappedPlans } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

import { Form } from "@/app/components/Form";
import CardWrapper from "@/app/components/auth/CardWrapper";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { IconLoader3 } from "@tabler/icons-react";
import { trpc } from "@/app/_trpc/client";

export default function SignUp() {
  const createUser = trpc.user.create.useMutation();
  const router = useRouter();

  const registerForm = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting },
    reset,
  } = registerForm;

  const userPassword = watch("password");
  const isPasswordStrong = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])",
  ).test(userPassword);

  const plansOptions = Object.entries(mappedPlans).map(([key, value]) => (
    <option value={key} key={key}>
      {value}{" "}
    </option>
  ));

  const registerUser = async (data: TSignUpSchema) => {
    createUser.mutate(
      { ...data, dateOfBirth: `${data.dateOfBirth}` },
      {
        onSettled: async () => {
          await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });
          router.push("/");
          reset();
        },
        onError: () => console.error("something went wrong"),
      },
    );
  };

  return (
    <CardWrapper
      headerLabel="Cria uma conta "
      backButonLabel="Já tens uma conta?"
      backButtonHref="/signin"
      showSocial
    >
      <div className="">
        <FormProvider {...registerForm}>
          <form
            onSubmit={handleSubmit(registerUser)}
            className="flex flex-col gap-6 w-full max-w-xs"
          >
            <Form.Field>
              <Form.Label htmlFor="name">Nome completo</Form.Label>
              <Form.Input
                placeholder="João Lourenço"
                type="text"
                name="name"
                hasIcon
              />
              <Form.ErrorMessage field="name" />
            </Form.Field>

            <Form.Field>
              <Form.Label htmlFor="email">E-mail</Form.Label>
              <Form.Input
                placeholder="example@email.com"
                type="email"
                name="email"
                hasIcon
              />
              <Form.ErrorMessage field="email" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="password">
                Palavra-passe
                {userPassword &&
                  (isPasswordStrong ? (
                    <span className="text-xs text-emerald-600">
                      Senha forte
                    </span>
                  ) : (
                    <span className="text-xs text-red-500">Senha fraca</span>
                  ))}
              </Form.Label>
              <Form.Input
                placeholder="Palavra-passe"
                type="password"
                name="password"
                hasIcon
              />
              <Form.ErrorMessage field="password" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="confirmPassword">
                Confirme a palavra-passe
              </Form.Label>
              <Form.Input
                placeholder="Palavra-passe"
                type="password"
                name="confirmPassword"
                hasIcon
              />
              <Form.ErrorMessage field="confirmPassword" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="dateOfBirth">Data de nascimento</Form.Label>
              <Form.Input
                type="date"
                name="dateOfBirth"
                placeholder="07/01/2001"
                hasIcon
              />
              <Form.ErrorMessage field="dateOfBirth" />
            </Form.Field>
            <Form.Field>
              <Form.Label htmlFor="plan">plan</Form.Label>
              <Form.Input type="select" name="plan">
                {plansOptions}
              </Form.Input>
              <Form.ErrorMessage field="plan" />
            </Form.Field>
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-500 text-white rounded px-3 h-10 font-semibold text-sm hover:bg-purple-600 flex justify-center items-center  disabled:bg-purple-950"
            >
              {isSubmitting ? (
                <IconLoader3 className=" animate-spin text-zinc-200/60" />
              ) : (
                <span className="text-base">Criar conta</span>
              )}
            </button>
          </form>
        </FormProvider>
      </div>
    </CardWrapper>
  );
}
