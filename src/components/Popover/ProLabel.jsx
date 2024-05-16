import { Popover } from "antd";
import React from "react";
import "./proLabel.scss";

const ProLabel = () => {
  const content = (
    <div>
      <p className="text-white">
        This freelancer has been vetted for quality and expertise by the Fiverr
        Pro team.
      </p>
    </div>
  );

  return (
    <Popover content={content} id="pro-label">
      <div
        className="pro-label flex items-center px-2 py-1 text-white rounded-md"
        style={{ background: "rgb(46, 37, 173)" }}
      >
        <i class="fa-regular fa-circle-check mr-1"></i>
        <span className="font-bold">Pro</span>
      </div>
    </Popover>
  );
};

export default ProLabel;
