import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Space,
  Table,
  Tag,
  message,
  Popconfirm,
  Avatar,
  Popover,
  AutoComplete,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ReactHTMLParser from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import FormEditProject from "../../component/Forms/FormEditProject";
import { NavLink } from "react-router-dom";

const ProjectManagement = () => {
  const searchRef = useRef(null);

  const [value, setValue] = useState("");

  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );
  const content = (
    <div>
      <p>Content</p>
      <p>Content</p>
    </div>
  );

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };

  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );

  const data = projectList;

  let dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_SAGA" });
  }, []);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
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
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },
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
      title: "members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="topLeft"
                  title="Members"
                  content={() => {
                    return (
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Id</th>
                            <th>avatar</th>
                            <th>name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.id}</td>
                                <td>
                                  <img
                                    style={{ borderRadius: "50%" }}
                                    src={item.avatar}
                                    width="50"
                                    height="50"
                                  ></img>
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <button
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_USER_PROJECT_API",
                                        userProject: {
                                          projectId: record.id,
                                          userId: item.userId,
                                        },
                                      });
                                    }}
                                    style={{ borderRadius: "50%" }}
                                    className="btn btn-danger"
                                  >
                                    X
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar src={member.avatar} key={index} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            <Popover
              placement="right"
              title={"add user"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch?.map((user, index) => {
                      return {
                        label: user.name,
                        value: user.userId.toString(),
                      };
                    })}
                    style={{ width: "100%" }}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelected, option) => {
                      // Set the label of the selected option to the input value
                      setValue(option.label);
                      // Dispatch action to add user to the project
                      dispatch({
                        type: "ADD_USER_PROJECT_API",
                        userProject: {
                          projectId: record.id,
                          userId: option.value,
                        },
                      });
                    }}
                    filterOption={(inputValue, option) =>
                      option.label
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                    placeholder="Search users"
                  />
                );
              }}
              trigger="click"
            >
              <Button type="primary" icon={<PlusOutlined />} />
            </Popover>
          </div>
        );
      },
    },
    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record) => {
        return (
          <>
            <Popconfirm
              title="Delete the task"
              description="Are you sure to delete this task?"
              onConfirm={() => {
                dispatch({
                  type: "DELETE_PROJECT_SAGA",
                  idProject: record.id,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" danger icon={<DeleteOutlined />} />
            </Popconfirm>

            <Button
              type="primary"
              className="ms-3"
              icon={<EditOutlined />}
              onClick={() => {
                const action = {
                  type: "OPEN_FORM_EDIT_PROJECT",
                  title: "Edit Project",
                  open: true,
                  Component: () => {
                    return <FormEditProject />;
                  },
                };
                dispatch(action);

                const actionEditProject = {
                  type: "EDIT_PROJECT",
                  projectEditModel: record,
                };
                dispatch(actionEditProject);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="container1">
      <div
        className="content-container"
        style={{
          height: "100%",
          position: "relative",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          padding: " 10%",
          backgroundImage: 'url("/background.jpg")',
          backgroundSize: "cover",
        }}
      >
        <Space
          style={{ width: "100%", justifyContent: "center", marginBottom: 16 }}
        >
          <div className="title">Project Management</div>
        </Space>
        <Space style={{ marginBottom: 16 }}>
          <Button onClick={setAgeSort}>Sort age</Button>
          <Button onClick={clearFilters}>Clear filters</Button>
          <Button onClick={clearAll}>Clear filters and sorters</Button>
        </Space>
        <Table
          style={{ width: "100%" }}
          columns={columns}
          dataSource={data.reverse()}
          onChange={handleChange}
          rowKey={"id"}
          pagination={{ pageSize: 5 }}
        />
      </div>
    </div>
  );
};

export default ProjectManagement;
