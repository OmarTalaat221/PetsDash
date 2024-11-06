import React from 'react'

export default function Alert({alert , setAlert , bgColor , color}) {
  return (
    <div style={{
        backgroundColor: {bgColor},
        color: {color},
        padding: "0px 10px",
        borderRadius: "7px",
        marginBottom: "30px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    }}>
        <p>{alert}</p>
        <span
            style={{ fontSize: '20px', cursor: "pointer" }}
            onClick={() => setAlert("")}
        >
            &times;
        </span>
    </div>
  )
}
