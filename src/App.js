import { useForm } from "react-hook-form";
import React, { useState } from "react";
import "./App.css";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    // height:"100px",
    width: "400px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "lightgray",
  },
};

function App() {
  const [data, setData] = useState("");
  const [disable, setDisable] = useState(0)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    trigger,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setData(data);
    reset();
    // setDisable(true)
  };

  // console.log(watch());

  // console.log(errors.name)
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#fff";
  }

  function closeModal() {
    setIsOpen(false);
    // setDisable(false)
  }
  return (
    <div className=" pt-5 bg-cl pb-5 p-2">
      <div className="row justify-content-sm-center pt-5">
        <div className="col-sm-6 shadow rounded pb-3 bg-cl  ">
          <h1 className="text-center pt-3 text-white">Contact Form</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="col-form-label">
                <strong className="text-danger">*</strong> Name:
              </label>{" "}
              <br />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
              <input
                placeholder="Enter your name"
                type="text"
                className={`form-control ${errors.name && "invalid"}`}
                {...register("name", {
                  required: "Name is Required example:- Asad",

                  maxLength: {
                    value: 30,
                    message: "Maximum allowed length is 30 words",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+([._]?[a-zA-Z]+)*$/,
                    message: "Only (a-z) words are allowed",
                  },
                })}
                onKeyUp={() => {
                  trigger("name");
                }}
              />
            </div>

            <div className="form-group">
              <label className="col-form-label">
                <strong className="text-danger">*</strong> Email:
              </label>{" "}
              <br />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
              <input
                type="text"
                placeholder="Enter your email address"
                className={`form-control ${errors.email && "invalid"}`}
                {...register("email", {
                  required:
                    "Email is Required example :- abc@gmail.com or abc@bd.info",
                  pattern: {
                    value:
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[com]{3,}|[info]{4,}$/i,

                    message: "Invalid email address",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">
                <strong className="text-danger">*</strong> Mobile Number:
              </label>{" "}
              <br />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
              <input
                type="text"
                placeholder="Enter your bangladesh mobile no."
                className={`form-control ${errors.phone && "invalid"}`}
                {...register("phone", {
                  required:
                    "Mobile No. is Required example:- +8801921615651 or 01921615651 bangladesh mobile no.",
                  pattern: {
                    value: /^(?:\+88|88)?(01[3-9]\d{8})$/,
                    message: "Invalid phone no",
                  },
                })}
                onKeyUp={() => {
                  trigger("phone");
                }}
              />
            </div>
            <div className="form-group">
              <label className="col-form-label">
                <strong className="text-danger">*</strong> Message:
              </label>{" "}
              <br />
              {errors.message && (
                <small className="text-danger">{errors.message.message}</small>
              )}
              <textarea
                placeholder="Enter your message"
                className={`form-control ${errors.message && "invalid"}`}
                {...register("message", {
                  required: "Message is Required at least 80 characters",
                  minLength: {
                    value: 80,
                    message: "Minimum Required length is 80",
                  },
                })}
                onKeyUp={() => {
                  trigger("message");
                }}
              ></textarea>
            </div>

            <div className="d-flex justify-content-center">
              <input
                onClick={openModal}
                type="submit"
                className="btn btn-info my-3 "
                value="Send message"
                disabled={disable}
              />
            </div>
          </form>
        </div>
      </div>

      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          {data.name ? (
            <div className="">
              <h1 className="pb-5">Thank you {data.name}</h1>{" "}
              <div className=" d-flex justify-content-center">
                <button className="btn btn-info" onClick={closeModal}>
                  OK
                </button>
              </div>
            </div>
          ) : (
            <div>
              <strong className="text-danger d-flex justify-content-center">
                Please fill the required fields
              </strong>
              <br />
              <div className=" d-flex justify-content-center pt-5">
                <button className="btn btn-danger" onClick={closeModal}>
                  Close
                </button>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default App;
