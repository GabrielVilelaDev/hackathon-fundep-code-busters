import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, InputForm, Form } from '@design-system'
import z from 'zod'

const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
})

type LoginCredentials = z.infer<typeof loginSchema>

export const LoginForm = () => {
  const navigate = useNavigate()

  const form = useForm<LoginCredentials>()

  const onSubmit = async (data: LoginCredentials) => {
    navigate("/")
  }

  return (
    <Card className="w-full max-w-md min-w-[300px] shadow-lg md:min-w-[400px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Entre com suas credenciais para acessar o sistema
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputForm
              name='email'
              control={form.control}
              label="Email"
              type='email'
              placeholder="seu@email.com"
            />

            <InputForm
              name='password'
              control={form.control}
              label="Senha"
              type="password"
              placeholder="••••••••"
            />

            <Button
              type="submit"
              className="w-full"
            >
              Entrar
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
