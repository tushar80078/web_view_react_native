import ReactJsonPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";

const JSONViewer = ({ data }) => {
  return (
    <div className="rounded-md overflow-hidden mt-2">
      <ReactJsonPretty data={data} />
    </div>
  );
};

export default JSONViewer;
