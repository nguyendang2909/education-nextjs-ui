import { Box, Stack } from '@mui/material';
import { FC, Fragment, useState } from 'react';
import { CourseQuestionData } from '../../../types/fetch-data.type';
import { BoxSpacing, BoxSpacingBottom } from '../../../components/Box';
import { UserCommentBox } from '../../../components/User/UserAvatarBox';
import { AnswerBox } from './AnswerBox';
import { TypographyColorSecond } from '../../../components/Text/Typography';

type CourseQuestionProps = {
  data: CourseQuestionData;
  refetch: () => void;
  currentUserId?: number;
  onDeleteAnswer?: (answerId: number) => void;
  onDeleteQuestion?: (courseQuestionId: number) => void;
};

export const CourseQuestion: FC<CourseQuestionProps> = ({
  data: courseQuestion = {},
  refetch,
  currentUserId,
  onDeleteAnswer,
  onDeleteQuestion,
}) => {
  const { id: courseQuestionId, user, courseAnswer } = courseQuestion;

  const [isAnswer, setAnswer] = useState<boolean>(false);

  const [numberOfAnswersDisplayed, setNumberOfAnswersDisplayed] =
    useState<number>(1);

  const replyAnswer = () => {
    setAnswer(prev => !prev);
  };

  const handleDisplayMoreAnswer = () => {
    setNumberOfAnswersDisplayed(prev => prev + 5);
  };

  return (
    <>
      {courseQuestionId && (
        <Box
          sx={{
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <UserCommentBox
            sx={{ margin: '16px 0px' }}
            fullname={user?.displayName}
            avatarURL={user?.displayAvatarURL}
            content={courseQuestion.content}
            createdAt={courseQuestion.createdAt}
            reply={replyAnswer}
            allowDelete={currentUserId === user?.id}
            onDelete={() => {
              onDeleteQuestion && onDeleteQuestion(courseQuestionId);
            }}
          ></UserCommentBox>

          {!!courseAnswer && (
            <Box
              sx={{
                marginLeft: '56px',
                paddingLeft: '8px',
                borderLeft: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Stack spacing={3}>
                <Box>
                  {courseAnswer?.map((answer, index) => {
                    const {
                      id: courseAnswerId,
                      content: courseAnswerContent,
                      user: courseAnswerUser,
                    } = answer;

                    return (
                      <Fragment key={index}>
                        {courseAnswerId && (
                          <UserCommentBox
                            sx={{ marginBottom: '16px' }}
                            fullname={courseAnswerUser?.displayName}
                            createdAt={courseAnswerUser?.createdAt}
                            avatarURL={courseAnswerUser?.displayAvatarURL}
                            content={courseAnswerContent}
                            display={index < numberOfAnswersDisplayed}
                            allowDelete={currentUserId === courseAnswerUser?.id}
                            onDelete={() => {
                              onDeleteAnswer && onDeleteAnswer(courseAnswerId);
                            }}
                          ></UserCommentBox>
                        )}
                      </Fragment>
                    );
                  })}
                  {courseAnswer.length > numberOfAnswersDisplayed && (
                    <BoxSpacingBottom>
                      <TypographyColorSecond
                        variant="body2"
                        sx={{ fontWeight: 700, cursor: 'pointer' }}
                        onClick={handleDisplayMoreAnswer}
                      >
                        Hiển thị thêm câu trả lời...
                      </TypographyColorSecond>
                    </BoxSpacingBottom>
                  )}
                </Box>
              </Stack>
            </Box>
          )}

          {isAnswer && (
            <BoxSpacing>
              <AnswerBox
                courseQuestionId={courseQuestionId}
                refetch={refetch}
              ></AnswerBox>
            </BoxSpacing>
          )}
        </Box>
      )}
    </>
  );
};
