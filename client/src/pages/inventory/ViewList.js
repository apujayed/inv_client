import React, { useState, useEffect, useRef,useContext } from "react";
import { Context } from "../../context/Store";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Link } from "react-router-dom";
const ViewList = () => {
    
    const {sellData,editItem,accountList,getAccounts,accounts,selectSell,deleteAcccount} = useContext(Context);

    const [deleteurl, setDeleteurl] = useState("http://localhost:3009/deleteaccount");
    const [findurl, setFindurl] = useState("http://localhost:3009/selectsell")
    const columns = [
        {
          dataField: "cus_id",
          text: "INV",
          headerStyle: () => {
            return { width: "10%" };
          },
        },
        {
          dataField: "date",
          text: "DATE",
          headerStyle: () => {
            return { width: "10%" };
          },
        },
        {
          dataField: "name",
          text: "Account",
          headerStyle: () => {
            return { width: "20%" };
          },
        },
        {
          dataField: "product",
          text: "Qty",
          headerStyle: () => {
            return { width: "5%" };
          },
        },
        {
          dataField: "total",
          text: "TOTAL",
          headerStyle: () => {
            return { width: "20%" };
          },
        },
        {
          dataField: "posted",
          text: "POSTED",
          headerStyle: () => {
            return { width: "15%" };
          },
        },
        {
          dataField: "cus_id",
          text: "Action",
          formatter: (rowContent, row) => {
            return (
              <div>
                <Link
                  // to={`/edit/${row.id}`}
                  onClick={() => selectSell(row.cus_id,findurl)}
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
          
          <section className="col-lg-12 connectedSortable">
              <div className="box box-primary">
                <div className="box-header header-custom">
                  <h3 onClick={getAccounts} className="box-title">Detail Info</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ToolkitProvider
                    keyField="id"
                    data={sellData}
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
