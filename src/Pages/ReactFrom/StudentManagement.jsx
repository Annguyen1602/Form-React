import React, { Component } from "react";
import { connect } from "react-redux";
import FormStudent from "./FormStudent";
import TableReact from "./TableReact";

class StudentManagement extends Component {
  render() {
    return (
      <div className="container">
        <h3>Quản lý sinh viên</h3>
        <div className="mb-4">
          <FormStudent />
        </div>

        <form className="d-flex my-2 my-lg-0 w-75">
          <input
            className="form-control me-sm-2 mb-2"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              
              let { value } = e.target;
              let arrResult = [];
              let arrSearch = this.props.arrStudent;
              for (let i = 0; i < arrSearch.length; i++) {
                let searchResult = arrSearch[i].name;
                if( value === ''){
                  arrResult = this.props.arrStudent
                  break
                }else{
                  if (searchResult.includes(value)) {
                    arrResult.push(arrSearch[i]);
                    console.log(arrResult);
                    break;
                  } 
                }
                
                 
              }
              console.log(arrResult);
              const action = {
                type: "SEARCH",
                arrResult: arrResult,
              };
              this.props.dispatch(action);
            }}
          />
          <button className="btn btn-outline-success mb-2 " type="submit">
            Search
          </button>
        </form>

        <TableReact />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  arrStudent: state.studentManagementReducer.arrStudent,
  studentSearch:state.studentManagementReducer.studentSearch
});

export default connect(mapStateToProps)(StudentManagement);
