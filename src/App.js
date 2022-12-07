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
    width:"400px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "lightgray",
  },
};

function App() {
  const [data, setData] = useState("");
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
  }
  return (
    <div className="container pt-5 ">
      <div className="row justify-content-sm-center pt-5">
        <div className="col-sm-6 shadow rounded pb-3 bg-info  ">
          <h1 className="text-center pt-3 text-white">Contact Form</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label className="col-form-label">Name:</label>
              <input
                type="text"
                className={`form-control ${errors.name && "invalid"}`}
                {...register("name", {
                  required: "Name is Required",
                  minLength: {
                    value: 3,
                    message: "Minimum Required length is 3",
                  },
                  maxLength: {
                    value: 30,
                    message: "Maximum allowed length is 30",
                  },
                  pattern: {
                    value: /^[a-zA-Z]+([._]?[a-zA-Z]+)*$/,
                    message: "Only (a-z) are allowed",
                  },
                })}
                onKeyUp={() => {
                  trigger("name");
                }}
              />
              {errors.name && (
                <small className="text-danger">{errors.name.message}</small>
              )}
            </div>

            <div className="form-group">
              <label className="col-form-label">Email:</label>
              <input
                type="text"
                className={`form-control ${errors.email && "invalid"}`}
                {...register("email", {
                  required: "Email is Required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                onKeyUp={() => {
                  trigger("email");
                }}
              />
              {errors.email && (
                <small className="text-danger">{errors.email.message}</small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Phone:</label>
              <input
                type="text"
                className={`form-control ${errors.phone && "invalid"}`}
                {...register("phone", {
                  required: "Phone is Required",
                  pattern: {
                    value:
                      /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                    message: "Invalid phone no",
                  },
                })}
                onKeyUp={() => {
                  trigger("phone");
                }}
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone.message}</small>
              )}
            </div>
            <div className="form-group">
              <label className="col-form-label">Message:</label>
              <textarea
                className={`form-control ${errors.message && "invalid"}`}
                {...register("message", {
                  required: "Message is Required",
                  minLength: {
                    value: 0,
                    message: "Minimum Required length is 0",
                  },
                  maxLength: {
                    value: 80,
                    message: "Maximum allowed length is 80 ",
                  },
                })}
                onKeyUp={() => {
                  trigger("message");
                }}
              ></textarea>
              {errors.message && (
                <small className="text-danger">{errors.message.message}</small>
              )}
            </div>
            <div className="d-flex justify-content-center">
              <input
                onClick={openModal}
                type="submit"
                className="btn  btn-primary my-3"
                value="Send message"
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
            <div>
              <h1>Thank you {data.name}</h1>{" "}
              <button className="btn btn-danger" onClick={closeModal}>
                close
              </button>
            </div>
          ) : (
            <div>
              <strong className="text-danger">
                Please fill the required fields
              </strong>
              <br />
              <button className="btn btn-danger" onClick={closeModal}>
                close
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}

export default App;
