import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "./Table.module.scss";
import Pagination from "../Pagination/Pagination";

// The API endpoint
const API_URL = "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

const Table = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;

  // Fetch data from the API
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = projects.slice(indexOfFirstRecord, indexOfLastRecord);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={style.tableContainer}>
      {/* Loading indicator */}
      {loading && <div className={style.loading}>Loading...</div>}

      {/* Table to display projects */}
      {!loading && projects.length > 0 && (
        <table className={style.table}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage Funded</th>
              <th>Amount Pledged</th>
            </tr>
          </thead>
          <tbody>
            {currentRecords.map((project, index) => (
              <tr key={project?.["s.no"]}>
                <td>{project?.["s.no"]}</td>
                <td className={style.percentage}>{project?.["percentage.funded"]}%</td>
                <td>${project?.["amt.pledged"]?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!loading &&<Pagination
        totalRecords={projects.length}
        recordsPerPage={recordsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />}
    </div>
  );
};

export default Table;