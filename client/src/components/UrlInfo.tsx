import { IoMdCopy } from "react-icons/io";

export function UrlInfo(props: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px auto",
      }}
    >
      <span
        id="short"
        style={{
          border: "1px solid #000",
          width: "fit-content",
          padding: "8px 24px",
          borderRadius: "10px",
        }}
      >
        the shortened url
      </span>
      <span>
        <IoMdCopy
          // onClick={props.handleCopyClick("hello")}
          style={{
            width: "32px",
            height: "32px",
            marginLeft: "10px",
            border: "1px solid #000",
            borderRadius: "10px",
          }}
        />
      </span>
    </div>
  );
}
