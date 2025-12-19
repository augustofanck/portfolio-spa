import ReactMarkdown from "react-markdown";
import md from "../content/engineering.md?raw";

export default function Engineering() {
  return (
    <div className="card">
      <ReactMarkdown>{md}</ReactMarkdown>
    </div>
  );
}
