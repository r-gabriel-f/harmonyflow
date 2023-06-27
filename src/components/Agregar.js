import {React, useState} from "react";


import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0nElsGjStv447pqRCGkMEikDBufOPMqw",
  authDomain: "harmonyflow-436ff.firebaseapp.com",
  projectId: "harmonyflow-436ff",
  storageBucket: "harmonyflow-436ff.appspot.com",
  messagingSenderId: "465919322693",
  appId: "1:465919322693:web:8392b6c800a27e1ed0512c"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const musicasRef = collection(db, 'musicas');
const storage = getStorage(app);

export const Agregar = () => {

  const [file, setFile] = useState(null);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (file) {
        // Subir archivo a Firebase Storage
        const storageRef = ref(storage, `musicas/${file.name}`);
        await uploadBytes(storageRef, file);
      }

      // Agregar datos a Firestore
      await addDoc(musicasRef, {
        archivo: file ? file.name : '',
        
      });

      console.log('Datos agregados correctamente');
      setFile(null);
      
    } catch (error) {
      console.error('Error al agregar datos: ', error);
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };
  return (
    <section className="adColor">
      <div className="lgin-box">
        <div className="iage-container">
          
        </div>
        <div className="contnt-container">
          <h2>Agregar</h2>
          <form onSubmit={handleSubmit}>
            <div className="uer-box">
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
                required
              />
              <label>Archivo de música</label>
            </div>
            
            <button type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Insertar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
