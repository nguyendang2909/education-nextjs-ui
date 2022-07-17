import { ChangeEvent, FormEvent, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  Box,
  Input,
  Slide,
  Button,
  InputAdornment,
  ClickAwayListener,
  IconButton,
  Tooltip,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { Messages, setMessage } from '../../lib/messages';
import { useRouter } from 'next/router';
import { APP_URL } from '../../config';

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

export default function Searchbar() {
  const router = useRouter();

  const [isOpen, setOpen] = useState(false);

  const [searchText, setSearchText] = useState<string>('');

  const handleOpen = () => {
    setOpen(prev => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeSearchText = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchText(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    router.push({
      pathname: APP_URL.courses,
      query: {
        name: searchText,
      },
    });

    handleClose();
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        {!isOpen && (
          <Tooltip
            title={setMessage(Messages.action.find, Messages.course.name)}
          >
            <IconButton onClick={handleOpen}>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                width={20}
                height={20}
              />
            </IconButton>
          </Tooltip>
        )}

        <form noValidate onSubmit={handleSubmit}>
          <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
            <SearchbarStyle>
              <Input
                autoFocus
                fullWidth
                disableUnderline
                placeholder={setMessage(
                  Messages.action.search,
                  Messages.course.name,
                )}
                onChange={handleChangeSearchText}
                startAdornment={
                  <InputAdornment position="start">
                    <Box
                      component={FontAwesomeIcon}
                      icon={faMagnifyingGlass}
                      sx={{ color: 'text.secondary', width: 20, height: 20 }}
                    />
                  </InputAdornment>
                }
                sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              />
              <Button variant="contained" type="submit">
                Tìm
              </Button>
            </SearchbarStyle>
          </Slide>
        </form>
      </Box>
    </ClickAwayListener>
  );
}
