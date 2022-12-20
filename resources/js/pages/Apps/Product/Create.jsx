import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { AppHeaderCard, InputApp } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Create = ({ last_product_id, categories, errors }) => {
  console.log(last_product_id);

  const [form, setForm] = useState(() => {
    return {
      image: "",
      barcode: `PR-${Number(last_product_id) + 1}`,
      category_id: categories[0]?.id,
      title: "",
      description: "",
      stock: 0,
      buy_price: 0,
      sell_price: 0,
    };
  });

  const onSubmit = (e) => {
    e.preventDefault();
    Inertia.post("/apps/products", form, {
      onSuccess: () => {
        Swal.fire({
          title: "Success!",
          text: "Product saved successfully.",
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
        <title>Add New Product - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard
                    title="ADD NEW PRODUCT"
                    icon="fa fa-shopping-bag"
                  />
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

                      <div className="row">
                        <div className="col-md-6">
                          <InputApp
                            name="barcode"
                            type="text"
                            value={form.barcode}
                            disabled
                            placeholder="Barcode"
                            label="Barcode"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                barcode: e.target.value,
                              })
                            }
                            isError={errors?.barcode}
                          />
                        </div>
                        <div className="col-md-6">
                          <div className="mb-3">
                            <label htmlFor="" className="fw-bold">
                              Category
                            </label>
                            <select
                              name="category_id"
                              className={`form-select ${
                                errors?.category_id ? "is-invalid" : ""
                              }`}
                              onChange={(e) =>
                                setForm({
                                  ...form,
                                  category_id: e.target.value,
                                })
                              }
                            >
                              {categories?.map((category) => (
                                <option value={category.id} key={category.id}>
                                  {category.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          {errors?.category_id && (
                            <div className="alert alert-danger">
                              {errors?.category_id}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <InputApp
                            name="title"
                            type="text"
                            placeholder="Title Product"
                            label="Title Product"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                title: e.target.value,
                              })
                            }
                            isError={errors?.title}
                          />
                        </div>
                        <div className="col-md-6">
                          <InputApp
                            name="stock"
                            type="number"
                            placeholder="Stock"
                            label="Stock"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                stock: e.target.value,
                              })
                            }
                            isError={errors?.stock}
                          />
                        </div>
                      </div>

                      <div className="mb-3">
                        <label htmlFor="description" className="fw-bold">
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
                        ></textarea>
                      </div>
                      {errors?.description && (
                        <div className="alert alert-danger">
                          {errors?.description}
                        </div>
                      )}

                      <div className="row">
                        <div className="col-md-6">
                          <InputApp
                            name="buy_price"
                            type="number"
                            placeholder="Buy Price"
                            label="Buy Price"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                buy_price: e.target.value,
                              })
                            }
                            isError={errors?.buy_price}
                          />
                        </div>
                        <div className="col-md-6">
                          <InputApp
                            name="sell_price"
                            type="number"
                            placeholder="Sell Price"
                            label="Sell Price"
                            onChange={(e) =>
                              setForm({
                                ...form,
                                sell_price: e.target.value,
                              })
                            }
                            isError={errors?.sell_price}
                          />
                        </div>
                      </div>

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
