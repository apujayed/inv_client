import React, { useState, useEffect, useRef,useContext } from "react";
import { Context } from "../../context/Store";
import Select from "react-select";
const AddForm = () => {
    
const {setOptionSelectedtransaction,optionSelectedtransaction, editItem,dataInsert,getAccounts,accountList,notify,ToastContainer,shead,getShead,selectAcccount,edit,setEdit,updateData,deleteAcccount,inputRef} = useContext(Context);

const [addurl, setAddurl] = useState("http://localhost:3009/createtransaction")
const [updateurl, setUpdateurl] = useState("http://localhost:3009/updatetransaction")
const productFocus = useRef();


const [accounts, setAccounts] = useState({
  date: "",
  cus_id: "",
  name: "",
  payment: "0",
  receive: "0",
  comments: "",
  posted: "ja-471",
});

let name, value;
const getUserData = (event) => {
  name = event.target.name;
  value = event.target.value;

  setAccounts({ ...accounts, [name]: value });
};

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


const addAccounts = async (e)=>{
  if (!editItem) {
  e.preventDefault();
  dataInsert(addurl,accounts);
  setAccounts({
    date: "",
    cus_id: "",
    name: "",
    payment: "",
    receive: "",
    comments: "",
    posted: "ja-789",
  });
  await productFocus.current.focus();
  setOptionSelectedtransaction({
    ...optionSelectedtransaction,
    value: "", label: "" 
  })
}
}

const updateAccount = (e)=>{
  if (editItem) {
  e.preventDefault();
  updateData(updateurl,accounts);
  setAccounts({
    date: "",
    cus_id: "",
    name: "",
    payment: "0",
    receive: "0",
    comments: "",
  });
  // getAccounts()
}
}

useEffect(() => {
  if (editItem) {
    setAccounts(editItem)
    console.log(editItem)
  } 
}, [editItem])

    return (
        <>
           <section className="col-lg-4 connectedSortable">
              <div className="box box-danger">
                <div className="tab-content no-padding">
                  <div className="box-header header-custom">
                    <h3 className="box-title">Account Info</h3>
                  </div>
                  <form
                    className="form-horizontal"
                    id="fupForm"
                    name="form1"
                    method="post"
                  >
                    <div className="box-body">   
                    <div className="form-group">
                        <label for="contact" className="col-sm-4 control-label">Date</label>
                        <div className="col-sm-8">
                          <input
                            required
                            className="form-control"
                            type="text"
                            value={accounts.date}
                            name="date"
                            placeholder="Date"
                            autocomplete="off"
                            onChange={getUserData}
                            id=""
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label for="name" className="col-sm-4 control-label">Account Name</label>
                        <div className="col-sm-8">
                        <Select
                          ref={productFocus}
                      onFocus={()=> getAccounts()}
                      onChange={(selectedOption) => {
                        console.log("Selected city", selectedOption.value);
                        setAccounts({
                          ...accounts,
                          name: selectedOption.value,
                        });
                        setOptionSelectedtransaction({
                          ...optionSelectedtransaction,
                          value: selectedOption.value, label: selectedOption.label 
                        })
                        
                      }}
isDisabled={edit}

                      value={optionSelectedtransaction}
                      formatOptionLabel={formatOptionLabel}
                      options={options}
                     
                      // defaultValue={options[1]}
                    />
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="payment" className="col-sm-4 control-label">Payment</label>
                        <div className="col-sm-8">
                          <input
                            required
                            className="form-control"
                            type="number"
                            value={accounts.payment}
                            name="payment"
                            placeholder="Payment"
                            autocomplete="off"
                            onChange={getUserData}
                            id=""
                            style={{ fontSize: 14, fontWeight: "bold",textAlign:"right"  }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="receive" className="col-sm-4 control-label">Receive</label>
                        <div className="col-sm-8">
                          <input
                            required
                            className="form-control"
                            type="number"
                            value={accounts.receive}
                            name="receive"
                            placeholder="Receive"
                            autocomplete="off"
                            onChange={getUserData}
                            id=""
                            style={{ fontSize: 14, fontWeight: "bold",textAlign:"right"  }}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label for="comments" className="col-sm-4 control-label">Comments</label>
                        <div className="col-sm-8">
                          <input
                            required
                            className="form-control"
                            type="text"
                            value={accounts.comments.toUpperCase()}
                            name="comments"
                            placeholder="Comments"
                            autocomplete="off"
                            onChange={getUserData}
                            id=""
                          />
                        </div>
                      </div>
                     
                      
                    </div>

                    {/* /.box-body */}
                    <div className="box-footer">
                      <button type="submit" className="btn btn-danger">
                        Cancel
                      </button>
                      <input
                        type="button"
                        name="save"
                        className="btn btn-success pull-right"
                        defaultValue={edit ? "Update" : "Save"}
                        id="butsave"
                        onClick={edit ? updateAccount : addAccounts}
                      />
                    </div>
                    {/* /.box-footer */}
                  </form>
                </div>
              </div>
            </section>  
        </>
    )
}

export default AddForm
