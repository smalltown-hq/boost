import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Close from "vectors/Close";

const variants = {
  open: {
    y: 0,
  },
  closed: { y: "-200%" },
};

export default function Toast(props) {
  return (
    <>
      <AnimatePresence>
        {props.open && (
          <div
            className="toast"
            exit="closed"
            initial="closed"
            animate="open"
            variants={variants}
          >
            <p className="toast__content">{props.children}</p>
            <Close
              onClick={props.onClose instanceof Function && props.onClose}
            />
          </div>
        )}
      </AnimatePresence>
      <style jsx>{`
        .toast {
          position: fixed;
          bottom: 0;
          height: 4rem;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
        }
      `}</style>
    </>
  );
}
