import { Head, Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import {
  AuthHeader,
  AuthHeaderCard,
  ButtonAuth,
  InputAuth,
} from "../../../components";
import { LayoutAuth } from "../../../layouts";

const ResetPassword = ({ session, errors, route }) => {
  const { data, setData, post } = useForm({
    email: route.query.email,
    password: "",
    password_confirmation: "",
    token: route.params.token,
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post("/reset-password");
  };

  return (
    <>
      <Head>
        <title>Update Password - Aplikasi Kasir</title>
      </Head>
      <LayoutAuth>
        <div className="col-md-4">
          <div className="fade-in">
            <AuthHeader />
            <div className="card-group">
              <div className="card border-top-purple border-0 shadow-sm rounded-3">
                <div className="card-body">
                  <AuthHeaderCard title="UPDATE PASSWORD" />
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
                      onChange={(e) => setData("email", e.target.value)}
                      isError={errors?.email}
                      value={data.email}
                    />
                    {errors?.email && (
                      <div className="alert alert-danger mt-2">
                        {errors?.email}
                      </div>
                    )}

                    <InputAuth
                      name="password"
                      type="password"
                      placeholder="Password"
                      icon="fa fa-lock"
                      isError={errors?.password}
                      onChange={(e) => setData("password", e.target.value)}
                    />
                    {errors?.password && (
                      <div className="alert alert-danger mt-2">
                        {errors?.password}
                      </div>
                    )}

                    <InputAuth
                      name="password_confirmation"
                      type="password"
                      placeholder="Password Confirmation"
                      icon="fa fa-lock"
                      isError={errors?.password_confirmation}
                      onChange={(e) =>
                        setData("password_confirmation", e.target.value)
                      }
                    />
                    <div className="row">
                      <div className="col-12">
                        <ButtonAuth title="UPDATE PASSWORD" />
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

export default ResetPassword;
