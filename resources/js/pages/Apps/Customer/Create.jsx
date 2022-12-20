import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { AppHeaderCard, InputApp } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Create = ({ errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: "",
      no_telp: "",
      address: "",
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    Inertia.post("/apps/customers", form, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Customer saved successfully.",
          icon: "success",
          showConfirmButton: false,
          timer: 1000,
        });
      },
    });
  };

  return (
    <>
      <Head>
        <title>Add New Customer - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard
                    title="ADD NEW CUSTOMER"
                    icon="fa fa-user-circle"
                  />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        label="Full Name"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        isError={errors?.name}
                      />

                      <InputApp
                        name="no_telp"
                        type="number"
                        placeholder="No. Telp"
                        label="No. Telp"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            no_telp: e.target.value,
                          })
                        }
                        isError={errors?.no_telp}
                      />

                      <div className="mb-3">
                        <label htmlFor="" className="fw-bold">
                          Address
                        </label>
                        <textarea
                          name="address"
                          rows="4"
                          className={`form-control ${
                            errors?.address ? "is-invalid" : ""
                          }`}
                          placeholder="Address"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              address: e.target.value,
                            })
                          }
                        ></textarea>
                      </div>
                      {errors?.address && (
                        <div className="alert alert-danger">
                          {errors?.address}
                        </div>
                      )}

                      <div className="row">
                        <div className="col-12">
                          <button className="btn btn-primary shadow-sm rounded-sm">
                            SAVE
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

export default Create;
