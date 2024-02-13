import React, { useState } from "react";
import { Button, Space, Table } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactHTMLParser from "html-react-parser";

const data = [
  {
    members: [],
    creator: {
      id: 2417,
      name: "hello1122",
    },
    id: 14794,
    projectName: "project name",
    description: "<p>qweqweCE!</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "project-name",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 2417,
      name: "hello1122",
    },
    id: 14795,
    projectName: "qweqw",
    description: "<p>Welcome to TinyMCE!eqweqw</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "qweqw",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 6376,
      name: "quan",
    },
    id: 14796,
    projectName: "qeweqw",
    description: "<p>Welcome to TinyMCE!eqweqw</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "qeweqw",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 6376,
      name: "quan",
    },
    id: 14797,
    projectName: "eqw",
    description: "<p>Welcome to TinyMCE!qweqwe</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "eqw",
    deleted: false,
  },
  {
    members: [],
    creator: {
      id: 6376,
      name: "quan",
    },
    id: 14798,
    projectName: "eqwqweqw",
    description: "<p>Welcome to TinyMCE!qweqweqweqwee</p>",
    categoryId: 1,
    categoryName: "Dự án web",
    alias: "eqwqweqw",
    deleted: false,
  },
];
const ProjectManagement = () => {
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const clearFilters = () => {
    setFilteredInfo({});
  };
  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };
  const setAgeSort = () => {
    setSortedInfo({
      order: "descend",
      columnKey: "age",
    });
  };
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Project name",
      dataIndex: "projectName",
      key: "projectName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => {
        let jsxContent = ReactHTMLParser(text);
        return <div>{jsxContent}</div>;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => {
        return (
          <>
            <button className="btn btn-primary">
              <DeleteOutlined />
            </button>
            <button className="ms-3 btn btn-danger">
              <EditOutlined />
            </button>
          </>
        );
      },
    },
  ];
  return (
    <div className="content-container">
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        style={{ width: "100%" }}
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        rowKey={"id"}
      />
    </div>
  );
};
export default ProjectManagement;
