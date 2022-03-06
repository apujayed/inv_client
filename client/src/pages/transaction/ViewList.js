import React, { useState, useEffect, useRef,useContext } from "react";
import { Context } from "../../context/Store";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import { Link } from "react-router-dom";
const ViewList = () => {
    
    const {transaction,editItem,accountList,getAccounts,accounts,selectAcccount,deleteAcccount} = useContext(Context);

    const [deleteurl, setDeleteurl] = useState("http://localhost:3009/deletetransaction");
    const [findurl, setFindurl] = useState("http://localhost:3009/selecttransaction")
    const columns = [
     
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
          dataField: "payment",
          text: "Payment",
          headerStyle: () => {
            return { width: "15%" };
          },
        },
        {
          dataField: "receive",
          text: "Receive",
          headerStyle: () => {
            return { width: "15%" };
          },
        },
        {
          dataField: "comments",
          text: "Comments",
          headerStyle: () => {
            return { width: "20%" };
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
          
          <section className="col-lg-8 connectedSortable">
              <div className="box box-primary">
                <div className="box-header header-custom">
                  <h3 onClick={getAccounts} className="box-title">Detail Info</h3>
                </div>
                {/* /.box-header */}
                <div className="box-body">
                  <ToolkitProvider
                    keyField="id"
                    data={transaction}
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
