import React, { useState, useEffect } from "react";
import axiosInstance from "../utils/axios";
import { useAuth } from "../Contexts/AuthContext";
import { BiVideo } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Modal from "../Components/Modal";
import TextInput from "../Components/TextInput";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState(false);
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

  const createSession = async (e: any) => {
    e.preventDefault();
    try {
      const result = await axiosInstance.post("/sessions", {
        title: e.target[0].value,
        description: e.target[1].value,
        createdBy: auth.user.userId,
      });
      if (result.data.success) {
        toast.success("Session Created Successfully");
        console.log("DIO ", result.data);
        navigate(`/sessions/${result.data.session._id}`);
      }
    } catch (error: any) {
      toast(error.response?.data?.error || error.response?.data?.message);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <Header
        onNewSession={() => {
          setNewSession(true);
        }}
      />
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
      {newSession ? (
        <Modal title="Create New Session">
          <form onSubmit={createSession}>
            <TextInput
              className="mb-2 mt-4"
              type="text"
              onChange={() => {}}
              placeholder="Title"
            />
            <TextInput
              type="text"
              className="mb-2"
              onChange={() => {}}
              placeholder="Description"
            />
            <div className="flex">
              <button
                type="button"
                className="bg-red-600 text-white active:bg-red-700 hover:bg-red-500 transition-all px-6 py-3 rounded-md mr-2 ml-auto"
                onClick={() => setNewSession(false)}
              >
                Cancel
              </button>
              <button className="bg-slate-600 text-white active:bg-indigo-700 hover:bg-indigo-500 transition-all px-6 py-3 rounded-md">
                Create Session
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}
