import React, { useState } from "react";
import "./list.css";
import axios from "axios";
import swal from "sweetalert";
import { Link } from "react-router-dom";

function List() {
  const [post, setPost] = useState({
    title: "",
    todoTypes: "",
  });

  //for adding the list
  const handleChange = (e) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/todo/create/todolist/",
        post
      );
      if (response.data) {
        await swal({
          title: "Success!!",
          text: "List added succesfully",
          icon: "success",
        });
      }
      window.location.reload();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <div className="list-container">
        <h3>Add list</h3>
        <Link to="/login">
          <button className="logout-button">Logout</button>
        </Link>
        <form onSubmit={handleSubmit}>
          {/* Input for title */}
          <input
            className="list-input"
            placeholder="Enter your list"
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
          />

          {/* Dropdown for priority level */}
          <select
            className="priority-dropdown"
            name="todoTypes"
            value={post.todoTypes}
            onChange={handleChange}
          >
            <option value="" disabled>
              Select Priority Level
            </option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Submit button */}
          <button type="submit" className="add-button" onClick={handleSubmit}>
            ADD
          </button>
        </form>
      </div>
    </>
  );
}

export default List;
