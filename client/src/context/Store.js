import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
export const Context = React.createContext();

const Store = ({ children }) => {
  const [tinu, setTinu] = useState("jayed");
  const [edit, setEdit] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [ sellData, setSellData] = useState([]);
  const [productList, setproductList] = useState([]);
  const [sproductList, setSproductList] = useState([]);
  const [shead, setShead] = useState([]);

  const [cart, setCart] = useState([]);
  const [isCart, setisCart] = useState(false);
  const [accounts, setAccounts] = useState({
    id: new Date().getTime().toString(),
    sell_type: "SELL",
    bill_type: "",
    account: "1",
    particular: "",
    p_id: "",
    product: "",
    qty1: "0",
    qty2: "0",
    rate: "0",
    total: "0",
    memo: "",
  });
  const [optionSelectedaccount, setOptionSelectedaccount] = useState( { value: "AC-01", label: "CASH- ACCOUNT" });
  const [optionSelectedtransaction, setOptionSelectedtransaction] = useState( { value: "", label: "" });



  const [editItem, setEditItem] = useState(null)


  const getProduct = () => {
    Axios.get("http://localhost:3009/product").then((response) => {
      setproductList(response.data);
    });
    console.log(productList);
  };

  const getSelldata = () => {
    Axios.get("http://localhost:3009/selldata").then((response) => {
      setSellData(response.data);
    });
    console.log(sellData);
  };

  const getAccounts = () => {
    Axios.get("http://localhost:3009/employees").then((response) => {
      setAccountList(response.data);
    });
    console.log(accountList);
  };

  const getTransaction = () => {
    Axios.get("http://localhost:3009/transaction").then((response) => {
      setTransaction(response.data);
    });
    console.log(transaction);
  };

  const getShead = () => {
    Axios.get("http://localhost:3009/shead").then((response) => {
      setShead(response.data);
      console.log(response.data);
    });
    console.log(shead);
  };

  const getProductstock = () => {
    Axios.get("http://localhost:3009/productstock").then((response) => {
      // setShead(response.data);
      console.log(`a`+response.data);
    });
    // console.log(shead);
  };


  const getSelectedproduct = (props) => {
    Axios.put("http://localhost:3009/sproduct",{
      id: props,
    }).then((response) => {
      setSproductList(response.data);
      console.log(response.data);
    });

  };

  const notify = () =>
    toast.success("Task completed", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });


    const successnotify = (msg) =>
    toast.success(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    const warningnotify = (msg) =>
    toast.warning(msg, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const dataInsert  = (url,accounts) => {
    // e.preventDefault();
    Axios.post(url, {
      adata: accounts,
    }).then(() => {
      notify();
      setEdit(false);
      getAccounts();
      getTransaction();
      // searchInput.current.focus();
    });
  };


  const cartDatainsert = (url,cart) => {
    // e.preventDefault();
    Axios.post(url, {
      adata: cart,
    }).then(() => {
      notify();
      console.log("hey boyo")
      // setEdit(false);
      // searchInput.current.focus();
    });
  };

  const editcartdb = (url,cart) => {
    // e.preventDefault();
    Axios.put(url, {
      adata: cart,
    }).then(() => {
      notify();
      // console.log("hey boyo")
      // setEdit(false);
      // searchInput.current.focus();
    });
  };



  const selectAcccount = (props,findurl) => {
    Axios.put(findurl, {
      id: props,
    }).then((response) => {
      setEditItem(response.data[0]);
      setEdit(true);
      setOptionSelectedtransaction({ value: response.data[0].cus_id, label: response.data[0].name})
      console.log(response.data[0]);
    });
    // console.log(props);
  };

  const selectSell = (props,findurl) => {
    Axios.put(findurl, {
      id: props,
    }).then((response) => {
      setCart(response.data);
      setEdit(true);
      setAccounts({ ...accounts, 
    sell_type: response.data[0].s_type,
    bill_type: response.data[0].b_type,
    account: "1",
    particular:response.data[0].comments,
    qty1: "0",
    qty2: "0",
    rate: "0",
    total: "0",
    memo: "",
  });

    setOptionSelectedaccount({ value: response.data[0].cus_id, label: response.data[0].name})
    setisCart(!isCart)
      console.log(response.data);
    });
    // console.log(editItem);
  };

  const updateData = (url,accounts) => {
    // e.preventDefault();
    Axios.put(url, {
      adata: accounts,
      // id: currentUserId,
    }).then(() => {
      // setAccounts([])
      setEditItem(null)
      setEdit(false);
      notify();
      setOptionSelectedtransaction({ value: "", label: ""})
      // setTimeout(inputRef.current.focus(), 3000);
      // inputRef.current.focus();
      // searchInput.current.focus();
    });
  };

  const deleteAcccount = (props,deleteurl) => {
    Axios.put(deleteurl, {
      id: props,
    }).then(() => {
      notify();
      // setAccounts(response.data[0]);
      // setEdit(true);
      // console.log(response.data[0]);
    });
    // console.log('ssssssssssss'+deleteurl);
  };

  const inputRef = useRef();
  // let name, value;
  // const getUserData = (event) => {
  //   name = event.target.name;
  //   value = event.target.value;

  //   setAccounts({ ...accounts, [name]: value });
  // };

  useEffect(() => {
    getTransaction();
    getAccounts();
    getSelldata();
  }, [edit]);

  return (
    <Context.Provider
      value={{
        getProductstock,
        editcartdb,
        setOptionSelectedtransaction,optionSelectedtransaction,
        setTransaction,transaction,
        setisCart,isCart,
        optionSelectedaccount, setOptionSelectedaccount,
        accounts, 
        setAccounts,
        setCart,
        cart,
        setSproductList,
        sproductList,
        selectSell,
        sellData,
        getSelectedproduct,
        sproductList,
        getProduct,
        productList,
        warningnotify,
        successnotify,
        tinu,
        accountList,
        cartDatainsert,
        editItem,
        setEditItem,
        dataInsert,
        ToastContainer,
        notify,
        getShead,
        shead,
        getAccounts,
        selectAcccount,
        edit,
        setEdit,
        updateData,
        deleteAcccount,
        // getUserData,
        inputRef,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
