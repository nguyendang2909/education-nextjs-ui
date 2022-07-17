import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  faCode,
  faListOl,
  faListUl,
  faQuoteRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton, Stack } from '@mui/material';
import { EditorState } from 'draft-js';
import React from 'react';

// const BLOCK_TYPES = [
//   { label: 'H1', style: 'header-one' },
//   { label: 'H2', style: 'header-two' },
//   { label: 'H3', style: 'header-three' },
//   { label: 'H4', style: 'header-four' },
//   { label: 'H5', style: 'header-five' },
//   { label: 'H6', style: 'header-six' },
//   { label: 'Blockquote', style: 'blockquote' },
//   { label: 'UL', style: 'unordered-list-item' },
//   { label: 'OL', style: 'ordered-list-item' },
//   { label: 'Code Block', style: 'code-block' },
// ];

type BlockType = {
  icon?: IconProp;
  label?: string;
  style: string;
};

const blockTypes: BlockType[] = [
  { label: 'H1', style: 'header-one' },
  { label: 'H2', style: 'header-two' },
  { label: 'H3', style: 'header-three' },
  // { label: 'H4', style: 'header-four' },
  // { label: 'H5', style: 'header-five' },
  // { label: 'H6', style: 'header-six' },
  { icon: faQuoteRight, style: 'blockquote' },
  { icon: faListUl, style: 'unordered-list-item' },
  { icon: faListOl, style: 'ordered-list-item' },
  { icon: faCode, style: 'code-block' },
];

type FCProps = {
  editorState: EditorState;
  onToggle: (block: string) => void;
};
export const BlockStyleControls: React.FC<FCProps> = props => {
  const { editorState, onToggle } = props;

  const selection = editorState.getSelection();

  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <Stack direction="row" spacing={1}>
      {blockTypes.map(type => {
        const { icon, label, style } = type;

        return (
          <IconButton
            size="small"
            key={style}
            color={style === blockType ? 'primary' : 'default'}
            onMouseDown={e => {
              e.preventDefault();

              onToggle(type.style);
            }}
          >
            {icon ? <FontAwesomeIcon size="sm" icon={icon} /> : label}
          </IconButton>
        );
      })}
    </Stack>
  );
};
