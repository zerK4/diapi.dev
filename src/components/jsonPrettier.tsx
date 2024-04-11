"use client";

import React from "react";
import JSONPretty from "react-json-pretty";
import "./jsonPrettierTheme.css";
function JsonPrettier({ data }: { data: any }) {
  return <JSONPretty contentEditable data={data} />;
}

export default JsonPrettier;
