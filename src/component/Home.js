import React, { useContext, useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Card from "./Card";
import { Context } from "./Context";
import "./Home.css";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from "reactstrap";
import { Table } from "reactstrap";
import { firebaseConfig } from "./firebase";
import firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
var db = firebase.firestore();

const Home = () => {
  const context = useContext(Context);
  const [accounts, setAccounts] = useState([]);

  //modal for add account pop-up
  const [modal, setModal] = useState(false);

  //modal for card
  const [cardModal, setCardModal] = useState(false);

  //popup card
  const [card, setCard] = useState("Facebook");

  // main data
  const [data, setData] = useState({});

  //   const [ data , setData] = useState({
  //   Facebook :  { email : ['manishmahto198@gmail.com', 'mnaya']  ,  password : ['123', '456']  } ,
  //   Gmail :  { email : [ 'shashi' , 'bhashi'] ,  password :['12345', '456123']   }
  // }
  //  )

  const fetchDataFromFirebase = () => {
    var docRef = db.collection(context?.user?.uid).doc("data");

    docRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          setAccounts(Object.keys(doc.data()));
          setData(doc.data());
          console.log("Document data:", doc.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
  };

  function myEncrypt(input) {
    let output = "";
    //  alert(typeof input)
    input
      .split("")
      .forEach(
        (v, k) =>
          (output +=
            hack.indexOf(v) === -1
              ? "x" + v
              : hack.indexOf(v) + 1 < 10
              ? "0" + (hack.indexOf(v) + 1)
              : hack.indexOf(v) + 1)
      );
    return output;
  }

  // TODO : ondeleting the card gets a popup

  useEffect(() => {
    console.log("useEffect", "hello");
    if (context?.user?.email) fetchDataFromFirebase();
  }, []);

  const storeDataInFirebase = () => {
    db.collection(context.user.uid)
      .doc("data")
      .set(data)
      .then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  };

  //toggle func for new account
  const toggle = () => {
    try {
      let accountName = document.getElementById("accInput").value;
      if (accountName) {
        let acc = accounts.slice(0, accounts.length);
        acc.push(accountName);
        setAccounts(acc);
        let newData = data;
        //d['man'] = { email : [] }
        newData[accountName] = { email: [], password: [] };
        console.log("Data  ---->", newData);

        setData(newData);
        console.log("Data  ---->", data);
        storeDataInFirebase();
      }
    } catch (err) {
      console.log("toggle error ---->", err);
      //  alert(err)
    } finally {
      setModal(!modal);
    }
  };

  const cardToggle = (This) => {
    try {
      setCard(This);
      //   AddTbody()
      console.log("cardToggle");
    } catch (err) {
      console.log("cardToggle error--->", err);
    } finally {
      setCardModal(!cardModal);
    }
  };

  console.log("User IN HOME --->", context.user);
  console.log("Data IN HOME --->", data);

  function myDecrypt(input) {
    let output = "";
    for (let i = 0; i < input.length; i += 2)
      output +=
        input[i] === "x"
          ? input[i + 1]
          : input[i] !== "0"
          ? hack[Number(input[i] + input[i + 1]) - 1]
          : hack[Number(input[i + 1]) - 1];
    return output;
  }

  const AddTbody = () => {
    // alert(card)
    try {
      console.log("AddTbody", card, data);
      // let tbody  =  document.createElement('tbody')
      // console.log('tbody', tbody)

      let table = document.getElementsByClassName("tbody")[0];
      table.innerHTML = ``;

      //let listOfMailKeys =  data[card].email
      let listOfMail = data[card].email;
      let listOfPass = data[card].password;

      for (let x = 0; x < listOfMail.length; x++) {
        //  console.log(listOfMail[x])
        //  console.log(listOfPass[x])
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = listOfMail[x];

        let td2 = document.createElement("td");
        td2.innerHTML = myDecrypt(listOfPass[x]);

        let button = document.createElement("button");
        button.classList.add("btn");
        button.classList.add("btn-danger");
        button.classList.add("btn-sm");
        button.addEventListener("click", () => deleteCardData(card, x));
        button.innerText = "Delete";
        let td3 = document.createElement("td");
        td3.appendChild(button);

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        table.appendChild(tr);
      }
      return null;
    } catch (err) {
      //alert(err)
      console.log("Add Account Error", err);

      return null;
    }
  };
  //when we click ADD button of card
  const addInList = () => {
    let tbody = document.getElementsByClassName("tbody")[0];
    let tr = document.createElement("tr");
    let td1 = document.createElement("td");
    td1.innerHTML = `<input class='listinput' type='text' placeholder='email' id='email'>`;
    let td2 = document.createElement("td");
    td2.innerHTML = `<input class='listinput' type='password' placeholder='Password' id='password'>`;

    let button = document.createElement("button");
    button.classList.add("btn");
    button.classList.add("btn-success");
    button.classList.add("btn-sm");
    button.addEventListener("click", () => addCardData());
    button.innerText = "Add";
    let td3 = document.createElement("td");
    td3.appendChild(button);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tbody.appendChild(tr);
  };

  let hack = "qwertyuiopasdfghjklzxcvbnm";

  // add the entered input data inside card
  const addCardData = () => {
    console.log("addCard", card);
    let email = document.getElementById("email");
    console.log(email.value);
    let password = myEncrypt(document.getElementById("password").value);
    if (email && password) {
      console.log("password : ", password);
      data[card].email.push(email.value);
      data[card].password.push(password);
      AddTbody();
      storeDataInFirebase();
    }
  };

  //delete the data in the list
  const deleteCardData = (current, deleteIndex) => {
    console.log("delete index----> ", deleteIndex);
    data[current].email.splice(deleteIndex, 1);
    data[current].password.splice(deleteIndex, 1);
    // delete data[current].email[deleteIndex]
    // delete data[current].password[deleteIndex]
    console.log("after delete", data[current].email);
    AddTbody();
    storeDataInFirebase();
  };

  if (!context?.user?.email) {
    return <Redirect to="/signin" />;
  }

  //      console.log('Accounts---> ', accounts);
  return (
    <div className="home">
      <div className="accountAdd">
        <Button
          className="mt-2"
          style={{ background: "#385062" }}
          onClick={toggle}
        >
          <BsFillPlusCircleFill style={{ fontSize: "30px" }} />
        </Button>
      </div>

      <Modal isOpen={modal} size="lg" toggle={toggle} className="cardModal">
        <ModalHeader toggle={toggle}>Account Name</ModalHeader>
        <ModalBody>
          <input
            type="text"
            id="accInput"
            className="border-0 p-2"
            placeholder="Enter your input"
          ></input>
        </ModalBody>
        <ModalFooter>
          <Button color="dark" onClick={toggle}>
            Add
          </Button>{" "}
          <Button color="dark" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <div className="cards">
        {accounts.map((acc, key) => (
          <Card
            storeDataInFirebase={storeDataInFirebase}
            data={data}
            setData={setData}
            cardToggle={cardToggle}
            title={acc}
            key={key}
            accounts={accounts}
            setAccounts={setAccounts}
          />
        ))}

        <Modal
          isOpen={cardModal}
          size="lg"
          toggle={cardToggle}
          className="view"
        >
          <ModalHeader toggle={cardToggle}>Details</ModalHeader>
          <ModalBody>
            <Table className="table" dark>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="tbody">
                <AddTbody />
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            <Button color="dark" onClick={addInList}>
              Add
            </Button>{" "}
            <Button color="dark" onClick={cardToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Home;
