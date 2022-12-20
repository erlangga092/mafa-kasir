import { Link, usePage } from "@inertiajs/inertia-react";
import React from "react";
import { HamburgerSVG, LogoutSVG } from "../../../components";

const LayoutHeader = () => {
  const { auth } = usePage().props;

  return (
    <header className="c-header c-header-light c-header-fixed c-header-with-subheader">
      <button
        className="c-header-toggler c-class-toggler d-lg-none mfe-auto"
        type="button"
        data-target="#sidebar"
        data-class="c-sidebar-show"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.6em"
          height="1.6em"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <button
        className="c-header-toggler c-class-toggler mfs-3 d-md-down-none"
        type="button"
        data-target="#sidebar"
        data-class="c-sidebar-lg-show"
        responsive="true"
      >
        <HamburgerSVG />
      </button>
      <ul className="c-header-nav ml-auto mr-4">
        <li className="c-header-nav-item dropdown">
          <a
            className="c-header-nav-link"
            data-toggle="dropdown"
            href="#"
            role="button"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <div className="c-avatar">
              <img
                className="c-avatar-img"
                src={`https://ui-avatars.com/api/?name=${auth?.user?.name}&amp;background=4e73df&amp;color=ffffff&amp;size=100`}
              />
            </div>
          </a>
          <div className="dropdown-menu dropdown-menu-right pt-0 mb-0 pb-0">
            <Link
              href="/logout"
              method="POST"
              as="button"
              className="dropdown-item"
              role="button"
            >
              <span className="mr-1">
                <LogoutSVG />
              </span>
              Logout
            </Link>
          </div>
        </li>
      </ul>
    </header>
  );
};

export default LayoutHeader;
