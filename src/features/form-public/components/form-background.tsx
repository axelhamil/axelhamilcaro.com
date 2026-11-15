import Image from "next/image";
import type { ReactNode } from "react";
import type { Form } from "@/drizzle/schema";
import { formThemeStyle } from "@/src/features/form-public/lib/form-theme";

interface FormPageBackgroundProps {
  form: Form;
  children: ReactNode;
}

export function FormPageBackground({
  form,
  children,
}: FormPageBackgroundProps) {
  const image = form.backgroundType === "image" ? form.backgroundImage : null;

  return (
    <main
      className="form-page trame relative isolate flex min-h-svh flex-col items-center justify-center gap-6 px-4 py-12 sm:p-10"
      style={formThemeStyle(form)}
    >
      {image ? (
        <div aria-hidden="true" className="form-fond absolute inset-0 -z-10">
          <Image
            src={image}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <p
        aria-hidden="true"
        className="form-adresse label-mono ink-muted self-stretch flex justify-between gap-4"
      >
        <span>axelhamilcaro.com</span>
        <span className="truncate">/f/{form.slug}</span>
      </p>

      <div className="w-full">{children}</div>
    </main>
  );
}
