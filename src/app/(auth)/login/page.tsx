"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { loginSchema, LoginFormValues } from "@/features/auth/schemas";
import { useLogin } from "@/features/auth/hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export default function LoginPage() {
  const router = useRouter();
  
  const { mutateAsync: login, isPending } = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "emilys",
      password: "emilyspass",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login(values);
      toast.success("Tizimga muvaffaqiyatli kirdingiz!");
      router.push("/dashboard");
    } catch {
      toast.error("Login yoki parol noto'g'ri!");
      form.setError("root", {
        message: "Login yoki parol noto'g'ri. Iltimos, tekshirib qayta kiring.",
      });
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">Tizimga kirish</CardTitle>
          <CardDescription>
            Boshqaruv paneliga kirish uchun ma'lumotlaringizni kiriting.
            <br/>
            <span className="text-xs text-muted-foreground">(Test uchun: emilys / emilyspass)</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FieldGroup>
              
              {/* Username Maydoni */}
              <Controller
                name="username"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="username">Foydalanuvchi nomi</FieldLabel>
                    <Input
                      {...field}
                      id="username"
                      aria-invalid={fieldState.invalid}
                      placeholder="emilys"
                      disabled={isPending}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

              {/* Password Maydoni */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Parol</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      aria-invalid={fieldState.invalid}
                      placeholder="••••••••"
                      disabled={isPending}
                    />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />

            </FieldGroup>

            {/* Global Xatolik */}
            {form.formState.errors.root && (
              <div className="text-sm font-medium text-destructive">
                {form.formState.errors.root.message}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Tizimga kirilmoqda..." : "Kirish"}
            </Button>
            
          </form>
        </CardContent>
      </Card>
    </div>
  );
}