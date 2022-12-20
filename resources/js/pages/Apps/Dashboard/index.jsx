import { Head } from "@inertiajs/inertia-react";
import { Chart as ChartJS, registerables } from "chart.js";
import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import { AppHeaderCard } from "../../../components";
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

ChartJS.register(...registerables);

const Dashboard = ({
  sales_date,
  grand_total,
  count_sales_today,
  sum_sales_today,
  sum_profits_today,
  products_limit_stock,
  chart_best_product,
}) => {
  function getRandomColor() {
    const letters = "0123456789ABCDEF".split("");
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function randomBackgroundColor(length) {
    let data = [];
    for (let i = 0; i < length; i++) {
      data.push(getRandomColor());
    }
    return data;
  }

  const chartSellWeek = {
    labels: sales_date,
    datasets: [
      {
        data: grand_total,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>Dashboard - Aplikasi Kasir</title>
      </Head>
      <LayoutApp>
        <main className="c-main">
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-8">
                <div className="card border-0 rounded-3 shadow border-top-purple">
                  <AppHeaderCard
                    title="SALES CHART 7 DAYS"
                    icon="fa fa-chart-bar"
                  />
                  <div className="card-body">
                    <Bar
                      data={chartSellWeek}
                      options={{
                        responsive: true,
                        plugins: {
                          legend: {
                            display: false,
                          },
                          title: {
                            display: false,
                          },
                        },
                        beginZero: true,
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 rounded-3 shadow border-top-info mb-4">
                  <AppHeaderCard title="SALES TODAY" icon="fa fa-chart-line" />
                  <div className="card-body">
                    <strong>{count_sales_today}</strong> SALES
                    <hr />
                    <h5 className="fw-bold">{formatPrice(sum_sales_today)}</h5>
                  </div>
                </div>
                <div className="card border-0 rounded-3 shadow border-top-info">
                  <AppHeaderCard title="PROFITS TODAY" icon="fa fa-chart-bar" />
                  <div className="card-body">
                    <h5 className="fw-bold">
                      {formatPrice(sum_profits_today)}
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="card border-0 rounded-3 shadow border-top-warning">
                  <AppHeaderCard
                    title="BEST SELLING PRODUCT"
                    icon="fa fa-chart-pie"
                  />
                  <div className="card-body">
                    <Doughnut
                      data={{
                        labels: chart_best_product?.map(
                          (product) => product.title
                        ),
                        datasets: [
                          {
                            data: chart_best_product?.map(
                              (product) => product.total
                            ),
                            backgroundColor: randomBackgroundColor(5),
                          },
                        ],
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="card border-0 rounded-3 shadow border-top-danger">
                  <AppHeaderCard title="PRODUCT STOCK" icon="fa fa-box-open" />
                  <div className="card-body">
                    {products_limit_stock?.map((product) => (
                      <li
                        key={product?.id}
                        className="list-group-item d-flex justify-content-between align-items-center"
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{product.title}</div>
                          <div className="text-muted">
                            Category: {product.category.name}
                          </div>
                        </div>
                        <span className="badge bg-danger rounded-pill">
                          {product.stock}
                        </span>
                      </li>
                    ))}
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

export default Dashboard;
