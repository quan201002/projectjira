import React, { useEffect, useRef, useState } from "react";
import {
  AutoComplete,
  Button,
  List,
  Popconfirm,
  Space,
  Table,
  Tag,
} from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  DELETE_USER_SAGA,
  EDIT_USER,
  GET_ALL_USER_SAGA,
  GET_USER_API,
} from "../../redux/constant/UserConstants";
import FormEditProject from "../../component/Forms/FormEditProject";
import MyEnhancedForm from "../../HOC/JiraCloneHOC/FormEditUser";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
const UserList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const searchRef = useRef(null);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});
  const handleChange = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const columns = [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      },
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) => {
        return <Tag color="#2db7f5">{record?.name}</Tag>;
      },
    },
    {
      title: "Phone",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: " ",
      key: "x",
      render: (text, record) => {
        return (
          <>
            <Button
              className="button edit-button mr-2"
              onClick={() => {
                const action = {
                  type: "OPEN_FORM_EDIT_PROJECT",
                  title: "Edit Project",
                  open: true,
                  Component: () => {
                    return <MyEnhancedForm />;
                  },
                };

                dispatch(action);
                const actionEditUser = {
                  type: EDIT_USER,
                  userEditModel: record,
                };
                dispatch(actionEditUser);
              }}
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </Button>
            <Popconfirm
              title="Delete user"
              description="Are you sure to delete this user ?"
              onConfirm={() => {
                dispatch({
                  type: DELETE_USER_SAGA,
                  userId: record.userId,
                });
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button className="button delete-button">
                <i class="fa-regular fa-trash-can"></i>
              </Button>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const dispatch = useDispatch();
  const [stateUserList, setStateUserList] = useState("");
  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );
  const users = [...userSearch];

  const data = users;
  // console.log("userSearch", userSearch);

  useEffect(() => {
    dispatch({
      type: GET_USER_API,
      keyWord: "",
    });
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <AutoComplete
        className="mt-lg-5 mb-lg-5 mb-md-1 mt-md-1 mt-sm-0 mb-sm-0 user-search"
        options={userSearch?.map((user, index) => {
          return {
            label: user.name,
            value: user.userId.toString(),
          };
        })}
        value={value}
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
        onChange={(text) => {
          setValue(text);
        }}
        onSelect={(valueSelected, option) => {
          //set gia tri cua hop thoai = option.label
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }
          dispatch({
            type: GET_USER_API,
            keyWord: valueSelected,
          });
          setValue(option.label);
        }}
        placeholder="search user"
      />

      <Table
        style={{
          width: "100%",
        }}
        className="user-table"
        onChange={handleChange}
        rowKey={"id"}
        columns={columns}
        dataSource={data.reverse()}
        pagination={{
          current: localStorage.getItem("PAGE")
            ? JSON.parse(localStorage.getItem("PAGE"))
            : 1,
          pageSize: 7,
          onChange: (page) => {
            setPage(page);
            localStorage.setItem("PAGE", JSON.stringify(page));
          },
        }}
      />
      <List
        className="list-user-jira mt-5"
        bordered
        dataSource={data.reverse()}
        renderItem={(item) => (
          <List.Item>
            <div className="w-100">
              <div className="w-100 d-flex justify-content-between">
                <div
                  className="font-weight-bold"
                  style={{ color: "blueviolet" }}
                >
                  User id
                </div>
                <div className="mr-2">{item.userId}</div>
              </div>
              <div className="w-100 d-flex justify-content-between">
                <div className="font-weight-bold">Name</div>
                <div className="mr-2">
                  <Tag color="geekblue">
                    <h5>{item.name}</h5>
                  </Tag>
                </div>
              </div>
              <div className="w-100 d-flex justify-content-between">
                <div className="font-weight-bold">Phone</div>
                <div className="mr-2">{item.phoneNumber}</div>
              </div>
              <div className="w-100 d-flex justify-content-between">
                <div
                  className="font-weight-bold"
                  style={{ color: "orangered" }}
                >
                  Action
                </div>
                <div className="mr-2">
                  <button
                    className="btn btn-primary mr-2"
                    onClick={() => {
                      const action = {
                        type: "OPEN_FORM_EDIT_PROJECT",
                        title: "Edit Project",
                        open: true,
                        Component: () => {
                          return <MyEnhancedForm />;
                        },
                      };

                      dispatch(action);
                      const actionEditUser = {
                        type: EDIT_USER,
                        userEditModel: item,
                      };
                      dispatch(actionEditUser);
                    }}
                  >
                    <EditOutlined />
                  </button>
                  <Popconfirm
                    title="Delete user"
                    description="Are you sure to delete this user ?"
                    onConfirm={() => {
                      dispatch({
                        type: DELETE_USER_SAGA,
                        userId: item.userId,
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
          pageSize: 5,
        }}
      />
    </div>
  );
};
export default UserList;
