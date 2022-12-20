import { Head, Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import {
  AuthHeader,
  AuthHeaderCard,
  ButtonAuth,
  InputAuth,
} from "../../../components";
import { LayoutAuth } from "../../../layouts";

const ForgotPassword = ({ session, errors }) => {
  const { setData, post } = useForm({
    email: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post("/forgot-password");
  };

  return (
    <>
      <Head>
        <title>Forgot Password - Aplikasi Kasir</title>
      </Head>
      <LayoutAuth>
        <div className="col-md-4">
          <div className="fade-in">
            <AuthHeader />
            <div className="card-group">
              <div className="card border-top-purple border-0 shadow-sm rounded-3">
                <div className="card-body">
                  <AuthHeaderCard title="RESET PASSWORD" />
                  <hr />

                  {session?.status && (
                    <div className="alert alert-success mt-2">
                      {session.status}
                    </div>
                  )}

                  <form onSubmit={onSubmit}>
                    <InputAuth
                      name="email"
                      type="email"
                      placeholder="Email Address"
                      icon="fa fa-envelope"
                      isError={errors?.email}
                      onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors?.email && (
                      <div className="alert alert-danger mt-2">
                        {errors?.email}
                      </div>
                    )}
                    <div className="row">
                      <div className="col-12">
                        <ButtonAuth title="SEND PASSWORD RESET LINK" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutAuth>
    </>
  );
};

export default ForgotPassword;
