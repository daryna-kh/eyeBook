import { Card, Collapse } from 'antd';
import { getPriceFromMockData } from '../../helpers/helpers';
import { getCard } from '../../mock/cards/getCard';
import { baseUrl } from '../../share/constants';
import { useSelector } from '../../store';
import { screensSelector } from '../../store/screens/selectors';
import { useStepContent } from '../StepContent/useStepContent';
import styles from './OptionCard.module.scss';
import { OptionCardProps } from './types';
import { Dropdown } from '../../share/icons/Dropdown';

export const OptionCard = ({ id }: OptionCardProps) => {
  const { updateHistory } = useStepContent();
  const { history } = useSelector(screensSelector);
  const optionCard = getCard(id) || null;

  if (!optionCard) return null;

  if (
    optionCard.disabledFor &&
    history.some(item => item.optionCard && optionCard.disabledFor?.includes(item.optionCard))
  )
    return null;

  const { title, img, badge, description, infoMessage, meta } = optionCard;

  let imgUrl = '';
  if (img) {
    imgUrl = `${baseUrl}eyeBook/assets/images/options/${id}.png`;
  }

  return (
    <Card onClick={() => updateHistory(id, '', null)} className={styles.card} hoverable>
      <div className={styles.wrap}>
        {img && (
          <div className={styles.image}>
            <div
              className={styles.background}
              style={{ background: `url(${imgUrl}) center / cover no-repeat` }}
            ></div>
          </div>
        )}

        <div className={styles.mainContent}>
          <h3 className={styles.title}>{title}</h3>
          {description && <p className={styles.description}>{description}</p>}
        </div>
        {infoMessage || badge || meta ? (
          <div className={styles.badge_collapse}>
            {infoMessage && (
              <div onClick={e => e.stopPropagation()} className={styles.collapse}>
                <Collapse
                  ghost
                  expandIconPosition='end'
                  expandIcon={({ isActive }) => (
                    <Dropdown deg={isActive ? 180 : 0} color='#145F9B' width={12} height={7} />
                  )}
                  items={[
                    {
                      label: (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `<span>What's included</span>`,
                          }}
                        />
                      ),
                      children: (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: infoMessage,
                          }}
                        />
                      ),
                    },
                  ]}
                />
              </div>
            )}
            {badge || meta ? (
              <div className={styles.badgeWrap}>
                {badge && <div className={styles.badge}>{badge}</div>}
                {meta && <div className={styles.meta}>{getPriceFromMockData(meta, history)}</div>}
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </Card>
  );
};
