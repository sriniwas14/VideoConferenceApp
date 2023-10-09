import React from "react";

export default function Modal({ title }) {
  return (
    <div className="fixed inset-0 z-10">
      <div className="w-1/2 bg-white p-4 rounded-xl m-auto">
        <h1 className="text-xl">{title}</h1>
      </div>
    </div>
  );
}
