import { useState, useEffect } from "react";
import "../Styles/Buyers.css";
import { GoSortDesc } from "react-icons/go";
import { GoSortAsc } from "react-icons/go";
import { FaBuilding } from "react-icons/fa";
import { BiSolidArea } from "react-icons/bi";
import { FaStairs } from "react-icons/fa6";
import { MdCurrencyRupee } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import axios from "axios";
import { Popover, Typography, Box } from "@mui/material";
import Filters from "../Components/Filters";

function Buyers() {
  const [data, setData] = useState([]);
  const [asc, setAsc] = useState(true);
  const [properties, setProperties] = useState([]);
  const list = useSelector((state) => state.estately.filteredList);
  const [results, setResults] = useState(list?.length || data?.buy?.length);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //filtering system
  const [localities, setLocalities] = useState([]);
  const [type, setType] = useState([]);
  const [bhk, setBhk] = useState([]);

  const [showLocalities, setShowLocalities] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showBhk, setShowBhk] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    console.log(list);
    if (list.length > 0) {
      setProperties(list);
    } else {
      axios
        .get("http://localhost:5000/buy")
        .then((response) => {
          setData(response.data);
          setProperties(response.data);
          setResults(response.data.length);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [list, dispatch]);

  const filterProperties = () => {
    let updatedList = list.length > 0 ? list : data;

    if (localities.length) {
      updatedList = updatedList.filter((p) => localities.includes(p.place));
    }
    if (type.length) {
      updatedList = updatedList.filter((p) => type.includes(p.type));
    }
    if (bhk.length) {
      updatedList = updatedList.filter((p) => bhk.includes(p.bhk));
    }
    setProperties(updatedList);
    setResults(updatedList.length);
  };

  useEffect(() => {
    filterProperties();
  }, [localities, type, bhk]);

  const convertPrice = (price) => {
    const number = parseFloat(price);
    if (price.includes("Cr")) {
      return number * 10000000;
    }
    return number * 100000;
  };

  const sortProperties = () => {
    const sortedProperties = [...properties].sort((a, b) => {
      const priceA = convertPrice(a.price);
      const priceB = convertPrice(b.price);
      return asc ? priceA - priceB : priceB - priceA;
    });
    setProperties(sortedProperties);
    setAsc(!asc);
  };

  const handleLocalities = () => {
    setShowLocalities(!showLocalities);
    setShowBhk(false);
    setShowType(false);
  };

  const handleBhk = () => {
    setShowLocalities(false);
    setShowBhk(!showBhk);
    setShowType(false);
  };

  const handleType = () => {
    setShowLocalities(false);
    setShowBhk(false);
    setShowType(!showType);
  };

  const insertLocalities = (locality) => {
    setLocalities((prevLocalities) => {
      if (prevLocalities.includes(locality)) {
        return prevLocalities.filter((loc) => loc !== locality);
      } else {
        return [...prevLocalities, locality];
      }
    });
  };

  const insertType = (type) => {
    setType((prevType) => {
      if (prevType.includes(type)) {
        return prevType.filter((t) => t !== type);
      } else {
        return [...prevType, type];
      }
    });
  };

  const insertBhk = (bhk) => {
    setBhk((prevBhk) => {
      if (prevBhk.includes(bhk)) {
        return prevBhk.filter((b) => b.bhk !== bhk);
      } else {
        return [...prevBhk, bhk];
      }
    });
  };

  return (
    <div className="buyers">
      <Typography variant="h5">
        {results} Results | Properties for sale in Bangalore
      </Typography>

      <div className="filter-sort">
        <div className="filters">
          <h3>Filters: </h3>

          <div className="parent">
            <button className="filter-btn " onClick={handleLocalities}>
              Top Localities
            </button>
            {showLocalities && (
              <div className="menu">
                <button onClick={() => insertLocalities("Indiranagar")}>
                  Indiranagar
                </button>
                <button onClick={() => insertLocalities("Whitefield")}>
                  Whitefield
                </button>
                <button onClick={() => insertLocalities("Hebbal")}>
                  Hebbal
                </button>
              </div>
            )}
          </div>

          <div className="parent">
            <button className="filter-btn" onClick={handleType}>
              Property Type
            </button>
            {showType && (
              <div className="menu">
                <button onClick={() => insertType("villa")}>villa</button>
                <button onClick={() => insertType("apartment")}>
                  apartment
                </button>
              </div>
            )}
          </div>

          <div className="parent">
            <button className="filter-btn" onClick={handleBhk}>
              BHK
            </button>
            {showBhk && (
              <div className="menu">
                <button onClick={() => insertBhk(1)}>1 BHK</button>
                <button onClick={() => insertBhk(2)}>2 BHK</button>
                <button onClick={() => insertBhk(3)}>3 BHK</button>
                <button onClick={() => insertBhk(4)}>4 BHK</button>
                <button onClick={() => insertBhk(5)}>5 BHK</button>
                <button onClick={() => insertBhk(6)}>6 BHK</button>
                <button onClick={() => insertBhk(7)}>7 BHK</button>
              </div>
            )}
          </div>

          <div className="parent">
            <Box position="relative">
              {/* Blurred overlay */}
              {open && (
                <Box
                  sx={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backdropFilter: "blur(1px)",
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    zIndex: 1,
                  }}
                  onClick={handleClose}
                />
              )}

              {/* Trigger Button */}
              <button
                className="filter-btn"
                onClick={handleClick}
              >
                More filters
              </button>

              {/* Popover Menu */}
              <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                sx={{ zIndex: 2 }} // Ensure it's above the blur overlay
              >
                <Box sx={{ p: 2, width: 900, height : 400 }}>
                  <div style={{width:'30%'}}>
                      <Filters />
                  </div>
                  <div style={{width:'70%'}}>
 
                  </div>
                </Box>
              </Popover>
            </Box>
          </div>

        </div>
        <button className="sort-btn" onClick={sortProperties}>
          Sort by price
          {asc == true ? (
            <GoSortAsc color="grey" size={25} />
          ) : (
            <GoSortDesc color="grey" size={25} />
          )}
        </button>
      </div>

      <div className="properties">
        {properties.map((p) => (
          <div
            className="p-card"
            key={p.pID}
            onClick={() => navigate(`/buy/${p.pID}`)}
          >
            <img src={p.img} alt="property image" className="p-image" />

            <div className="info">
              <h3 style={{ color: "black" }}>
                {p.bhk} BHK {p.type} for sale in {p.place}
              </h3>

              <div className="p-icons">
                <p>
                  {" "}
                  <BiSolidArea
                    color="grey"
                    size={30}
                    style={{ marginRight: "10px" }}
                  />
                  {p.area}
                </p>
                <p>
                  {" "}
                  <FaBuilding
                    color="grey"
                    size={30}
                    style={{ marginRight: "10px" }}
                  />
                  {p.status}
                </p>
                <p>
                  {" "}
                  <FaStairs
                    color="grey"
                    size={30}
                    style={{ marginRight: "10px" }}
                  />
                  {p.floor} Floor
                </p>
              </div>
            </div>

            <div className="price-others">
              <span>
                <MdCurrencyRupee />
                {p.price}
              </span>
              <button className="contact-owner">Contact Owner</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Buyers;


