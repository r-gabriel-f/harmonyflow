import { React, useEffect, useState, useRef } from "react";
import {
  getFirestore,
  collection,
  query,
  onSnapshot,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import "./Lista.css";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD0nElsGjStv447pqRCGkMEikDBufOPMqw",
  authDomain: "harmonyflow-436ff.firebaseapp.com",
  projectId: "harmonyflow-436ff",
  storageBucket: "harmonyflow-436ff.appspot.com",
  messagingSenderId: "465919322693",
  appId: "1:465919322693:web:8392b6c800a27e1ed0512c",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const musicasRef = collection(db, "musicas");
const storage = getStorage(app);

export const List = () => {
  const [musicas, setMusicas] = useState([]); // Estado para almacenar las músicas
  const [selectedSong, setSelectedSong] = useState(null); // Estado para almacenar la canción seleccionada
  const [audioSource, setAudioSource] = useState(null); // Estado para almacenar la URL de la canción seleccionada
  const audioRef = useRef(null); // Referencia al elemento de audio

  useEffect(() => {
    // Escucha los cambios en la colección "musicas" de Firestore
    const unsubscribe = onSnapshot(query(musicasRef), (snapshot) => {
      // Mapea los documentos de la colección a un arreglo de objetos de música
      const musicasData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMusicas(musicasData); // Actualiza el estado con los datos de música obtenidos
    });

    return () => unsubscribe(); // Se desuscribe de los cambios al desmontar el componente
  }, []);

  useEffect(() => {
    if (selectedSong) {
      const audioStorageRef = ref(storage, `musicas/${selectedSong.archivo}`);
      getDownloadURL(audioStorageRef)
        .then((url) => {
          setAudioSource(url); // Almacena la URL de la canción seleccionada
          if (audioRef.current) {
            audioRef.current.load(); // Carga la nueva canción en el elemento de audio
            audioRef.current.play(); // Reproduce la nueva canción automáticamente
          }
        })
        .catch((error) => {
          console.error("Error al obtener la URL de descarga:", error);
        });
    }
  }, [selectedSong]);

  const handlePlayButtonClick = (song) => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pausa la canción actualmente en reproducción
    }
    setSelectedSong(song); // Actualiza la canción seleccionada
  };
  

  const handleAudioLoadedMetadata = () => {
    if (audioRef.current) {
      audioRef.current.play(); // Reproduce la canción automáticamente al cargar los metadatos
    }
  };

  const handleAudioEnded = () => {
    const currentIndex = musicas.findIndex(
      (musica) => musica.id === selectedSong.id
    );
    const nextIndex = (currentIndex + 1) % musicas.length;
    const nextSong = musicas[nextIndex];

    if (audioRef.current) {
      audioRef.current.pause(); // Pausa la canción actualmente en reproducción
    }
    setSelectedSong(nextSong); // Actualiza la canción seleccionada a la siguiente canción en la lista
  };

  const [currentTime, setCurrentTime] = useState(0);

  function handleRangeChange(event) {
    const newTime = parseFloat(event.target.value);
    audioRef.current.currentTime = newTime;
  }

  function handleAudioTimeUpdate(event) {
    const newTime = event.target.currentTime;
    setCurrentTime(newTime);
  }



  const Pause = (song) => {
    if (audioRef.current) {
      audioRef.current.pause(); 
    }
    
  };
  const Play = (song) => {
    if (audioRef.current) {
      audioRef.current.play(); 
    }
    
  };
  function Next() {
    const currentIndex = musicas.findIndex((musica) => musica.id === selectedSong.id);
    const nextIndex = (currentIndex + 1) % musicas.length;
    const nextSong = musicas[nextIndex];
    setSelectedSong(nextSong); 
  }
  function Back() {
    const currentIndex = musicas.findIndex((musica) => musica.id === selectedSong.id);
    const nextIndex = (currentIndex - 1 + musicas.length) % musicas.length;
    const nextSong = musicas[nextIndex];
    
    if (nextSong) {
      setSelectedSong(nextSong); 
    }
  }
  

  return (
    <section className="list-container">
      <div className="container">
        <div id="lista-musicas">
          <h3>Lista de Músicas</h3>
          <ul>
            {musicas.map((musica) => (
              <li key={musica.id}>
                <ion-icon
                  id="icono"
                  name="play-circle-outline"
                  onClick={() => handlePlayButtonClick(musica)}
                ></ion-icon>
                {musica.archivo}
              </li>
            ))}
          </ul>
        </div>
        {selectedSong && (
          <div className="player-container">
            <h4>Reproduciendo: {selectedSong.archivo}</h4>

            <audio 
              ref={audioRef}
              
              onLoadedMetadata={handleAudioLoadedMetadata}
              onEnded={handleAudioEnded}
              onTimeUpdate={handleAudioTimeUpdate}
            >
              <source src={audioSource} type="audio/mp3" />
              Tu navegador no soporta el elemento de audio.
            </audio>
            <input
              type="range"
              className="form-range"
              id="customRange1"
              onChange={handleRangeChange}
              value={currentTime}
              min={0}
              max={audioRef.current?.duration || 0}
              step={0.1}
            />

            <ion-icon name="play-outline" onClick={Play}></ion-icon>
            <ion-icon name="pause-outline" onClick={Pause}></ion-icon>
            <ion-icon name="play-skip-back-outline" onClick={Back}></ion-icon>
            <ion-icon name="play-skip-forward-outline" onClick={Next}></ion-icon>
         
          </div>
        )}
      </div>
    </section>
  );
};
