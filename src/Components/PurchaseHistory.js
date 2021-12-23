import React from 'react';
import firebase from "../firebase";
import "@devexpress/dx-react-grid-bootstrap4/dist/dx-react-grid-bootstrap4.css";
import Navigation from './Navigation';
import {
    EditingState,
    IntegratedFiltering,
    IntegratedSorting,
    SearchState,
    SortingState,
  } from "@devexpress/dx-react-grid";
  import {
    Grid,
    SearchPanel,
    Table,
    TableEditColumn,
    TableEditRow,
    TableHeaderRow,
    Toolbar,
    VirtualTable,
  
    
  } from "@devexpress/dx-react-grid-bootstrap4";

  class PurchaseHistory extends React.Component{

    constructor() {
        super();
    
        this.state = {
          purchaseHistory: [],
          sorting: [{ columnName: "customerName", direction: "asc" }],
          style:[
          
         { 
          columnName:"date",
          wordWrapEnabled: "true",

          }
            

          ],

          editingStateColumnExtensions: [
            {
              columnName: "viewDetails",
              editingEnabled: false,
            },
          ],
          columns: [
            {
              title: "Customer Name",
              name: "customerName",
            },
            {
              title: "Product Name",
              name: "productName",
            },
            {
              title: "Product Quantity",
              name: "quantity",
            },
            {
              title: "Product Price",
              name: "price",
            },{
                title:"Date & Time",
                name:"date"
            }
          ],
          
        };
      }
    
      componentDidMount() {
        this.fetchAllPurchases();
      }
    
      fetchAllPurchases = () => {
        const dbRef = firebase.database().ref("/Purchase History");
        dbRef.on("value", (snapshot) => {
          let allPurchases = [];
          var counter = 1;
          snapshot.forEach((datas) => {
            datas.forEach((data)=>{
                var current = data.val();
                  allPurchases.push({
                  id: counter,
                  customerName:datas.key,
                  productName:current.name,
                  price:current.price,
                  quantity:current.qty,
                  date:current.date,
                  index: counter++,
            })
         
            });
          });
          
          this.setState({ purchaseHistory: allPurchases });
        });
      };
    
     
      render() {
        return (
          <div>
          <div style={{backgroundColor:"#ede2fa",height:"100%",width:"100%",position:"fixed"}}>
          </div>
          <Navigation/>
          <div style={{position:"absolute",height:"100%",top:"30%",transform:"translate-y(-30%)"}}>
            <Grid 
              rows={this.state.purchaseHistory}
              columns={this.state.columns}
              getRowId={(row) => row.id}
               >
              <hr />
            
              <EditingState
                 columnExtensions={this.state.editingStateColumnExtensions}
                 onCommitChanges={()=>{
              
                  /* this.setState=
                   {
                     appointments:this.state.appointments.map(row =>
                     changed[row.index] ? { ...row, ...changed[row.index] } : row)
                
                    }*/
                   }}
              />
                  <SortingState
                sorting={this.state.sorting}
                 onSortingChange={(e) => {
                  this.setState({ sorting: e});
                }}
                 />

              <IntegratedSorting />
              <SearchState />
              <IntegratedFiltering />
              <VirtualTable columnExtensions={this.state.style} height="1000px"/>
              <TableHeaderRow showSortingControls  />
              <Toolbar />
              <SearchPanel />
            
            </Grid>
                </div>          

              </div>
        );
     
      }

}
export default PurchaseHistory;