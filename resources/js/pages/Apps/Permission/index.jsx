import { Inertia } from "@inertiajs/inertia";
import { Head, useForm } from "@inertiajs/inertia-react";
import React from "react";
import { AppHeaderCard, FormSearch, Pagination } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Permission = ({ permissions }) => {
  const { data, setData } = useForm({
    search: "" || new URL(document.location).searchParams.get("q"),
  });

  const onSearch = (e) => {
    e.preventDefault();
    Inertia.get("/apps/permissions", {
      q: data.search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    Inertia.get("/apps/permissions", {
      q: "",
    });
  };

  return (
    <>
      <Head>
        <title>Permissions - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <div className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="PERMISSIONS" icon="fa fa-key" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by permission name..."
                      onChange={(e) => setData("search", e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                    />
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Permission Name</th>
                        </tr>
                      </thead>
                      <tbody>
                        {permissions?.data?.map((permission) => (
                          <tr key={permission.id}>
                            <td>{permission.name}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination links={permissions.links} />
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
