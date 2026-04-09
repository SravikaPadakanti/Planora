import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'chronicle_notes_v1';

export function useNotes() {
  const [notes, setNotes] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {}
  }, [notes]);

  const setNote = useCallback((dateKey, text) => {
    setNotes(prev => {
      if (!text || !text.trim()) {
        const { [dateKey]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [dateKey]: text };
    });
  }, []);

  const getNote = useCallback((dateKey) => {
    return notes[dateKey] || '';
  }, [notes]);

  const deleteNote = useCallback((dateKey) => {
    setNotes(prev => {
      const { [dateKey]: _, ...rest } = prev;
      return rest;
    });
  }, []);

  const hasNote = useCallback((dateKey) => {
    return !!(notes[dateKey] && notes[dateKey].trim());
  }, [notes]);

  const getNotesForMonth = useCallback((year, month) => {
    const prefix = `${year}-${String(month + 1).padStart(2, '0')}`;
    return Object.entries(notes)
      .filter(([key]) => key.startsWith(prefix))
      .sort(([a], [b]) => a.localeCompare(b));
  }, [notes]);

  return { notes, setNote, getNote, deleteNote, hasNote, getNotesForMonth };
}
