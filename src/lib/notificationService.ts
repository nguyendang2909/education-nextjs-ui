import { toast } from 'react-toastify';

class NotificationService {
  handleError(err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    }
  }
}

export const notificationService = new NotificationService();
