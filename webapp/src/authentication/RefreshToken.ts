// import  { useEffect } from 'react';
// import { validateToken } from './AuthContext';

// const useTokenRefresh = () => {
//     useEffect(() => {
//         const refreshInterval = setInterval(() => {
//             refreshAccessToken();
//         },  50000); // 4 minutes

//         return () => clearInterval(refreshInterval); // Clean up on unmount
//     }, []);
// };

// const refreshAccessToken = () => {
//     validateToken()
//     console.log('Token refreshed');
//     // Example: Make an API call to refresh the token
// };

// export default useTokenRefresh


