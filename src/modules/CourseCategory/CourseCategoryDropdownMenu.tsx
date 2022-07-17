import React, { FC, Fragment, useRef } from 'react';
import {
  Button,
  MenuItem,
  Menu,
  MenuList,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { NextLink } from '../../components/Link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { useCourseCategories } from '../../hooks/useCourseCategories';
import { APP_URL } from '../../config';
import Image from 'next/image';

export const CourseCategoryDropdownMenu: FC = () => {
  const anchorRef = useRef(null);

  const { data: courseCategories } = useCourseCategories();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        sx={{ color: 'primary.contrast', textTransform: 'uppercase' }}
        variant="text"
        startIcon={
          <Image
            src="/static/images/icons/category.svg"
            alt="danh_muc_khoa_hoc"
            width={18}
            height={18}
          />
        }
        endIcon={<FontAwesomeIcon icon={faAngleDown} />}
        ref={anchorRef}
        onClick={handleOpen}
      >
        Danh mục khoá học
      </Button>

      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            mt: 2,
            boxShadow: theme => theme.customShadows.z20,
            minWidth: 300,
          },
        }}
      >
        <MenuList>
          {courseCategories?.map((courseCategory, index) => {
            return (
              <NextLink
                key={index}
                passHref
                href={{
                  pathname: APP_URL.courses,
                  query: {
                    courseCategoryId: courseCategory.id,
                  },
                }}
              >
                <MenuItem key={index} onClick={handleClose}>
                  <ListItemIcon>
                    <FontAwesomeIcon icon={courseCategory.icon || faQuestion} />
                  </ListItemIcon>

                  <ListItemText>{courseCategory.name}</ListItemText>
                </MenuItem>
              </NextLink>
            );
          })}
        </MenuList>
      </Menu>
    </>
  );
};
