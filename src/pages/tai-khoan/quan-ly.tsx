import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Link,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BoxSpacing } from '../../components/Box';
import { ContainerSpacing } from '../../components/Container';
import { NextLink } from '../../components/Link';
import { TableCellTextRight } from '../../components/Table/TableCell';
import {
  TypographyCenter,
  TypographyFontLargeBold,
  TypographyUppercaseColorSecondary,
} from '../../components/Text/Typography';
import { APP_URL } from '../../config';
import { PrivateMainLayout } from '../../Layout/PrivateMainLayout';
import { Formatter } from '../../lib/formatter';
import { Messages, messagesService, setMessage } from '../../lib/messages';
import { requestService } from '../../lib/request';
import { useAppSelector } from '../../store/hooks';
import { fetchCurrentUserThunk } from '../../store/reducers/user.reducer';
import { NextPageWithLayout } from '../../types/components.type';

const Page: NextPageWithLayout = () => {
  const dispatch = useDispatch();

  const user = useAppSelector(state => state.user?.info);

  useEffect(() => {
    dispatch(fetchCurrentUserThunk());
  }, [dispatch]);

  if (!user) {
    return <></>;
  }

  const {
    fullname,
    email,
    phoneNumber,
    avatarURL,
    birthday,
    gender,
    address,
    description,
  } = user;
  return (
    <>
      <Head>
        <title>
          {messagesService.setPageTitle(
            `${Messages.action.manage} ${Messages.user.account}`,
          )}
        </title>
      </Head>

      <ContainerSpacing>
        <BoxSpacing>
          <Avatar
            alt={fullname}
            src={avatarURL && requestService.getURL(avatarURL)}
            sx={{
              margin: 'auto',
              height: '96px',
              width: '96px',
              fontSize: '56px',
            }}
          >
            {fullname && fullname[0]}
          </Avatar>
        </BoxSpacing>
        <BoxSpacing>
          <TypographyCenter variant="h1">Xin chào, {fullname}</TypographyCenter>
        </BoxSpacing>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="Thông tin cơ bản"></CardHeader>
              <CardContent>
                <Table sx={{ cursor: 'pointer' }}>
                  <TableBody>
                    <NextLink
                      href={{
                        pathname: APP_URL.user.basicInfo,
                        query: {
                          avatar: true,
                        },
                      }}
                      passHref
                    >
                      <TableRow hover component={Link}>
                        <TableCell
                          sx={{
                            minWidth: '50px',
                            maxWidth: '10%',
                            width: '200px',
                          }}
                        >
                          <TypographyUppercaseColorSecondary>
                            Ảnh đại diện
                          </TypographyUppercaseColorSecondary>
                        </TableCell>
                        <TableCell></TableCell>
                        <TableCellTextRight sx={{ width: '90px' }}>
                          <FontAwesomeIcon icon={faAngleRight} size="lg" />
                        </TableCellTextRight>
                      </TableRow>
                    </NextLink>

                    <NextLink
                      href={{
                        pathname: APP_URL.user.basicInfo,
                        query: {
                          fullname: true,
                        },
                      }}
                      passHref
                    >
                      <TableRow hover component={Link}>
                        <TableCell>
                          <TypographyUppercaseColorSecondary>
                            {Messages.user.fullname}
                          </TypographyUppercaseColorSecondary>
                        </TableCell>
                        <TableCell>
                          <TypographyFontLargeBold>
                            {fullname}
                          </TypographyFontLargeBold>
                        </TableCell>
                        <TableCellTextRight sx={{ width: '90px' }}>
                          <FontAwesomeIcon icon={faAngleRight} size="lg" />
                        </TableCellTextRight>
                      </TableRow>
                    </NextLink>
                    <NextLink
                      href={{
                        pathname: APP_URL.user.basicInfo,
                        query: {
                          birthday: true,
                        },
                      }}
                      passHref
                    >
                      <TableRow hover component={Link}>
                        <TableCell>
                          <TypographyUppercaseColorSecondary>
                            {Messages.user.birthday}
                          </TypographyUppercaseColorSecondary>
                        </TableCell>
                        <TableCell>
                          <TypographyFontLargeBold>
                            {birthday && Formatter.formatBirthday(birthday)}
                          </TypographyFontLargeBold>
                        </TableCell>
                        <TableCellTextRight sx={{ width: '90px' }}>
                          <FontAwesomeIcon icon={faAngleRight} size="lg" />
                        </TableCellTextRight>
                      </TableRow>
                    </NextLink>
                    <NextLink
                      href={{
                        pathname: APP_URL.user.basicInfo,
                        query: {
                          gender: true,
                        },
                      }}
                      passHref
                    >
                      <TableRow hover component={Link}>
                        <TableCell>
                          <TypographyUppercaseColorSecondary>
                            {Messages.user.gender}
                          </TypographyUppercaseColorSecondary>
                        </TableCell>
                        <TableCell>
                          <TypographyFontLargeBold>
                            {gender &&
                              setMessage(Formatter.formatGender(gender))}
                          </TypographyFontLargeBold>
                        </TableCell>
                        <TableCellTextRight sx={{ width: '90px' }}>
                          <FontAwesomeIcon icon={faAngleRight} size="lg" />
                        </TableCellTextRight>
                      </TableRow>
                    </NextLink>
                    <NextLink
                      href={{
                        pathname: APP_URL.user.basicInfo,
                        query: {
                          address: true,
                        },
                      }}
                      passHref
                    >
                      <TableRow hover component={Link}>
                        <TableCell>
                          <TypographyUppercaseColorSecondary>
                            {Messages.user.address}
                          </TypographyUppercaseColorSecondary>
                        </TableCell>
                        <TableCell>
                          <TypographyFontLargeBold>
                            {setMessage(address)}
                          </TypographyFontLargeBold>
                        </TableCell>
                        <TableCellTextRight sx={{ width: '90px' }}>
                          <FontAwesomeIcon icon={faAngleRight} size="lg" />
                        </TableCellTextRight>
                      </TableRow>
                    </NextLink>
                    <NextLink
                      href={{
                        pathname: APP_URL.user.basicInfo,
                        query: {
                          password: true,
                        },
                      }}
                      passHref
                    >
                      <TableRow hover component={Link}>
                        <TableCell>
                          <TypographyUppercaseColorSecondary>
                            {Messages.user.password}
                          </TypographyUppercaseColorSecondary>
                        </TableCell>
                        <TableCell>
                          <TypographyFontLargeBold>
                            ********** (Đổi mật khẩu)
                          </TypographyFontLargeBold>
                        </TableCell>
                        <TableCellTextRight sx={{ width: '90px' }}>
                          <FontAwesomeIcon icon={faAngleRight} size="lg" />
                        </TableCellTextRight>
                      </TableRow>
                    </NextLink>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="Thông tin liên hệ"></CardHeader>
              <CardContent>
                <Table>
                  <TableBody>
                    <TableRow hover component={Link}>
                      <TableCell
                        sx={{
                          minWidth: '50px',
                          maxWidth: '10%',
                          width: '200px',
                        }}
                      >
                        <TypographyUppercaseColorSecondary>
                          {Messages.user.email}
                        </TypographyUppercaseColorSecondary>
                      </TableCell>
                      <TableCell>
                        <TypographyFontLargeBold>
                          {email}
                        </TypographyFontLargeBold>
                      </TableCell>
                      <TableCellTextRight sx={{ width: '90px' }}>
                        <FontAwesomeIcon icon={faAngleRight} size="lg" />
                      </TableCellTextRight>
                    </TableRow>
                    <TableRow hover component={Link}>
                      <TableCell>
                        <TypographyUppercaseColorSecondary>
                          {Messages.user.phoneNumber}
                        </TypographyUppercaseColorSecondary>
                      </TableCell>
                      <TableCell>
                        <TypographyFontLargeBold>
                          {phoneNumber || ''}
                        </TypographyFontLargeBold>
                      </TableCell>
                      <TableCellTextRight sx={{ width: '90px' }}>
                        <FontAwesomeIcon icon={faAngleRight} size="lg" />
                      </TableCellTextRight>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card variant="outlined">
              <CardHeader title="Thông tin cơ bản"></CardHeader>
              <CardContent>
                <Table sx={{ cursor: 'pointer' }}>
                  <TableBody>
                    <NextLink
                      href={{
                        pathname: APP_URL.user.basicInfo,
                        query: {
                          title: true,
                        },
                      }}
                      passHref
                    >
                      <TableRow hover component={Link}>
                        <TableCell
                          sx={{
                            minWidth: '50px',
                            maxWidth: '10%',
                            width: '200px',
                          }}
                        >
                          <TypographyUppercaseColorSecondary>
                            {Messages.user.title}
                          </TypographyUppercaseColorSecondary>
                        </TableCell>
                        <TableCell>
                          <TypographyFontLargeBold>
                            {setMessage(user.title)}
                          </TypographyFontLargeBold>
                        </TableCell>
                        <TableCellTextRight sx={{ width: '90px' }}>
                          <FontAwesomeIcon icon={faAngleRight} size="lg" />
                        </TableCellTextRight>
                      </TableRow>
                    </NextLink>
                    <NextLink
                      href={{
                        pathname: APP_URL.user.basicInfo,
                        query: {
                          experience: true,
                        },
                      }}
                      passHref
                    >
                      <TableRow hover component={Link}>
                        <TableCell>
                          <TypographyUppercaseColorSecondary>
                            {Messages.user.experience}
                          </TypographyUppercaseColorSecondary>
                        </TableCell>
                        <TableCell>
                          <TypographyFontLargeBold>
                            {setMessage(user.experience)}
                          </TypographyFontLargeBold>
                        </TableCell>
                        <TableCellTextRight sx={{ width: '90px' }}>
                          <FontAwesomeIcon icon={faAngleRight} size="lg" />
                        </TableCellTextRight>
                      </TableRow>
                    </NextLink>
                    <NextLink
                      href={{
                        pathname: APP_URL.user.basicInfo,
                        query: {
                          description: true,
                        },
                      }}
                      passHref
                    >
                      <TableRow hover component={Link}>
                        <TableCell>
                          <TypographyUppercaseColorSecondary>
                            {Messages.user.description}
                          </TypographyUppercaseColorSecondary>
                        </TableCell>
                        <TableCell>
                          <Typography sx={{ whiteSpace: 'pre-line' }}>
                            {setMessage(description)}
                          </Typography>
                        </TableCell>
                        <TableCellTextRight sx={{ width: '90px' }}>
                          <FontAwesomeIcon icon={faAngleRight} size="lg" />
                        </TableCellTextRight>
                      </TableRow>
                    </NextLink>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ContainerSpacing>
    </>
  );
};

Page.layout = PrivateMainLayout;

export default Page;
