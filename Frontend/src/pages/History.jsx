import React, { useEffect, useState } from "react";
import { api } from "../api/api.js";

const History = () => {
  const [history, setHistory] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");

  // Fetch History
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get("/health/history");
        setHistory(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHistory();
  }, []);

  // Delete Record
  const deleteLog = async (id) => {
    try {
      await api.delete(`/health/${id}`);

      setHistory(
        history.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Record
  const editLog = async (item) => {
    const newSteps = prompt(
      "Enter Steps",
      item.steps
    );

    const newWater = prompt(
      "Enter Water",
      item.water
    );

    const newCalories = prompt(
      "Enter Calories",
      item.calories
    );

    if (
      newSteps === null ||
      newWater === null ||
      newCalories === null
    ) {
      return;
    }

    try {
      const res = await api.put(
        `/health/${item._id}`,
        {
          steps: Number(newSteps),
          water: Number(newWater),
          calories: Number(newCalories),
        }
      );

      setHistory(
        history.map((record) =>
          record._id === item._id
            ? res.data.record
            : record
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  // Filters
  const filteredData = history.filter((item) => {
    const matchDate =
      searchDate === "" ||
      item.date.includes(searchDate);

    const matchMonth =
      selectedMonth === "" ||
      item.date.startsWith(selectedMonth);

    return matchDate && matchMonth;
  });

  // return (
  //   <div className="history-container">
  //     <h1 className="history-title">
  //       📜 Activity History
  //     </h1>

  //     {/* Filters */}
  //     <div className="filter-card">
  //       <input
  //         type="date"
  //         value={searchDate}
  //         onChange={(e) =>
  //           setSearchDate(e.target.value)
  //         }
  //       />

  //       <input
  //         type="month"
  //         value={selectedMonth}
  //         onChange={(e) =>
  //           setSelectedMonth(e.target.value)
  //         }
  //       />
  //     </div>

  //     {/* Summary */}
  //     <div className="summary-grid">
  //       <div className="summary-card">
  //         <h3>Total Logs</h3>
  //         <h1>{history.length}</h1>
  //       </div>

  //       <div className="summary-card">
  //         <h3>Total Steps</h3>
  //         <h1>
  //           {history.reduce(
  //             (sum, item) =>
  //               sum + Number(item.steps),
  //             0
  //           )}
  //         </h1>
  //       </div>

  //       <div className="summary-card">
  //         <h3>Total Water</h3>
  //         <h1>
  //           {history.reduce(
  //             (sum, item) =>
  //               sum + Number(item.water),
  //             0
  //           )}
  //         </h1>
  //       </div>
  //     </div>

  //     {/* Table */}
  //     <div className="table-card">
  //       <table className="history-table">
  //         <thead>
  //           <tr>
  //             <th>Date</th>
  //             <th>Steps</th>
  //             <th>Water</th>
  //             <th>Calories</th>
  //             <th>Actions</th>
  //           </tr>
  //         </thead>

  //         <tbody>
  //           {filteredData.length > 0 ? (
  //             filteredData.map((item) => (
  //               <tr key={item._id}>
  //                 <td>{item.date}</td>
  //                 <td>{item.steps}</td>
  //                 <td>{item.water}</td>
  //                 <td>{item.calories}</td>

  //                 <td>
  //                   <button
  //                     className="edit-btn"
  //                     onClick={() =>
  //                       editLog(item)
  //                     }
  //                   >
  //                     Edit
  //                   </button>

  //                   <button
  //                     className="delete-btn"
  //                     onClick={() =>
  //                       deleteLog(item._id)
  //                     }
  //                   >
  //                     Delete
  //                   </button>
  //                 </td>
  //               </tr>
  //             ))
  //           ) : (
  //             <tr>
  //               <td colSpan="5">
  //                 No Records Found
  //               </td>
  //             </tr>
  //           )}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );

return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-purple-100 p-6">

    {/* Header */}
    <h1 className="text-4xl font-bold text-center text-slate-800 mb-10">
      📜 Activity History
    </h1>

    {/* Filters */}
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

      <h2 className="text-xl font-semibold mb-4">
        🔍 Filter Records
      </h2>

      <div className="flex flex-col md:flex-row gap-4">

        <input
          type="date"
          value={searchDate}
          onChange={(e) =>
            setSearchDate(e.target.value)
          }
          className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="month"
          value={selectedMonth}
          onChange={(e) =>
            setSelectedMonth(e.target.value)
          }
          className="border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

      </div>

    </div>

    {/* Summary Cards */}
    <div className="grid md:grid-cols-3 gap-6 mb-8">

      <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
        <h3 className="text-gray-500 text-lg">
          Total Logs
        </h3>

        <h1 className="text-5xl font-bold text-blue-600 mt-3">
          {history.length}
        </h1>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
        <h3 className="text-gray-500 text-lg">
          Total Steps
        </h3>

        <h1 className="text-5xl font-bold text-green-600 mt-3">
          {history.reduce(
            (sum, item) =>
              sum + Number(item.steps),
            0
          )}
        </h1>
      </div>

      <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
        <h3 className="text-gray-500 text-lg">
          Total Water
        </h3>

        <h1 className="text-5xl font-bold text-cyan-600 mt-3">
          {history.reduce(
            (sum, item) =>
              sum + Number(item.water),
            0
          )}
        </h1>
      </div>

    </div>

    {/* Table */}
    <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

      <div className="p-6 border-b">
        <h2 className="text-2xl font-semibold">
          📊 Activity Records
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>
            <tr className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">

              <th className="p-4 text-left">
                Date
              </th>

              <th className="p-4 text-left">
                Steps
              </th>

              <th className="p-4 text-left">
                Water
              </th>

              <th className="p-4 text-left">
                Calories
              </th>

              <th className="p-4 text-center">
                Actions
              </th>

            </tr>
          </thead>

          <tbody>

            {filteredData.length > 0 ? (

              filteredData.map((item, index) => (

                <tr
                  key={item._id}
                  className={`border-b hover:bg-slate-50 transition ${
                    index % 2 === 0
                      ? "bg-white"
                      : "bg-slate-50"
                  }`}
                >

                  <td className="p-4">
                    {item.date}
                  </td>

                  <td className="p-4 font-medium">
                    🚶 {item.steps}
                  </td>

                  <td className="p-4 font-medium">
                    💧 {item.water}
                  </td>

                  <td className="p-4 font-medium">
                    🔥 {item.calories}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          editLog(item)
                        }
                        className="px-4 py-2 rounded-xl bg-green-500 hover:bg-green-600 text-white font-medium transition"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteLog(item._id)
                        }
                        className="px-4 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  className="text-center py-10 text-gray-500 text-lg"
                >
                  📭 No Records Found
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>
);

};

export default History;