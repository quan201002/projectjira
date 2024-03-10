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
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
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
  console.log("userSearch", userSearch);

  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );

  const data = projectList;

  console.log("data", data);
  let dispatch = useDispatch();

  //dung useDispatch de goi action
  useEffect(() => {
    dispatch({ type: "GET_LIST_PROJECT_SAGA" });
  }, []);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
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
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "creator",
      dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="#2db7f5">{record.creator?.name}</Tag>;
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
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }

                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: "GET_USER_API",
                          keyWord: value,
                        });
                      }, 500);
                    }}
                    value={value}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    onSelect={(valueSelected, option) => {
                      //set gia tri cua hop thoai = option.label
                      setValue(option.label);
                      //goi api tra ve backend
                      dispatch({
                        type: "ADD_USER_PROJECT_API",
                        userProject: {
                          projectId: record.id,
                          userId: option.value,
                        },
                      });
                    }}
                  />
                );
              }}
            >
              <Button>+</Button>
            </Popover>
          </div>
        );
      },
    },
    {
      title: " ",
      dataIndex: "",
      key: "x",
      render: (text, record) => {
        return (
          <>
            <button
              className="mr-3 btn btn-primary"
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
            >
              <EditOutlined />
            </button>
            <Popconfirm
              title="Delete project"
              description="Are you sure to delete this project ?"
              onConfirm={() => {
                dispatch({
                  type: "DELETE_PROJECT_SAGA",
                  idProject: record.id,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn  btn-danger">
                <DeleteOutlined />
              </button>
            </Popconfirm>
          </>
        );
      },
    },
  ];
  return (
    <div className="container1">
      <div className="content-container">
        <Space
          style={{
            width: "100%",
            justifyContent: "center",
            marginBottom: 16,
            marginTop: 48,
          }}
        >
          <div style={{ fontWeight: "bold" }}>PROJECT MANAGEMENT</div>
        </Space>
        <Table
          style={{
            width: "100%",
          }}
          columns={columns}
          dataSource={data.reverse()}
          onChange={handleChange}
          rowKey={"id"}
          pagination={{
            pageSize: 8,
          }}
        />
      </div>
    </div>
  );
};
export default ProjectManagement;
