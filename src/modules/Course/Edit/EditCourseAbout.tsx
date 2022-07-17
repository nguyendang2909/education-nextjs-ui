import { Card, CardActions, CardContent, CardHeader } from '@mui/material';

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { convertFromRaw, convertToRaw } from 'draft-js';
import { Messages, setMessage } from '../../../lib/messages';
import {
  CancelButton,
  EditButton,
  UpdateButton,
} from '../../../components/Button/ActionButton';
import { coursesService } from '../../../lib/courses.service';
import { RichTextEditor } from '../../../components/Editor/RichTextEditor';
import { toast } from 'react-toastify';
import { teacherCoursesService } from '../../../lib/teacher-courses.service';
import { TextEditorReadOnly } from '../../../components/Editor/TextEditorReadOnly';

type FCProps = {
  id: number;
  about?: string;
  onFinish: () => void;
};

export const CourseAboutEditCard: React.FC<FCProps> = props => {
  const { id, about: courseAbout, onFinish } = props;

  const [editorState, handleChangeTextEditor] = React.useState<EditorState>(
    EditorState.createEmpty(),
  );

  const [isEdit, setEdit] = React.useState<boolean>(false);

  React.useEffect(() => {
    const state = courseAbout
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(courseAbout)))
      : EditorState.createEmpty();

    handleChangeTextEditor(state);
  }, [courseAbout]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      about: '',
    },
    validationSchema: Yup.object().shape({
      // about: Yup.string().required(),
    }),
    onSubmit: async values => {
      try {
        if (id) {
          const params = {
            about: JSON.stringify(
              convertToRaw(editorState.getCurrentContent()),
            ),
          };

          await teacherCoursesService.update(id, params);

          setEdit(false);

          onFinish && onFinish();
        }
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    },
  });

  const handleClickEditButton = () => {
    setEdit(!isEdit);
  };

  const handleCancelEdit = () => {
    setEdit(false);
  };

  const { handleSubmit, isSubmitting } = formik;

  return (
    <Card>
      <CardHeader
        title={setMessage(`${Messages.common.about} ${Messages.course.name}`)}
        action={<EditButton onClick={handleClickEditButton} />}
      ></CardHeader>

      <CardContent>
        {isEdit ? (
          <form noValidate onSubmit={handleSubmit}>
            <RichTextEditor
              editorState={editorState}
              onChange={handleChangeTextEditor}
            />
            <CardActions sx={{ justifyContent: 'center' }}>
              <CancelButton onClick={handleCancelEdit} />
              <UpdateButton loading={isSubmitting} />
            </CardActions>
          </form>
        ) : (
          <>
            <TextEditorReadOnly data={courseAbout} />
          </>
        )}
      </CardContent>
    </Card>
  );
};
