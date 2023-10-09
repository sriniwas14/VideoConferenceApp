type ButtonProps = {
  type?: "submit" | "reset";
  onClick?: (e: any) => void;
  children: string;
  className?: string;
};

export default function Button({
  type,
  onClick,
  children,
  className,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={(e) => {
        if (onClick) onClick(e);
      }}
      className={`p-4 border-0 active:bg-indigo-700 bg-indigo-600 hover:bg-indigo-500 transition-all text-white w-full rounded-xl ${className}`}
    >
      {children}
    </button>
  );
}
