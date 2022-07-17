import { Avatar, Box, CardActionArea, CardContent } from '@mui/material';
import { FC, Fragment } from 'react';
import Slider from 'react-slick';
import { BoxSpacingTop } from '../../components/Box';
import { CardZ1 } from '../../components/Card';
import { NextLink } from '../../components/Link';
import {
  NextArrowSlider,
  PrevArrowSlider,
} from '../../components/Slider/arrow';
import { TypographyOneLine } from '../../components/Text/Typography';
import { setMessage } from '../../lib/messages';
import { requestService } from '../../lib/request';
import { specialCharacters } from '../../lib/special-characters';
import { teachersService } from '../../lib/teachers.service';
import { UserData } from '../../types/fetch-data.type';

type TeachersSliderProps = {
  teachers: UserData[];
};

export const TeachersSlider: FC<TeachersSliderProps> = ({ teachers }) => {
  return (
    <Slider
      dots={false}
      infinite={false}
      speed={500}
      slidesToShow={4.3}
      slidesToScroll={1}
      initialSlide={0}
      arrows={true}
      nextArrow={<NextArrowSlider />}
      prevArrow={<PrevArrowSlider />}
      responsive={[
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3.3,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2.3,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1.3,
          },
        },
      ]}
    >
      {teachers.map((teacher, index) => {
        return (
          <Fragment key={index}>
            {!!teacher.id && (
              <Box
                sx={{
                  padding: '16px 16px 36px 0px',
                  margin: '0 0 0 1px',
                }}
              >
                <CardZ1>
                  <CardActionArea>
                    <NextLink
                      href={teachersService.getPageLinkFromIdAndName(
                        teacher.id,
                        teacher.displayName,
                      )}
                      passHref
                    >
                      <CardContent>
                        <Avatar
                          sx={{
                            width: '152px',
                            height: '152px',
                            margin: '0 auto',
                            fontSize: '48px',
                          }}
                          src={
                            teacher.displayAvatarURL
                              ? requestService.getURL(teacher.displayAvatarURL)
                              : undefined
                          }
                        >
                          {!!teacher.displayName
                            ? teacher.displayName[0]
                            : undefined}
                        </Avatar>

                        <BoxSpacingTop>
                          <TypographyOneLine
                            sx={{
                              color: '#273167',
                              textAlign: 'center',
                              fontWeight: 700,
                            }}
                          >
                            {setMessage(teacher.displayName) ||
                              specialCharacters.space}
                          </TypographyOneLine>

                          <TypographyOneLine
                            sx={{
                              textAlign: 'center',
                              color: 'text.secondary',
                            }}
                          >
                            {setMessage(teacher.title) ||
                              specialCharacters.space}
                          </TypographyOneLine>
                        </BoxSpacingTop>
                      </CardContent>
                    </NextLink>
                  </CardActionArea>
                </CardZ1>
              </Box>
            )}
          </Fragment>
        );
      })}
    </Slider>
  );
};
