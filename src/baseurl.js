import axios from 'axios';

const axiosInstance = axios.create({
  // baseURL: 'http://43.204.92.123:4018/e_learning_api', 
  baseURL: 'http://localhost:4018/e_learning_api', 

   

  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance
