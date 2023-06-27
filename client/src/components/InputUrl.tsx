import React from "react";
import { UrlInfo } from "./UrlInfo";

export function InputUrl() {
  const [url, setUrl] = React.useState("");

  function shortenUrl(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (url) {
      fetch("/url", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({ initial_url: url }), // Convert your data to JSON string
        body: JSON.stringify({ initial_url: url }), // Convert your data to JSON string
      })
        .then((response) => response.json()) // Parse the response as JSON
        .then((result) => {
          // Handle the result of the API call
          console.log(result);
        })
        .catch((error) => {
          // Handle any errors that occurred during the request
          console.error("Error:", error);
        });
    }
  }

  // const handleCopyClick = (textCopied: string) => {
  //   navigator.clipboard
  //     .writeText(textCopied)
  //     .then(() => {
  //       console.log("Text copied to clipboard:", textCopied);
  //       // Optionally, you can show a success message or perform any other actions
  //     })
  //     .catch((error) => {
  //       console.error("Failed to copy text:", error);
  //       // Handle any errors that occur during the copying process
  //     });
  // };

  return (
    <>
      <form
        onSubmit={shortenUrl}
        action=""
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "250px",
        }}
      >
        <input
          type="text"
          placeholder="Enter URL"
          onChange={(e) => setUrl(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "18px",
            borderRadius: "8px",
            minWidth: "400px",
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: "#000",
            color: "#fff",
            padding: "10px",
            borderRadius: "8px",
          }}
        >
          Shorten URL
        </button>
      </form>
      <UrlInfo />
    </>
  );
}
