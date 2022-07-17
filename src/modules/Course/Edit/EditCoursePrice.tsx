import { faDollar, faNewspaper } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Stack,
  SxProps,
  TextField,
  Theme,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { coursesService } from '../../../lib/courses.service';
import { Formatter } from '../../../lib/formatter';
import { Messages, setMessage } from '../../../lib/messages';
import { teacherCoursesService } from '../../../lib/teacher-courses.service';
import { coursePublishStatus, ECoursePublish } from '../../../types/enums';
import { UpdateCourseParams } from '../../../types/form-params.type';
import {
  CancelButton,
  EditButton,
  UpdateButton,
} from '../../../components/Button/ActionButton';
import { EditDialog } from '../../../components/Dialog/EditDialog';

type CoursePriceEditCardProps = {
  id: number;
  price?: number;
  publish?: ECoursePublish;
  promotionPrice?: number;
  onFinish?: () => void;
  sx?: SxProps<Theme>;
};

export const CoursePriceEditCard: React.FC<
  CoursePriceEditCardProps
> = props => {
  const { price, promotionPrice, publish, onFinish, id, sx = {} } = props;

  const [isEdit, setEdit] = useState(false);

  const handleSetEdit = () => {
    setEdit(!isEdit);
  };

  return (
    <Card sx={{ ...sx }}>
      <CardHeader
        title={setMessage(Messages.course.price)}
        action={<EditButton onClick={handleSetEdit} />}
      ></CardHeader>
      <CardContent>
        {!isEdit ? (
          <List>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faDollar} />
              </ListItemIcon>
              <ListItemText>
                <Typography component="span">
                  {setMessage(Messages.course.price)}:{' '}
                </Typography>
                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                  {Formatter.formatMoney(price)}
                </Typography>
              </ListItemText>
            </ListItem>

            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon="dollar" />
              </ListItemIcon>
              <ListItemText>
                <Typography component="span">
                  {setMessage(Messages.course.promotionPrice)}:{' '}
                </Typography>
                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                  {Formatter.formatMoney(promotionPrice)}
                </Typography>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <FontAwesomeIcon icon={faNewspaper} />
              </ListItemIcon>
              <ListItemText>
                <Typography component="span">
                  {setMessage(
                    publish
                      ? coursePublishStatus[publish]
                      : coursePublishStatus.notPublished,
                  )}
                </Typography>
                {publish && (
                  <CoursePublishDialog
                    publish={publish}
                    courseId={id}
                    onFinish={onFinish}
                  />
                )}
              </ListItemText>
            </ListItem>
          </List>
        ) : (
          <CoursePriceEditForm
            id={id}
            price={price}
            promotionPrice={promotionPrice}
            onClose={handleSetEdit}
            onFinish={onFinish}
          ></CoursePriceEditForm>
        )}
      </CardContent>
    </Card>
  );
};

type CoursePriceEditFormProps = {
  id: number;
  price?: number;
  promotionPrice?: number;
  onFinish?: () => void;
  onClose: () => void;
};

const CoursePriceEditForm: React.FC<CoursePriceEditFormProps> = props => {
  const { price, promotionPrice, onFinish, onClose, id } = props;

  const promotion =
    promotionPrice === undefined || promotionPrice === null ? false : true;

  const { handleSubmit, isSubmitting, getFieldProps, touched, errors, values } =
    useFormik<UpdateCourseParams>({
      enableReinitialize: true,
      initialValues: {
        price: price,
        promotion: promotion,
        promotionPrice: promotionPrice,
      },
      onSubmit: async values => {
        try {
          const {
            publish: publishParams,
            promotion: isPromotion,
            promotionPrice,
            ...updateDto
          } = values;

          const updateOptions: UpdateCourseParams = {
            ...updateDto,
            promotionPrice:
              isPromotion &&
              promotionPrice !== undefined &&
              promotionPrice !== null
                ? promotionPrice
                : undefined,
          };

          await teacherCoursesService.update(id, updateOptions);

          onClose();

          onFinish && onFinish();
        } catch (err) {
          if (err instanceof Error) {
            toast.error(err.message);
          }
        }
      },
    });

  return (
    <form noValidate onSubmit={handleSubmit}>
      <Stack spacing={3}>
        <TextField
          type="number"
          fullWidth
          label={setMessage(Messages.course.price)}
          id="price"
          {...getFieldProps('price')}
          error={Boolean(touched.price && errors.price)}
          helperText={touched.price && errors.price}
        />
        <FormControlLabel
          label={setMessage(Messages.course.promotion)}
          control={
            <Checkbox
              id="promotion"
              defaultChecked={promotion}
              {...getFieldProps('promotion')}
            />
          }
        />
        <TextField
          disabled={!values.promotion}
          type="number"
          fullWidth
          label={setMessage(Messages.course.promotionPrice)}
          id="promotionPrice"
          {...getFieldProps('promotionPrice')}
          error={Boolean(touched.promotionPrice && errors.promotionPrice)}
          helperText={touched.promotionPrice && errors.promotionPrice}
        />

        <CardActions sx={{ justifyContent: 'center' }}>
          <CancelButton onClick={onClose} />
          <UpdateButton loading={isSubmitting} />
        </CardActions>
      </Stack>
    </form>
  );
};

type CoursePublishControlProps = {
  publish: ECoursePublish;
  courseId: number;
  onFinish?: () => void;
};

const CoursePublishDialog: React.FC<CoursePublishControlProps> = ({
  publish,
  courseId,
  onFinish,
}) => {
  const [openDialog, setDialog] = useState<boolean>(false);

  const {
    handleSubmit,
    resetForm,
    isSubmitting,
    touched,
    errors,
    getFieldProps,
  } = useFormik<UpdateCourseParams>({
    enableReinitialize: true,
    initialValues: {
      publish: publish,
    },
    onSubmit: async values => {
      try {
        await teacherCoursesService.update(courseId, values);

        onFinish && onFinish();

        handleCloseDialog();
      } catch (err) {
        if (err instanceof Error) {
          toast.error(err.message);
        }
      }
    },
  });

  const handleOpenDialog = () => {
    setDialog(true);
  };

  const handleCloseDialog = () => {
    setDialog(false);
  };

  return (
    <>
      <EditButton onClick={handleOpenDialog} />

      <EditDialog
        name="thông tin đăng khoá học"
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        onReset={resetForm}
        isSubmitting={isSubmitting}
      >
        <TextField
          select
          fullWidth
          label={setMessage(Messages.course.publishStatus)}
          id="publish"
          {...getFieldProps('publish')}
          error={Boolean(touched.publish && errors.publish)}
          helperText={touched.publish && errors.publish}
        >
          <MenuItem value={ECoursePublish.NotPublished}>Không đăng</MenuItem>

          <MenuItem value={ECoursePublish.Pending}>Yêu cầu đăng</MenuItem>
        </TextField>
      </EditDialog>
    </>
  );
};
