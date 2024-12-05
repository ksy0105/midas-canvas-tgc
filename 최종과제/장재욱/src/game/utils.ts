import { Note, NoteType } from "./types";

export function createNote(
  lane: number,
  timing: number,
  duration?: number,
): Note {
  return {
    lane,
    timing,
    type: duration ? NoteType.LONG : NoteType.SHORT,
    duration,
    isHeld: false,
  };
}

// 노트 생성
export function createNotes(): Note[] {
  return [
    createNote(0, 1700),
    createNote(1, 3700),
    createNote(2, 5700),
    createNote(3, 7700),
    createNote(0, 8200),
    createNote(2, 8500),
    createNote(0, 8800, 1200),
  ];
}
