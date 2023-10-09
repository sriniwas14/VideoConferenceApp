type TextInputProps = {
  type: "text" | "password";
  onChange: (e: string) => void;
  placeholder: string;
  className?: string;
  name?: string;
  required?: boolean;
};

export default function TextInput({
  type,
  onChange,
  placeholder,
  className,
  name,
  required,
}: TextInputProps) {
  return (
    <input
      type={type}
      onChange={(e) => onChange(e.target.value)}
      name={name}
      className={`p-4 border-0 bg-slate-100 w-full rounded-xl ${className}`}
      placeholder={placeholder}
      required={required || false}
    />
  );
}
