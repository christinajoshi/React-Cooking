import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDove } from "@fortawesome/free-solid-svg-icons";

/* import { faDove } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaQuestion } from 'react-icons/fa'
import {FontAwesomeIcon} from '@fortawesome/fontawesome-svg-core'
import {solid} from '@fortawesome/fontawesome-svg-core/import.macro'< FontAwesomeIcon icon  = "atom"  /> */

export default function AboutPageLink() {
  return (
    <div>
        
      <Link to="/about"><FontAwesomeIcon icon={faDove}></FontAwesomeIcon></Link>
    </div>
  );
}
