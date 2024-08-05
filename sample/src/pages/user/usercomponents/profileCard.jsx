import React, { useContext, useState, useEffect } from 'react';
import { Heart, Share, Linkedin } from 'lucide-react';
import '../../../style/profilCard.css';
import ProfileContext from '../context/profileContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../usercomponents/navbar';
import { useData } from '../../contexts/userDataContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../../../instance/axiosInstance';
import { BACKEND_SERVER } from '../../../secrets/secret';
import Swal from 'sweetalert2';

export function ProfileCard() {
  const navigate = useNavigate();
  const { user } = useData();
  const { proProfile } = useContext(ProfileContext);
  const data = proProfile;
  const userId = data.userid;
  const proId = user.userid;

  const [showFollowButton, setShowFollowButton] = useState(false);
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);

  useEffect(() => {
    const fetchBookedData = async () => {
      try {
        const response = await axiosInstance.post(`${BACKEND_SERVER}/iscalled`, { proId, userId });
        if (response.data.success) {
          setShowFollowButton(true);
          if (response.data.data) {
            setAlreadyFollowed(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBookedData();
  }, [proId, userId]); 

  const profile = {
    profilepic: `${BACKEND_SERVER}/public/${data.profilepic}`,
    username: data.description,
    profession: data.profession,
    description: "I'm Viswas, a software developer with 3 years of experience in MERN, MEAN, and .NET stacks. Passionate about coding and mentorship, I'm here to guide aspiring developers on their journey to success. Let's build your skills and unlock your potential together!",
    languages: data.languages,
    skills: data.domain,
    experience: data.experience
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    if (userId === proId) {
      toast.error('Cannot book your own time slot', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      navigate("/slotbooking");
    }
  };

  const handleLinkedin = (e) => {
    e.preventDefault();
    alert("LinkedIn link");
  };

  const handleFollow = async (e) => {
    e.preventDefault();

    try {
      if (alreadyFollowed) {
    
        const result = await Swal.fire({
          title: "Confirmation",
          text: "Do you want to unfollow the mentor?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, unfollow!",
          cancelButtonText: "Cancel",
        });

        if (result.isConfirmed) {
     
          const response = await axiosInstance.patch(`${BACKEND_SERVER}/unfollow`, { userId, proId });
      
          if (response.data.success) {
          
            await Swal.fire({
              title: "Success",
              text: "You have unfollowed the mentor successfully.",
              icon: "success",
              confirmButtonText: "OK",
            });
            setAlreadyFollowed(false); 
          } else {
          
            Swal.fire({
              title: "Error",
              text: "Failed to unfollow the mentor. Please try again.",
              icon: "error",
              confirmButtonText: "OK",
            });
          }
        }
      } else {
        
        const response = await axiosInstance.patch(`${BACKEND_SERVER}/follow`, { userId, proId });
        
        if (response.data.success) {
         
          await Swal.fire({
            title: "Success",
            text: "You have followed the mentor successfully.",
            icon: "success",
            confirmButtonText: "OK",
          });
          setAlreadyFollowed(true); 
        } else {
         
          Swal.fire({
            title: "Error",
            text: "Failed to follow the mentor. Please try again.",
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "An error occurred. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  
    return (
      <div style={{ width: '100vw' }}>
        <ToastContainer />
        <div className="navbar-fixed">
          <Navbar />
        </div>
        <div className="profile-card mx-auto max-w-6xl px-2 py-6 lg:px-0" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
          <div className="overflow-hidden">
            <div className="mb-6 pt-4 md:px-6 md:pt-6 lg:mb-2 lg:p-6 2xl:p-8 2xl:pt-8">
              <div className="items-start justify-between lg:flex lg:space-x-8">
                <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
                  <div className="w-full xl:flex xl:flex-row-reverse">
                    <div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[2750px] 2xl:w-[300px]">
                      <div className="relative">
                        <img
                          alt="Profile"
                          src={profile.profilepic}
                          className="rounded-lg object-cover w-full h-full"
                          style={{ aspectRatio: '1.8 / 2' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
                  <div className="pb-4">
                    <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">{profile.username}</h2>
                    <p className="mt-2 font-semibold">⭐ 7.2/10 (5k votes)</p>
                  </div>
                  <div className="mb-2 pt-0.5">
                    <h4 className="text-15px mb-2 font-normal capitalize text-opacity-70">
                      Languages:
                    </h4>
                    <div className="flex gap-2 flex-wrap">
                      {profile.languages.map((language) => (
                        <span key={language} className="language-tag">{language}</span>
                      ))}
                    </div>
                  </div>
                  <div className="profile-profession pt-2">
                    <span>{profile.profession}</span>
                  </div>
                  <div className="profile-skills pt-2">
                    {profile.skills.map((skill) => (
                      <span key={skill} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                  <span>{profile.experience} year of experience</span>
                  <div className="pt-4 xl:pt-6">
                    <h3 className="text-15px mb-2 font-semibold sm:text-base lg:mb-3.5">
                      Description:
                    </h3>
                    <p className="text-sm">
                      {profile.description}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="mt-4 w-full rounded-md bg-yellow-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600"
                    onClick={handleBooking}
                  >
                    BOOK NOW
                  </button>
                  <div className="mt-4 flex gap-2">
                    {showFollowButton && (
                      <button
                        type="button"
                        className="flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
                        onClick={handleFollow}
                      >
                        {!alreadyFollowed && <Heart size={16} className="mr-3" />}
                        {alreadyFollowed ? 'UNFOLLOW' : 'FOLLOW'}
                      </button>
                    )}
                    <button
                      type="button"
                      className="flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
                      onClick={handleLinkedin}
                    >
                      <Linkedin size={16} className="mr-3" />LINKEDIN
                    </button>

                    <button
                      type="button"
                      className="flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
                    >
                      <Share size={16} className="mr-3" />SHARE
                    </button>
                  </div>
                 
                
                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
    
}

export default ProfileCard;
