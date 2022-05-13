import { combineReducers } from "redux"

import  productReducer  from "./productsreducer"

const reducers = combineReducers({
  product: productReducer,
})

export default reducers