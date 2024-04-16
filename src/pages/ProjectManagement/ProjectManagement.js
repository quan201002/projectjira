import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Space,
  Table,
  Tag,
  Input,
  message,
  Popconfirm,
  Avatar,
  Popover,
  AutoComplete,
  List,
  Typography,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ReactHTMLParser from "html-react-parser";
import { useSelector, useDispatch } from "react-redux";
import FormEditProject from "../../component/Forms/FormEditProject";
import { NavLink } from "react-router-dom";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import {
  DELETE_PROJECT_SAGA,
  EDIT_PROJECT,
  GET_LIST_PROJECT_SAGA,
} from "../../redux/constant/ProjectCyberBugsConstant";
import {
  ADD_USER_PROJECT_API,
  GET_USER_API,
} from "../../redux/constant/UserConstants";

const ProjectManagement = () => {
  const searchRef = useRef(null);

  const [value, setValue] = useState("");

  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );

  const projectList = useSelector(
    (state) => state.ProjectCyberBugsReducer.projectList
  );

  const data = projectList;

  console.log("data", data);
  let dispatch = useDispatch();

  //dung useDispatch de goi action
  useEffect(() => {
    dispatch({ type: GET_LIST_PROJECT_SAGA });
  }, []);

  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
    },
    {
      title: "Project name",
      dataIndex: "projectName",
      key: "projectName",
      render: (text, record, index) => {
        return <Tag color="greekblue">{text}</Tag>;
      },
      ...getColumnSearchProps("projectName"),
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
        return <Tag color="geekblue-inverse">{record.creator?.name}</Tag>;
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
                  title="Members hi"
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
                            console.log("user  ", item);
                            return (
                              <tr key={index}>
                                <td className="mr-1">{item.userId}</td>
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
                                  <Popconfirm
                                    title="Remove assignee"
                                    description="Are you sure to remove this user from project ?"
                                    onConfirm={() => {
                                      dispatch({
                                        type: "REMOVE_USER_PROJECT_API",
                                        userProject: {
                                          projectId: record.id,
                                          userId: item.userId,
                                        },
                                      });
                                    }}
                                    okText="Yes"
                                    cancelText="No"
                                  >
                                    <button
                                      style={{ borderRadius: "50%" }}
                                      className="btn btn-danger"
                                    >
                                      X
                                    </button>
                                  </Popconfirm>
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
                            <td>{item.userId}</td>
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
                              <Popconfirm
                                title="Remove assignee"
                                description="Are you sure to remove this user from project ?"
                                onConfirm={() => {
                                  dispatch({
                                    type: "REMOVE_USER_PROJECT_API",
                                    userProject: {
                                      projectId: record.id,
                                      userId: item.userId,
                                    },
                                  });
                                }}
                                okText="Yes"
                                cancelText="No"
                              >
                                <button
                                  style={{ borderRadius: "50%" }}
                                  className="btn btn-danger"
                                >
                                  X
                                </button>
                              </Popconfirm>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                );
              }}
            >
              {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}
            </Popover>

            <Popover
              className="popover-add-user"
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
                          type: GET_USER_API,
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
                        type: ADD_USER_PROJECT_API,
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
              <button className="btn btn-secondary add-user-btn">+</button>
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
        console.log("record", record);
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
                  type: DELETE_PROJECT_SAGA,
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
          <div>
            <h4 className="title">PROJECT MANAGEMENT</h4>
          </div>
        </Space>
        <Table
          className="table-project-jira"
          style={{
            width: "100%",
          }}
          columns={columns}
          dataSource={data.reverse()}
          onChange={handleChange}
          rowKey={"id"}
          pagination={{
            pageSize: 7,
          }}
        />
        <List
          className="list-project-jira"
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              <div className="w-100">
                <div className="w-100 d-flex justify-content-between">
                  <div style={{ color: "blueviolet" }}>Project Id</div>
                  <div className="mr-2">
                    <NavLink to={`/projectdetail/${item.id}`}>
                      {item.id}
                    </NavLink>
                  </div>
                </div>
                <div className="w-100 d-flex justify-content-between ">
                  <div>Project Name</div>
                  <div className="mr-2">{item.projectName}</div>
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <div>Category name</div>
                  <div className="mr-2">{item.categoryName}</div>
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <div>Creator</div>
                  <div className="mr-2">
                    <h5>
                      <Tag color="geekblue">{item.creator.name}</Tag>
                    </h5>
                  </div>
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <div>Members</div>
                  <div className="mr-2">
                    {item.members?.slice(0, 3).map((member, index) => {
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
                                  {item.members?.map((user, index) => {
                                    return (
                                      <tr key={index}>
                                        <td>{user.userId}</td>
                                        <td>
                                          <img
                                            style={{ borderRadius: "50%" }}
                                            src={user.avatar}
                                            width="50"
                                            height="50"
                                          ></img>
                                        </td>
                                        <td>{user.name}</td>
                                        <td>
                                          <Popconfirm
                                            title="Remove assignee"
                                            description="Are you sure to remove this user from project ?"
                                            onConfirm={() => {
                                              dispatch({
                                                type: "REMOVE_USER_PROJECT_API",
                                                userProject: {
                                                  projectId: item.id,
                                                  userId: user.userId,
                                                },
                                              });
                                            }}
                                            okText="Yes"
                                            cancelText="No"
                                          >
                                            <button
                                              style={{ borderRadius: "50%" }}
                                              className="btn btn-danger"
                                            >
                                              X
                                            </button>
                                          </Popconfirm>
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
                    <Popover
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
                              {item.members?.map((user, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{user.userId}</td>
                                    <td>
                                      <img
                                        style={{ borderRadius: "50%" }}
                                        src={user.avatar}
                                        width="50"
                                        height="50"
                                      ></img>
                                    </td>
                                    <td>{user.name}</td>
                                    <td>
                                      <Popconfirm
                                        title="Remove assignee"
                                        description="Are you sure to remove this user from project ?"
                                        onConfirm={() => {
                                          dispatch({
                                            type: "REMOVE_USER_PROJECT_API",
                                            userProject: {
                                              projectId: item.id,
                                              userId: user.userId,
                                            },
                                          });
                                        }}
                                        okText="Yes"
                                        cancelText="No"
                                      >
                                        <button
                                          style={{ borderRadius: "50%" }}
                                          className="btn btn-danger"
                                        >
                                          X
                                        </button>
                                      </Popconfirm>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        );
                      }}
                    >
                      {item.members?.length > 3 ? <Avatar>...</Avatar> : ""}
                    </Popover>

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
                                  type: GET_USER_API,
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
                                type: ADD_USER_PROJECT_API,
                                userProject: {
                                  projectId: item.id,
                                  userId: option.value,
                                },
                              });
                            }}
                          />
                        );
                      }}
                    >
                      <button className="btn add-user-btn btn-secondary mt-2 mb-2">
                        +
                      </button>
                    </Popover>
                  </div>
                </div>
                <div className="w-100 d-flex justify-content-between">
                  <div style={{ color: "orangered" }}>Actions</div>
                  <div className="mr-2">
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
                          projectEditModel: item,
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
                          type: DELETE_PROJECT_SAGA,
                          idProject: item.id,
                        });
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <button className="btn  btn-danger">
                        <DeleteOutlined />
                      </button>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
          pagination={{
            pageSize: 7,
          }}
        />
      </div>
    </div>
  );
};
export default ProjectManagement;
