/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import CoffeeCard from "../components/card/coffeeCard";
import "./coffeeGallery.scss";
import axios from "axios";
import { TextField, InputAdornment, Button } from "@mui/material";
import { Search, Add } from "@mui/icons-material";
import AddModal from "../modals/addModal/addModal";
import EditModal from "../modals/editModal/editModal";
import DeleteModal from "../modals/deleteModal/deleteModal";
import PageLoader from "../components/loader/pageLoader";
import useDebounce from "../customHook/useDebounce";
import Loader from "../components/loader/Loader";
const CoffeeGallery = () => {
  const [coffees, setCoffees] = useState([]);
  // const [filteredCoffees, setFilteredCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 1000);

  const handleAddCoffee = (newCoffee) => {
    setCoffees([...coffees, newCoffee]);
  };

  const handleEdit = (coffee) => {
    setSelectedCoffee(coffee);
    setOpenEdit(true);
  };

  const handleUpdateCoffee = (updatedCoffee) => {
    setCoffees((prev) =>
      prev.map((c) => (c.id === updatedCoffee.id ? updatedCoffee : c))
    );
  };

  useEffect(() => {
    const fetchCoffees = async () => {
      try {
        const res = await axios.get("https://api.sampleapis.com/coffee/hot");
        setCoffees(res.data.slice(0, 12)); // limit to 12 items (3 rows x 4 columns)
      } catch (err) {
        console.error("Error fetching coffees:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCoffees();
  }, []);

  const handleDeleteClick = (coffee) => {
    setSelectedCoffee(coffee);
    setOpenDelete(true);
  };

  const handleDeleteCoffee = (coffeeToDelete) => {
    setCoffees((prev) => prev.filter((c) => c.id !== coffeeToDelete.id));
  };

  useEffect(() => {
    if (searchQuery) {
      setSearchLoading(true);
    } else {
      setSearchLoading(false);
    }
  }, [searchQuery]);

  // Stop loader when debounced value is ready
  useEffect(() => {
    setSearchLoading(false);
  }, [debouncedSearchQuery]);

  // Filter coffees based on debounced search
  const filteredCoffees = useMemo(() => {
    if (!debouncedSearchQuery) return coffees;
    return coffees.filter(
      (coffee) =>
        coffee.title
          ?.toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase()) ||
        coffee.description
          ?.toLowerCase()
          .includes(debouncedSearchQuery.toLowerCase())
    );
  }, [coffees, debouncedSearchQuery]);

  return (
    <div className="home">
      {/* <h1>Hot Coffees</h1> */}
      <div className="top-bar">
        {/* Search Bar */}
        <TextField
          className="custom-search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search coffees..."
          variant="outlined"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        {/* Add Button */}
        <button className="add-coffee" onClick={() => setOpenAdd(true)}>
          Add Coffee
        </button>
      </div>

      {loading ? (
        <div className="pageLoader">
          <p>Coffee Loading</p>
         <Loader size={20} color="#fff"/>

        </div>
      ) : (
        <div>
          <div className="coffee-grid">
            {filteredCoffees.map((coffee) => (
              <CoffeeCard
                key={coffee.id}
                coffee={coffee}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
            ))}
          </div>
        </div>
      )}
      <AddModal
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onAdd={handleAddCoffee}
      />
      <EditModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        coffee={selectedCoffee}
        onUpdate={handleUpdateCoffee}
      />
      <DeleteModal
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        coffee={selectedCoffee}
        onDelete={handleDeleteCoffee}
      />
    </div>
  );
};

export default CoffeeGallery;
