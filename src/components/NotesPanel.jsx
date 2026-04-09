import React, { useState, useEffect, useRef } from 'react';
import { formatDateKey, formatDisplayDate, formatRangeLabel, getDayCount, isSameDay, MONTHS } from '../utils/dates';
import './NotesPanel.css';

export default function NotesPanel({
  rangeStart, rangeEnd, rangeEndConfirmed, viewYear, viewMonth,
  getNote, setNote, deleteNote, getNotesForMonth, onClearSelection
}) {
  const hasRange = !!(rangeStart && rangeEndConfirmed);
  const isSingle = hasRange && isSameDay(rangeStart, rangeEndConfirmed);
  const activeKey = rangeStart ? formatDateKey(rangeStart) : null;
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const textareaRef = useRef(null);
  const monthNotes = getNotesForMonth(viewYear, viewMonth);
  const dayCount = hasRange ? getDayCount(rangeStart, rangeEndConfirmed) : 0;

  useEffect(() => {
    if (activeKey) {
      setText(getNote(activeKey));
      setSaved(false);
    }
  }, [activeKey]);

  const handleSave = () => {
    if (activeKey) {
      setNote(activeKey, text);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  };

  return (
    <div className="notes-panel">
      <div className="notes-panel__header">
        <div className="notes-panel__title-row">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span>Notes</span>
        </div>
        {hasRange && (
          <button className="notes-panel__clear" onClick={onClearSelection} title="Clear selection">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>

      {!rangeStart ? (
        <div className="notes-panel__empty">
          <div className="notes-panel__empty-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <p>Select a date to add a note</p>
          <p className="notes-panel__hint">Click once to start, click again to set range</p>
        </div>
      ) : (
        <div className="notes-panel__editor">
          <div className="notes-panel__range-info">
            <div className="notes-panel__range-label">
              {hasRange ? formatRangeLabel(rangeStart, rangeEndConfirmed) : formatDisplayDate(rangeStart)}
            </div>
            {hasRange && !isSingle && (
              <div className="notes-panel__day-count">{dayCount} day{dayCount !== 1 ? 's' : ''}</div>
            )}
          </div>

          <div className="notes-panel__textarea-wrap">
            <textarea
              ref={textareaRef}
              className="notes-panel__textarea"
              placeholder={`Add a note for ${hasRange ? 'this range' : 'this day'}…`}
              value={text}
              onChange={e => { setText(e.target.value); setSaved(false); }}
              onKeyDown={handleKeyDown}
              rows={5}
            />
            <div className="notes-panel__textarea-rules" aria-hidden="true">
              {Array.from({ length: 6 }).map((_, i) => <div key={i} className="notes-panel__line" />)}
            </div>
          </div>

          <div className="notes-panel__actions">
            <span className="notes-panel__hint-key">⌘S to save</span>
            <div className="notes-panel__btn-row">
              {text && (
                <button className="notes-panel__btn notes-panel__btn--ghost" onClick={() => { setText(''); deleteNote(activeKey); }}>
                  Clear
                </button>
              )}
              <button className={`notes-panel__btn notes-panel__btn--save ${saved ? 'notes-panel__btn--saved' : ''}`} onClick={handleSave}>
                {saved ? (
                  <>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Saved
                  </>
                ) : 'Save Note'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Month notes list */}
      {monthNotes.length > 0 && (
        <div className="notes-panel__list">
          <div className="notes-panel__list-title">
            {MONTHS[viewMonth]} Notes ({monthNotes.length})
          </div>
          <div className="notes-panel__list-items">
            {monthNotes.map(([key, note]) => (
              <div key={key} className="notes-panel__note-item">
                <div className="notes-panel__note-date">{key.slice(5).replace('-', '/')}</div>
                <div className="notes-panel__note-text">{note.length > 60 ? note.slice(0, 57) + '…' : note}</div>
                <button className="notes-panel__note-delete" onClick={() => deleteNote(key)} title="Delete note">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
