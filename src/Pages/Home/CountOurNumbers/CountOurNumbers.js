import {
  faBriefcase,
  faPenNib,
  faPeopleGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./CountOurNumbers.css";
import CountUp from "react-countup";
import VisibilitySensor from "react-visibility-sensor";

const CountOurNumbers = () => {
  return (
    <div className="count-banner-content">
      <div className="count-banner">
        <div className="count-inside-banner">
          <div className="grid grid-cols-2 gap-7 lg:grid-cols-4">
            <div className="lg:mx-24 text-white flex flex-col justify-center">
              <div className="text-6xl border py-5 mb-2 px-[1.45rem] rounded-full bg-white text-black hover:bg-transparent hover:text-white cursor-text mx-auto transition-all duration-200">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <div className="text-center">
                <CountUp start={0} end={5628} duration={3}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span className="text-4xl my-2" ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>
                <p className="text-2xl my-2 uppercase font-mono">
                  current USERS
                </p>
              </div>
            </div>
            <div className="lg:mx-24 text-white flex flex-col justify-center">
              <div className="text-6xl border py-5 mb-2 px-[1.45rem] rounded-full bg-white text-black hover:bg-transparent hover:text-white cursor-text mx-auto transition-all duration-200">
                <FontAwesomeIcon icon={faBriefcase} />
              </div>
              <div className="text-center">
                <CountUp start={0} end={528} duration={3}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span className="text-4xl my-2" ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>
                <p className="text-2xl my-2 uppercase font-mono">Unique Bags</p>
              </div>
            </div>
            <div className="lg:mx-24 text-white flex flex-col justify-center">
              <div className="text-6xl border py-5 mb-2 px-[1.45rem] rounded-full bg-white text-black hover:bg-transparent hover:text-white cursor-text mx-auto transition-all duration-200">
                <FontAwesomeIcon icon={faPenNib} />
              </div>
              <div className="text-center">
                <CountUp start={0} end={374} duration={3}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span className="text-4xl my-2" ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>
                <p className="text-2xl my-2 uppercase font-mono">Companies</p>
              </div>
            </div>
            <div className="lg:mx-24 text-white flex flex-col justify-center">
              <div className="text-6xl border py-5 px-[1.45rem] rounded-full bg-white text-black hover:bg-transparent hover:text-white cursor-text mx-auto transition-all duration-200">
                <FontAwesomeIcon icon={faPeopleGroup} />
              </div>
              <div className="text-center">
                <CountUp start={0} end={23} duration={3}>
                  {({ countUpRef, start }) => (
                    <VisibilitySensor onChange={start} delayedCall>
                      <span className="text-4xl my-3" ref={countUpRef} />
                    </VisibilitySensor>
                  )}
                </CountUp>
                <p className="text-2xl my-2 uppercase font-mono">
                  Team members
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountOurNumbers;
