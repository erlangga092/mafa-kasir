import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useEffect, useState } from "react";
import swal from "sweetalert2";
import { AppHeaderCard, InputApp } from "../../../components";
import { LayoutApp } from "../../../layouts";

const Edit = ({ role, permissions }) => {
  const [form, setForm] = useState(() => {
    return {
      name: role.name,
      permissions: role.permissions.map((v) => v.name),
    };
  });

  useEffect(() => {
    const permissionNode =
      window.document.querySelectorAll(".permission-input");

    for (const node of permissionNode) {
      form.permissions.forEach((v) => {
        // for DEBUG*
        // console.log(`${node.defaultValue} ~ ${v} = ${node.defaultValue === v}`);

        if (node.defaultValue == v) {
          node.checked = true;
        }
      });
    }
  }, []);

  const onCheck = (e) => {
    setForm({
      ...form,
      permissions:
        [...form.permissions].indexOf(e.target.value) < 0
          ? [...form.permissions, e.target.value]
          : [...form.permissions.filter((v) => v != e.target.value)],
    });
  };

  const onCheckAll = (e) => {
    if (e.target.checked) {
      const allPermission = permissions.map((v) => v.name);
      setForm(() => {
        const permissionNode =
          window.document.querySelectorAll(".permission-input");

        for (const node of permissionNode) {
          node.checked = true;
        }

        return {
          ...form,
          permissions: allPermission,
        };
      });
    } else {
      setForm(() => {
        const permissionNode =
          window.document.querySelectorAll(".permission-input");

        for (const node of permissionNode) {
          node.checked = false;
        }

        return {
          ...form,
          permissions: [],
        };
      });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    Inertia.post(
      `/apps/roles/${role.id}`,
      {
        _method: "PUT",
        name: form.name,
        permissions: form.permissions,
      },
      {
        onSuccess: () => {
          swal.fire({
            title: "Success!",
            text: "Role updated successfully.",
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
        <title>Edit Role - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border border-top-purple rounded-3 shadow">
                  <AppHeaderCard title="EDIT ROLE" icon="fa fa-shield-alt" />
                  <div className="card-body">
                    <form onSubmit={onSubmit}>
                      <InputApp
                        name="name"
                        type="text"
                        placeholder="Role Name"
                        label="Role Name"
                        value={form.name}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            name: e.target.value,
                          })
                        }
                      />
                      <div className="mb-3">
                        <label htmlFor="" className="fw-bold">
                          Permissions
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
                        {permissions?.map((permission, v) => (
                          <div
                            className="form-check form-check-inline"
                            key={permission.id}
                          >
                            <input
                              className="form-check-input permission-input"
                              type="checkbox"
                              value={permission.name}
                              id={`check-${permission.id}`}
                              onChange={(e) => onCheck(e)}
                            />
                            <label
                              htmlFor={`check-${permission.id}`}
                              className="form-check-label"
                            >
                              {permission.name}
                            </label>
                          </div>
                        ))}
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <button className="btn btn-primary shadow-sm rounded-sm">
                            UPDATE
                          </button>
                          <button
                            className="btn btn-warning shadow-sm rounded-sm ms-3"
                            type="reset"
                          >
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
