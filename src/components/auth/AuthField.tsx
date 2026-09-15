import { cn } from "@/lib/utils";

export const authInputClass = "field px-3.5 py-3 text-sm focus:border-ink focus:outline-none";

export const authLabelClass = "eyebrow mb-2 block";

export function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p className="mt-1.5 text-xs text-danger" role="alert">
      {errors[0]}
    </p>
  );
}

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  errors?: string[];
}

export function Field({ label, name, errors, className, ...rest }: FieldProps) {
  return (
    <div>
      <label htmlFor={name} className={authLabelClass}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={errors?.length ? true : undefined}
        className={cn(authInputClass, errors?.length ? "border-danger" : undefined, className)}
        {...rest}
      />
      <FieldError errors={errors} />
    </div>
  );
}
