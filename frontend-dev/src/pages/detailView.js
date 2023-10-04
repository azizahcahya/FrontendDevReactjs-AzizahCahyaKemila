import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://restaurant-api.dicoding.dev";
const GET_DETAIL_RESTAURANT = BASE_URL + "/detail/"; //https://restaurant-api.dicoding.dev/detail/id


function DetailView() {
    const [dataRestaurant, setDataRestaurant] = useState([]);
    const location = useLocation();
    const propsData = location.state;


    useEffect(() => {
      fetch(GET_DETAIL_RESTAURANT+propsData)
      .then(response => response.json())
      .then(data => setDataRestaurant(data))
    },[])

    const restaurant = dataRestaurant.restaurant ? dataRestaurant.restaurant : [];
    console.log(restaurant);

    return (
      <div>
        <p>{restaurant.name}</p>
      </div>
    );
}

export default DetailView;