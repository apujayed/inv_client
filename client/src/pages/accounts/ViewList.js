import React, { useState, useEffect, useRef,useContext } from "react";
import { Context } from "../../context/Store";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Link } from "react-router-dom";
const ViewList = () => {
    
    const {editItem,accountList,getAccounts,accounts,selectAcccount,deleteAcccount} = useContext(Context);

    const [deleteurl, setDeleteurl] = useState("http://localhost:3009/deleteaccount");
    const [findurl, setFindurl] = useState("http://localhost:3009/selectacccount")
    const columns = [
        {
          dataField: "id",
          text: "ID",
          headerStyle: () => {
            return { width: "8%" };
          },
        },
        {
          dataField: "cus_id",
          text: "A/C ID",
          headerStyle: () => {
            return { width: "10%" };
          },
        },
        {
          dataField: "name",
          text: "Name",
          headerStyle: () => {
            return { width: "25%" };
          },
        },
        {
          dataField: "subaddress",
          text: "Address",
          headerStyle: () => {
            return { width: "25%" };
          },
        },
        {
          dataField: "contact",
          text: "Contact",
          headerStyle: () => {
            return { width: "15%" };
          },
        },
    
        {
          dataField: "id",
          text: "Action",
          formatter: (rowContent, row) => {
            return (
              <div>
                <Link
                  // to={`/edit/${row.id}`}
                  onClick={() => selectAcccount(row.id,findurl)}
                  color="warning"
                  className="btn btn-warning mr-1"
                >
                  Edit
                </Link>
               
    
                <Link
                onClick={() => deleteAcccount(row.id,deleteurl)}
                  color="danger"
                  className="btn btn-danger ml-2"
                  >
                    Delete
                </Link>
              </div>
            );
          },
        },
      ];
      const rowStyle = (row, rowIndex) => {
        return { overflowWrap: "break-word", padding: "0px" };
      };
    
    
    const MySearch = (props) => {
      let input;
      const handleClick = () => {
        props.onSearch(input.value);
      };

// useEffect(() => {
//   if(editItem){
//     getAccounts();
  
   
// })

      
      return (
        <div>
          <input
          onChange={ handleClick }
            className="form-control"
            style={ { backgroundColor: 'pink' } }
            ref={ n => input = n }
            type="text"
          />
          {/* <button className="btn btn-warning" onClick={ handleClick }>Click to Search!!</button> */}
        </div>
      );
    };







    return (
        <>
          
          <section className="col-lg-9 connectedSortable">
              <div className="box box-primary">
                <div className="box-header header-custom">
                  <h3 onClick={getAccounts} className="box-title">Detail Info</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ToolkitProvider
                    keyField="id"
                    data={accountList}
                    columns={columns}
                    search
                  >
                    {(props) => (
                      <div>
                        <MySearch { ...props.searchProps } />

                        <BootstrapTable
                          {...props.baseProps}
                         
                          pagination={paginationFactory({ sizePerPage: 5 })}
                          rowStyle={rowStyle}
                          headerClasses="header-class"
                          headerStyle
                        />
                      </div>
                    )}
                  </ToolkitProvider>
                </div>
                {/* /.box-body */}
              </div>
              {/* /.box */}
            </section>  
        </>
    )
}

export default ViewList
