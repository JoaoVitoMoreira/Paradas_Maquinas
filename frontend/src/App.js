import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/form";
import Grid from "./components/grid";
import {useEffect, useState} from "react";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import {RouterProvider} from "react-router-dom"
import router from "./router"



function App(){
  return <RouterProvider router={router} />
  
 
}

export default App;
