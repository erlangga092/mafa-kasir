import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AppHeaderCard, InputApp } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Edit = ({ user, roles, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: user.name,
      email: user.email,
      password: user.password,
      password_confirmation: user.password_confirmation,
      roles: user.roles.map((v) => v.name),
    };
  });

  useEffect(() => {
    for (const node of window.document.querySelectorAll(".role-input")) {
      form.roles.forEach((v) => {
        if (node.value === v) {
          node.checked = true;
        }
      });
    }
  }, []);

  const onCheck = (e) => {
    setForm(() => {
      return {
        ...form,
        roles:
          [...form.roles].indexOf(e.target.value) < 0
            ? [...form.roles, e.target.value]
            : [...form.roles.filter((v) => v != e.target.value)],
      };
    });
  };

  const onCheckAll = (e) => {
    if (e.target.checked) {
      const allRole = roles.map((role) => role.name);
      setForm(() => {
        const roleNode = window.document.querySelectorAll(".role-input");

        for (const node of roleNode) {
          node.checked = true;
        }

        return {
          ...form,
          roles: allRole,
        };
      });
    } else {
      setForm(() => {
        const roleNode = window.document.querySelectorAll(".role-input");

        for (const node of roleNode) {
          node.checked = false;
        }

        return {
          ...form,
          roles: [],
        };
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Inertia.post(
      `/apps/users/${user.id}`,
      {
        _method: "PUT",
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation,
        roles: form.roles,
      },
      {
        onSuccess: () => {
          Swal.fire({
            title: "Success!",
            text: "User updated successfully.",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          });
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Edit User - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="EDIT USER" icon="fa fa-users" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <div className="row">
                        <div className="col-md-6">
                          <InputApp
                            name="name"
                            type="text"
                            placeholder="Full Name"
                            label="Full Name"
                            value={form.name}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                name: e.target.value,
                              })
                            }
                            isError={errors?.name}
                          />
                        </div>
                        <div className="col-md-6">
                          <InputApp
                            name="email"
                            type="email"
                            disabled
                            placeholder="Email Address"
                            label="Email Address"
                            value={form.email}
                            onChange={(e) =>
                              setForm({
                                ...form,
                                email: e.target.value,
                              })
                            }
                            isError={errors?.email}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <InputApp
                            name="password"
                            type="password"
                            placeholder="Password"
                            label="Password"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                password: e.target.value,
                              })
                            }
                            isError={errors?.password}
                          />
                        </div>
                        <div className="col-md-6">
                          <InputApp
                            name="password_confirmation"
                            type="password"
                            placeholder="Password Confirmation"
                            label="Password Confirmation"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                password_confirmation: e.target.value,
                              })
                            }
                            isError={errors?.password_confirmation}
                          />
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-12">
                          <div className="mb-3">
                            <label htmlFor="" className="fw-bold">
                              Roles
                            </label>
                            <br />
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`check-all`}
                                onChange={(e) => onCheckAll(e)}
                              />
                              <label
                                htmlFor={`check-all`}
                                className="form-check-label"
                              >
                                all
                              </label>
                            </div>
                            {roles?.map((role, v) => (
                              <div
                                className="form-check form-check-inline"
                                key={role.id}
                              >
                                <input
                                  className="form-check-input role-input"
                                  type="checkbox"
                                  value={role.name}
                                  id={`check-${role.id}`}
                                  onChange={(e) => onCheck(e)}
                                />
                                <label
                                  htmlFor={`check-${role.id}`}
                                  className="form-check-label"
                                >
                                  {role.name}
                                </label>
                              </div>
                            ))}

                            {errors?.roles && (
                              <div className="alert alert-danger">
                                {errors?.roles}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-12">
                          <button className="btn btn-primary shadow-sm rounded-sm">
                            UPDATE
                          </button>
                          <button className="btn btn-warning shadow-sm rounded-sm ms-3">
                            RESET
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </LayoutApp>
    </>
  );
};

export default Edit;
