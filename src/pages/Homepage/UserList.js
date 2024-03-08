import React, { useEffect, useRef, useState } from "react";
import { AutoComplete, Space, Table, Tag } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GET_ALL_USER_SAGA } from "../../redux/constant/UserConstants";

const UserList = () => {
  const [value, setValue] = useState("");
  const searchRef = useRef(null);
  const columns = [
    {
      title: "User Id",
      dataIndex: "userId",
      key: "userId",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
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
            <button>x</button>
            <button>edit</button>
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
      type: "GET_USER_API",
      keyWord: "",
    });
  }, []);
  return (
    <>
      <h3 className="text-center pb-5 ">User Management</h3>
      <AutoComplete
        className="mb-5"
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
              type: "GET_USER_API",
              keyWord: value,
            });
          }, 500);
        }}
        onChange={(text) => {
          setValue(text);
        }}
        onSelect={(valueSelected, option) => {
          //set gia tri cua hop thoai = option.label
          setValue(option.label);
        }}
        placeholder="search user"
      />
      <Table className="user-table" columns={columns} dataSource={data} />
    </>
  );
};
export default UserList;
