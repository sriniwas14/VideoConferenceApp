import React, { ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode;
};

export default function Modal({ title, children }: ModalProps) {
  return (
    <div className="fixed inset-0 z-10 bg-black/50 flex">
      <div className="w-1/2 bg-white p-4 rounded-xl m-auto">
        <h1 className="text-xl">{title}</h1>
        {children}
      </div>
    </div>
  );
}
