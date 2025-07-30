import React, { ChangeEvent } from 'react';
import Input from 'antd/es/input/Input';

export const PhoneInput: React.FC<{
  value: string;
  className_?: string;
  onChange: (value: string) => void;
  onBlur: (value: string) => void;
}> = ({ value, className_, onChange, onBlur }) => {
  const formatPhoneNumber = (input: string): string => {
    let digits = input.replace(/\D/g, '');

    if (digits.length > 12) {
      digits = digits.slice(0, 12);
    }

    if (digits.length === 0) return '';

    if (digits.startsWith('1')) {
      if (digits.length === 1) return '1';
      return `1 (${digits.slice(1, 4)}${
        digits.length > 4 ? ')' : ''
      } ${digits.slice(4, 7)}${digits.length > 7 ? '-' : ''}${digits.slice(7, 11)}`;
    }

    if (digits.length > 10) {
      const countryCodeLength = digits.length - 10;
      return `+${digits.slice(0, countryCodeLength)} (${digits.slice(
        countryCodeLength,
        countryCodeLength + 3,
      )}) ${digits.slice(
        countryCodeLength + 3,
        countryCodeLength + 6,
      )}-${digits.slice(countryCodeLength + 6, countryCodeLength + 10)}`;
    }

    return `(${digits.slice(0, 3)}${digits.length > 3 ? ')' : ''} ${digits.slice(
      3,
      6,
    )}${digits.length > 6 ? '-' : ''}${digits.slice(6, 10)}`.trim();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onBlur(formatted);
  };

  return (
    <Input
      type='text'
      value={value}
      onChange={handleChange}
      placeholder=''
      onBlur={handleBlur}
      className={className_}
    />
  );
};
