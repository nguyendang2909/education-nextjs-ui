import {
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { Fragment, useEffect } from 'react';
import { useQuery } from 'react-query';
import { AdminLayout } from '../../../Layout/AdminLayout';
import { adminUsersService } from '../../../lib/admin-users.service';
import { Messages, setMessage } from '../../../lib/messages';
import { NextPageWithLayout } from '../../../types/components.type';
import { useRouter } from 'next/router';
import { requestService } from '../../../lib/request';
import { Formatter } from '../../../lib/formatter';
import { ERegisterTeacher, ERole } from '../../../types/enums';
import { TablePopoverFilter } from '../../../components/Table/TablePopoverFilter';
import { AFindAllUsersDto } from '../../../types/request.dto';
import { urlQueryService } from '../../../lib/url-query.service';
import {
  TableCellRecordStatus,
  TableHeaderCellRecordStatus,
} from '../../../modules/Record';
import { StackSpaceBetween } from '../../../components/Stack';
import {
  TableCellIndex,
  TableCellTextCenter,
} from '../../../components/Table/TableCell';
import { ContainerSpacing } from '../../../components/Container';
import { AdminUserSearchFields } from '../../../modules/User/AdminUserSearchFields';
import { LoadingContainer } from '../../../components/Container/LoadingContainer';
import { AppTablePagination } from '../../../components/Table/AppTablePagination';
import { AdminPage } from '../../../components/Page/AdminPage';
import { AdminUserRoleTableCell } from '../../../modules/User/Table/AdminUserRoleTableCell';
import { AdminUserRegisterTeacherTableCell } from '../../../modules/User/Table/AdminUserRegisterTeacherTableCell';

const Page: NextPageWithLayout = () => {
  const pageTitle = `${Messages.action.manage} ${Messages.user.name}`;

  const router = useRouter();

  const queryOptions = { query: router.query };

  const role = urlQueryService.getOne('role', queryOptions);

  const isActive = urlQueryService.getOneAsBoolean('isActive', queryOptions);

  const email = urlQueryService.getOne('email', queryOptions);

  const phoneNumber = urlQueryService.getOne('phoneNumber', queryOptions);

  const fullname = urlQueryService.getOne('fullname', queryOptions);

  const registerTeacher = urlQueryService.getOne(
    'registerTeacher',
    queryOptions,
  );

  const { pageSize, currentPage } = urlQueryService.getPaginated(queryOptions);

  const findOptions: AFindAllUsersDto = {
    isActive,
    role,
    registerTeacher,
    email,
    phoneNumber,
    fullname,
  };

  const findManyOptions = {
    ...findOptions,
    currentPage,
    pageSize,
  };

  const {
    data: users = [],
    refetch: refetchUsers,
    isFetching,
  } = useQuery(
    'admin.users',
    () => adminUsersService.getMany(findManyOptions),
    {
      enabled: router.isReady,
      staleTime: Infinity,
    },
  );

  const { data: countUsers = 0, refetch: refetchCountUsers } = useQuery(
    'admin.countUser',
    () => adminUsersService.count(findOptions),
    {
      enabled: router.isReady,
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (router.isReady) {
      refetchUsers();
    }
  }, [
    router.isReady,
    refetchUsers,
    pageSize,
    currentPage,
    isActive,
    role,
    registerTeacher,
    email,
    phoneNumber,
    fullname,
  ]);

  useEffect(() => {
    if (router.isReady) {
      refetchCountUsers();
    }
  }, [
    router.isReady,
    refetchCountUsers,
    pageSize,
    currentPage,
    isActive,
    role,
    registerTeacher,
    email,
    phoneNumber,
    fullname,
  ]);

  const pagination = <AppTablePagination count={countUsers} />;

  return (
    <>
      <AdminPage title={pageTitle} header={{}}>
        <ContainerSpacing>
          <AdminUserSearchFields />
        </ContainerSpacing>

        <ContainerSpacing maxWidth={false}>
          <TableContainer>
            {isFetching && <LoadingContainer />}

            <Table>
              <TableHead>
                <TableRow>{pagination}</TableRow>

                <TableRow>
                  <TableCellIndex />

                  <TableCellTextCenter>
                    {setMessage(Messages.user.avatar)}
                  </TableCellTextCenter>

                  <TableCellTextCenter>
                    {setMessage(Messages.user.email)}
                  </TableCellTextCenter>

                  <TableCellTextCenter>
                    {setMessage(Messages.user.phoneNumber)}
                  </TableCellTextCenter>

                  <TableCellTextCenter>
                    {setMessage(Messages.user.fullname)}
                  </TableCellTextCenter>

                  <TableCellTextCenter sx={{ width: 170, maxWidth: 170 }}>
                    <StackSpaceBetween>
                      <Box>{setMessage(Messages.user.role)}</Box>
                      <Box>
                        <TablePopoverFilter
                          options={[
                            {
                              text: Formatter.formatRole(ERole.Member),
                              value: ERole.Member,
                            },
                            {
                              text: Formatter.formatRole(ERole.Teacher),
                              value: ERole.Teacher,
                            },
                            {
                              text: Formatter.formatRole(ERole.Admin),
                              value: ERole.Admin,
                            },
                          ]}
                          urlQueryName="role"
                        />
                      </Box>
                    </StackSpaceBetween>
                  </TableCellTextCenter>

                  <TableCellTextCenter>
                    <StackSpaceBetween>
                      <Box>Đăng ký giảng</Box>
                      <Box>
                        <TablePopoverFilter
                          options={[
                            {
                              text: Formatter.formatRegisterTeacher(
                                ERegisterTeacher.notRegistered,
                              ),
                              value: ERegisterTeacher.notRegistered,
                            },
                            {
                              text: Formatter.formatRegisterTeacher(
                                ERegisterTeacher.pending,
                              ),
                              value: ERegisterTeacher.pending,
                            },
                            {
                              text: Formatter.formatRegisterTeacher(
                                ERegisterTeacher.accept,
                              ),
                              value: ERegisterTeacher.accept,
                            },
                            {
                              text: Formatter.formatRegisterTeacher(
                                ERegisterTeacher.reject,
                              ),
                              value: ERegisterTeacher.reject,
                            },
                          ]}
                          urlQueryName="registerTeacher"
                        />
                      </Box>
                    </StackSpaceBetween>
                  </TableCellTextCenter>
                  <TableHeaderCellRecordStatus />
                </TableRow>
              </TableHead>

              <TableBody>
                {users.map((user, index) => {
                  const rowId = pageSize * (currentPage - 1) + index + 1;

                  const userId = user.id;

                  return (
                    <Fragment key={index}>
                      {userId && (
                        <TableRow>
                          <TableCell>
                            <Typography>{rowId}</Typography>
                          </TableCell>

                          <TableCellTextCenter>
                            <Avatar
                              src={
                                user.avatarURL &&
                                requestService.getURL(user.avatarURL)
                              }
                              alt="avatar"
                            >
                              {user.fullname && user.fullname[0]}
                            </Avatar>
                          </TableCellTextCenter>

                          <TableCell>{user.email || ''}</TableCell>

                          <TableCell>{user.phoneNumber || ''}</TableCell>

                          <TableCell>{user.fullname || ''}</TableCell>

                          <AdminUserRoleTableCell
                            user={user}
                            refetch={refetchUsers}
                          />

                          <AdminUserRegisterTeacherTableCell
                            user={user}
                            refetch={refetchUsers}
                          />

                          <TableCellRecordStatus
                            isActive={user.isActive}
                            id={userId}
                            onChange={adminUsersService.update}
                            refetch={refetchUsers}
                          />
                        </TableRow>
                      )}
                    </Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </ContainerSpacing>
      </AdminPage>
    </>
  );
};

Page.layout = AdminLayout;

export default Page;
