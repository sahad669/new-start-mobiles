import React from "react";
import { useNavigate } from "react-router-dom";


const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white px-4">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/category")}
          className="px-4 py-2 bg-black text-white rounded"
        >
          Add Categories
        </button>

        <button onClick={()=>navigate("/brand")} className="px-4 py-2 bg-black text-white rounded">
          Add Brands
        </button>

        <button className="px-4 py-2 bg-black text-white rounded">
          Add Products
        </button>
      </div>
    </div>
  );
};
export default AdminDashboard;
