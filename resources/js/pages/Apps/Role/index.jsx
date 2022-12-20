import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import swal from "sweetalert2";
import { AppHeaderCard, FormSearch, Pagination } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Role = ({ roles }) => {
  const { data, setData } = useForm({
    search: "" || new URL(document.location).searchParams.get("q"),
  });

  const onSearch = (e) => {
    e.preventDefault();
    Inertia.get("/apps/roles", {
      q: data.search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    Inertia.get("/apps/roles", {
      q: "",
    });
  };

  const onDestroy = (e, ID) => {
    e.preventDefault();
    swal
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          Inertia.delete(`/apps/roles/${ID}`);
          swal.fire({
            title: "Deleted",
            text: "Role deleted successfully",
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
        <title>Roles - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="ROLES" icon="fa fa-shield-alt" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by role name..."
                      onChange={(e) => setData("search", e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      addLink="/apps/roles/create"
                    />
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Role Name</th>
                          <th scope="col" style={{ width: "50%" }}>
                            Permissions
                          </th>
                          <th scope="col" style={{ width: "20%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles?.data?.map((role) => (
                          <tr key={role.id}>
                            <td>{role.name}</td>
                            <td>
                              {role?.permissions?.map((permission) => (
                                <span
                                  key={permission.id}
                                  className="badge badge-primary shadow border-0 ms-2 mb-2"
                                >
                                  {permission.name}
                                </span>
                              ))}
                            </td>
                            <td className="text-center">
                              <Link
                                href={`/apps/roles/${role.id}/edit`}
                                className="btn btn-success btn-sm me-2"
                              >
                                <i className="fa fa-pencil-alt me-1"></i> EDIT
                              </Link>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) => onDestroy(e, role.id)}
                              >
                                <i className="fa fa-trash"></i> DELETE
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination links={roles.links} />
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

export default Role;
