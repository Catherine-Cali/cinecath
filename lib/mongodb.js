import { MongoClient } from "mongodb";

// Connexion à MongoDB via l'URI stockée dans les variables d'environnement
const client = new MongoClient(process.env.MONGODB_URI);

// La promesse de connexion qui retourne le client une fois la connexion établie
const clientPromise = client.connect().then(() => client);

export default clientPromise;

