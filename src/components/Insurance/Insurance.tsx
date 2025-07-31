import { Button, Card, Collapse, Select } from 'antd';
import { getFormById } from '../../mock/forms/getFormById';
import { useEffect, useMemo, useState } from 'react';
import { DefaultOptionType } from 'antd/es/select';
import { InsuranceType } from '../../mock/forms/type';
import { useStepContent } from '../StepContent/useStepContent';
import { setActiveScreen, setPrice } from '../../store/screens';
import { useDispatch } from '../../store';
import { baseUrl } from '../../share/constants';
import { Dropdown } from '../../share/icons/Dropdown';
import styles from './Insurance.module.scss';

interface CustomOptionType extends DefaultOptionType {
  group: string;
  value?: string;
}

export const Insurance = () => {
  const { Option, OptGroup } = Select;
  const form = getFormById('insurances');
  const { updateHistory } = useStepContent();
  const dispatch = useDispatch();

  const formFields = useMemo(() => (form?.fields as InsuranceType[]) || [], [form]);

  const [insuranceValue, setInsuranceValue] = useState<string>('');
  const [optionGroupData, setOptinGroupData] = useState<{
    title: string;
    content: string;
    price: string | null;
  }>({ title: '', content: '', price: null });

  function updateoptionGroupData(optionGroupId: string) {
    const optionGroup = formFields.find(field => field.id === optionGroupId);
    if (optionGroup !== undefined) {
      setOptinGroupData({
        title: optionGroup?.infoTitle,
        content: optionGroup?.infoMessage,
        price: optionGroup?.price || null,
      });
    }
  }

  function handleChangeSelect(_option: CustomOptionType | undefined) {
    if (_option === undefined) return;
    updateoptionGroupData(_option.group);
    setInsuranceValue(_option?.value || '');
  }
  useEffect(() => {
    if (form !== null && form.default !== undefined) {
      const optionGroup = formFields.find(field => field.id === form.default);
      if (optionGroup !== undefined) {
        setOptinGroupData({
          title: optionGroup?.infoTitle,
          content: optionGroup?.infoMessage,
          price: null,
        });
      }
    }
  }, []);

  if (form === null) return <></>;

  return (
    <Card className={styles.card}>
      <div className={styles.mainContent}>
        <h3 className={styles.title}>{form.title}</h3>
        <Select
          className={styles.select}
          placeholder='Select Insurance'
          suffixIcon={<Dropdown deg={0} color='#666666' />}
          onChange={(value, option) => handleChangeSelect(option as CustomOptionType)}
        >
          {formFields.map((field, i) => (
            <OptGroup
              label={field.name}
              key={`option-group-${field.id}-${i}`}
              className='book-App__option-group'
            >
              {field.options.map((opt, idx) => (
                <Option
                  value={opt.id}
                  key={`opt-${opt.id}-${idx}`}
                  group={field.id}
                  className='book-App__option-item'
                >
                  {!field.default && (
                    <div className='insurances-icon'>
                      <img
                        style={{ display: 'block' }}
                        src={`${baseUrl}eyeBook/assets/images/insuranseIcons/${opt.id}.svg`}
                        alt={opt.id}
                      />
                    </div>
                  )}
                  {opt.name}
                </Option>
              ))}
            </OptGroup>
          ))}
        </Select>
        {optionGroupData.title && (
          <Collapse
            ghost
            expandIconPosition='end'
            expandIcon={({ isActive }) => (
              <Dropdown deg={isActive ? 180 : 0} color='#145F9B' width={12} height={7} />
            )}
            items={[
              {
                label: optionGroupData.title,
                children: (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: optionGroupData.content,
                    }}
                  />
                ),
              },
            ]}
          />
        )}

        {insuranceValue && (
          <Button
            className='btn btn-pr'
            onClick={() => {
              updateHistory(insuranceValue, '', null);
              dispatch(setPrice(optionGroupData.price ? optionGroupData.price : ''));
              dispatch(setActiveScreen(form.navigateTo));
            }}
          >
            Continue
          </Button>
        )}
      </div>

      {optionGroupData.price && (
        <div className={styles.badgeWrap}>
          <div className={styles.badge}></div>
          <div className={styles.meta}>{optionGroupData.price}</div>
        </div>
      )}
    </Card>
  );
};
