import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "../Styles/Filters.css";
import { Divider } from "@mui/material";
import { activeFilter } from "../redux/EstatelyReducer";
import { useDispatch, useSelector } from "react-redux";

function Filters() {
  const [filtersList, setFiltersList] = useState([]);

  const dispatch = useDispatch();
  const active = useSelector((state) => state.estately.activeFilter);

  const fetchFiltersList = async () => {
    const response = await axios.get("http://localhost:5000/filters");
    setFiltersList(response.data);
  };

  useEffect(() => {
    fetchFiltersList();
  }, []);

  const handleFilterClick = (value) => {
    dispatch(activeFilter(value));
  };

  return (
    <div>
      {filtersList.length > 0
        ? filtersList.map((ele) => (
            <React.Fragment key={ele.id}>
              <div
                className={`filter-tab ${
                  active?.trim() === ele?.data.trim()
                    ? "active"
                    : ""
                }`}
                onClick={() => handleFilterClick(ele.data)}
              >
                {ele.data}
              </div>
              <Divider />
            </React.Fragment>
          ))
        : "No filters found"}
    </div>
  );
}

export default Filters;
