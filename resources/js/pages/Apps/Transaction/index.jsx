import { Inertia } from "@inertiajs/inertia";
import { Head } from "@inertiajs/inertia-react";
import React, { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Swal from "sweetalert2";
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

const Transaction = ({ auth, carts, carts_total, session, customers }) => {
  const [barcode, setBarcode] = useState("");
  const [cash, setCash] = useState(0);
  const [change, setChange] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [qty, setQty] = useState(1);
  const [grandTotal, setGrandTotal] = useState(carts_total);
  const [customerID, setCustomerID] = useState([]);
  const [product, setProduct] = useState({
    title: "",
  });
  const options = customers.map((v) => ({
    label: v.name,
    value: v.id,
  }));

  const searchProduct = async () => {
    try {
      const res = await fetch(`/apps/transactions/searchProduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          barcode,
          _token: auth.csrf,
        }),
      });
      const resp = await res.json();
      if (resp.success) {
        setProduct(resp.data);
      } else {
        setProduct({
          title: "",
        });
      }
    } catch (err) {
      window.alert(err);
    }
  };

  const addToCart = () => {
    Inertia.post(
      "/apps/transactions/add-to-cart",
      {
        product_id: product.id,
        qty: qty,
        sell_price: product.sell_price,
      },
      {
        onSuccess: ({ props }) => {
          setProduct({
            title: "",
          });
          setBarcode("");
          setQty(1);
          setGrandTotal(props.carts_total);
          setCash(0);
          setChange(0);
        },
      }
    );
  };

  const destroyCart = (cart_id) => {
    Inertia.post(
      "/apps/transactions/destroy-cart",
      {
        cart_id: cart_id,
      },
      {
        onSuccess: ({ props }) => {
          setGrandTotal(props.carts_total);
          setCash(0);
          setChange(0);
        },
      }
    );
  };

  const calculateChange = () => {
    setChange(cash - grandTotal);
  };

  const calculateDiscount = () => {
    setGrandTotal(carts_total - discount);
    setCash(0);
    setChange(0);
  };

  const storeTransaction = async () => {
    try {
      const res = await fetch(`/apps/transactions/store`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _token: auth.csrf,
          customer_id: customerID[0] ? customerID[0].value : "",
          cash: cash,
          change: change,
          discount: discount,
          grand_total: grandTotal,
        }),
      });

      const resp = await res.json();

      setProduct({
        title: "",
      });

      setBarcode("");
      setGrandTotal(carts_total);
      setCash(0);
      setChange(0);
      setCustomerID([]);

      Swal.fire({
        title: "Success!",
        text: "Transaction successfully.",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });

      window.location.href("/apps/dashboard");
    } catch (err) {
      window.alert(err);
    }
  };

  return (
    <>
      <Head>
        <title>Transactions - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-4">
                <div className="card border-0 rounded-3">
                  <div className="card-body">
                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        <i className="fa fa-barcode"></i>
                      </span>
                      <input
                        type="text"
                        value={barcode}
                        className="form-control"
                        placeholder="Scan or input barcode"
                        onChange={(e) => setBarcode(e.target.value)}
                        onKeyUp={() => searchProduct()}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="fw-bold">
                        Product Name
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="form-control"
                        placeholder="Product Name"
                        value={product.title}
                        readOnly
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="" className="fw-bold">
                        Qty
                      </label>
                      <input
                        type="number"
                        className="form-control text-center"
                        placeholder="Qty"
                        min="1"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      />
                    </div>
                    <div className="text-end">
                      <button className="btn btn-warning btn-md border-0 shadow text-uppercase mt-3 me-2">
                        CLEAR
                      </button>
                      <button
                        className={`btn btn-primary btn-md border-0 shadow text-uppercase mt-3 me-2 ${
                          !product.id ? "disabled" : ""
                        }`}
                        onClick={() => addToCart()}
                      >
                        ADD ITEM
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-8">
                {session?.error && (
                  <div className="alert alert-danger">{session?.error}</div>
                )}

                {session?.success && (
                  <div className="alert alert-danger">{session?.success}</div>
                )}

                <div className="card border-0 rounded-3">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 col-4">
                        <h5 className="fw-bold">GRAND TOTAL</h5>
                      </div>
                      <div className="col-md-8 col-8 text-end">
                        <h5 className="fw-bold">{formatPrice(grandTotal)}</h5>
                        {change > 0 && (
                          <>
                            <hr />
                            <h5 className="text-success">
                              Change : <strong>{formatPrice(change)}</strong>
                            </h5>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card border-0 rounded-3">
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <label htmlFor="" className="fw-bold">
                          Cashier
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          readOnly
                          value={auth.user.name}
                        />
                      </div>
                      <div className="col-md-6 float-end">
                        <label htmlFor="" className="fw-bold">
                          Customer
                        </label>
                        <MultiSelect
                          options={options}
                          labelledBy="Select"
                          value={customerID}
                          onChange={setCustomerID}
                        />
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Product Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Qty</th>
                            <th scope="col">Sub Totals</th>
                          </tr>
                        </thead>
                        <tbody>
                          {carts?.map((cart) => (
                            <tr key={cart.id}>
                              <td className="text-center">
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => destroyCart(cart.id)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                              <td>{cart.product.title}</td>
                              <td>{formatPrice(cart.product.sell_price)}</td>
                              <td className="text-center">{cart.qty}</td>
                              <td className="text-end">
                                {formatPrice(cart.price)}
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
                              {formatPrice(carts_total)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="d-flex align-items-end flex-column bd-highlight mb-3">
                      <div className="mt-auto bd-highlight">
                        <label htmlFor="">Discount (Rp.)</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Discount (Rp.)"
                          onChange={(e) => setDiscount(e.target.value)}
                          onKeyUp={() => calculateDiscount()}
                        />
                      </div>
                      <div className="mt-4 bd-highlight">
                        <label htmlFor="">Pay (Rp.)</label>
                        <input
                          type="number"
                          className="form-control"
                          placeholder="Pay (Rp.)"
                          onChange={(e) => setCash(e.target.value)}
                          onKeyUp={() => calculateChange()}
                        />
                      </div>
                    </div>
                    <div className="text-end mt-4">
                      <button className="btn btn-warning btn-md border-0 shadow text-uppercase me-2">
                        Cancel
                      </button>
                      <button
                        className="btn btn-purple btn-md border-0 shadow text-uppercase"
                        onClick={() => storeTransaction()}
                      >
                        Pay Order & Print
                      </button>
                    </div>
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

export default Transaction;
