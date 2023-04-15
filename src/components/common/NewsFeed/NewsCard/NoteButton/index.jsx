import "./styles.css";

import { stickyNoteIcon } from "@assets";

import React from "react";
import {
    string,
    bool,
    func,
    arrayOf,
    oneOfType,
    instanceOf,
    shape,
} from "prop-types";
import { useRef, useState } from "react";

import { NoteCard } from "./NoteCard";
import { newsType } from "@types";

export const NoteButton = ({
    id,
    noteText,
    isOpen,
    setActiveTool,
    setOpenNoteId,
    newsCardRef,
    favoriteNews,
    setFavoriteNews,
}) => {
    const noteButtonRef = useRef();

    const [noteCardLeft, setNoteCardLeft] = useState(0);

    const getNoteCardPosition = () => {
        const noteCardWidth = 220;
        const noteButtonX = noteButtonRef.current.offsetLeft;
        const newsCardWidth = newsCardRef.current.offsetWidth;
        const distanceToRightBorder = newsCardWidth - noteButtonX;
        const noteCardLeft = distanceToRightBorder - noteCardWidth;
        setNoteCardLeft(noteCardLeft < 0 ? noteCardLeft : 0);
    };

    return (
        <span
            role="button"
            tabIndex={0}
            id={id}
            className={`button-small note-button ${
                isOpen ? "button-active" : ""
            }`}
            ref={noteButtonRef}
            onClick={() => {
                setActiveTool(null);
                setOpenNoteId(id);
                getNoteCardPosition();
            }}
            onKeyUp={(event) => {
                if (event.key === "Enter") {
                    setActiveTool(null);
                    setOpenNoteId(id);
                    getNoteCardPosition();
                } else if (event.key === "Escape") {
                    setOpenNoteId("");
                } else if (event.key === "Tab") {
                    event.stopPropagation();
                    event.preventDefault();
                }
            }}
        >
            <img
                className="note-button-icon"
                src={stickyNoteIcon}
                alt="#"
                aria-hidden={true}
            />
            {isOpen && (
                <NoteCard
                    noteText={noteText}
                    noteCardLeft={noteCardLeft}
                    favoriteNews={favoriteNews}
                    setFavoriteNews={setFavoriteNews}
                    id={id}
                />
            )}
        </span>
    );
};

NoteButton.propTypes = {
    id: string.isRequired,
    noteText: string.isRequired,
    isOpen: bool.isRequired,
    setActiveTool: func.isRequired,
    setOpenNoteId: func.isRequired,
    newsCardRef: oneOfType([
        // Either a function
        func,
        // Or the instance of a DOM native element (see the note about SSR)
        shape({ current: instanceOf(Element) }),
    ]),
    favoriteNews: arrayOf(newsType).isRequired,
    setFavoriteNews: func.isRequired,
};
