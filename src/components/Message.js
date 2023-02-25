import React from "react";
import dayjs from "dayjs";
function Message(props) {
  const { message } = props;
  return (
    message && (
      <>
        <div className="d-flex">
          <div></div>
          <div className="d-flex">
            <h6 className="font-weight-bold nunito mx-3">
              <strong>{message.user}</strong>
            </h6>
            <p className="nunito">
              <small>
                {dayjs(message?.createdAt.toDate()).format(
                  "MMMM D, YYYY h:mm A"
                )}
              </small>
            </p>
          </div>
        </div>
      </>
    )
  );
}

export default Message;
