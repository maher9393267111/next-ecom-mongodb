import React from 'react';

import {useState, useContext, useEffect} from 'react'
import {useRouter} from 'next/router'
import { set } from 'mongoose';
const Create = () => {

    const initialState = {
        title: '',
        price: 0,
        inStock: 0,
        description: '',
        content: '',
        category: ''
    }

    const {id} = router.query

    const [onEdit, setOnEdit] = useState(false)
    const {isopen, setIsopen} = useState('')
    useEffect(() => {
        if(id){
            setOnEdit(true)
          
            setIsopen('open-is-active')
        }
        
        else{
            setOnEdit(false)
            setIsopen('is-not-active')
          
        }
    },[id])



    return (
        <div>
            <h1>

id is here ------- id {open}-------


            </h1>
        </div>
    );
}

export default Create;
