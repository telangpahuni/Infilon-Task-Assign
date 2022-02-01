import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {fetch,editRow,deleteRow} from '../redux/tableSlicer'


const TableComponent = () => {
const [formData, setForm] = useState({
    id: "",
    email: "",
    first_name: "",
    last_name: "",
    avatar: "",
  });

  const [editIndex, setIndex] = useState(0);
  const rowData = useSelector((state) => state.rowData.value);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetch());
  }, []);

  const handleEdit = (row, index) => {
    setIndex(index);
    setForm({
      id: row.id,
      email: row.email,
      first_name: row.first_name,
      last_name: row.last_name,
      avatar: row.avatar,
    });
  };

  const onEdit = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const formValue = { ...formData };

    formValue[name] = value;

    setForm(formValue);
    // console.log(formValue);
  };

  const submit = (e) => {
    e.preventDefault();

    dispatch(editRow({ formData, editIndex }));
  };
  return (
    <div className="container ">
      {rowData.loading ? (
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : (
        <div className="row">
          <h2 className="text-start my-5">Dynamic Table</h2>
          <table
            id="dataTable"
            className="table table-striped table-hover table-bordered"
          >
            <thead className="">
              <tr>
                <th>id</th>

                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Avatar</th>
                <th>Edit/delete</th>
              </tr>
            </thead>
            <tbody className="">
              {rowData.data.map((row, index) => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.first_name}</td>
                  <td>{row.last_name}</td>
                  <td>{row.email}</td>
                  <td>
                    <img src={row.avatar} className="img-thumbnail" alt="..." />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-primary mx-3"
                      data-bs-toggle="modal"
                      data-bs-target="#editBox"
                      onClick={() => handleEdit(row, index)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger mx-3"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteCnf"
                      onClick={() => setIndex(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="modal fade"
            id="editBox"
            // tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    Update the Record
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form className="row g-3">
                    <div className="col-md-12 my-2">
                      <div className="text-start my-2">
                        <b>First Name</b>
                      </div>
                      <input
                        type="text"
                        name="first_name"
                        className="form-control"
                        onInput={onEdit}
                        value={formData.first_name}
                      />
                    </div>
                    <div className="col-md-12 my-2">
                      <div className="text-start my-2">
                        <b>Last name</b>
                      </div>
                      <input
                        type="text"
                        name="last_name"
                        className="form-control"
                        onInput={onEdit}
                        value={formData.last_name}
                      />
                    </div>
                    <div className="col-12 my-2">
                      <div className="text-start my-2 ">
                        <b>Email</b>
                      </div>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        onInput={onEdit}
                        value={formData.email}
                      />
                    </div>

                    <div className="col-4">
                      <img
                        src={formData.avatar}
                        className="img-thumbnail"
                        alt="..."
                      />
                    </div>
                    <div className="col-8 my-2">
                      <div className="text-start my-2">
                        <b>Avatar</b>
                      </div>
                      <input
                        type="text"
                        name="avatar"
                        className="form-control"
                        onInput={onEdit}
                        value={formData.avatar}
                      />
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                    onClick={submit}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="deleteCnf"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Delete</h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p className='text-start'>Are you sure you want to delete this item</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    className="btn btn-danger"
                    onClick={() => dispatch(deleteRow(editIndex))}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default TableComponent