import React, { useState, useEffect, useRef,useContext } from "react";
import { Context } from "../../context/Store";
const AddForm = () => {
    
const {editItem,dataInsert,getAccounts,accountList,notify,ToastContainer,shead,getShead,selectAcccount,edit,setEdit,updateData,deleteAcccount,inputRef} = useContext(Context);

const [addurl, setAddurl] = useState("http://localhost:3009/create")
const [updateurl, setUpdateurl] = useState("http://localhost:3009/update")

const [accounts, setAccounts] = useState({
  id: "",
  cus_id: "",
  name: "",
  proprietor: "",
  subaddress: "",
  address: "",
  contact: "",
  subhead: "",
  posted: "",
});

let name, value;
const getUserData = (event) => {
  name = event.target.name;
  value = event.target.value;

  setAccounts({ ...accounts, [name]: value });
};


const addAccounts = (e)=>{
  if (!editItem) {
  e.preventDefault();
  dataInsert(addurl,accounts);
  setAccounts({
    id: "",
    cus_id: "",
    name: "",
    proprietor: "",
    subaddress: "",
    address: "",
    contact: "",
    subhead: "",
  });
}
}

const updateAccount = (e)=>{
  if (editItem) {
  e.preventDefault();
  updateData(updateurl,accounts);
  setAccounts({
    id: "",
    cus_id: "",
    name: "",
    proprietor: "",
    subaddress: "",
    address: "",
    contact: "",
    subhead: "",
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
           <section className="col-lg-3 connectedSortable">
              <div className="box box-danger">
                {/* Tabs within a box */}
                <div className="tab-content no-padding">
                  {/* Morris chart - Sales */}
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
                        {/*<label for="accntno" className="col-sm-4 control-label">Id</label>*/}
                        <div className="col-sm-12">
                          <input
                            required
                            className="form-control"
                            type="text"
                            value={accounts.cus_id}
                            name="cus_id"
                            placeholder="ID"
                            autocomplete="off"
                            onChange={getUserData}
                            id=""
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        {/*<label for="accntno" className="col-sm-4 control-label">Account Name</label>*/}
                        <div className="col-sm-12">
                          <input
                           ref={inputRef}
                          
                            required
                            className="form-control"
                            type="text"
                            value={accounts.name}
                            name="name"
                            placeholder="Name"
                            autocomplete="off"
                            onChange={getUserData}
                            id=""
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        {/*<label for="proprietor" className="col-sm-4 control-label">Proprietor</label>*/}
                        <div className="col-sm-12">
                          <input
                            required
                            className="form-control"
                            type="text"
                            value={accounts.proprietor}
                            name="proprietor"
                            placeholder="Proprietor"
                            autocomplete="off"
                            onChange={getUserData}
                            id=""
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        {/*<label for="subaddress" className="col-sm-4 control-label">Address</label>*/}
                        <div className="col-sm-12">
                          <input
                            required
                            className="form-control"
                            type="text"
                            value={accounts.subaddress}
                            name="subaddress"
                            placeholder="Subaddress"
                            autocomplete="off"
                            onChange={getUserData}
                            id=""
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        {/*<label for="address" className="col-sm-4 control-label">Route</label>*/}
                        <div className="col-sm-12">
                          <input
                            required
                            className="form-control"
                            type="text"
                            value={accounts.address}
                            name="address"
                            placeholder="Address"
                            autocomplete="off"
                            onChange={getUserData}
                            id=""
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        {/*<label for="contact" className="col-sm-4 control-label">Contact</label>*/}
                        <div className="col-sm-12">
                          <input
                            required
                            className="form-control"
                            type="text"
                            value={accounts.contact}
                            name="contact"
                            placeholder="Contact"
                            autocomplete="off"
                            onChange={getUserData}
                            id=""
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        {/*<label for="type" className="col-sm-4 control-label">Account Type</label>*/}
                        <div className="col-sm-12">
                          <select
                            required
                            value={accounts.subhead}
                            onChange={getUserData}
                            name="subhead"
                            autocomplete="off"
                            id="subhead"
                            className="form-control"
                          >
                            <option value=""> -- Select Type -- </option>
                            {/* Mapping through each fruit object in our fruits array
                 and returning an option element with the appropriate attributes / values.
                */}
                            {shead.map((shead) => (
                              <option value={shead.name}>{shead.name}</option>
                            ))}
                          </select>
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
