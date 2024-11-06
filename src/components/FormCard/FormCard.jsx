import React, {useState} from "react";
import "./style.css";
import {arrow_down_no_tail} from "../../assets/svgIcons";
import {AnimatePresence, motion} from "framer-motion";

const FormCard = ({header, drawer, icon, children}) => {
  const [open, setOpen] = useState(true);

  return (
    <AnimatePresence>
      <motion.div className='form_card'>
        <div
          className={`form_card_header ${drawer ? "drawer" : ""} ${
            open ? "open" : "close"
          }`}
          onClick={() => (drawer ? setOpen(!open) : null)}
        >
          {icon && <div className='headerIcon'>{icon || "s"}</div>}
          <h4>{header}</h4>
          {drawer && (
            <div className={`header_drawer_icon ${open ? "open" : ""}`}>
              {arrow_down_no_tail}
            </div>
          )}
        </div>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 , scale:0}}
              animate={{x: 0, opacity: 1 , scale:1}}
              exit={{ opacity: 0 , scale:0}}
              className='form_card_body'
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default FormCard;
