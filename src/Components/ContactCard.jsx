import React, {useState} from "react";
import styles from "../Styles/contactCard.module.css";
import { RxAvatar } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Modal from "./Modal";

const ContactCard = ({ contact, getDeletedContact, getUpdatedContact }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <RxAvatar className={styles.icons + " " + styles.avatarIcon} />
      <div className={styles.detailsContainer}>
        <div>{contact.name}</div>
        <small>{contact.email}</small>
      </div>
      <FaRegEdit className={styles.icons + " " + styles.editIcon} onClick={() => setIsOpen(true)} />
      <MdDelete className={styles.icons + " " + styles.deleteIcon} onClick={()=>getDeletedContact(contact.id)}/>
      {isOpen && (
        <Modal setIsOpen={setIsOpen} contact={contact} getUpdatedContact={getUpdatedContact} >
         Update Contact
        </Modal>
      )}
    </div>
  );
};

export default ContactCard;
