import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  getAllCategory,
  deleteCategory,
  editCategory,
} from "../features/categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector(
    (state) => state.category
  );

  const [data, setData] = useState({ categoryName: "" });
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    dispatch(getAllCategory());
  }, [dispatch]);

  // ADD
  const handleData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.categoryName) return;
    dispatch(addCategory(data));
    setData({ categoryName: "" });
  };

  // EDIT
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setEditName(cat.categoryName);
  };

  const handleUpdate = () => {
    if (!editName) return;

    dispatch(
      editCategory({
        id: editId,
        data: { categoryName: editName },
      })
    );

    setEditId(null);
    setEditName("");
  };

  const handleCancel = () => {
    setEditId(null);
    setEditName("");
  };

  return (
    <div className="min-h-screen flex flex-col items-center gap-4 bg-white px-4 py-10">
      <h1 className="text-2xl font-bold">Category Form</h1>

      {/* ADD FORM */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          onChange={handleData}
          type="text"
          name="categoryName"
          value={data.categoryName}
          placeholder="Enter Category Name"
          className="border px-3 py-2 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {loading ? "Loading..." : "Create Category"}
        </button>
      </form>

      {/* CATEGORY LIST */}
      {loading ? (
        <p>Loading...</p>
      ) : categories.length === 0 ? (
        <p>There are no categories. Create one.</p>
      ) : (
        <table className="border mt-6">
          <thead>
            <tr>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td className="border px-4 py-2">
                  {editId === cat._id ? (
                    <input
                      value={editName}
                      onChange={(e) =>
                        setEditName(e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    cat.categoryName
                  )}
                </td>

                <td className="border px-4 py-2 flex gap-2">
                  {editId === cat._id ? (
                    <>
                      <button
                        onClick={handleUpdate}
                        className="px-2 py-1 bg-green-600 text-white rounded"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleCancel}
                        className="px-2 py-1 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(cat)}
                        className="px-2 py-1 bg-blue-600 text-white rounded"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          dispatch(deleteCategory(cat._id))
                        }
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Category;
