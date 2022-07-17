import { Box, Card, CardContent, Grid } from '@mui/material';
import { GridStrech } from '../../components/Grid';
import { TypographyOneLine } from '../../components/Text/Typography';
import { Messages, setMessage } from '../../lib/messages';

export const AppStatistic = () => {
  return (
    <>
      <Box
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
          minHeight: '400px',
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <GridStrech container spacing={2}>
            <Grid item xs={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <TypographyOneLine
                    sx={{
                      fontSize: 32,
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    500.000+
                  </TypographyOneLine>
                  <TypographyOneLine
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    {setMessage(Messages.student.name)}
                  </TypographyOneLine>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <TypographyOneLine
                    sx={{
                      fontSize: 32,
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    1000+
                  </TypographyOneLine>
                  <TypographyOneLine
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    {setMessage(Messages.teacher.name)}
                  </TypographyOneLine>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <TypographyOneLine
                    sx={{
                      fontSize: 32,
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    2000+
                  </TypographyOneLine>
                  <TypographyOneLine
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    {setMessage(Messages.course.name)}
                  </TypographyOneLine>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <TypographyOneLine
                    sx={{
                      fontSize: 32,
                      textAlign: 'center',
                      fontWeight: 600,
                    }}
                  >
                    80.000+
                  </TypographyOneLine>
                  <TypographyOneLine sx={{ textAlign: 'center' }}>
                    {setMessage('chi nhánh')}
                  </TypographyOneLine>
                </CardContent>
              </Card>
            </Grid>
          </GridStrech>
        </Box>
      </Box>
    </>
  );
};
