import '../styles/globals.css'
import { wrapper } from "../redux/store"

import 'antd/dist/antd.css'
  

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}




  export default wrapper.withRedux(MyApp)

