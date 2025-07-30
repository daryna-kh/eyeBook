import { Card } from 'antd';
import { getCard } from '../../mock/cards/getCard';
import { useUserForm } from '../UserForm/usePersonalDetailsForm';
import styles from './SelectedOptions.module.scss';

export const SelectedOptions = () => {
  const { formattChoosenOptions, findOptionName } = useUserForm();
  const formattedChoosenOptions = formattChoosenOptions();

  const insuranceVal = getCard(formattedChoosenOptions.insuranceOptions)
    ? getCard(formattedChoosenOptions.insuranceOptions)?.title
    : findOptionName(formattedChoosenOptions.insuranceOptions)?.name;

  const serviceParam = getCard(formattedChoosenOptions.serviceType);

  return (
    <Card className={styles.summaryCard}>
      <div>
        <table className={styles.infoTable}>
          <tr>
            <td className={styles.label}>Service:</td>
            <td className={styles.value}>
              {serviceParam?.hasSubOption
                ? getCard(formattedChoosenOptions[`${serviceParam.navigateTo}`])?.title
                : serviceParam?.title}
            </td>
          </tr>

          <tr>
            <td className={styles.label}>Date:</td>
            <td className={styles.value} style={{ textTransform: 'uppercase' }}>
              {formattedChoosenOptions.selectVisitTime}
            </td>
          </tr>

          <tr>
            <td className={styles.label}>Provider:</td>
            <td className={styles.value}>{getCard(formattedChoosenOptions.selectDoctor)?.title}</td>
          </tr>

          {insuranceVal && (
            <tr>
              <td className={styles.label}>Insurance:</td>
              <td className={styles.value}>{insuranceVal}</td>
            </tr>
          )}

          <tr>
            <td className={styles.label}>Location:</td>
            <td className={styles.value}>{formattedChoosenOptions.location}</td>
          </tr>
        </table>
      </div>
    </Card>
  );
};
