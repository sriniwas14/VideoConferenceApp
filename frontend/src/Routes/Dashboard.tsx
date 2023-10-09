import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { useAuth } from "../Contexts/AuthContext";
import { BiVideo } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const navigate = useNavigate();
  const auth: any = useAuth();

  useEffect(() => {
    fetchSessions();
  }, [auth.user]);

  const fetchSessions = async () => {
    try {
      let results = await axiosInstance.get(
        `/sessions/user/${auth.user.userId}`
      );
      if (results.data.success && results.data.sessions)
        setSessions(results.data.sessions);
    } catch (error) {}
  };

  return (
    <div className="h-full flex flex-col">
      <Header />
      {/* Body */}
      <div className="flex h-full">
        <div className="container mx-auto flex">
          <div className="my-auto w-full">
            <h1 className="text-2xl">Session List</h1>
            <p>A list of all the sessions you can join</p>
          </div>
          <div className="my-auto w-full">
            {sessions.map((session: any) => (
              <div
                onClick={() => navigate(`/sessions/${session._id}`)}
                className="flex cursor-pointer transition-all hover:scale-105 bg-slate-100 p-4 rounded-md"
              >
                <div>
                  <BiVideo size={32} className={"text-indigo-500"} />
                </div>
                <div className="mx-4">
                  <h3 className="text-md font-bold">{session.title}</h3>
                  <p className="text-sm">{session.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
