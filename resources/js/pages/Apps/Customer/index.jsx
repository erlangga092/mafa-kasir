import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import { AppHeaderCard, FormSearch, Pagination } from "../../../components";
import { LayoutApp } from "../../../layouts";
import Swal from "sweetalert2";

const Permission = ({ customers }) => {
  const { data, setData } = useForm({
    search: "" || new URL(document.location).searchParams.get("q"),
  });

  const onSearch = (e) => {
    e.preventDefault();
    Inertia.get("/apps/customers", {
      q: data.search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    Inertia.get("/apps/customers", {
      q: "",
    });
  };

  const onDestroy = (e, ID) => {
    e.preventDefault();
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Inertia.delete(`/apps/customers/${ID}`);
        Swal.fire({
          title: "Deleted",
          text: "Customer deleted successfully",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
      }
    });
  };

  return (
    <>
      <Head>
        <title>Customers - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <div className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="CUSTOMERS" icon="fa fa-user-circle" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by customer name..."
                      onChange={(e) => setData("search", e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      addLink="/apps/customers/create"
                      value={data.search}
                    />
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Full Name</th>
                          <th scope="col">No. Telp</th>
                          <th scope="col">Address</th>
                          <th scope="col" style={{ width: "20%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers?.data?.map((customer) => (
                          <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.no_telp}</td>
                            <td>{customer.address}</td>
                            <td className="text-center">
                              <Link
                                href={`/apps/customers/${customer.id}/edit`}
                                className="btn btn-success btn-sm me-2"
                              >
                                <i className="fa fa-pencil-alt me-1"></i> EDIT
                              </Link>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) => onDestroy(e, customer.id)}
                              >
                                <i className="fa fa-trash"></i> DELETE
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination links={customers.links} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutApp>
    </>
  );
};

export default Permission;
