import "./styles.css";

import React from "react";
import { useEffect } from "react";
import { string, func } from "prop-types";

import { TextArea } from "@common";

export const NoteTextArea = ({ text, setText }) => {
    useEffect(() => {
        const noteCard = document.querySelector(".text-area-field");
        noteCard.focus();
        noteCard.scrollIntoView({ behavior: "smooth" });
    }, []);

    return (
        <div className="note-text-area">
            <TextArea text={text} setText={setText} />
        </div>
    );
};

NoteTextArea.propTypes = {
    text: string.isRequired,
    setText: func.isRequired,
};
