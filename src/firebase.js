
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';




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
export default db;