import { ReactNode } from "react";

type AuthLayoutProps = {
  children: ReactNode;
};

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-indigo-100 h-full inset-0 flex">
      <div className="p-8 bg-white flex rounded-xl w-1/3 m-4 mr-auto">
        {children}
      </div>
    </div>
  );
}
