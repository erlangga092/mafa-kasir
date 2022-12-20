import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import {
  CategorySVG,
  CustomerSVG,
  DashboardSVG,
  PermissionSVG,
  ProductSVG,
  ProfitSVG,
  RoleSVG,
  SalesSVG,
  TransactionSVG,
  UserSVG,
} from "../../../components";

const LayoutSidebar = () => {
  const { auth } = usePage().props;
  const appsURL = usePage().url;

  function hasAnyPermission(permissions) {
    let allPermissions = auth.permissions;
    let hasPermission = false;

    permissions.forEach((v) => {
      if (allPermissions[v]) {
        hasPermission = true;
      }
    });

    return hasPermission;
  }

  return (
    <>
      <ul className="c-sidebar-nav">
        {hasAnyPermission(["dashboard.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/dashboard") ? "active" : ""
              }`}
              href="/apps/dashboard"
            >
              <DashboardSVG />
              <span className="ms-2">Dashboard</span>
            </Link>
          </li>
        )}

        {hasAnyPermission([
          "categories.index",
          "products.index",
          "customers.index",
        ]) && <li className="c-sidebar-nav-title">MASTER</li>}

        {hasAnyPermission(["categories.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/categories") ? "active" : ""
              }`}
              href="/apps/categories"
            >
              <CategorySVG />
              <span className="ms-2">Categories</span>
            </Link>
          </li>
        )}

        {hasAnyPermission(["products.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/products") ? "active" : ""
              }`}
              href="/apps/products"
            >
              <ProductSVG />
              <span className="ms-2">Products</span>
            </Link>
          </li>
        )}

        {hasAnyPermission(["customers.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/customers") ? "active" : ""
              }`}
              href="/apps/customers"
            >
              <CustomerSVG />
              <span className="ms-2">Customers</span>
            </Link>
          </li>
        )}

        {hasAnyPermission(["transactions.index"]) && (
          <li className="c-sidebar-nav-title">TRANSACTIONS</li>
        )}

        {hasAnyPermission(["transactions.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/transactions") ? "active" : ""
              }`}
              href="/apps/transactions"
            >
              <TransactionSVG />
              <span className="ms-2">Transactions</span>
            </Link>
          </li>
        )}

        {hasAnyPermission(["sales.index", "profits.index"]) && (
          <li className="c-sidebar-nav-title">REPORTS</li>
        )}

        {hasAnyPermission(["sales.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/sales") ? "active" : ""
              }`}
              href="/apps/sales"
            >
              <SalesSVG />
              <span className="ms-2">Report Sales</span>
            </Link>
          </li>
        )}
        {hasAnyPermission(["profits.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/profits") ? "active" : ""
              }`}
              href="/apps/profits"
            >
              <ProfitSVG />
              <span className="ms-2">Report Profits</span>
            </Link>
          </li>
        )}

        {hasAnyPermission([
          "roles.index",
          "permissions.index",
          "users.index",
        ]) && <li className="c-sidebar-nav-title">USER MANAGEMENT</li>}

        {hasAnyPermission(["roles.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/roles") ? "active" : ""
              }`}
              href="/apps/roles"
            >
              <RoleSVG />
              <span className="ms-2">Roles</span>
            </Link>
          </li>
        )}

        {hasAnyPermission(["permissions.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/permissions") ? "active" : ""
              }`}
              href="/apps/permissions"
            >
              <PermissionSVG />
              <span className="ms-2">Permissions</span>
            </Link>
          </li>
        )}

        {hasAnyPermission(["users.index"]) && (
          <li className="c-sidebar-nav-item">
            <Link
              className={`c-sidebar-nav-link ${
                appsURL.startsWith("/apps/users") ? "active" : ""
              }`}
              href="/apps/users"
            >
              <UserSVG />
              <span className="ms-2">Users</span>
            </Link>
          </li>
        )}

        <div className="pb-5">
          <li className="c-sidebar-nav-divider"></li>
        </div>
      </ul>
    </>
  );
};

export default LayoutSidebar;
