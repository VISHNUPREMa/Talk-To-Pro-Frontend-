
export const getAccessToken = () => {

    const match = document.cookie.match(new RegExp('(^| )adminaccessToken=([^;]+)'));
    return match ? match[2] : null;
  };
  
  export const getRefreshToken = () => {
    return localStorage.getItem('adminrefreshToken');
  };
  