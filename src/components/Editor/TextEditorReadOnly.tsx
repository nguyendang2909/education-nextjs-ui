import { useEffect, useState } from 'react';
import { Editor, convertFromRaw, EditorState } from 'draft-js';

type FCProps = {
  data?: string;
};

export const TextEditorReadOnly: React.FC<FCProps> = ({ data }) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty(),
  );

  useEffect(() => {
    const state = data
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(data)))
      : EditorState.createEmpty();

    setEditorState(state);
  }, [data]);

  return (
    <div className="readonly-editor">
      <Editor
        editorKey="readOnlyEditor"
        editorState={editorState}
        readOnly={true}
        onChange={() => {}}
      />
    </div>
  );
};
