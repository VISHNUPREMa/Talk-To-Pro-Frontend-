import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import '../../style/prodetails.css'
import {BACKEND_SERVER} from  '../../secret/secret'
import AdminNavbar from './adminNavbar';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const ProRequestDetails = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const proRequest = location.state?.proRequest || {}; 
  const verifyPro = async()=>{
    try {
      const id = proRequest[0].userid
      const response = await axios.patch(`${BACKEND_SERVER}/verifyprorequest`,{id});
      if(response.data.success){
        toast.success(response.data.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });

        navigate('/admin/dashboard')

        
      }else{
        toast.error(response.data.message, {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
  <>
  <div className='navbar-req'>
  <AdminNavbar/>
  </div>

    <div className="proRequest-card mx-auto max-w-6xl px-2 py-6 lg:px-0" style={{backgroundColor:'white'}}>
      <ToastContainer />
      <div className="overflow-hidden">
        <div className="mb-6 pt-4 md:px-6 md:pt-6 lg:mb-2 lg:p-6 2xl:p-8 2xl:pt-8">
          <div className="items-start justify-between lg:flex lg:space-x-8">
            <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
              <div className="w-full xl:flex xl:flex-row-reverse">
                <div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-2 lg:w-[75px] 2xl:w-[100px]">
                  <div className="relative">
                    <img
                      alt="proRequest"
                      src={`${BACKEND_SERVER}/public/${proRequest[0].profilePic}`}
                      className="rounded-lg object-cover w-full h-full"
                      style={{ aspectRatio: '1 / 1', maxWidth: '275px', maxHeight: '300px' }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-4">
               
                <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">USERNAME : {proRequest[0].username}</h2>
              </div>
              <div className="mb-2 pt-0.5">
              
                <h4 className="text-15px mb-2 font-normal capitalize text-opacity-70">
                  Languages:
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {proRequest[0].languages.map((language) => (
                    <span key={language} className="language-tag">{language}</span>
                  ))}
                </div>
              </div>
              <br />
              <div className="proRequest-profession pt-2">
                <h2>Profession</h2>
                <span> {proRequest[0].profession}</span>
              </div>
              <br />
              <h4 className="text-15px mb-2 font-normal capitalize text-opacity-70">
                  Domains:
                </h4>
              <div className="proRequest-skills pt-2">
                {proRequest[0].domain.map((domain) => (
                  <span key={domain} className="skill-tag">{domain}</span>
                ))}
              </div>
              <br />
              <span>{proRequest[0].experience} years of experience</span>
              <div className="pt-4 xl:pt-6">
                <h3 className="text-15px mb-2 font-semibold sm:text-base lg:mb-3.5">
                  Description:
                </h3>
                <p className="text-sm">
                  {proRequest[0].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button id="verify-btn" style={{ marginLeft:'700px'}}  onClick={verifyPro}>Verify</button>
   
    </div>
    </>
  );
};

export default ProRequestDetails;
