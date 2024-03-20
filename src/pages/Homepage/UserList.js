import React, { useEffect, useRef, useState } from "react";
import { AutoComplete, Popconfirm, Space, Table, Tag } from "antd";
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
    },
    {
      title: "Phone",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "",
      key: "x",
      render: (text, record) => {
        return (
          <>
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
                  userEditModel: record,
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
                  userId: record.userId,
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

  const dispatch = useDispatch();
  const [stateUserList, setStateUserList] = useState("");
  const { userSearch } = useSelector(
    (state) => state.UserLoginCyberBugsReducer
  );
  const users = [...userSearch];

  const data = users;
  console.log("userSearch", userSearch);

  useEffect(() => {
    dispatch({
      type: GET_USER_API,
      keyWord: "",
    });
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <AutoComplete
        className="mt-lg-5 mb-lg-5 mb-md-1 mt-md-1 mt-sm-0 mb-sm-0"
        options={userSearch?.map((user, index) => {
          return {
            label: user.name,
            value: user.userId.toString(),
          };
        })}
        defaultValue={JSON.parse(localStorage.getItem("SEARCH"))}
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
          setSearch(value);
          setValue(text);
          localStorage.setItem("SEARCH", JSON.stringify(text));
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
          pageSize: 6,
          onChange: (page) => {
            setPage(page);
            localStorage.setItem("PAGE", JSON.stringify(page));
          },
        }}
      />
    </div>
  );
};
export default UserList;
