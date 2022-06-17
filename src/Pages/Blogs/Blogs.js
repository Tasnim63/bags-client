import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./Blogs.css";
import { Flip } from "react-reveal";

const Blogs = () => {
  return (
    <div className="min-h-[80vh]">
      <h1 className="text-center text-2xl lg:text-4xl uppercase font-extrabold font-[Poppins] my-8">
        Question And Answer
      </h1>
      <Flip top cascade>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 px-4 lg:px-20">
          <div className="question-container bg-white px-5 lg:px-10 py-6 lg:py-16 rounded-xl shadow hover:shadow-xl">
            <div className="flex items-center">
              <span className="question-icon mr-3">
                <FontAwesomeIcon icon={faQuestion} />
              </span>
              <span className="lg:text-xl text-base font-bold">
                What is the Difference between javascript and nodejs ?
              </span>
            </div>
            <p className="lg:text-base text-sm">
              JavaScript is a programming language whereas nodejs is interpreter
              and environment for javascript and with some specific useful
              libraries. Javascript is mainly used for client side activity for
              a web application it provides dynamic changes in web application.
              NodeJS is mainly used for server side activity for accessing or
              performing any non-blocking operation of any operating system.
            </p>
          </div>
          <div className="question-container bg-white px-5 lg:px-10 py-6 lg:py-16 rounded-xl shadow hover:shadow-xl">
            <div className="flex items-center">
              <span className="question-icon mr-3">
                <FontAwesomeIcon icon={faQuestion} />
              </span>
              <span className="lg:text-xl text-base font-bold">
                When should you use nodejs and when should you use mongodb ?
              </span>
            </div>
            <p className="lg:text-base text-sm">
              NodeJs is and asynchronous event driven JavaScript Runtime. When
              we run stand alone code at that kind of code we can use NodeJs and
              also when we create server site for any project at that time use
              use nodeJS <br />
              MongoDB is document oriented NoSQL database. for both server and
              client side we need a base to store data and to update update it
              etc. this is where mongodb comes is . mongoDB gives us to create
              api and to store data update it delete it. and when we need to do
              this type of work , than we use mongoDB.
            </p>
          </div>
          <div className="question-container bg-white px-5 lg:px-10 py-6 lg:py-16 rounded-xl shadow hover:shadow-xl">
            <div className="flex items-center">
              <span className="question-icon mr-3">
                <FontAwesomeIcon icon={faQuestion} />
              </span>
              <span className="lg:text-xl text-base font-bold">
                What is the Differences between sql and nosql databases ?
              </span>
            </div>
            <p className="lg:text-base text-sm">
              Deference between SQL and NoSQL is that SQl is vertically scalable
              and best for complex queries and this database are not suitable
              for hierarchical data storage whereas NoSQL is horizontally
              scalable and not good for complex queries and best suited for
              hierarchical data storage.
            </p>
          </div>
          <div className="question-container bg-white px-5 lg:px-10 py-6 lg:py-16 rounded-xl shadow hover:shadow-xl">
            <div className="flex items-center">
              <span className="question-icon mr-3">
                <FontAwesomeIcon icon={faQuestion} />
              </span>
              <span className="lg:text-xl text-base font-bold">
                What is the purpose of jwt and how does it work ?
              </span>
            </div>
            <p className="lg:text-base text-sm">
              JWT stands for jsonwebtoken.It is a token based stateless
              authentication/authorization mechanism.Most Of the time We use it
              to authorize user and to protect api's.It shares security
              information between client site and server site. <br />
              jwt token encrypt user information and and later on it decode the
              information and match it with user provided information . this is
              how it works.
            </p>
          </div>
        </div>
      </Flip>
    </div>
  );
};

export default Blogs;
