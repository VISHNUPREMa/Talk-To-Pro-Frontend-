import React , {useContext} from 'react';
import { ChevronLeft, ChevronRight, Heart, Share, Linkedin } from 'lucide-react';
import '../../../style/profilCard.css'
import { BACKEND_SERVER } from '../../../../../admin/src/secret/secret';
import ProfileContext from '../context/profileContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '../usercomponents/navbar';



export function ProfileCard() {
  const navigate = useNavigate()
  const { proProfile } = useContext(ProfileContext);
  const data = proProfile;
 
  const profile = {
    profilepic: `${BACKEND_SERVER}/public/${data.profilepic}`,
    username: data.description,
    profession: data.profession,
    description: "I'm Viswas, a software developer with 3 years of experience in MERN, MEAN, and .NET stacks. Passionate about coding and mentorship, I'm here to guide aspiring developers on their journey to success. Let's build your skills and unlock your potential together!",
    languages: data.languages,
    skills: data.domain,
    experience: data.experience
  };

  const handleBooking = async(e) => {
    e.preventDefault();
    try {
      navigate("/slotbooking")
    } catch (error) {
      
    }

  };
  const handleLinkedin = (e)=>{
    e.preventDefault();
    console.log("global context : ",proProfile);
    console.log("djfhb jbb hv : ",state.profileData);
    alert("linked in")
  }

  return (
  <div style={{width:'100vw'}}>
 
 <div className="navbar-fixed">
        <Navbar />
      </div>
    <div className="profile-card mx-auto max-w-7xl px-2 py-10 lg:px-0">
      <div className="overflow-hidden">
        <div className="mb-9 pt-4 md:px-6 md:pt-7 lg:mb-2 lg:p-8 2xl:p-10 2xl:pt-10">
          <div className="items-start justify-between lg:flex lg:space-x-8">
            <div className="mb-6 items-center justify-center overflow-hidden md:mb-8 lg:mb-0 xl:flex">
              <div className="w-full xl:flex xl:flex-row-reverse">
                <div className="relative mb-2.5 w-full shrink-0 overflow-hidden rounded-md border md:mb-3 xl:w-[250px] 2xl:w-[250px]">
                  <div className="relative">
                    <img
                      alt="Profile"
                      src={profile.profilepic}
                      className="rounded-lg object-cover w-full h-full"
                      style={{ aspectRatio: '1.8 / 2' }}
                    />
                     <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  
                    </div> 
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:w-[430px] xl:w-[470px] 2xl:w-[480px]">
              <div className="pb-5">
                <h2 className="text-lg font-semibold md:text-xl xl:text-2xl">{profile.username}</h2>
                <p className="mt-4 font-semibold">⭐ 7.2/10 (5k votes)</p>
              </div>
              <div className="mb-2 pt-0.5">
                <h4 className="text-15px mb-3 font-normal capitalize text-opacity-70">
                  Languages:
                </h4>
                <div className="flex gap-2">
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
              <div className="pt-6 xl:pt-8">
                <h3 className="text-15px mb-3 font-semibold sm:text-base lg:mb-3.5">
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
                <button
                  type="button"
                  className="flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
                >
                  <Heart size={16} className="mr-3" />
                  Follow
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80"
                >
                  <Share size={16} className="mr-3" />
                  Share
                </button>
                <Linkedin size={24} className="ml-2 text-blue-600 cursor-pointer hover:text-blue-800"  onClick={handleLinkedin}/>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
