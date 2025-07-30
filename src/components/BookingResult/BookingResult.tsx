import { Card } from 'antd';
import { formatDateForAppoirtmentResultComponent } from '../../helpers/formatDateForAppoirtmentResultComponent';
import { AddToCalendar } from '../AddToCalendar/AddToCalendar';
import { CustomSpin } from '../CustomSpin/CustomSpin';
import styles from './BookingResult.module.scss';
import { useBooking } from './useBooking';

export const BookingResult = () => {
  const { bookingData, isLoading, handleEdit } = useBooking();

  const title = bookingData ? 'Your Appointment has been Scheduled!' : 'Something Went Wrong...';

  const renderContent = () =>
    bookingData ? (
      <Card className={styles.card}>
        <p className={styles.text}>
          You’re all set! Your appointment number is <b>#{bookingData[0].id}</b>.
        </p>
        <p className={styles.text}>You are scheduled for</p>
        <span className={styles.date}>
          {formatDateForAppoirtmentResultComponent(bookingData[0].start_date_time)}
          <AddToCalendar bookingData={bookingData} />
        </span>
      </Card>
    ) : (
      <Card className={styles.card}>
        <p className={`${styles.text} ${styles.error}`}>
          Sorry, something went wrong! We couldn’t schedule your appointment.
          <br />
          Please try again later or reach out to our support team for help.
        </p>
      </Card>
    );

  return isLoading ? (
    <CustomSpin />
  ) : (
    <div className='width-660'>
      <div className={styles.content_Header}>
        <h1>{title}</h1>
      </div>
      {renderContent()}

      <a className={styles.button} href='/' target='_top'>
        Return to Home
      </a>

      {!bookingData && (
        <>
          <a className={styles.button} href='tel:0001234567'>
            Call us (000) 123-4567
          </a>
          <button className={styles.button} onClick={handleEdit}>
            Edit Booking
          </button>
        </>
      )}
    </div>
  );
};
