import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Radio, Select, Space } from "antd";

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}
const handleChange = (value) => {
  console.log(`Selected: ${value}`);
};

export default function FormCreateTask(props) {
  const [size, setSize] = useState("middle");
  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };
  const handelEditorChange = (content, editor) => {
    // console.log(content);
  };
  return (
    <div className="container">
      <div className="form-group">
        <p>Project</p>
        <select name="projectId" className="form-control">
          <option value="54">Project A</option>
          <option value="55">Project A</option>
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>priority</p>
            <select name="priorityId" className="form-control">
              <option>New Task</option>
              <option>Bugs</option>
            </select>
          </div>
          <div className="col-6">
            <p>Task type</p>
            <select className="form-control" name="typeId">
              <option>High</option>
              <option>Low</option>
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <Select
            mode="multiple"
            options={[
              { value: "a12", label: "a12" },
              { value: "a12", label: "a12" },
              { value: "a12", label: "a12" },
            ]}
            size={size}
            placeholder="Please select"
            defaultValue={["a10", "c12"]}
            onChange={handleChange}
            style={{
              width: "100%",
            }}
          />
        </div>
      </div>
      <div className="form-group">
        <p>description</p>
        <Editor
          name="description"
          apiKey="yum1msoezeygff7ybjfk07rmlduenqggxcyw8oy3izh0xfch"
          init={{
            plugins:
              "ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss",
            toolbar:
              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
            tinycomments_mode: "embedded",
            tinycomments_author: "Author name",
            mergetags_list: [
              { value: "First.Name", title: "First Name" },
              { value: "Email", title: "Email" },
            ],
            ai_request: (request, respondWith) =>
              respondWith.string(() =>
                Promise.reject("See docs to implement AI Assistant")
              ),
          }}
          onEditorChange={handelEditorChange}
        />
      </div>
    </div>
  );
}
