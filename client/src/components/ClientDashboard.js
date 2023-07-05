import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientDashboard = () => {
  const [state, setstate] = useState("");
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const res = await fetch("/api/allclient", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (data) {
        setstate(data);
      }
    } catch (error) {
      navigate("/login");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <p>{state.email}</p>
      <p>{state.name}</p>
      <p>{state.password}</p>
    </>
  );
};

export default ClientDashboard;
