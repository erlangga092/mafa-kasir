import { Link } from "@inertiajs/inertia-react";
import React from "react";

const Pagination = ({ links }) => {
  return (
    <nav>
      <ul className="pagination justify-content-end mb-0">
        {links?.map((link, v) => (
          <li
            className={`page-item ${link.url == null ? "disabled" : ""} ${
              link.active ? "active" : ""
            }`}
            key={v}
          >
            <Link
              href={`${link.url === null ? "#" : link.url}`}
              className="page-link"
              dangerouslySetInnerHTML={{ __html: link.label }}
            ></Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
