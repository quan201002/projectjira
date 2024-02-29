import React, { useRef, useState } from "react";
import "./DemoDragDrop.css";
import { useSpring, animated } from "react-spring";
const defaultValue = [
  { id: 1, taskName: "task1" },
  { id: 2, taskName: "task2" },
  { id: 3, taskName: "task3" },
  { id: 4, taskName: "task4" },
  { id: 5, taskName: "task5" },
];
export default function DemoDrag(props) {
  const tagDragEnter = useRef({});
  const [taskList, setTaskList] = useState(defaultValue);
  const tagDrag = useRef({});
  //animation
  const [propsSpring, set, stop] = useSpring(() => ({
    from: { bottom: -20 },
    to: { bottom: 0 },
    config: { duration: 250 },
    reset: true,
  }));
  const handleDragStart = (e, task, index) => {
    console.log("tag", e.target);
    console.log("task", task);
    // console.log("index", index);
    tagDrag.current = task;
  };

  const handleDragEnter = (e, taskDragEnter, index) => {
    // console.log("tagetOver", e.target);
    // console.log("tagtask", taskDragEnter);
    // console.log("tagDrag cuurent", tagDrag.current);
    //luu lai gia tri tag dc keo ngang qua

    tagDragEnter.current = { ...taskDragEnter };

    let taskListUpdate = [...taskList];

    let indexDragTag = taskListUpdate.findIndex(
      (task) => task.id === tagDrag.current.id
    );
    console.log("indexDragTag", indexDragTag);
    let indexDragEnter = taskListUpdate.findIndex(
      (task) => task.id === taskDragEnter.id
    );
    console.log("indexDragEnter", indexDragEnter);

    let temp = taskListUpdate[indexDragTag];
    taskListUpdate[indexDragTag] = taskListUpdate[indexDragEnter];
    taskListUpdate[indexDragEnter] = temp;
    setTaskList(taskListUpdate);
    set({ bottom: 0 });
  };
  const handleDragEnd = (e) => {};
  return (
    <div
      className="container"
      onDragOver={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
      onDrop={(e) => {
        tagDrag.current = {};
        setTaskList([...taskList]);
      }}
    >
      <div className="text-center display-4">Task list</div>
      <div className="row">
        <div className="col-2"></div>
        <div className="bg-dark p-5 col-8">
          {taskList.map((task, index) => {
            let cssDragTag = task.id === tagDrag.current.id ? "dragTag" : "";
            if (task.id === tagDragEnter.current.id) {
              return (
                <animated.div
                  style={{
                    position: "absolute",
                    bottom: propsSpring.bottom.interpolate(
                      (numBottom) => `${numBottom}px`
                    ),
                  }}
                  className="bg-success text-white m-1 p-3"
                  draggable="true"
                  onDragStart={(e) => {
                    handleDragStart(e, task, index);
                  }}
                  onDragEnter={(e) => {
                    handleDragEnter(e, task, index);
                  }}
                  onDragEnd={(e) => {
                    handleDragEnd(e);
                  }}
                  key={index}
                >
                  {task.taskName}
                </animated.div>
              );
            }
            return (
              <div
                className={`bg-success text-white m-1 p-3 ${cssDragTag}`}
                draggable="true"
                onDragStart={(e) => {
                  handleDragStart(e, task, index);
                }}
                onDragEnter={(e) => {
                  handleDragEnter(e, task, index);
                }}
                onDragEnd={(e) => {
                  handleDragEnd(e);
                }}
                key={index}
              >
                {task.taskName}
              </div>
            );
          })}
        </div>
        <div className="col-2 bg-primary" style={{ height: 500 }}>
          helloNga
        </div>
      </div>
    </div>
  );
}
// onDragOver={handleDragOver}
// onDragEnd={(e) => {
//   handelDragEnd(e);
// }}

//   onDrop={(e) => {
//     handelDrop(e);
//   }}
//   draggable="true"
// //   onDragOver={(e) => {
// //     e.stopPropagation();
// //     e.preventDefault();
// //   }}
