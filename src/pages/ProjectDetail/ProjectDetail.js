import React, { useEffect } from "react";
import { Col, Row } from "antd";
import { Breadcrumb } from "antd";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function ProjectDetail(props) {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: "GET_PROJECT_DETAIL",
      projectId,
    });
  }, []);

  let { projectDetail } = useSelector((state) => state.ProjectReducer);

  const { projectId } = useParams();
  console.log("project id", projectId);
  console.log("project detail", projectDetail);

  const renderAvatar = () => {
    return projectDetail.content?.members.map((user, index) => {
      return (
        <div className="avatar">
          <img src={user.avatar} alt={user.avatar}></img>
        </div>
      );
    });
  };

  return projectDetail.content ? (
    <div className="content-container">
      <Breadcrumb
        items={[
          {
            title: "Project",
          },
          {
            title: "Cyber Learn",
          },
          {
            title: projectDetail.content.description,
          },
        ]}
      />
      <Row>
        <Col span={8}>
          <h1>Board</h1>
        </Col>
        <Col span={16}>
          <h3>Members</h3>
          {renderAvatar()}
        </Col>
      </Row>
      <Row>
        <Col span={6} className="col-detailpage">
          <div className="bg-gray-100 w-full h-full p-2 rounded flex flex-col">
            <p>BACKLOG</p>
          </div>
        </Col>
        <Col span={6} className="col-detailpage">
          <div className="bg-gray-100 w-full h-full p-2 rounded flex flex-col">
            <p>SELECT FOR DEVELOPMENT</p>
          </div>
        </Col>
        <Col span={6} className="col-detailpage">
          <div className="bg-gray-100 w-full h-full p-2 rounded flex flex-col">
            <p>IN PROGRESS</p>
          </div>
        </Col>
        <Col span={6} className="col-detailpage">
          <div className="bg-gray-100 w-full h-full p-2 rounded flex flex-col">
            <p>DONE</p>
          </div>
        </Col>
      </Row>
    </div>
  ) : (
    <></>
  );
}
export default ProjectDetail;
