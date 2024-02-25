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
  console.log("project detaill", projectDetail);
  const renderAvatar = () => {
    return projectDetail.content?.members.map((user, index) => {
      return (
        <div className="avatar" key={index}>
          <img src={user.avatar} alt={user.avatar}></img>
        </div>
      );
    });
  };

  const renderCardTaskList = () => {
    return projectDetail.content?.lstTask.map((taskListDetail, index) => {
      return (
        <div className="col-3">
          <div
            key={index}
            className="card pb-2"
            style={{ width: "17rem", height: "auto" }}
          >
            <div className="card-header">{taskListDetail.statusName}</div>
            <ul className="list-group list-group-flush">
              {taskListDetail.lstTaskDeTail.map((task, index) => {
                return (
                  <li
                    className="list-group-item "
                    data-toggle="modal"
                    data-target="#exampleModal"
                    style={{ cursor: "pointer" }}
                  >
                    <p>{task.taskName}</p>
                    <div className="block" style={{ display: "flex" }}>
                      <div className="block-left">
                        <i className="fa fa-bookmark"></i>
                        <i className="fa fa-arrow-up"></i>
                        <p className="text-danger">
                          {task.priorityTask.priority}
                        </p>
                      </div>
                      <div className="block-right">
                        <div
                          className="avatar-group"
                          style={{ display: "flex" }}
                        >
                          {task.assigness.map((mem, index) => {
                            return (
                              <div className="avatar" key={index}>
                                <img
                                  src={mem.avatar}
                                  alt={mem.avatar}
                                  style={{ borderRadius: "50%" }}
                                ></img>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
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
      <div className="row">{renderCardTaskList()}</div>
    </div>
  ) : (
    <>
      <p>Project is empty</p>
    </>
  );
}
export default ProjectDetail;
