import { Box } from '@mui/material';
import React from 'react';
import { TextEditorReadOnly } from '../../components/Editor/TextEditorReadOnly';
import { TypographyBorderBottom } from '../../components/Text/Typography';

type CourseAboutCardProps = {
  courseAbout: string;
};

export const CourseAbout: React.FC<CourseAboutCardProps> = ({
  courseAbout,
}) => {
  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <TypographyBorderBottom variant="h2">
          Thông tin khoá học
        </TypographyBorderBottom>
      </Box>
      <TextEditorReadOnly data={courseAbout} />
    </Box>
  );
};
