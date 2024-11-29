import axios from "axios";

 export default axios.create({
    baseURL: 'https://api.rawg.io/api',
    params:{
        key: 'b7607f4ef4124dc79679a9182b0f55da'
    }

})