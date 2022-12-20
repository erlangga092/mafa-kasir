import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

const LayoutApp = ({ children }) => {
  return (
    <>
      <div className="c-app">
        <div
          className="c-sidebar c-sidebar-dark c-sidebar-fixed c-sidebar-lg-show"
          id="sidebar"
        >
          <div
            className="c-sidebar-brand d-lg-down-none"
            style={{ background: "#894b9d" }}
          >
            <img
              src="/images/cash-machine.png"
              className="bg-light rounded shadow-sm p-1"
              width="35"
            />{" "}
            <span className="ml-2 font-weight-bold">APLIKASI KASIR</span>
          </div>
          <Sidebar />
        </div>
        <div className="c-wrapper c-fixed-components">
          <Header />
          <div className="c-body">
            {children}
            <footer className="c-footer">
              <div>
                <strong>APLIKASI KASIR</strong> &copy; 2022 - Mafa~Tech
              </div>
            </footer>
          </div>
        </div>
      </div>
    </>
  );
};

export default LayoutApp;
