import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faBold,
  faItalic,
  faUnderline,
  faCodeBranch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Stack } from '@mui/material';
import { EditorState } from 'draft-js';
import React from 'react';

type InlineStyle = {
  icon: IconProp;
  style: string;
};
const inlineStyles: InlineStyle[] = [
  { icon: faBold, style: 'BOLD' },
  { icon: faItalic, style: 'ITALIC' },
  { icon: faUnderline, style: 'UNDERLINE' },
  { icon: faCodeBranch, style: 'CODE' },
];

type FCProps = {
  editorState: EditorState;
  onToggle: (style: string) => void;
};

export const InlineStyleControls: React.FC<FCProps> = props => {
  const { editorState, onToggle } = props;

  var currentStyle = editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      <Stack direction="row" spacing={1}>
        {inlineStyles.map(type => (
          <IconButton
            size="small"
            key={type.style}
            color={currentStyle.has(type.style) ? 'primary' : 'default'}
            onMouseDown={e => {
              e.preventDefault();

              onToggle(type.style);
            }}
          >
            <FontAwesomeIcon size="sm" icon={type.icon} />
          </IconButton>
        ))}
      </Stack>
    </div>
  );
};
