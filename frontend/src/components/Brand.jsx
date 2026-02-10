import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBrand,
  deleteBrand,
  editBrand,
  getAllBrand,
} from "../features/brandSlice";

const Brand = () => {
  const dispatch = useDispatch();
  const { brands, loading } = useSelector((state) => state.brand);
  const [data, setData] = useState({ name: "" });
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getAllBrand());
  }, [dispatch]);

  const filterdBrands = brands.filter((brnd) =>
    brnd.name.toLowerCase().includes(search.toLowerCase()),
  );
  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name) return;
    dispatch(addBrand(data));
    setData({ name: "" });
  };
  //EDIT
  const handleEdit = (brnd) => {
    setEditId(brnd._id);
    setEditName(brnd.name);
  };
  const handleUpdate = () => {
    if (!editName) return;
    dispatch(
      editBrand({
        id: editId,
        data: { name: editName },
      }),
    );
    setEditId(null);
    setEditName("");
  };
  const handleCancel = () => {
    setEditId(null);
    setEditName("");
  };
  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-30 py-10">
      <div className="max-w-4xl m-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Mobile Brand Management
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 mb-6"
        >
          <input
            onChange={handleData}
            name="name"
            value={data.name}
            type="text"
            placeholder="Enter Brand Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition disabled:opacity-60"
          >
            {loading ? "Please wait..." : "Add Brand"}
          </button>
        </form>

        {/* SEARCH */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-black focus:outline-none"
          />
        </div>

        {/* SEARCH EMPTY MESSAGE */}
        {search && filterdBrands.length === 0 && (
          <p className="text-center text-sm text-red-500 bg-red-50 py-2 rounded-lg mb-4">
            No matching brands found
          </p>
        )}

        {/* LOADING */}

        {loading && (
          <p className="text-center text-gray-500 py-4">Loading brands...</p>
        )}
        {/* EMPTY STATE */}
        {!loading && brands.length === 0 && (
          <p className="text-center text-gray-500 bg-gray-100 py-4 rounded-lg">
            No brands available. Please add one.
          </p>
        )}

        {/* TABLE */}
        {!loading && brands.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-semibold text-gray-700">
                    Brand Name
                  </th>
                  <th className=" px-4 py-3 text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {filterdBrands.map((brnd) => (
                  <tr
                    key={brnd._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">
                      {editId === brnd._id ? (
                        <input
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-black focus:outline-none"
                        />
                      ) : (
                        <span className="text-gray-800">{brnd.name}</span>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex justify-center gap-2 flex-wrap">
                        {editId === brnd._id ? (
                          <>
                            <button
                              onClick={handleUpdate}
                              className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition"
                            >
                              Update
                            </button>
                            <button
                              className="bg-gray-400 text-white px-3 py-1 rounded-lg hover:bg-gray-500 transition"
                              onClick={handleCancel}
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition"
                              onClick={() => handleEdit(brnd)}
                            >
                              edit
                            </button>
                            <button
                              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition"
                              onClick={() => dispatch(deleteBrand(brnd._id))}
                            >
                              Delete
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Brand;
