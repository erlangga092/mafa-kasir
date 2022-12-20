import { Inertia } from "@inertiajs/inertia";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import React from "react";
import Barcode from "react-barcode";
import swal from "sweetalert2";
import { AppHeaderCard, FormSearch, Pagination } from "../../../components";
import { LayoutApp } from "../../../layouts";

const formatPrice = (number) => {
  return new Intl.NumberFormat("id-ID", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "IDR",
  }).format(number);
};

const Product = ({ products }) => {
  const { data, setData } = useForm({
    search: "" || new URL(document.location).searchParams.get("q"),
  });

  const onSearch = (e) => {
    e.preventDefault();
    Inertia.get("/apps/products", {
      q: data.search,
    });
  };

  const onReset = (e) => {
    e.preventDefault();
    Inertia.get("/apps/products", {
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
          Inertia.delete(`/apps/products/${ID}`);
          swal.fire({
            title: "Deleted",
            text: "Product deleted successfully",
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
        <title>Products - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-12">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard title="PRODUCTS" icon="fa fa-shopping-bag" />
                  <div className="card-body">
                    <FormSearch
                      placeholder="search by product name..."
                      onChange={(e) => setData("search", e.target.value)}
                      onSearch={onSearch}
                      onReset={onReset}
                      addLink="/apps/products/create"
                    />
                    <table className="table table-bordered table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Barcode</th>
                          <th scope="col">Title</th>
                          <th scope="col">Buy Price</th>
                          <th scope="col">Sell Price</th>
                          <th scope="col">Stock</th>
                          <th scope="col" style={{ width: "20%" }}>
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products?.data?.map((product) => (
                          <tr key={product.id}>
                            <td className="text-center">
                              <Barcode
                                value={product.barcode}
                                width={1}
                                height={20}
                                lineColor="#000"
                                format="CODE39"
                              />
                            </td>
                            <td>{product.title}</td>
                            <td>{formatPrice(product.buy_price)}</td>
                            <td>{formatPrice(product.sell_price)}</td>
                            <td>{product.stock}</td>
                            <td className="text-center">
                              <Link
                                href={`/apps/products/${product.id}/edit`}
                                className="btn btn-success btn-sm me-2"
                              >
                                <i className="fa fa-pencil-alt me-1"></i> EDIT
                              </Link>
                              <button
                                className="btn btn-danger btn-sm"
                                onClick={(e) => onDestroy(e, product.id)}
                              >
                                <i className="fa fa-trash"></i> DELETE
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <Pagination links={products.links} />
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

export default Product;
