import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useParams } from "react-router-dom";
import "./table.css";

function UpdateList() {
  const { id } = useParams(); // Fetching the ID from the URL params
  const [updatePost, setUpdatePost] = useState({
    title: "",
    todoTypes: "",
  });

  useEffect(() => {
    // Fetch data for the specified ID
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/todo/get/data/${id}/`
        );
        console.log("response", response);
        setUpdatePost({
          title: response.data.title,
          todoTypes: response.data.todoTypes,
        });
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData(); // Invoke the fetchData function
  }, [id]);

  const handleChange = (e) => {
    setUpdatePost({
      ...updatePost,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/todo/update/todolist/${id}/`,
        updatePost
      );

      if (response.data) {
        await swal({
          title: "Success!!",
          text: "List updated successfully",
          icon: "success",
        });
        window.location.href = "/todo";
      }
    } catch (error) {
      console.log("Error updating list:", error);
    }
  };

  return (
    <>
      <div className="list-container-update">
        <div className="update-container">
          <h3>Update List</h3>
          <form onSubmit={handleUpdateSubmit}>
            {/* Input for title */}
            <input
              className="list-input"
              placeholder="Update your list"
              type="text"
              name="title"
              value={updatePost.title}
              onChange={handleChange}
            />
            {/* Dropdown for priority level */}
            <select
              className="priority-dropdown"
              name="todoTypes"
              value={updatePost.todoTypes}
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
            <button type="submit" className="add-button">
              UPDATE
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default UpdateList;
