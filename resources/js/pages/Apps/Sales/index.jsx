import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { AppHeaderCard, Pagination } from "../../../components";
import { LayoutApp } from "../../../layouts";

const formatPrice = (number) => {
  if (isNaN(parseInt(number))) {
    return "";
  }

  return new Intl.NumberFormat("id-ID", {
    maximumSignificantDigits: 5,
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const getDateNow = () => {
  let date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;
  let today = year + "-" + month + "-" + day;
  return today;
};

const Sales = ({ errors, sales, total }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formDate, setFormDate] = useStateWithCallbackLazy({
    start_date:
      new URL(document.location).searchParams.get("start_date") || getDateNow(),
    end_date:
      new URL(document.location).searchParams.get("end_date") || getDateNow(),
  });

  const onFilter = (e) => {
    e.preventDefault();
    setIsLoading(true);
    Inertia.get(
      "/apps/sales/filter",
      {
        start_date: formDate.start_date,
        end_date: formDate.end_date,
      },
      {
        onSuccess: () => {
          setIsLoading(false);
        },
      }
    );
  };

  return (
    <>
      <Head>
        <title>Report Sales - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="REPORT SALES" icon="fa fa-chart-bar" />
                  <div className="card-body">
                    <form onSubmit={onFilter}>
                      <div className="row">
                        <div className="col-md-5">
                          <div className="mb-3">
                            <label htmlFor="" className="form-label fw-bold">
                              START DATE
                            </label>
                            <input
                              type="date"
                              className="form-control start_date"
                              onChange={(e) =>
                                setFormDate({
                                  ...formDate,
                                  start_date: e.target.value,
                                })
                              }
                              value={formDate?.start_date}
                            />
                          </div>
                          {errors?.start_date && (
                            <div className="alert alert-danger">
                              {errors?.start_date}
                            </div>
                          )}
                        </div>
                        <div className="col-md-5">
                          <div className="mb-3">
                            <label htmlFor="" className="form-label fw-bold">
                              END DATE
                            </label>
                            <input
                              type="date"
                              className="form-control end_date"
                              onChange={(e) =>
                                setFormDate({
                                  ...formDate,
                                  end_date: e.target.value,
                                })
                              }
                              value={formDate?.end_date}
                            />
                          </div>
                          {errors?.end_date && (
                            <div className="alert alert-danger">
                              {errors?.end_date}
                            </div>
                          )}
                        </div>
                        <div className="col-md-2">
                          <div className="mb-3">
                            <label
                              htmlFor=""
                              className="form-label fw-bold text-white"
                            >
                              *
                            </label>
                            <button className="btn btn-md btn-purple border-0 shadow w-100">
                              <i className="fa fa-filter"></i> FILTER
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>

                    {isLoading ? (
                      <div className="loading">Loading...</div>
                    ) : sales?.data?.length ? (
                      <>
                        <div className="export text-end mb-3">
                          <a
                            href={`/apps/sales/export?start_date=${formDate.start_date}&end_date=${formDate.end_date}`}
                            target="_blank"
                            className="btn btn-success btn-md border-0 shadow me-3"
                          >
                            <i className="fa fa-file-excel"></i> EXCEL
                          </a>
                          <a
                            href="#"
                            target="_blank"
                            className="btn btn-secondary btn-md border-0 shadow"
                          >
                            <i className="fa fa-file-excel"></i> PDF
                          </a>
                        </div>
                        <div className="table-responsive">
                          <table className="table table-bordered">
                            <thead>
                              <tr style={{ backgroundColor: "#e6e6e7" }}>
                                <th scope="col">Date</th>
                                <th scope="col">Invoice</th>
                                <th scope="col">Cashier</th>
                                <th scope="col">Customer</th>
                                <th scope="col">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sales?.data?.map((sale) => (
                                <tr key={sale.id}>
                                  <td>{sale.created_at}</td>
                                  <td className="text-center">
                                    {sale.invoice}
                                  </td>
                                  <td>{sale.cashier.name}</td>
                                  <td>
                                    {sale.customer
                                      ? sale.customer.name
                                      : "Umum"}
                                  </td>
                                  <td className="text-end">
                                    {formatPrice(sale.grand_total)}
                                  </td>
                                </tr>
                              ))}
                              <tr>
                                <td
                                  colSpan={4}
                                  className="text-end fw-bold"
                                  style={{ backgroundColor: "#e6e6e7" }}
                                >
                                  TOTAL
                                </td>
                                <td
                                  className="text-end fw-bold"
                                  style={{ backgroundColor: "#e6e6e7" }}
                                >
                                  {formatPrice(total)}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </>
                    ) : (
                      <div className="table-responsive">
                        <table className="table table-bordered">
                          <thead>
                            <tr style={{ backgroundColor: "#e6e6e7" }}>
                              <th scope="col">Date</th>
                              <th scope="col">Invoice</th>
                              <th scope="col">Cashier</th>
                              <th scope="col">Customer</th>
                              <th scope="col">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td colSpan={5} className="text-center">
                                No Data Found
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                    {sales?.data?.length ? (
                      <Pagination links={sales?.links} />
                    ) : null}
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

export default Sales;
