import * as z from 'zod';


export const SignInSchema = z.object({
  email: z.string().email({
    message: 'Por favor insira um email valido'
  }),
  password: z.string()
});

export type TSignInSchema = z.infer<typeof SignInSchema>
const plans = ['free', 'basic', 'pro', 'premium'] as const

export type Plans = (typeof plans)[number]

export const mappedPlans: {[key in Plans]: string} = {
  free: 'Gratis',
  basic: 'Basico',
  pro: 'Profissional',
  premium: 'Premium'
}

export const SignUpSchema = z.object({
  name: z.string().min(3, {
    message: 'O nome tem que ser maior a 3 carateres.'
  }).max(200, {
    message: 'O nome tem que ser menor a 200 carateres.'
  }).transform(name => {  
    return name.trim().split(' ').map(word => {
     return word[0].toLocaleUpperCase().concat(word.substring(1))
  }).join(' ')}),
  email: z.string().email({
    message: 'Por favor insira um email valido.'
  }).transform(email => { return email.toLowerCase()}),
  password: z.string().min(6, {
    message: 'A senha tem que ser maior a 6 carateres'
  }),
  confirmPassword: z.string(),
  dateOfBirth: z.string().refine(dob => `${new Date(dob)}` !==  "Invalid Date", {
    message: 'Por favor selecione uma data valida'
  }).transform( dob => { return new Date(dob) }),
  plan: z.enum(plans, {
    errorMap: () => ({message: 'Por favor selecione um plano'})
  })
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas devem ser identicas.',
  path: ['confirmPassword']
});


export type TSignUpSchema = z.infer<typeof SignUpSchema>