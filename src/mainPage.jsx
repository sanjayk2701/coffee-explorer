import React, { useEffect, useState } from "react";
import CoffeeCard from "../components/Card/CoffeeCard";
import "./mainPage.scss";
import axios from "axios";

const Home = () => {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleEdit = (coffee) => {
    console.log("Edit:", coffee);
  };

  const handleDelete = (coffee) => {
    console.log("Delete:", coffee);
  };

  return (
    <div className="home">
      <h1>Hot Coffees</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="coffee-grid">
          {coffees.map((coffee) => (
            <CoffeeCard
              key={coffee.id}
              coffee={coffee}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
