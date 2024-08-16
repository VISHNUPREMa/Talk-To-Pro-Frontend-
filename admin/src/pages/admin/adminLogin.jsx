import React,{useState} from 'react';
import '../../style/adminLogin.css';
import axios from 'axios'
import { BACKEND_SERVER } from '../../secret/secret';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [email,setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate()

    const handlelogin = async(e)=>{
        e.preventDefault();
        try {
            if(email.trim() !== "" && password.trim() !== ""){
                console.log([email,password]);
                const response = await axios.post(`${BACKEND_SERVER}/admin/login`,{email,password});
                if(response.data.success){
                  const { accessToken, refreshToken,  } = response.data.data;

                  console.log("response access token : ",accessToken);
                  console.log("response refresh token : ",refreshToken);
                  document.cookie = `adminaccessToken=${accessToken}; path=/`;
                  localStorage.setItem('adminrefreshToken', refreshToken);
                
                    navigate("/admin/dashboard")
                }else{
                  console.log(response.data);
                  toast.error(response.data.message, {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
                }
           
            }else{
                toast.error('please enter valid login credentials.', {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                  });
            }
        } catch (error) {
            
        }
    }


  return (
   
   
    <div className="container">
          <ToastContainer />
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handlelogin}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input type="text" className="login__input" placeholder=" Email" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input type="password" className="login__input" placeholder="password" onChange={(e) =>setPassword(e.target.value)} />
            </div>
            <button className="button login__submit">
              <span className="button__text">Login</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
   
  );
}

export default LoginPage;
