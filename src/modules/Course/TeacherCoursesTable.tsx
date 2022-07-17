import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useRouter } from 'next/router';
import { Fragment, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { APP_URL } from '../../config';
import { Messages, setMessage, setSuccessMessage } from '../../lib/messages';
import { coursePublishStatus, ECoursePublish } from '../../types/enums';
import { CourseData } from '../../types/fetch-data.type';
import { DeleteDialog } from '../../components/Dialog/DeleteDialog';
import { MoreMenu } from '../../components/Menu/MoreMenu';
import { pickBy } from 'lodash';
import { teacherCoursesService } from '../../lib/teacher-courses.service';
import { notificationService } from '../../lib/notificationService';
import { faFilter, faSort, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NextLink } from '../../components/Link';
import { IconButtonMedium } from '../../components/Button/IconButton';
import { StackSpaceBetween } from '../../components/Stack';

export const TeacherCoursesTable = () => {
  return <></>;
};
