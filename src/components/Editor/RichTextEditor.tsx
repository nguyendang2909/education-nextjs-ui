import React from 'react';
import { ContentBlock, Editor, EditorState, RichUtils } from 'draft-js';
import { BlockStyleControls } from './BlockStyleControls';
import { InlineStyleControls } from './InlineStyleControls';
import { Box } from '@mui/system';
import { Grid, Stack } from '@mui/material';

type FCProps = {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
};

export const RichTextEditor: React.FC<FCProps> = props => {
  const ref = React.useRef(null);

  const { onChange, editorState } = props;

  const handleKeyCommand = (command: string) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      onChange(newState);

      return 'handled';
    }

    return 'not-handled';
  };

  // const onTab = e => {
  //   const maxDepth = 4;

  //   onChange(RichUtils.onTab(e, props.editorState, maxDepth));
  // };

  const toggleBlockType = (blockType: string) => {
    onChange(RichUtils.toggleBlockType(props.editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    onChange(RichUtils.toggleInlineStyle(props.editorState, inlineStyle));
  };

  const focus = () => {
    (ref.current as any).focus();
  };

  return (
    <Grid
      container
      direction="column"
      sx={{
        border: '1px solid #ddd',
      }}
    >
      <Grid sx={{ borderBottom: '1px solid #dcdae0' }}>
        <Box sx={{ margin: 1 }}>
          <Stack spacing={1}>
            <BlockStyleControls
              editorState={editorState}
              onToggle={toggleBlockType}
            />
            <InlineStyleControls
              editorState={editorState}
              onToggle={toggleInlineStyle}
            />
          </Stack>
        </Box>
      </Grid>

      <Grid>
        <Box
          sx={{
            margin: 1,
            cursor: 'text',
            minHeight: '300px',
          }}
          onClick={focus}
        >
          <Editor
            ref={ref}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            onChange={onChange}
            // onTab={onTab}
            placeholder="Nhập giới thiệu..."
            spellCheck={true}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};
function getBlockStyle(block: ContentBlock) {
  switch (block.getType()) {
    case 'blockquote':
      return 'RichEditor-blockquote';
    default:
      return '';
  }
}
