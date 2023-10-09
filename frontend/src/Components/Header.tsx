import React from "react";

type HeaderProps = {
  onNewSession?: () => void;
};

export default function Header({ onNewSession }: HeaderProps) {
  const handleLogout = () => {
    localStorage.clear();
    location.reload();
  };

  return (
    <div className="bg-slate-900 flex">
      <div className="container m-auto flex text-white py-2">
        <h3 className="text-xl my-auto">ConferenceApp</h3>
        <div className="ml-auto">
          {onNewSession ? (
            <button
              className="bg-slate-600 active:bg-indigo-700 hover:bg-indigo-500 transition-all px-6 py-3 rounded-md"
              onClick={onNewSession}
            >
              New Session
            </button>
          ) : null}
          <button
            className="bg-red-600 active:bg-red-700 hover:bg-red-500 transition-all px-6 py-3 rounded-md ml-2"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}
