import React, { Component } from "react";
import { connect } from "react-redux";
import FormStudent from "./FormStudent";
import TableReact from "./TableReact";

class StudentManagement extends Component {
  searchStudent = (e) => {
    e.preventDefault();
    let valueID = document.querySelector("#search").value;
    console.log(valueID);
    let { value } = e.target;
    if (value === undefined) {
      value = "";
    }
    let arrResult = [];
    let arrSearch = this.props.arrStudent;
    for (let i = 0; i < arrSearch.length; i++) {
      let searchResult = arrSearch[i].name;
      if (value === "" && valueID === "") {
        arrResult = this.props.arrStudent;
        break;
      } else {
        if (searchResult.includes(value) && searchResult.includes(valueID)) {
          arrResult.push(arrSearch[i]);
          break;
        }
      }
    }
    const action = {
      type: "SEARCH",
      arrResult: arrResult,
    };
    this.props.dispatch(action);
  };
  render() {
    return (
      <div className="container">
        <h3>Quản lý sinh viên</h3>
        <div className="mb-4">
          <FormStudent />
        </div>

        <form
          className="d-flex my-2 my-lg-0 w-75"
          onSubmit={this.searchStudent}
        >
          <input
            className="form-control me-sm-2 mb-2"
            type="text"
            placeholder="Search"
            id="search"
            onChange={this.searchStudent}
          />
          <button
            className="btn btn-outline-success mb-2 "
            type="button"
            onClick={this.searchStudent}
          >
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
  studentSearch: state.studentManagementReducer.studentSearch,
});

export default connect(mapStateToProps)(StudentManagement);
