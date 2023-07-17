import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { updateContact } from "../../backend/model/ContactsModel";

function App() {
  const [contacts, setContacts] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const res = await axios.get("/api/contacts");
        setContacts(res.data);
      } catch (err) {
        console.error("res funktioniert nicht", err);
      }
    };
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.elements.contact.value;
    const phone = e.target.elements.phone.value;
    const adress = e.target.elements.adress.value;
    try {
      const res = await axios.post("/api/contacts", { name, phone, adress });
      console.log(res.data);
      setContacts([...contacts, res.data]);
      e.target.reset();
    } catch (err) {
      setErrors(err.res.data.errors);
    }
  };

  const deleteContact = async (id) => {
    try {
      axios.delete(`/api/contacts/${id}`);
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== id)
      );
    } catch (err) {
      console.error(err);
    }
  };
  console.log(contacts);

  const updateContactHandle = async (id, phone, adress) => {
    try {
      await axios.put(`/api/contacts/${id}`, { phone }, { adress });
      const updateContact = contacts.map((contact) => {
        if (contact.id === id) {
          return {
            ...contact,
            phone,
            adress,
          };
        }
        return contact;
      });
      setContacts(updateContact);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section>
        <h1>Contact API</h1>
        <article className="contacts-form">
          <h2>Contact hinzufügen</h2>
          <form onSubmit={handleSubmit}>
            <label>Name :</label>
            <input type="text" id="contact" />
            <label>Phone :</label>
            <input type="text" id="phone" />
            <label>Adress :</label>
            <input type="text" id="adress" />
            <small>{errors?.name?.message}</small>
            <br />
            <button type="submit">Submit</button>
          </form>
        </article>
        <article className="contacts-gallery-container">
          <h2>Deine Contacts:</h2>
          <article className="contacts-gallery">
            {contacts?.map((contact, index) => {
              return (
                <div key={index} className="contact">
                  <h3>Name :</h3>
                  <p>{contact.name}</p>
                  <h3>Phone :</h3>
                  <p>{contact.phone}</p>
                  <h3>Adress :</h3>
                  <p>{contact.adress}</p>
                  <button onClick={() => deleteContact(contact.id)}>
                    Delete
                  </button>
                </div>
              );
            })}
          </article>
        </article>
      </section>
    </>
  );
}

export default App;
