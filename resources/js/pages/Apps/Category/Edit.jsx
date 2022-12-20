import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { AppHeaderCard, InputApp } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Edit = ({ category, errors }) => {
  const [form, setForm] = useState(() => {
    return {
      name: category.name,
      description: category.description,
      image: "",
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    Inertia.post(
      `/apps/categories/${category.id}`,
      {
        _method: "PUT",
        name: form.name,
        description: form.description,
        image: form.image,
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
        <title>Edit Category - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="EDIT CATEGORY" icon="fa fa-folder" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <div className="mb-3">
                        <input
                          type="file"
                          className={`form-control ${
                            errors?.image ? "is-invalid" : ""
                          }`}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              image: e.target.files[0],
                            })
                          }
                        />
                      </div>
                      {errors?.image && (
                        <div className="alert alert-danger">
                          {errors?.image}
                        </div>
                      )}

                      <InputApp
                        name="name"
                        type="text"
                        placeholder="Category Name"
                        label="Category Name"
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                        isError={errors?.name}
                        value={form.name}
                      />

                      <div className="mb-3">
                        <label htmlFor="" className="fw-bold">
                          Description
                        </label>
                        <textarea
                          name="description"
                          rows="4"
                          className={`form-control ${
                            errors?.description ? "is-invalid" : ""
                          }`}
                          placeholder="Description"
                          onChange={(e) =>
                            setForm({
                              ...form,
                              description: e.target.value,
                            })
                          }
                          value={form.description}
                        ></textarea>
                      </div>
                      {errors?.description && (
                        <div className="alert alert-danger">
                          {errors?.description}
                        </div>
                      )}

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
