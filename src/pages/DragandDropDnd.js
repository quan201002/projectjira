import React, { useState } from "react";
import _ from "lodash";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
export default function DragandDropDnd() {
  const [state, setState] = useState({
    toDo: {
      id: "toDo",
      items: [
        { id: "1", taskName: "task1" },
        { id: "2", taskName: "task2" },
        { id: "3", taskName: "task3" },
      ],
    },
    inProgress: {
      id: "inProgress",
      items: [
        { id: "4", taskName: "task4" },
        { id: "5", taskName: "task5" },
        { id: "6", taskName: "task6" },
      ],
    },
    done: {
      id: "done",
      items: [
        { id: "7", taskName: "task7" },
        { id: "8", taskName: "task8" },
        { id: "9", taskName: "task9" },
      ],
    },
  });
  const handleDragEnd = (result) => {
    console.log("result", result);
    let { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    let itemCopy = { ...state[source.droppableId].items[source.index] };
    console.log("item copy", itemCopy);

    //Droppable bắt đầu kéo lấy ra khỏi div
    let index = state[source.droppableId].items.findIndex(
      (item) => item.id == itemCopy.id
    );
    state[source.droppableId].items.splice(index, 1);

    //Droppable thả vào
    let dropDestination = state[destination.droppableId].items;
    dropDestination.splice(destination.index, 0, itemCopy);
    console.log("drop destination", dropDestination);
    console.log("des", destination);
    console.log("source", source);
    setState(state);
  };
  return (
    <div className="container">
      <h3 className="text-center display-4">Demo Draganddrop dnd</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="row">
          {_.map(state, (statusTask, index) => {
            return (
              <Droppable droppableId={statusTask.id} key={index}>
                {(provided) => {
                  return (
                    <div
                      className="col-4 bg-dark p-5"
                      key={index}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <div className="bg-dark">
                        <h3 className="text-white">{statusTask.id}</h3>
                        {statusTask.items.map((item, index) => {
                          return (
                            <Draggable
                              key={item.id}
                              index={index}
                              draggableId={item.id}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="mt-2 p-2 bg-white text-center"
                                  >
                                    {item.taskName}
                                  </div>
                                );
                              }}
                            </Draggable>
                          );
                        })}
                        ;
                      </div>
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
