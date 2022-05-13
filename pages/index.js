import Head from 'next/head'
import Image from 'next/image'
import {useState,useEffect} from 'react'
import styles from '../styles/Home.module.css'
import {postData, getData, } from '../utils/fetchdata'
import { useDispatch, useSelector } from "react-redux"
import { increment } from '../redux/productsreducer'
export default function Home() {


const [products, setProducts] = useState('')

const dispatch = useDispatch()

const {name,count}  = useSelector(state => state.product)


useEffect(() => {

  

  getData('products').then(data => {
// console.log(data)
     setProducts(data.name)
    
    console.log(data)

  })
}
  , [])







  return (
    <div className={styles.container}>
     
<h1 className='    bg-green-200 text-center'>
  next app  --------- {products}
</h1>
  

      
    </div>
  )
}
