import React, { useState, useEffect } from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons';
import '../styles/navbar.css'

// api url
const BASE_URL = "https://restaurant-api.dicoding.dev";
const GET_LIST_RESTAURANT_URL = BASE_URL + "/list";


const Navbar = () => {

    const [openPrice, setOpenPrice] = useState(false);
    const [openCat, setOpenCat] = useState(false);
    const [dataRestaurant, setDataRestaurant] = useState([])

    const fetchUserData = (url) => {
      fetch(url)
        .then(response => {
          return response.json()
        })
        .then(data => {
          setDataRestaurant(data)
        })
    }
  
    useEffect(() => {
      fetchUserData(GET_LIST_RESTAURANT_URL)
    }, [])
    const restaurants = dataRestaurant.restaurants ? dataRestaurant.restaurants : [];

    const handleOpenPrice = () => {
        setOpenPrice(!openPrice);
        setOpenCat();
    };

    const handleOpenCat = () => {
        setOpenCat(!openCat);
        setOpenPrice();
    };

    return(
        <>
        <primaryNav>
            <div className="left-nav">
                <p>Filter by</p>
                <openNow>
                    <span class="checkmark"></span>
                    <a href={URL}><input type="checkbox" checked="checked" />Open Now</a>
                </openNow>
                <price>
                    <div class="dropdown-price">
                        <button class="pricebtn" onClick={handleOpenPrice}>Price <FontAwesomeIcon icon={faAngleDown} /></button>
                        {openPrice ? (
                        <ul class="price"> 
                            <li className="price-item">Link 1</li>
                            <li className="price-item">Link 2</li>
                            <li className="price-item">Link 3</li>
                        </ul>) : null}
                    </div>
                </price>
                <categories>
                    <div class="dropdown-cat">
                        <button class="catbtn" onClick={handleOpenCat}>Categories <FontAwesomeIcon icon={faAngleDown} /></button>
                        {openCat ? (
                        <ul class="cat"> 
                        { restaurants.map((data, id) => (
                            <div>
                                <li className="cat-item"> {data.city} </li>
                            </div>
                        ))}
                        </ul>) : null}
                    </div>
                    
                </categories>
            </div>
            <div className="right-nav">
                <button className="clear">Clear All</button>
            </div>
            
        </primaryNav>
        </>
    )
}

export default Navbar