import React, { useState, useEffect, useRef, useContext } from "react";
import { Context } from "../../context/Store";
import Select from "react-select";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuid } from "uuid";
import { Button } from "react-bootstrap";

const AddForm = () => {

  const [isEdit, setIsedit] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const {
    getProductstock,
    editcartdb,
    setisCart,isCart,
    optionSelectedaccount, setOptionSelectedaccount,
    accounts, setAccounts,
    cart,
    setCart,
    setEditItem,
    setSproductList,
    getSelectedproduct,
    sproductList,
    productList,
    getProduct,
    accountList,
    getAccounts,
    warningnotify,
    successnotify,
    cartDatainsert,
    editItem,
    dataInsert,
    shead,
    edit,
    setEdit,
    updateData,
    inputRef,
  } = useContext(Context);
  const productFocus = useRef();
  const [addurl, setAddurl] = useState("http://localhost:3009/cartstore");
  const [updateurl, setUpdateurl] = useState("http://localhost:3009/updatesell");

  
  // const [count, setCount] = useState(1);

  //function



  const total = () => {
    var a = document.getElementById("qty2").value;
    var b = document.getElementById("rate").value;
    var c = a * b;
    setAccounts({
      ...accounts,
      rate: b,
      total: c,
    });
  };



  let name, value;
  const getUserData = (event) => {
    name = event.target.name;
    value = event.target.value;

    setAccounts({ ...accounts, [name]: value });
  };
  const [optionSelectedList, setOptionSelectedList] = useState( { value: "", label: "" });


  const [selectedProduct, setselectedProduct] = useState(accounts.p_id - 1);

  const productdata = [];
  productList.forEach((e)=>{
    productdata.push({
      q_1: e.qty_1,
      q_2: e.qty_2,
      q_3: e.qty_3,
      stock: e.stock,
     
    });
  })





  const cal_1 = () => {
    if(accounts.p_id !=""){
    var a = document.getElementById("qty1").value;
    var b = sproductList[0].qty_1;
    var c = sproductList[0].qty_2;
    var d = sproductList[0].qty_3;
    var e = a * b *c *d;
    console.log(b);
    setAccounts({
      ...accounts,
      qty1: a,
      qty2: e,
    });

  } else{
warningnotify("plz select product");
  }
  };




  const productlist = [];
  productList.forEach((e) => {
    productlist.push({
      value: e.id,
      label: e.p_name,
      customAbbreviation: e.stock,
    });
    // console.log(productlist)
  });

  
  const formatOptionLabel2 = (productlist, { context }) =>
    context === "value" ? 
    
    <div className="" style={{ display: "flex", justifyContent:"space-between", }}>
     <div  style={{ fontWeight:"bold", fontSize: "13px" }}>{productlist.label}</div>
    <div style={{ fontWeight:"bold", color: "red",fontStyle: 'italic',fontSize: "13px" }}>
    {productlist.customAbbreviation}
    </div>
     </div>
    : 
    
    
    <>
   <div className="" style={{ display: "flex", fontSize: "12px" }}>
     
     <img class="avatar" src="https://pos.softghor.com/dashboard/img/avatar/1.jpg" alt="avater"></img>
     
     <div className="" style={{ display: "flex", fontSize: "12px" }}>
     <div>{productlist.label}</div>
    <div style={{ marginLeft: "10px", color: "#ccc",fontSize: "12px" }}>
      {productlist.customAbbreviation}
    </div>
     </div>
     
   </div>
  </>










  const options = [];
  accountList.forEach((e) => {
    options.push({
      value: e.id,
      label: e.name,
      customAbbreviation: e.due,
    });
  });

  const formatOptionLabel = (options, { context }) =>
    context === "value" ? 
    
    <div className="" style={{ display: "flex", justifyContent:"space-between", }}>
     <div  style={{ fontWeight:"bold", fontSize: "13px" }}>{options.label}</div>
    <div style={{ fontWeight:"bold", color: "red",fontStyle: 'italic',fontSize: "13px" }}>
      {options.customAbbreviation}
    </div>
     </div>
    : 
    
    
    <>
   <div className="" style={{ display: "flex", fontSize: "12px" }}>
     
     <img class="avatar" src="https://pos.softghor.com/dashboard/img/avatar/1.jpg" alt="avater"></img>
     
     <div className="" style={{ display: "flex", fontSize: "12px" }}>
     <div>{options.label}</div>
    <div style={{ marginLeft: "10px", color: "#ccc",fontSize: "12px" }}>
      {options.customAbbreviation}
    </div>
     </div>
     
   </div>
  </>


  
  const myNewInputData = {
    id: new Date().getTime().toString(),
    sell_type: accounts.sell_type,
    bill_type: accounts.bill_type,
    account: accounts.account,
    particular: accounts.particular,
    p_id: accounts.p_id,
    product: accounts.product,
    qty1: accounts.qty1,
    qty2: accounts.qty2,
    rate: accounts.rate,
    total: accounts.total,
    memo: accounts.memo==""?"N/A":accounts.memo,
  };

  const addCart = async (e) => {
    e.preventDefault();
    if (
      accounts.product!="" &&
      accounts.p_id!=0 &&
      accounts.qty2 != 0 &&
      accounts.rate != 0
    ) {
      setCart([...cart, myNewInputData]);
      setAccounts({
        ...accounts,
        p_id:"0",
        product:"",
        qty1: "0",
        qty2: "0",
        rate: "0",
        total: "0",
        memo: "",
      });

      await productFocus.current.focus();
      setOptionSelectedList({
        ...optionSelectedList,
        value: "", label: "" 
      })
      setisCart(true);
    } else {
      warningnotify("Fill up all data");
      await productFocus.current.focus();
    }
  };

  const editCart2 = () => {
    setCart(
      cart.map((elem) => {
        if (elem.id === isEdit) {
          return {
            ...elem,
            sell_type: accounts.sell_type,
            bill_type: accounts.bill_type,
            account: accounts.account,
            particular: accounts.particular,
            p_id: accounts.p_id,
            product: accounts.product,
            qty1: accounts.qty1,
            qty2: accounts.qty2,
            rate: accounts.rate,
            total: accounts.total,
            memo: accounts.memo,
          };
        }
        return elem;
      })
    );
  };

  const editCart = (props) => {
    const item_todo_edited = cart.find((curElem) => {
      return curElem.id === props;
    });
    // setInputData(item_todo_edited.name);
    // setIsEditItem(index);
    // setToggleButton(true);

    setAccounts({
      ...accounts,
      p_id: item_todo_edited.p_id,
      product:item_todo_edited.product,
      qty1: item_todo_edited.qty1,
      qty2: item_todo_edited.qty2,
      rate: item_todo_edited.rate,
      total: item_todo_edited.total,
      memo: item_todo_edited.memo,
    });
    setSproductList(cart);

    setIsedit(props);

    setOptionSelectedList({
      ...optionSelectedList,
      value: item_todo_edited.p_id,
       label: item_todo_edited.product,
    })
    // console.log(isEdit);
    console.log(sproductList);
    productFocus.current.focus();
  };

  const deleteCart = (props) => {
    const updatedItems = cart.filter((curElem) => {
      return curElem.id !== props;
    });
    setCart(updatedItems);
 }

   

  // remove all the elements
  const removeAll = () => {
    setCart([]);
  };

  const selectText = (props) => {
    const input = document.getElementById(props);
    input.focus();
    input.select();
  };

  const cart_total = cart.reduce((total, item) => {
    return total + item.total;
  }, 0);

  const insertData = (e) => {
    e.preventDefault();
    cartDatainsert(addurl, cart);
    // setAccounts({
    //   id: "",
    //   cus_id: "",
    //   name: "",
    //   proprietor: "",
    //   subaddress: "",
    //   address: "",
    //   contact: "",
    //   subhead: "",
    // });
  };

  const editdb = (e) => {
    e.preventDefault();
    editcartdb(updateurl, cart);
    // setAccounts({
    //   id: "",
    //   cus_id: "",
    //   name: "",
    //   proprietor: "",
    //   subaddress: "",
    //   address: "",
    //   contact: "",
    //   subhead: "",
    // });
  };

  const selectProduct = (props)=>{
    getSelectedproduct(props);
  }



    
  useEffect(() => {
console.log(productdata)
  }, [accounts]);

  
  useEffect(() => {
    if (editItem) {
      setAccounts(editItem);
      console.log(editItem);
      
    }
  }, [editItem]);
  return (
    <>
      {/* <Modal
        open={modalIsOpen}
        center
        classNames={{
          modal: "customModal",
        }}
        onClose={() => setIsOpen(false)}
      > */}
        {/* <div className="modal-body">

          <table className="table table-bordered text-left">
            <tbody>
              <tr>
                <td width="50%">
                  <strong className="float-left">Paying Items: </strong>
                  <strong className="float-right">
                    (<span id="items">1</span>)
                  </strong>
                </td>
                <td>
                  <strong className="float-left">Total Receivable: </strong>
                  <strong className="float-right">
                    (<span id="receivable">{cart_total}</span> Tk)
                  </strong>
                  <input
                    type="hidden"
                    name="receivable_amount"
                    id="receivable_input"
                    defaultValue={30}
                  />
                </td>
              </tr>
              <tr>
                <td width="50%">
                  <strong className="float-left">Discount : </strong>
                  <strong className="float-right">
                    {" "}
                    (<span id="after_discount">30</span> Tk)
                  </strong>
                </td>
                <td>
                  <strong className="float-left">Balance </strong>
                  <strong className="float-right">
                    {" "}
                    (<span id="balance">-30</span> Tk)
                  </strong>
                  <input
                    type="hidden"
                    name="balance"
                    id="balance_input"
                    defaultValue={-30}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <hr />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="discount">Discount</label>
              <input
                type="text"
                className="form-control"
                id="discount"
                name="discount"
                placeholder="0%"
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="payment_method">Note</label>
              <textarea
                name="note"
                className="form-control"
                defaultValue={""}
              />
            </div>
          </div>
          <hr />
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="payment_method">Payment Method</label>
              <select name="payment_method" id className="form-control">
                <option value={1}>Hand Cash</option>
                <option value={2}>Bank</option>
                <option value={3}>Rocket</option>
                <option value={4}>Bkash</option>
                <option value={5}>Cash On Delivery</option>
              </select>
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="pay_amount">Pay Amount</label>
              <div className="input-group">
                <input
                  type="number"
                  step="any"
                  className="form-control"
                  name="pay_amount"
                  id="pay_amount"
                  placeholder="Pay Amount..."
                />
                <span className="input-group-btn">
                  <button
                    className="btn btn-warning"
                    type="button"
                    id="paid_btn"
                  >
                    PAID!
                  </button>
                </span>
              </div>
            </div>
          </div>
          <hr />
        </div>
        <div align="right">
          <a href="#" className="btn btn-primary" id="check_out_cart">
            <span className="glyphicon glyphicon-shopping-cart" /> Check out
          </a>
          <a
            href="#"
            className="btn btn-default"
            name="save_new"
            id="clear_cart"
          >
            <span className="glyphicon glyphicon-trash" /> clear
          </a>
        </div>
      </Modal> */}
      <section className="col-lg-5 connectedSortable">
        <div className="box box-danger">
          {/* Tabs within a box */}
          <div className="tab-content no-padding">
            {/* Morris chart - Sales */}
            <div className="box-header header-custom">
              <h3 className="box-title">
                <i className="fa fa-address-book"></i> Details
              </h3>
              <h3 className="box-title pull-right">
                Date : <strong>2021-01-06</strong>
              </h3>
            </div>
            <div className="box-body form-horizontal">
              <div className="col-md-12">
                <div className="form-group ">
                  <label htmlFor="accntname" className="col-sm-3 control-label">
                    Sell Type
                  </label>
                  <div className="  col-sm-8">
                    <select
                      style={{ width: "100%" }}
                      className="form-control"
                      value={accounts.sell_type}
                      name="sell_type"
                      placeholder="sell_type"
                      autocomplete="off"
                      onChange={getUserData}
                      disabled={isCart}
                    >
                      <option value="SELL">SELL</option>
                      <option value="PUR">PURCHASE</option>
                    </select>
                  </div>
                </div>
                {/* <div className="form-group ">
                  <label htmlFor="accntname" className="col-sm-3 control-label">
                    Bill Type
                  </label>
                  <div className="col-sm-8">
                    <label>
                    <input
                    name="bill_type"
              type="radio"
              value="cash"
              checked={accounts.bill_type=== "cash"}
              onChange={getUserData}
            />
            Cash
                    </label>
                    <label>
                    <input
                    name="bill_type"
              type="radio"
              value="credit"
              checked={accounts.bill_type=== "credit"}
              onChange={getUserData}
            />
            Credit
                    </label>
                  </div>
                </div> */}
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                    Account
                  </label>

                  <div className="col-sm-8">
                    <Select
                      onFocus={()=> getAccounts()}
                      onChange={(selectedOption) => {
                        console.log("Selected city", selectedOption.value);
                        setAccounts({
                          ...accounts,
                          account: selectedOption.value,
                        });
                        setOptionSelectedaccount({
                          ...optionSelectedaccount,
                          value: selectedOption.value, label: selectedOption.label 
                        })
                        
                      }}

                      value={optionSelectedaccount}
                      formatOptionLabel={formatOptionLabel}
                      options={options}
                      disabled={isCart}
                      defaultValue={options[1]}
                    />
                  </div>
                  {/* <span>
                      <i className="fa fa-address-book"></i>
                    </span> */}
                </div>
                {/* <div className="form-group">
                  <label htmlFor="comments" className="col-sm-3 control-label">
                    Particular
                  </label>
                  <div className="col-sm-8">
                    <input
                      className="form-control"
                      type="text"
                      value={accounts.particular}
                      name="particular"
                      placeholder="Particular"
                      autocomplete="off"
                      onChange={getUserData}
                      id=""
                    />
                  </div>
                </div> */}
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                    Product
                  </label>

                  <div className="col-sm-8">
                    <Select
                     onFocus={()=>getProduct()}
                      ref={productFocus}
                      onChange={(selectedOption) => {
                        // console.log("Selected city", selectedOption.value);
                        // setDrop(selectedOption.value)
                        setAccounts({
                          ...accounts,
                          p_id: selectedOption.value,
                          product: selectedOption.label,
                          
                        });   
                        setOptionSelectedList({
                          ...optionSelectedList,
                          value: selectedOption.value, label: selectedOption.label 
                        })
                        selectProduct(selectedOption.value,);
                        getProductstock();
                        // setAccounts({...accounts,product:selectedOption.label})
                      }}

                      // onChange={()=>{
                      //   fetchProduct();
                      // }}
                       value={optionSelectedList}
                      formatOptionLabel={formatOptionLabel2}
                      options={productlist}
                    />
                  </div>
                </div>
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                    Ton/Ban
                  </label>
                  <div className="col-sm-8">
                    <input
                      onClick={() => {
                        selectText("qty1");
                      }}
                      className="form-control"
                      type="number"
                      value={accounts.qty1}
                      name="qty1"
                      placeholder="Qty 1"
                      autocomplete="off"
                      onChange={(getUserData, cal_1)}
                      style={{ fontSize: 14, fontWeight: "bold",textAlign:"right"  }}
                      id="qty1"
                    />
                  </div>
                </div>
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                    Piece/Kg/bag
                  </label>

                  <div className="col-sm-8">
                    <input
                      onClick={() => {
                        selectText("qty2");
                      }}
                      onfocus="this.select()"
                      className="form-control"
                      type="number"
                      value={accounts.qty2}
                      name="qty2"
                      placeholder="Qty 2"
                      autocomplete="off"
                      onChange={getUserData}
                      style={{ fontSize: 14, fontWeight: "bold",textAlign:"right"  }}
                      id="qty2"
                    />
                  </div>
                </div>
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                    Rate
                  </label>
                  <div className="col-sm-8">
                    <input
                      onClick={() => {
                        selectText("rate");
                      }}
                      className="form-control"
                      type="number"
                      value={accounts.rate}
                      name="rate"
                      placeholder="Rate"
                      autocomplete="off"
                      onChange={(getUserData, total)}
                      style={{ fontSize: 14, fontWeight: "bold",textAlign:"right" }}
                      id="rate"
                    />
                  </div>
                </div>
                <div id="divsup" className="form-group">
                  <label htmlFor="cust_id" className="col-sm-3 control-label">
                    Total
                  </label>
                  <div className="col-sm-8">
                    <input
                      onClick={() => {
                        selectText("total");
                      }}
                      className="form-control"
                      type="number"
                      value={accounts.total}
                      name="total"
                      placeholder="Total"
                      autocomplete="off"
                      onChange={getUserData}
                      style={{ fontSize: 14, fontWeight: "bold" ,textAlign:"right" }}
                      id="total"
                      disabled="true"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="comments" className="col-sm-3 control-label">
                    Memo
                  </label>
                  <div className="col-sm-8">
                    <input
                      onClick={() => {
                        selectText("memo");
                      }}
                      className="form-control pull-right"
                      type="text"
                      value={accounts.memo}
                      name="memo"
                      placeholder=""
                      autocomplete="off"
                      onChange={getUserData}
                      id="memo"
                      style={{ fontSize: 14, fontWeight: "bold" }}
                    />
                  </div>
                </div>
                <div id="divsup" className="pull-right">
                  <Button onClick={addCart} variant="warning">
                    Cart
                    
                  </Button>{" "}
                  <Button variant="danger" onClick={editdb}>Submit</Button>{" "}
                  <Button onClick={editCart2} variant="info">
                    Edit
                  </Button>{" "}
                </div>
                {/* /.col */}
              </div>
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n fieldset {\n  padding: 0;\n  margin: 0;\n  border: 0;\n\n  min-width: 0;\n}\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: @line-height-computed;\n  font-size: (@font-size-base * 1.5);\n  line-height: inherit;\n  color: @legend-color;\n  border: 0;\n  border-bottom: 1px solid @legend-border-color;\n}\n\n                      ",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="col-lg-7 connectedSortable">
        <div className="box box-primary">
          <div className="box-header header-custom">
            <h3 className="box-title">
              <i className="fa fa-cart-arrow-down"></i> Cart Item
            </h3>
          </div>
          <div className="box-tools pull-right"></div>
          <div className="box-body form-horizontal">
            <div className="box-body">
              <div id="cart_i">
                <div>
                  <div className="row">
                    <div className="col-sm-8 col-xs-12">
                      <img
                        src={"https://fahimtraders.com/dist/img/logo1.png"}
                        style={{
                          float: "left",
                          overflow: "hidden",
                          width: 100,
                          marginRight: 15,
                          marginBottom: 10,
                        }}
                      />
                      <div>
                        <h3 className="text-capitalize font-weight-bold">
                          <strong> M/S AKHI AND APU TRADERS</strong>
                        </h3>
                        <span>Panchoborno complex,Bhajanpur</span>
                        <br />
                        <span>Phone: 01713749704</span>
                        <br />
                        <span>Email: akhiandaputraders@gmail.com</span>
                      </div>
                    </div>
                    <div className="col-sm-4 col-xs-12 text-center">
                      <strong>
                        {" "}
                        <h2>INVOICE</h2>
                      </strong>
                    </div>
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-md-12 mt-4 apu ">
                    <table className="table  table-bordered">
                      <thead className="bg-primary">
                        <tr style={{ fontSize: "85%" }}>
                          <th width="25%">Name</th>
                          <th width="10%">Qty 1</th>
                          <th width="15%">Qty 2</th>
                          <th width="15%">Rate</th>
                          <th width="15%">Total</th>
                          <th width="15%">Memo</th>
                          <th width="5%">Action</th>
                        </tr>
                      </thead>

                      <tbody id="tbody" className="">
                        {cart.map((curElem, index) => {
                          return (
                            <tr key={index}>
                              <td width="27%" style={{ color: "#616a78" }}>
                                {curElem.product}
                              </td>

                              <td width="10%" align="right">
                                {curElem.qty1}
                              </td>
                              <td width="10%" align="right">
                                {" "}
                                {curElem.qty2}
                              </td>
                              <td
                                width="10%"
                                style={{ color: "#616a78" }}
                                align="right"
                              >
                                {curElem.rate}
                              </td>
                              <td
                                width="20%"
                                style={{ color: "#616a78" }}
                                align="right"
                              >
                                {curElem.total}
                              </td>
                              <td width="15%"
                               style={{ color: "red" ,fontStyle:"italic"}}
                              align="right">
                                {curElem.memo}
                              </td>
                              <td width="5%">
                                <i
                                  className="fa fa-edit"
                                  onClick={() => {
                                    editCart(curElem.id);
                                  }}
                                ></i>
                                <i
                                  className="fa fa-remove"
                                  onClick={() => {
                                    deleteCart(curElem.id);
                                  }}
                                ></i>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                      
                      <tfoot className="bg-danger">
                        <tr>
                          <th className="text-center" colSpan={4}>
                            Total Item:{" "}
                            <strong id="totalQty">{cart.length}</strong>{" "}
                          </th>
                          <th className="text-center" colSpan={4}>
                            Total:{" "}
                            <strong id="totalAmount">{cart_total}</strong> Tk
                          </th>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <div className="form-gorup text-center">
                    <Button
                      onClick={() => {
                        setIsOpen(true);
                      }}
                      variant="danger"
                    >
                      {" "}
                      <i className="fa fa-money" />
                      Payment
                    </Button>{" "}
                    <Button onClick={removeAll} variant="info">
                      Clear
                    </Button>
                    <Button onClick={insertData} variant="primary">
                      {" "}
                      Submit
                    </Button>
                  </div>
                </div>
              </div>
            </div>{" "}
            {/*  <input type="submit" name="create_pdf" class="btn btn-danger" value="Get Report" />   */}
          </div>
        </div>
      </section>
    </>
  );
};

export default AddForm;
