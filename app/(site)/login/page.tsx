import { Suspense } from "react";
import { LoginFooter } from "@/src/features/auth/components/login-footer";
import { LoginForm } from "@/src/features/auth/components/login-form";
import { LoginLoading } from "@/src/features/auth/components/login-loading";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center px-6 bg-primary-background relative overflow-hidden">
      <Suspense fallback={<LoginLoading />}>
        <LoginForm />
      </Suspense>
      <LoginFooter />
    </div>
  );
}
