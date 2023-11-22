import React, { useEffect, useState } from "react";
import "./App.css";
import Header from "./Components/Header";
import SearchContact from "./Components/SearchContact";
import { app } from "./config/firebase";
import {
  getFirestore,
  collection,
  doc,
  addDoc,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import ContactCard from "./Components/ContactCard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const db = getFirestore(app);

const App = () => {
  const [contactList, setContactList] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    const colRef = collection(db, "contacts");
    onSnapshot(colRef, (snapshot) => {
      try {
        let contacts = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(contacts);
        setContactList(contacts);
        setFilteredData(contacts);
        return contacts;
      } catch (err) {
        console.log(err);
      }
    });
  }, []);

  const getAddedContact = async (contact) => {
    try {
      const colRef = collection(db, "contacts");
      await addDoc(colRef, contact);
      toast.success("Contact added successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  const getUpdatedContact = async (contact, id) => {
    try {
      const docRef = doc(db, "contacts", id);
      await updateDoc(docRef, contact);
      toast.success("Contact updated successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  const getDeletedContact = async (id) => {
    await deleteDoc(doc(db, "contacts", id));
    toast.success("Contact deleted successfully.");
  };

  const getSearchedContact = (value) => {
    let filteredList = contactList.filter((contact) =>
      contact.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filteredList);
  };

  return (
    <div className="mainContainer">
      <Header />
      <SearchContact
        getAddedContact={getAddedContact}
        getSearchedContact={getSearchedContact}
      />
      {filteredData && (
        <div>
          {filteredData.map((contact) => (
            <ContactCard
              contact={contact}
              key={contact.id}
              getDeletedContact={getDeletedContact}
              getUpdatedContact={getUpdatedContact}
            />
          ))}
        </div>
      )}
      <ToastContainer position="bottom-center"/>
    </div>
  );
};

export default App;
