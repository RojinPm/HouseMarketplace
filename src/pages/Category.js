import React from 'react'
import {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom' //useParams is used to determine whether //the page is sell or rent //that value we wwill get
import {

   collection,
   getDocs,
   query,
   where,
  orderBy,
  limit,
  startAfter,

} from 'firebase/firestore'
import {db} from '../firebase.config'
import {toast} from 'react-toastify'
import Spinner from '../Components/Spinner'
import ListingItem from '../Components/ListingItem'


function Category() {

    const [listings, setListings] = useState(null);
    // const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true);

     const params = useParams();

    
    
      useEffect(() => {
        
        const fetchListings = async () =>{

           try {

             //Get a reference
             const listingsRef = collection(db, 'listings');

             //create a query
             const q = query(listingsRef, 
            
            where('type', '==', params.categoryName),
             
              orderBy('timestamp', 'desc'),
              limit(10)

            
             )

            //Executing the query

                const querySnap =  await getDocs(q);

                 const listings = []

                 querySnap.forEach((doc) =>{

                   return listings.push({

                     id:doc.id,
                     data:doc.data()                

                   })

                     
                 })


              setListings(listings);
              setLoading(false);
               
           } catch (error) {

              toast.error("Could not fetch Listings");

               
           }


        }
 
         fetchListings();

      }, [params.categoryName])
    
     

  return (

     <div className='category'>

         <header>

           <p className="pageHeader">
               
               {params.categoryName === 'rent' ? 'Places for rent'
               : 'Places for sale'}
               
           </p>


         </header>


         {loading ? ( <Spinner /> ) : listings && listings.length > 0 ? (


          <>

              <main>
           
                <div className="categoryListings">
                      
                   { listings.map((listing) => (

                      <ListingItem key={listing.id} id={listing.id} listing={listing.data} />
 
                   )) }   

                      
                </div>

          
             </main>


             </>

         ) : (
            
            <p>No Listings for {params.categoryName}</p>

         )}
 
       
``
     </div>
      



  )
}

export default Category