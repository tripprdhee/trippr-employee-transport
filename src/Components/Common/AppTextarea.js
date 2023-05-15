import "./index.css";

const AppTextarea = (props) => {
  return (
    <textarea
      type={props.type}
      className="textarea-style"
      placeholder={props.placeholder}
      rows={props.rows}
      cols={props.cols}
    />
  );
};
export default AppTextarea;
