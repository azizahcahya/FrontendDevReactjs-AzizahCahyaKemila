import React, { useEffect, useState } from "react";
import { Rating } from '@mui/material';
import { slice } from 'lodash';
import "../styles/home.css";
import Header from '../components/header';
import Navbar from '../components/navbar';
import { Link } from "react-router-dom";


// api url
const BASE_URL = "https://restaurant-api.dicoding.dev";
const GET_LIST_RESTAURANT_URL = BASE_URL + "/list";
const SEARCH_RESTAURANT = BASE_URL + "/search?q="; //https://restaurant-api.dicoding.dev/search?q={restaurant name}
const GET_RESTAURANT_IMG = BASE_URL + "/images/medium/"; //https://restaurant-api.dicoding.dev/images/medium/<pictureId>


const Home = () => {
  const [dataRestaurant, setDataRestaurant] = useState([]);

  const [isCompleted, setIsCompleted] = useState(false)
  const [count, setCount] = useState(8)
  const initialPosts = slice(dataRestaurant.restaurants, 0, count)
  console.log(initialPosts);



  const loadMore = () => {
    setCount(count + 8)
    if (count <= dataRestaurant.restaurants.length) {
      setIsCompleted(true)
    } else {
      setIsCompleted(false)
    }
  }

  const fetchData = (url) => {
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setDataRestaurant(data)
      })
  }

  useEffect(() => {
    fetchData(GET_LIST_RESTAURANT_URL);
  }, []);

  // setCategoryList(dataRestaurant.restaurants.city)

  // console.log("ini category : ", categoryList);
    return(
        <>
            <Header/>
            <Navbar/>
            <p className="title">All Restaurant</p>
            <div className="container">
            {initialPosts.map((data, id) => (
              <div className="restaurantItem">
                  <img src={GET_RESTAURANT_IMG + data.pictureId}/>
                  <p className="name"> {data.name} </p>
                  <Rating name="read-only" value={data.rating} readOnly size="small" style={{ color: '#212e52' }}/>
                  <div className="categories"> {data.city} | $$$</div>
                  <div className="isOpen"></div>
                  <Link to={"/detailView"} state={data.id}>
                    <button className="learnMore" >Learn More</button>
                  </Link>
              </div>
            ))}
            </div>
            {isCompleted ? (
                <button className="loadMore">No More</button>
              ) : (
                <button className="loadMore" onClick={loadMore}>Load More</button>
              )   
            }
        </>
    )

}

export default Home;