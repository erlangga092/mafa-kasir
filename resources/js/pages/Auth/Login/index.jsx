import { Head, Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import { AuthHeaderCard, ButtonAuth, InputAuth } from "../../../components";
import AuthHeader from "../../../components/atoms/AuthHeader";
import { LayoutAuth } from "../../../layouts";

const Login = ({ session, errors, auth }) => {
  const { setData, post } = useForm({
    email: "",
    password: "",
  });

  const onSubmit = (e) => {
    e.preventDefault();
    post("/login");
  };

  return (
    <>
      <Head>
        <title>Login Account - Aplikasi Kasir</title>
      </Head>
      <LayoutAuth>
        <div className="col-md-4">
          <div className="fade-in">
            <AuthHeader />
            <div className="card-group">
              <div className="card border-top-purple border-0 shadow-sm rounded-3">
                <div className="card-body">
                  <AuthHeaderCard
                    title="LOGIN ACCOUNT"
                    desc="Sign in to your account"
                  />
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
                    <div className="row">
                      <div className="col-12 mb-3 text-end">
                        <Link href="/forgot-password">Forgot Password?</Link>
                      </div>
                      <div className="col-12">
                        <ButtonAuth title="LOGIN" />
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

export default Login;
