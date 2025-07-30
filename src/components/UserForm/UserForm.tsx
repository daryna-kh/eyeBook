import { Form as AntdForm, Button, Input } from 'antd';
import { useFormik } from 'formik';
import { useEffect, useMemo } from 'react';
import { getFormById } from '../../mock/forms/getFormById';
import { UserType } from '../../mock/forms/type';
import { useDispatch } from '../../store';
import { setActiveScreen } from '../../store/screens';
import { PhoneInput } from '../PhoneInput/PhoneInput';
import { useStepContent } from '../StepContent/useStepContent';
import styles from './UserForm.module.scss';
import { useUserForm } from './usePersonalDetailsForm';
import { SelectedOptions } from '../SelectedOptions/SelectedOptions';

export const UserForm = ({ id }: { id: string }) => {
  const form = getFormById(id);
  const dispatch = useDispatch();
  const { updateHistory } = useStepContent();

  const {
    isInsuranceIncluded,
    showDependedFields,
    insuranceData,
    validationSchema,
    isOtherDoctorVisit,
  } = useUserForm();

  const fields = useMemo(() => (form?.fields ?? []) as UserType[], [form]);

  const initialValues = useMemo(
    () =>
      fields.reduce(
        (acc, field) => {
          acc[field.id] = field.default;
          return acc;
        },
        {} as { [key: string]: string },
      ),
    [fields],
  );

  const formik = useFormik({
    initialValues,
    validationSchema,
    validateOnMount: true,
    onSubmit: () => {},
  });

  useEffect(() => {
    isInsuranceIncluded();
  }, []);

  useEffect(() => {
    if (insuranceData.optionCard) {
      formik.setFieldValue('insurance', insuranceData.optionCard);
    }
  }, [insuranceData]);

  const handleSubmit = (nextStepId: string) => {
    formik.setTouched(
      Object.keys(formik.values).reduce(
        (acc, key) => {
          acc[key] = true;
          return acc;
        },
        {} as { [key: string]: boolean },
      ),
    );

    if (formik.isValid) {
      formik.submitForm();
      updateHistory('', '', formik.values);
      dispatch(setActiveScreen(nextStepId));
    }
  };

  const getFieldClasses = (field: UserType) => {
    const base = [`field_${field.id}`, styles.field];
    if (field.type === 'radio') base.push('book-App__form-radio');
    if (field.required || isOtherDoctorVisit) base.push('required_field');
    if (field.id === 'insurance') base.push('hidden');
    return base.join(' ');
  };

  const renderField = (field: UserType, index: number) => {
    const error = formik.touched[field.id] && formik.errors[field.id];
    const commonProps = {
      id: field.id,
      name: field.id,
      value: formik.values[field.id],
      onChange: formik.handleChange,
      onBlur: formik.handleBlur,
    };

    return (
      <AntdForm.Item
        key={`form-${field.id}-${index}`}
        label={field.type === 'radio' ? field.name : ''}
        name={field.type !== 'radio' ? field.name : undefined}
        style={field.dependent ? { display: showDependedFields ? 'block' : 'none' } : undefined}
        className={getFieldClasses(field)}
        validateStatus={error ? 'error' : ''}
        help={error || ''}
      >
        {field.type === 'input' && field.id === 'phone' && (
          <div className='input-group'>
            <PhoneInput
              value={formik.values[field.id]}
              onChange={value => {
                formik.setFieldValue(field.id, value);
                formik.setFieldTouched(field.id, true);
              }}
              onBlur={value => formik.setFieldTouched(field.id, value.length === 0)}
              className_={`${formik.values[field.id].length > 0 && styles.not_empty}`}
            />
            <label htmlFor={field.id}>{field.name}</label>
          </div>
        )}

        {field.type === 'input' && field.id !== 'phone' && (
          <div className='input-group'>
            <Input
              {...commonProps}
              placeholder=''
              className={`${styles.input} ${
                formik.values[field.id].length > 0 ? styles.not_empty : ''
              }`}
            />
            <label htmlFor={field.id}>{field.name}</label>
          </div>
        )}

        {field.type === 'textarea' && (
          <Input.TextArea
            {...commonProps}
            autoSize={{ minRows: 3, maxRows: 6 }}
            placeholder={`${field.name}${isOtherDoctorVisit ? '*' : ''}`}
            className={formik.values[field.id].length > 0 ? 'no-empty' : ''}
          />
        )}
      </AntdForm.Item>
    );
  };

  if (!form) return null;

  return (
    <AntdForm
      onFinish={formik.handleSubmit}
      layout='vertical'
      className={`${styles.form} UserForm ${styles.content} width-660`}
    >
      <div className={styles.inner}>{fields.map((field, i) => renderField(field, i))}</div>

      <div className={styles.prevStepsWrap}>
        <SelectedOptions />
        <Button
          type='primary'
          className={styles.submit}
          onClick={() => handleSubmit(form.navigateTo)}
        >
          Book appointment
        </Button>
      </div>
    </AntdForm>
  );
};
