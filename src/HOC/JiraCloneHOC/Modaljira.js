import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";

import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
const { Option } = Select;
const Modaljira = () => {
  let dispatch = useDispatch();
  const { open, ComponentContentDrawer, callBackSubmit } = useSelector(
    (state) => state.drawerReducer
  );
  const showDrawer = () => {
    dispatch({ type: "OPEN_DRAWER", open: true });
  };
  const onClose = () => {
    dispatch({ type: "CLOSE_DRAWER", open: false });
  };
  return (
    <>
      <button onClick={showDrawer}>showDrawer</button>
      <Drawer
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              onClick={() => {
                callBackSubmit();
              }}
              type="primary"
            >
              Submit12
            </Button>
          </Space>
        }
      >
        {/*noi dung thay dooi cua drwer */}
        {<ComponentContentDrawer />}
      </Drawer>
    </>
  );
};
export default Modaljira;
