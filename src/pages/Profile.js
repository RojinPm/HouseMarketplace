import {  useState, useEffect } from 'react'
import { getAuth, updateProfile,updateEmail} from 'firebase/auth'
import {  Link, useNavigate } from 'react-router-dom'
import { updateDoc,doc } from 'firebase/firestore'
import { db } from '../firebase.config'
import {toast} from 'react-toastify'
import { isAdmin } from '@firebase/util'
import image from '../assets/jpg/rentCategoryImage.jpg'
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'

function Profile() {

   const auth=getAuth()

   const [changeDetails, setChangeDetails] = useState(false);
  
     const [formData, setFormData] = useState({

     name: auth.currentUser.displayName,
     email: auth.currentUser.email,
     photoURL: auth.currentUser.photoURL
     

     })

     const { name, email, photoURL } = formData

     const navigate = useNavigate()

     
     const onLogout = () => {

            auth.signOut()
            navigate('/')
        
     }
     const onSubmit = async() =>{

        try {

            if(auth.currentUser.displayName !== name){

               //Update Display name in the firebase

               await updateProfile(auth.currentUser, {

                  displayName:name


               })


              //Update use data inside firestore

              const userRef = doc(db, 'users', auth.currentUser.uid)
              await updateDoc(userRef, {

                 name: name

              })

            }
           
        } catch (error) {


          toast.error("Could not update profile details")
          
           
        }

     }  


//Here what does is whenever the input changes then the input with corresponding
//name or email that value is assigned to the corresponding id 
     const onChange = (e) =>{

       setFormData((prevState) =>({

        ...prevState,
        [e.target.id] : e.target.value,
        

       }))
       console.log(e.target.id);
       console.log(e.target.value)

     }



  return <div className='profile'>
      
           <header className="profileHeader">

             <p className="pageHeader">My Profile</p>
             <button type='button'

              className='logOut'  onClick={onLogout}>Logout</button>
 
           </header>

           <main>
            
       <div className="profileDetailsHeader">

        <p className="profileDetailsText">Personal Details</p>
               
               <p className="changePersonalDetails" onClick={() => {

                 changeDetails && onSubmit()
                 setChangeDetails((prevState) => !prevState)
 
               }}>

                   {changeDetails ? 'done' : 'change'}

                </p>

 
         </div>
  
              <div className="profileCard">

                   <form>

                      <div className="imageContainer">
                          
                       {photoURL && <img className='userImg' src={photoURL} alt=""  />} 
                         
                         </div>

                     

                      {console.log(photoURL)}

                      <input type="text" 
                      id="name"   
                     className={!changeDetails ? 'profileName' : 
                     'profileNameActive'} 
                     disabled={!changeDetails}
                     value={name}
                    onChange={onChange}
                    
                    />

                    <input type="text" 
                      id="email"   
                     className={!changeDetails ? 'profileEmail' : 
                     'profileEmail'} 
                     disabled={true}
                     value={email}
                    onChange={onChange}
                   
                    />
                     
                     
  

                   </form>


              </div>
 
                <Link to='/create-listing' className='createListing'>
                 
                 {/* <arrowRight /> */}
                 <img src={homeIcon} alt="home" />
                 <p>Sell or rent your home</p>
                 <img src={arrowRight} alt="arrow right" />

                </Link>

           </main>
      
      </div>

     
}

export default Profile