import { useEffect, useState } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db, auth, storage } from './config/firebaseConfig';
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes } from 'firebase/storage';

function App() {
  const [movieList, setMovieList] = useState([]);

  const [fileUpload, setFileUpload] = useState(null);

  // new movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [isReceivedOscar, setIsReceivedOscar] = useState(false);

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async() => {
    try {
      const data = await getDocs(moviesCollectionRef);
      // console.log(data);
      const filteredData = data.docs.map((doc)=> ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredData);
    } catch (error) {
      console.log(error);        
    }
  };

  useEffect(()=>{
    getMovieList();
  },[]);

  const onSubmitMovie = async () => {
    try{
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        receivedAnOscar: isReceivedOscar,
        userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch(err){
      console.error(err);
    }
  };
  
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try{
      await deleteDoc(movieDoc);
      getMovieList();
    } catch(err){
      console.log(err);
    }
  }

  const uploadFile = async()=>{
    if(!fileUpload) return;
    const fileFolderRef = ref(storage, `projectFiles${fileUpload.name}`);
    try{
      await uploadBytes(fileFolderRef, fileUpload);
    } catch (error){
      console.log(error);
    }
  }
  return (
    <div className='App'>
      FireBase Course
      <Auth/>
      <div>
        <input type="text" placeholder='Movie Title' 
          onChange={(e)=>(setNewMovieTitle(e.target.value))}
        />
        <input type="number" placeholder='Movie Release Data' 
          onChange={(e)=>(setNewMovieReleaseDate(e.target.value))}
        />
        <input type="checkbox" 
          checked={isReceivedOscar}
          onChange={(e)=>(setIsReceivedOscar(e.target.value))}
        />
        <label> Received an Oscar</label>
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>
      <div>
        {
          movieList.map((movie, index)=>(
            <div key={index}>
              <label htmlFor="">Movie Title:{movie.title} </label>
              <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
            </div>
          ))
        }
      </div>

      <div>
        <input type="file" onChange={(e)=>(setFileUpload(e.target.files[0]))}/>
        <button onClick={uploadFile}>Upload file</button>
      </div>
    </div>
  );
}

export default App;
