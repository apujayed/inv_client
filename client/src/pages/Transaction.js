import React, { useState, useEffect, useRef, useContext } from "react";

// import "react-toastify/dist/ReactToastify.css";

import { Context } from "../context/Store";
import AddForm from "./transaction/AddForm";
import ViewList from "./transaction/ViewList";

const Transaction = () => {
  const {  accounts, ToastContainer, getShead, edit } =
    useContext(Context);

  useEffect(() => {
    // inputRef.current.focus();
  }, [edit]);
  useEffect(() => {
    getShead();
    // getAccounts();
  }, [accounts]);

  return (
    <>
      <section className="content-header">
        <h1 className="marquee">
          <marquee behavior="scroll" direction="left" scrollamount={5}>
            <p align="center" style={{ fontSize: 20, color: "yellow" }}>
              {" "}
               M/S AKHI AND APU TRADERS..PROP-Alhaj Md Mojaffor
              Hossain..THIS WEB BASED APPLICATION WAS DESIGN AND DEVELOPED BY IT
              TECH POINT BD TEAM CONTACT- +8801303242844
            </p>
          </marquee>
        </h1>
      </section>
      <section className="content">
        <div className="row">
          <div className="col-xs-12">
            <AddForm />

            <ViewList />
          </div>
        </div>
      </section>
      <ToastContainer
        toastStyle={{ backgroundColor: "black", color: "white" }}
      />
    </>
  );
};

export default Transaction;
