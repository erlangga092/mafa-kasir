import { Link } from "@inertiajs/inertia-react";
import React from "react";

const FormSearch = ({
  onChange,
  onSearch,
  placeholder,
  onReset,
  addLink = "",
  value,
}) => {
  return (
    <form onSubmit={onSearch}>
      <div className="input-group mb-3">
        {addLink != "" && (
          <Link href={addLink} className="btn btn-primary input-group-text">
            <i className="fa fa-plus-circle"></i> NEW
          </Link>
        )}
        <button
          className="btn btn-secondary input-group-text"
          onClick={onReset}
          type="button"
        >
          <i className="fa fa-undo me-2"></i> RESET
        </button>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <button className="btn btn-primary input-group-text" type="submit">
          <i className="fa fa-search me-2"></i> SEARCH
        </button>
      </div>
    </form>
  );
};

export default FormSearch;
