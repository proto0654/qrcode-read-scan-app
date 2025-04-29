import { createRoot } from 'react-dom/client'
import Layout from './layout' // Исправлено на нижний регистр согласно линтеру
import { BrowserRouter } from 'react-router-dom'

import  Main_style  from "./Main.module.css"

import {
  createBrowserRouter
} from "react-router-dom"




createRoot(document.getElementById('root')).render(
    <div className={Main_style.main_container}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
)
