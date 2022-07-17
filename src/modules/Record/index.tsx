import {
  faBan,
  faCheckCircle,
  faDoorOpen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TableCell, Grid } from '@mui/material';
import { FC } from 'react';
import { GridAlignItemsCenter, GridFlexGrow } from '../../components/Grid';
import { MoreMenu } from '../../components/Menu/MoreMenu';
import { TablePopoverFilter } from '../../components/Table/TablePopoverFilter';
import { TypographyCenter } from '../../components/Text/Typography';
import { Messages, setMessage } from '../../lib/messages';

type TableHeaderCellRecordStatusProps = {};

export const TableHeaderCellRecordStatus: FC<
  TableHeaderCellRecordStatusProps
> = () => {
  return (
    <>
      <TableCell sx={{ width: '140px', maxWidth: '140px' }}>
        <GridAlignItemsCenter container>
          <GridFlexGrow item>
            <TypographyCenter>
              {setMessage(Messages.common.record)}
            </TypographyCenter>
          </GridFlexGrow>

          <Grid item>
            <TablePopoverFilter
              urlQueryName="isActive"
              options={[
                {
                  text: Messages.common.exist,
                  value: 'true',
                },
                {
                  text: Messages.action.deleted,
                  value: 'false',
                },
              ]}
            />
          </Grid>
        </GridAlignItemsCenter>
      </TableCell>
    </>
  );
};

type TableCellRecordStatusProps = {
  isActive?: boolean;
  id: number;
  onChange: (id: number, { isActive }: { isActive?: boolean }) => Promise<void>;
  refetch: () => void;
};

export const TableCellRecordStatus: FC<TableCellRecordStatusProps> = ({
  isActive,
  id,
  onChange,
  refetch,
}) => {
  const handleChangeRecordStatus = async (value: boolean) => {
    try {
      await onChange(id, {
        isActive: value,
      });

      refetch();
    } catch (err) {}
  };

  return (
    <TableCell>
      <GridAlignItemsCenter container>
        <GridFlexGrow item>
          <TypographyCenter
            sx={{ color: isActive ? 'primary.main' : 'error.main' }}
          >
            {isActive !== undefined ? (
              <>
                <FontAwesomeIcon icon={isActive ? faCheckCircle : faBan} />
              </>
            ) : (
              <></>
            )}
          </TypographyCenter>
        </GridFlexGrow>

        <Grid item>
          <MoreMenu
            items={[
              isActive
                ? {
                    name: Messages.action.delete,
                    icon: faTrash,
                    onClick: () => {
                      handleChangeRecordStatus(false);
                    },
                  }
                : {
                    name: Messages.action.active,
                    icon: faDoorOpen,
                    onClick: () => {
                      handleChangeRecordStatus(true);
                    },
                  },
            ]}
          ></MoreMenu>
        </Grid>
      </GridAlignItemsCenter>
    </TableCell>
  );
};
