import React from "react";
import TodoTable from "../components/table";
import List from "../components/list";

const Todolist = () => {
  return (
    <div>
      <h1>TODO LIST</h1>
      <List />
      <TodoTable />
    </div>
  );
};

export default Todolist;
