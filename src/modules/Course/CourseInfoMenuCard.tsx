import { Card, Grid, ListItemButton, ListItemText } from '@mui/material';
import { NextLink } from '../../components/Link';
import { TypographyBold } from '../../components/Text/Typography';
import { Messages, setMessage } from '../../lib/messages';

export const CourseInfoMenuCard = () => {
  return (
    <>
      <Card>
        <Grid container>
          <NextLink href="#course-about">
            <Grid item>
              <ListItemButton>
                <ListItemText>
                  <TypographyBold>
                    {setMessage(Messages.common.about)}
                  </TypographyBold>
                </ListItemText>
              </ListItemButton>
            </Grid>
          </NextLink>
          <NextLink href="#course-content">
            <Grid item>
              <ListItemButton>
                <ListItemText>
                  <TypographyBold>
                    {setMessage(Messages.course.content)}
                  </TypographyBold>
                </ListItemText>
              </ListItemButton>
            </Grid>
          </NextLink>
          <NextLink href="#course-teacher">
            <Grid item>
              <ListItemButton>
                <ListItemText>
                  <TypographyBold>
                    {setMessage(
                      Messages.common.information,
                      Messages.course.teacher,
                    )}
                  </TypographyBold>
                </ListItemText>
              </ListItemButton>
            </Grid>
          </NextLink>
          <NextLink href="#course-review">
            <Grid item>
              <ListItemButton>
                <ListItemText>
                  <TypographyBold>
                    {setMessage(Messages.action.review)}
                  </TypographyBold>
                </ListItemText>
              </ListItemButton>
            </Grid>
          </NextLink>
        </Grid>
      </Card>
    </>
  );
};
