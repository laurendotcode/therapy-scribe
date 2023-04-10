import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

export const useGetNames = () => {
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    async function getAllDocuments() {
      const querySnapshot = await getDocs(collection(db, "Patients"));
      const idsList: string[] = [];
      querySnapshot.forEach((doc) => {
        idsList.push(doc.id);
      });
      setNames(idsList);
    }
    getAllDocuments();
  }, []);

  return names;
};
