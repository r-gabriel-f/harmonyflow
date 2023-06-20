import {React, useState} from "react";
import "./Agregar.css";
import lit from "../assets/img/lit.jpg";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';




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
const usersRef = collection(db, 'users');

export const Agregar = () => {

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Agregar datos a Firestore
      await addDoc(usersRef, {
        name: name,
        password: password,
      });

      console.log('Datos agregados correctamente');
      setName('');
      setPassword('');
    } catch (error) {
      console.error('Error al agregar datos: ', error);
    }
  };
  
  return (
    <section className="addColor">
      <div className="login-box">
        <div className="image-container">
          <img src={lit} alt="lit" />
        </div>
        <div className="content-container">
          <h2>Agregar</h2>
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Password</label>
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
