import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactHTMLParser from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import FormEditProject from "../../component/Forms/FormEditProject";

const ProjectManagement = () => {
  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );

  const data = projectList;

  let dispatch = useDispatch();

  //dung useDispatch de goi action
  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_SAGA" });
  }, []);

  console.log("projectList", projectList);

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
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
    },
    {
      title: "Project name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = ReactHTMLParser(text);
    //     return <div>{jsxContent}</div>;
    //   },
    // },
    {
      title: "category",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName2) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "creator",
      dataIndex: "categoryName",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.trim().toLowerCase();
        let creator2 = item2.creator?.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: () => {
        return (
          <>
            <button
              className="btn btn-primary"
              onClick={() => {
                dispatch({ type: "OPEN_DRAWER", open: true });
              }}
            >
              <DeleteOutlined />
            </button>
            <button
              className="ms-3 btn btn-danger"
              onClick={() => {
                const action = {
                  type: "OPEN_FORM_EDIT_PROJECT",
                  open: true,
                  Component: () => {
                    return <FormEditProject />;
                  },
                };
                dispatch(action);
              }}
            >
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
