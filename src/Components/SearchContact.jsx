import React, { useState } from "react";
import styles from "../Styles/search.module.css";
import { FaCirclePlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import Modal from "./Modal";

const SearchContact = ({ getAddedContact, getSearchedContact }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.searchContainer}>
      <div className={styles.inpContainer}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          className={styles.inp}
          placeholder="Search Contact"
          onChange={(e)=>getSearchedContact(e.target.value)}
        />
      </div>
      <FaCirclePlus
        className={styles.plusIcon}
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <Modal setIsOpen={setIsOpen} getAddedContact={getAddedContact}>
          Add Contact
        </Modal>
      )}
    </div>
  );
};

export default SearchContact;
