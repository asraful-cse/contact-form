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
    width: "400px",
    transform: "translate(-50%, -50%)",
    backgroundColor: "lightgray",
  },
};

// badwords array-----------------------------------
let oath = [
  "asshole",
  "ass",
  "arse",
  "bastard",
  "bitch",
  "bollocks",
  "bugger",
  "bullshit",
  "crap",
  "damn",
  "frigger",
  "fuck",
];

function App() {
  const [data, setData] = useState("");
  const [badWordFind, setBadWordFind] = useState(false);
  const [toggleName, setToggleName] = useState(false);
  const [toggleEmail, setToggleEmail] = useState(false);
  const [togglePhone, setTogglePhone] = useState(false);
  const [toggleMessage, setToggleMessage] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    trigger,
  } = useForm({ mode: "onTouched" });

  const onSubmit = (data) => {
    console.log(data);
    setData(data);
    openModal();
    reset();
  };

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

  const toggleHandlerName = () => {
    setToggleName(!toggleName);
  };
  const toggleHandlerEmail = () => {
    setToggleEmail(!toggleEmail);
  };

  const toggleHandlerPhone = () => {
    setTogglePhone(!togglePhone);
  };
  const toggleHandlerMessage = () => {
    setToggleMessage(!toggleMessage);
  };
  // badword handle -----------------------------------
  const badWordsHandle = (e) => {
    let flag = 0;
    const input = e.target.value.trim().split(" ");

    for (let i = 0; i < oath.length; i++) {
      for (let j = 0; j < input.length; j++) {
        if (oath[i] === input[j]) {
          setBadWordFind(true);
          flag = 1;
          break;
        }
      }
    }
    if (flag === 0) {
      setBadWordFind(false);
    }
  };
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
                <div className="d-flex position-relative align-items-center justify-content-between">
                  <small className="text-danger ">{errors.name.message}</small>
                  <a className="text-xs " onClick={toggleHandlerName}>
                    See valid syntax
                  </a>
                  {toggleName ? (
                    <div className="position-absolute  w-56  bg-info p-2 border rounded mt-5">
                      <button
                        className=" btn btn-danger"
                        onClick={toggleHandlerName}
                      >
                        &times;
                      </button>
                      <p className="pb-1">
                        <span className="">Name</span> - Must be string, can not
                        have numbers, can be maximum 30 characters.
                      </p>
                      <p className="pb-1">
                        <span className="">Email</span> - Must be string, the
                        structure of the input Must match valid email structure,
                        i.e. user@address.com or user@address.info.
                      </p>
                      <p className="pb-1">
                        <span className="">Phone</span> - Follow Bangladeshi
                        phone number, should be accepted with or without the
                        country code, i.e +8801921615651 .
                      </p>
                      <p className="pb-1">
                        <span className="">Message</span> - Must be string, at
                        least 80 characters.
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
              <input
                placeholder="Enter your name"
                type="text"
                className={`form-control ${errors.name && "invalid"}`}
                {...register("name", {
                  required: "Name is Required",

                  maxLength: {
                    value: 30,
                    message: "Maximum allowed length is 30 words",
                  },
                  pattern: {
                    value: /^[a-zA-Z ]+([" "]?[a-zA-Z]+)*$/,
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
                <div className="d-flex position-relative align-items-center justify-content-between">
                  <small className="text-danger ">{errors.email.message}</small>
                  <a className="text-xs " onClick={toggleHandlerEmail}>
                    See valid syntax
                  </a>
                  {toggleEmail ? (
                    <div className="position-absolute  w-56  bg-info p-2 border rounded">
                      <button
                        className=" btn btn-danger"
                        onClick={toggleHandlerEmail}
                      >
                        &times;
                      </button>
                      <p className="pb-1">
                        <span className="">Name</span> - Must be string, can not
                        have numbers, can be maximum 30 characters.
                      </p>
                      <p className="pb-1">
                        <span className="">Email</span> - Must be string, the
                        structure of the input Must match valid email structure,
                        i.e. user@address.com or user@address.info .
                      </p>
                      <p className="pb-1">
                        <span className="">Phone</span> - Follow Bangladeshi
                        phone number, should be accepted with or without the
                        country code, i.e +8801921615651 .
                      </p>
                      <p className="pb-1">
                        <span className="">Message</span> - Must be string, at
                        least 80 characters.
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
              <input
                type="text"
                placeholder="Enter your email address"
                className={`form-control ${errors.email && "invalid"}`}
                {...register("email", {
                  required: "Email is Required ",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[com|info]{2,4}$/i,

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
                <div className="d-flex position-relative align-items-center justify-content-between">
                  <small className="text-danger ">{errors.phone.message}</small>
                  <a className="text-xs " onClick={toggleHandlerPhone}>
                    See valid syntax
                  </a>
                  {togglePhone ? (
                    <div className="position-absolute  w-56  bg-info p-2 border rounded">
                      <button
                        className=" btn btn-danger"
                        onClick={toggleHandlerPhone}
                      >
                        &times;
                      </button>
                      <p className="pb-1">
                        <span className="">Name</span> - Must be string, can not
                        have numbers, can be maximum 30 characters.
                      </p>
                      <p className="pb-1">
                        <span className="">Email</span> - Must be string, the
                        structure of the input Must match valid email structure,
                        i.e. user@address.com or user@address.info.
                      </p>
                      <p className="pb-1">
                        <span className="">Phone</span> - Follow Bangladeshi
                        phone number, should be accepted with or without the
                        country code, i.e +8801921615651 .
                      </p>
                      <p className="pb-1">
                        <span className="">Message</span> - Must be string, at
                        least 80 characters.
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
              <input
                type="text"
                placeholder="Enter your bangladesh mobile no."
                className={`form-control ${errors.phone && "invalid"}`}
                {...register("phone", {
                  required: "Mobile No. is Required",
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
                <div className="d-flex position-relative align-items-center justify-content-between">
                  <small className="text-danger ">
                    {errors.message.message}
                  </small>
                  <a className="text-xs " onClick={toggleHandlerMessage}>
                    See valid syntax
                  </a>
                  {toggleMessage ? (
                    <div className="position-absolute  w-56  bg-info p-2 border rounded">
                      <button
                        className=" btn btn-danger"
                        onClick={toggleHandlerMessage}
                      >
                        &times;
                      </button>
                      <p className="pb-1">
                        <span className="">Name</span> - Must be string, can not
                        have numbers, can be maximum 30 characters.
                      </p>
                      <p className="pb-1">
                        <span className="">Email</span> - Must be string, the
                        structure of the input Must match valid email structure,
                        i.e. user@address.com or user@address.info.
                      </p>
                      <p className="pb-1">
                        <span className="">Phone</span> - Follow Bangladeshi
                        phone number, should be accepted with or without the
                        country code, i.e +8801921615651 .
                      </p>
                      <p className="pb-1">
                        <span className="">Message</span> - Must be string, at
                        least 80 characters.
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
              <textarea
                placeholder="Enter your message"
                className={`form-control ${errors.message && "invalid"}`}
                {...register("message", {
                  required: "Message is Required at least 80 characters",

                  minLength: {
                    value: 80,
                    message: "Minimum Required length is 80 characters",
                  },
                  onChange: (e) => badWordsHandle(e),
                })}
                onKeyUp={() => {
                  trigger("message");
                }}
              />
              {badWordFind ? (
                <div className="d-flex relative align-items-center justify-content-between">
                  <small className="text-danger">Bad words not supported</small>
                </div>
              ) : null}
            </div>

            {badWordFind ? (
              <div className="d-flex justify-content-center">
                <input
                  className="btn btn-secondary my-3 "
                  type="button"
                  value="Submit"
                  disabled
                />
              </div>
            ) : (
              <div className="d-flex justify-content-center">
                <input
                  className={`btn btn-secondary my-3 ${
                    isValid && "btn btn-info"
                  }`}
                  type="submit"
                  value="Submit"
                  disabled={!isValid}
                  // onClick={openModal}
                />
              </div>
            )}
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
          {data.name && (
            <div className="">
              <h1 className="pb-5">Thank you {data.name}</h1>{" "}
              <div className=" d-flex justify-content-center">
                <button className="btn btn-info" onClick={closeModal}>
                  OK
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
