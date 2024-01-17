// TodoTable.js
import React, { useEffect, useState } from "react";
import "./table.css";
import { BsTrashFill, BsPencilFill } from "react-icons/bs";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

const TodoTable = () => {
  const [todos, setTodos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filterData, setFilterData] = useState({
    todoStatus: "",
  });

  const [filterDataResult, setFilterDataResult] = useState([]);

  useEffect(() => {
    getTodoList();
  }, []);

  // for filtering the list
  const handleFilterChange = (e) => {
    setFilterData({
      ...filterData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilterSubmit = async (statusQuery) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/todo/get/status/data/${statusQuery}/`
      );
      if (response) {
        setFilterDataResult(response.data);
      }
    } catch (error) {
      console.log("Error", error);
    }
  };

  // getting the data
  const getTodoList = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/todo/get/data/");
      console.log("dataaaaaa", response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  // deleting the list
  const handleDelete = async (id) => {
    console.log("id", id);
    try {
      const deleteList = await axios.delete(
        `http://127.0.0.1:8000/todo/delete/todolist/${id}/`
      );
      console.log(deleteList);
      if (deleteList) {
        swal({
          title: "Success!!",
          text: "List deleted successfully",
          icon: "success",
        });
      }
      getTodoList();
    } catch (error) {
      console.log("Error", error);
    }
  };

  // update list status
  const handleStatus = async (id, isChecked) => {
    try {
      const data = { status: isChecked };
      const updateStatus = await axios.patch(
        `http://127.0.0.1:8000/todo/update/todolist/status/${id}/`,
        data
      );
      console.log("status", updateStatus.data);
      if (updateStatus) {
        localStorage.setItem(
          "checked",
          JSON.stringify(updateStatus.data.status)
        );
      }
      window.location.href = "/todo";
    } catch (error) {
      console.log("error", error);
    }
  };

  if (loading) {
    return <p>Loading....</p>;
  }

  return (
    <div className="container">
      <div className="status">
        <select
          className="status-dropdown"
          name="todoStatus"
          value={filterData.todoStatus}
          onChange={handleFilterChange}
        >
          <option value="" disabled>
            Select Status
          </option>
          <option value="True">Complete</option>
          <option value="False">Incomplete</option>
          <option value="all">All</option>
        </select>
        <button
          type="submit"
          className="filter-button"
          onClick={() => handleFilterSubmit(filterData.todoStatus)}
        >
          FILTER
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Check box</th>
            <th>Title</th>
            <th>Priority level</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        {filterData && filterDataResult.data ? (
          <tbody>
            {filterDataResult.data.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.status}
                    onChange={(e) => handleStatus(todo.id, e.target.checked)}
                  ></input>
                </td>
                <td>{todo.title}</td>
                <td
                  style={{
                    color:
                      todo.todoTypes === "high"
                        ? "white"
                        : todo.todoTypes === "medium"
                        ? "white"
                        : "white",
                    backgroundColor:
                      todo.todoTypes === "high"
                        ? "red"
                        : todo.todoTypes === "medium"
                        ? "blue"
                        : "green",
                    borderRadius: "5px",
                    padding: "10px",
                    width: "190px",
                  }}
                >
                  {todo.todoTypes}
                </td>
                <td>
                  <b>{todo.status ? "Complete" : "Incomplete"}</b>
                </td>
                <td>
                  <Link to={`/update/${todo.id}`}>
                    <button className="icon-button">
                      <BsPencilFill />
                    </button>
                  </Link>
                  <button
                    className="icon-button"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <BsTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            {todos.data.map((todo) => (
              <tr key={todo.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={todo.status}
                    onChange={(e) => handleStatus(todo.id, e.target.checked)}
                  ></input>
                </td>
                <td>{todo.title}</td>
                <td
                  style={{
                    color:
                      todo.todoTypes === "high"
                        ? "white"
                        : todo.todoTypes === "medium"
                        ? "white"
                        : "white",
                    backgroundColor:
                      todo.todoTypes === "high"
                        ? "red"
                        : todo.todoTypes === "medium"
                        ? "blue"
                        : "green",
                    borderRadius: "5px",
                    padding: "10px",
                    width: "190px",
                  }}
                >
                  {todo.todoTypes}
                </td>
                <td>
                  <b>{todo.status ? "Complete" : "Incomplete"}</b>
                </td>
                <td>
                  <Link to={`/update/${todo.id}`}>
                    <button className="icon-button">
                      <BsPencilFill />
                    </button>
                  </Link>
                  <button
                    className="icon-button"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <BsTrashFill />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
};

export default TodoTable;
