"use client";
import {
  SignInSchema,
  SignUpSchema,
  TSignInSchema,
  TSignUpSchema,
} from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { Form } from "@/app/components/Form";
import CardWrapper from "@/app/components/auth/CardWrapper";
import { signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { IconArrowRight, IconLoader3 } from "@tabler/icons-react";
import { checkExistingUser } from "./actions";
import { trpc } from "@/app/_trpc/client";

export default function SignIn() {
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();
  const createUser = trpc.user.create.useMutation();
  const pathname = usePathname();
  const signInForm = useForm<TSignUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      confirmPassword: "",
      name: "",
    },
  });
  const {
    formState: { isSubmitting },
    watch,
    handleSubmit,
    reset,
    setError,
  } = signInForm;

  const userPassword = watch("password");
  const isPasswordStrong = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])",
  ).test(userPassword);

  const email = watch("email");
  const checkEmail = async () => {
    setLoading(true);
    if (email && email.length > 3) {
      const existingUser = await checkExistingUser(email);
      if (existingUser) setName(`${existingUser?.name}`);
      setLoading(false);
      existingUser ? setCurrentStep(1) : setCurrentStep(2);
    } else {
      setLoading(false);
      setError("email", { message: "Por favor insira um email valido." });
    }
  };
  const checkPassword = async () => {
    setLoading(true);
    if (userPassword) {
      setLoading(false);
      setCurrentStep(3);
    } else {
      setLoading(false);
      setError("confirmPassword", {
        message: "Por favor insira uma palavra passe",
      });
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (currentStep === 0) {
      if (event.key === "Enter") {
        event.preventDefault();
        checkEmail();
      }
    }
    if (currentStep === 1) {
      if (event.key === "Enter") {
        event.preventDefault();
        logInUser({ email, password: userPassword });
      }
    }
    if (currentStep === 2) {
      if (event.key === "Enter") {
        event.preventDefault();
        checkPassword();
      }
    }
  };
  const onSubmit = (data: TSignUpSchema) => {
    if (currentStep === 1) {
      logInUser({ email: email, password: userPassword });
    }
    if (currentStep === 3) {
      registerUser(data);
    }
  };
  const logInUser = async (data: TSignInSchema) => {
    setLoading(true);
    const signInData = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signInData?.error) console.error(signInData.error);
    else {
      setLoading(false);
      setCurrentStep(4);
      router.refresh();
      if (pathname === "/signin") {
        router.push("/");
      }

      reset();
    }
  };
  const registerUser = async (data: TSignUpSchema) => {
    setLoading(true);
    createUser.mutate(
      { ...data },
      {
        onSettled: async () => {
          await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });

          setLoading(false);
          setCurrentStep(4);
          router.refresh();
          if (pathname === "/signin") {
            router.push("/");
          }
          reset();
        },
        onError: () => console.error("something went wrong"),
      },
    );
    setLoading(false);
  };

  return (
    <CardWrapper
      headerLabel="Acesse ou crie uma conta com:"
      showSocial
      email={email}
      name={name.split(" ")[0]}
      step={currentStep}
    >
      <FormProvider {...signInForm}>
        <form
          onSubmit={handleSubmit((data) => onSubmit(data))}
          onKeyDown={(e) => handleKeyDown(e)}
          className="flex flex-col pt-3 gap-[26px] w-full"
        >
          {currentStep === 0 && (
            <>
              <Form.Field>
                <Form.Input
                  type="email"
                  name="email"
                  placeholder="exemplo@email.com"
                  hasIcon
                />
                <Form.ErrorMessage field="email" />
              </Form.Field>
              <button
                type="button"
                disabled={loading}
                onClick={() => checkEmail()}
                className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-[#015F43]  dark:bg-zinc-50 hover:bg-[#1f1f1f] text-zinc-50 dark:text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
              >
                <div className="flex flex-1 justify-center items-center gap-2">
                  {loading ? (
                    <IconLoader3 className=" animate-spin text-zinc-200/60 dark:text-[#1f1f1f]" />
                  ) : (
                    <>
                      <span className="text-base leading-6 text-nowrap">
                        Continuar
                      </span>
                      <IconArrowRight />
                    </>
                  )}
                </div>
              </button>
            </>
          )}

          {currentStep === 1 && (
            <>
              <Form.Field>
                <Form.Input
                  type="password"
                  name="password"
                  placeholder="palavra-passe"
                  hasIcon
                />
                <Form.ErrorMessage field="password" />
              </Form.Field>
              <button
                onClick={() => logInUser({ email, password: userPassword })}
                disabled={loading}
                className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-[#015F43]  dark:bg-zinc-50 hover:bg-[#1f1f1f] text-zinc-50 dark:text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
              >
                <div className="flex flex-1 justify-center items-center gap-2">
                  {loading ? (
                    <IconLoader3 className=" animate-spin text-zinc-200/60 dark:text-[#1f1f1f]" />
                  ) : (
                    <>
                      <span className="text-base leading-6 text-nowrap">
                        Iniciar sessão
                      </span>
                    </>
                  )}
                </div>
              </button>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="flex flex-col gap-2">
                <Form.Field>
                  <Form.Label htmlFor="password">
                    {userPassword &&
                      (isPasswordStrong ? (
                        <span className="text-xs text-emerald-600">
                          Senha forte
                        </span>
                      ) : (
                        <span className="text-xs text-red-500">
                          Senha fraca
                        </span>
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
                  <Form.Input
                    placeholder="Confirme a palavra-passe"
                    type="password"
                    name="confirmPassword"
                    hasIcon
                  />
                  <Form.ErrorMessage field="confirmPassword" />
                </Form.Field>
              </div>
              <button
                type="button"
                disabled={loading}
                onClick={() => checkPassword()}
                className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-[#015F43]  dark:bg-zinc-50 hover:bg-[#1f1f1f] text-zinc-50 dark:text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
              >
                <div className="flex flex-1 justify-center items-center gap-2">
                  {loading ? (
                    <IconLoader3 className=" animate-spin text-zinc-200/60 dark:text-[#1f1f1f]" />
                  ) : (
                    <>
                      <span className="text-base leading-6 text-nowrap">
                        Continuar
                      </span>
                      <IconArrowRight />
                    </>
                  )}
                </div>
              </button>
            </>
          )}
          {currentStep === 3 && (
            <>
              <Form.Field>
                <Form.Input
                  type="text"
                  name="name"
                  placeholder="Nome completo"
                  hasIcon
                />
                <Form.ErrorMessage field="password" />
              </Form.Field>
              <button
                type="submit"
                disabled={loading}
                className="relative inline-flex flex-shrink-0 justify-center items-center rounded-md transition-colors ease-in-out duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed disabled:select-none border-none cursor-pointer bg-[#015F43]  dark:bg-zinc-50 hover:bg-[#1f1f1f] text-zinc-50 dark:text-[#143229]  hover:text-white px-8 py-3 text-2xl w-full"
              >
                <div className="flex flex-1 justify-center items-center gap-2">
                  {loading ? (
                    <IconLoader3 className=" animate-spin text-zinc-200/60 dark:text-[#1f1f1f]" />
                  ) : (
                    <>
                      <span className="text-base leading-6 text-nowrap">
                        Criar conta
                      </span>
                    </>
                  )}
                </div>
              </button>
            </>
          )}
        </form>
      </FormProvider>
    </CardWrapper>
  );
}
