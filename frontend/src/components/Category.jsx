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
  const { categories, loading } = useSelector((state) => state.category);

  const [data, setData] = useState({ categoryName: "" });
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [search, setSearch] = useState("");

  const filteredCategory = categories.filter((cat) =>
    cat.categoryName.toLowerCase().includes(search.toLowerCase()),
  );

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
    if (!data.categoryName.trim()) return;
    dispatch(addCategory(data));
    setData({ categoryName: "" });
  };

  // EDIT
  const handleEdit = (cat) => {
    setEditId(cat._id);
    setEditName(cat.categoryName);
  };

  const handleUpdate = () => {
    if (!editName.trim()) return;

    dispatch(
      editCategory({
        id: editId,
        data: { categoryName: editName },
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
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 py-8 lg:py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200/50 p-8 mb-8">
          <div className="flex items-center gap-3 mb-6 ">
            <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.586l-1.414-1.414a2 2 0 00-1.414-0.586H9a2 2 0 00-2 2v4a2 2 0 002 2zm12-8a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Category Management
              </h1>
              <p className="text-slate-600 mt-1">
                Add, edit, and manage your product categories
              </p>
            </div>
          </div>

          {/* Add Category Form */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-8">
            <div className="flex-1 relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <input
                onChange={handleData}
                type="text"
                name="categoryName"
                value={data.categoryName}
                placeholder="Enter new category name..."
                className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all shadow-sm"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !data.categoryName.trim()}
              className="px-8 py-3 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all duration-200 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Adding...
                </>
              ) : (
                "Add Category"
              )}
            </button>
          </form>

          {/* Search */}
          <div className="mb-8">
            <div className="relative">
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search categories..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-2xl bg-slate-50 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white focus:outline-none transition-all shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <div className="max-w-4xl mx-auto">
          {/* Empty Search State */}
          {search && filteredCategory.length === 0 && (
            <div className="bg-linear-to-r from-rose-50 to-red-50 border border-rose-200 rounded-2xl p-8 text-center shadow-sm">
              <svg className="mx-auto h-16 w-16 text-rose-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <h3 className="text-lg font-semibold text-rose-900 mb-2">No matching categories</h3>
              <p className="text-rose-700 mb-4">Try adjusting your search terms.</p>
              <button
                onClick={() => setSearch("")}
                className="inline-flex items-center gap-2 bg-rose-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-rose-700 transition-all shadow-lg"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Loading */}
          {loading && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
              <div className="inline-flex items-center bg-indigo-100 border-2 border-indigo-200 rounded-full p-4 mb-4">
                <svg className="animate-spin -ml-1 mr-3 h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <p className="text-xl font-semibold text-slate-700">Loading categories...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && categories.length === 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-slate-200 p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-slate-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No categories yet</h3>
              <p className="text-slate-600 mb-6 max-w-md mx-auto">
                Get started by adding your first category using the form above.
              </p>
            </div>
          )}

          {/* Table */}
          {!loading && categories.length > 0 && (
            <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-linear-to-r from-slate-50 to-slate-100 border-b border-slate-200">
                      <th className="text-left px-6 py-4 text-sm font-semibold text-slate-700">
                        Category Name
                      </th>
                      <th className="px-6 py-4 text-sm font-semibold text-slate-700 text-center">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredCategory.map((cat) => (
                      <tr key={cat._id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          {editId === cat._id ? (
                            <div className="flex gap-2">
                              <input
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="flex-1 px-3 py-2 border-2 border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition-all shadow-sm"
                                autoFocus
                              />
                            </div>
                          ) : (
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-indigo-400 rounded-full" />
                              <span className="font-medium text-slate-900 text-lg">{cat.categoryName}</span>
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            {editId === cat._id ? (
                              <>
                                <button
                                  onClick={handleUpdate}
                                  disabled={!editName.trim()}
                                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all whitespace-nowrap text-sm"
                                >
                                  Update
                                </button>
                                <button
                                  onClick={handleCancel}
                                  className="px-4 py-2 bg-slate-400 hover:bg-slate-500 text-white font-medium rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all text-sm"
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleEdit(cat)}
                                  className="px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-sm flex items-center gap-1"
                                  title="Edit category"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                <button
                                  onClick={() => dispatch(deleteCategory(cat._id))}
                                  className="px-3 py-2 bg-rose-500 hover:bg-rose-600 text-white font-medium rounded-xl shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all text-sm flex items-center gap-1"
                                  title="Delete category"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
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

              {/* Table Footer */}
              <div className="bg-linear-to-r from-slate-50 to-slate-100 px-6 py-4 border-t border-slate-200">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>
                    Showing{" "}
                    <span className="font-semibold text-slate-900">{filteredCategory.length}</span> of{" "}
                    <span className="font-semibold text-slate-900">{categories.length}</span> categories
                  </span>
                 
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
