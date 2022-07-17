import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Box,
  FormControlLabel,
  IconButton,
  Popover,
  Radio,
  RadioGroup,
} from '@mui/material';
import { useRouter } from 'next/router';
import {
  ChangeEvent,
  FC,
  Fragment,
  MouseEvent,
  useEffect,
  useState,
} from 'react';
import { Messages, setMessage } from '../../lib/messages';
import { urlQueryService } from '../../lib/url-query.service';
import { BoxPadding, BoxRightText } from '../Box';
import { AccpetButton } from '../Button/ActionButton';

type TablePopoverFilterProps = {
  urlQueryName: string;
  options: { text: string; value: string }[];
};

export const TablePopoverFilter: FC<TablePopoverFilterProps> = ({
  options,
  urlQueryName,
}) => {
  const router = useRouter();

  const routerOptions = { router };

  const queryOptions = { query: router.query };

  const urlQueryValue = urlQueryService.getOne(urlQueryName, queryOptions);

  const [selectedValue, setSelectedValue] = useState<string>(
    urlQueryValue || '',
  );

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  useEffect(() => {
    setSelectedValue(urlQueryValue || '');
  }, [router.isReady, urlQueryValue]);

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

  const handleClickPopover = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRadioChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleFilter = () => {
    urlQueryService.setUrlQuery(
      {
        [urlQueryName]: selectedValue,
      },
      routerOptions,
    );

    handleClosePopover();
  };

  return (
    <>
      <IconButton
        onClick={handleClickPopover}
        sx={{ color: !!urlQueryValue ? 'info.main' : 'text.secondary' }}
      >
        <FontAwesomeIcon icon={faFilter} />
      </IconButton>
      <Popover
        id="filterRole"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <BoxPadding>
          <Box>
            <RadioGroup value={selectedValue} onChange={handleRadioChange}>
              <FormControlLabel
                value={''}
                label={setMessage(Messages.common.all)}
                control={<Radio />}
              />
              {options?.map((option, index) => {
                return (
                  <Fragment key={index}>
                    <FormControlLabel
                      value={option.value}
                      label={setMessage(option.text)}
                      control={<Radio />}
                    />
                  </Fragment>
                );
              })}
            </RadioGroup>
          </Box>
          <BoxRightText>
            <AccpetButton size="small" onClick={handleFilter}></AccpetButton>
          </BoxRightText>
        </BoxPadding>
      </Popover>
    </>
  );
};
