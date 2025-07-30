import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export const CustomSpin = () => {
  return (
    <div className='loader'>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#059669' }} spin />} />
    </div>
  );
};
