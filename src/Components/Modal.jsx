import React, { useState } from "react";
import ReactDOM from "react-dom";
import styles from "../Styles/modal.module.css";
import { IoMdClose } from "react-icons/io";

const Modal = ({ setIsOpen, children, getAddedContact, contact, getUpdatedContact }) => {
  const [userName, setUserName] = useState(contact? contact.name:"");
  const [userEmail, setUserEmail] = useState(contact? contact.email:"");
  const [errorMsg, setErrorMsg] = useState(false);


  const handleBtn = () => {
    if(contact){
      getUpdatedContact({ name: userName, email: userEmail }, contact.id);
      setErrorMsg('');
      setIsOpen(false);
    }else if(userName==="" || userEmail===""){
      setErrorMsg('Both fields must be filled!!')
    }else{
      getAddedContact({ name: userName, email: userEmail });
      setErrorMsg('');
      setIsOpen(false);
    }
  };

  return ReactDOM.createPortal(
    <>
      <div className={styles.overlay} />
      <div className={styles.modalWrapper}>
       <div className={styles.closeIcon}>
          <IoMdClose onClick={()=>setIsOpen(false)}/>
       </div>
        <div>
          <label htmlFor="name">Name</label> <br />
          <input
            type="text"
            className={styles.formInp}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="name">Email</label> <br />
          <input
            type="email"
            className={styles.formInp}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div>{errorMsg}</div>
        <button onClick={handleBtn} className={styles.modalBtn}>
          {children}
        </button>
      </div>
    </>,
    document.getElementById("modal-root")
  );
};

export default Modal;
