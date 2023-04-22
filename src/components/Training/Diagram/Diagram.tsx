import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { defaultData } from './defaultData';
import { Props } from './types';
import styles from './Diagram.module.scss';
import { useTranslation } from 'react-i18next';
import {
  generateData,
  generateDataOnCreateTraining,
  getAveragePagesPerDay,
} from './generateData';
import classNames from 'classnames';

const Diagram: React.FC<Props> = ({ activeTraining, createTraining }) => {
  const { t } = useTranslation();
  const [data, setData] = useState(defaultData);

  const isCreateTraining =
    createTraining?.books.length && createTraining?.finishDate;
  const isDefaultView = !activeTraining && !isCreateTraining;

  const getPagesAverage = () => {
    if (activeTraining) {
      const { start, finish, totalPages } = activeTraining;
      return getAveragePagesPerDay(start, finish, totalPages);
    } else if (isCreateTraining) {
      const { books, startDate, finishDate } = createTraining;
      const totalPages = books.reduce((acc, cur) => cur.pages + acc, 0);
      return getAveragePagesPerDay(startDate, finishDate, totalPages);
    }
    return 0;
  };

  const axisBottomObj = {
    tickSize: 0,
    tickPadding: 5,
    tickRotation: 0,
    legend: '',
    legendPosition: 'middle',
  };
  const axisBottom =
    data[data.findIndex((el) => el.id === 'Plan')].data.length > 10
      ? null
      : (axisBottomObj as object);

  const chooseDataGenerateStrategy = () => {
    if (activeTraining) {
      //if we have an active training
      setTimeout(() => {
        setData(generateData(activeTraining));
      }, 0);
    } else if (isCreateTraining) {
      //if we create training
      const { books, startDate, finishDate } = createTraining;
      setData(generateDataOnCreateTraining(books, startDate, finishDate));
    } else {
      setData(defaultData);
    }
  };

  useEffect(() => {
    chooseDataGenerateStrategy();
  }, [activeTraining, createTraining]);

  return (
    <div className={styles.thumb}>
      <div className={classNames(isDefaultView && styles.mask)}></div>

      <h3 className={styles.title}>
        {t('training.diagramTitle') + ' '}
        <span>{getPagesAverage()}</span>
      </h3>

      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 50, bottom: 30, left: 45 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
        }}
        curve="cardinal"
        axisTop={null}
        axisRight={null}
        axisBottom={axisBottom}
        axisLeft={null}
        enableGridY={false}
        colors={{ scheme: 'category10' }}
        lineWidth={3}
        pointSize={7}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor', modifiers: [] }}
        pointLabelYOffset={-12}
        areaBlendMode="lighten"
        areaBaselineValue={40}
        areaOpacity={0.25}
        enableCrosshair={false}
        useMesh={true}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 50,
            translateY: -20,
            itemWidth: 40,
            itemHeight: 30,
            itemsSpacing: 0,
            symbolSize: 9,
            symbolShape: 'circle',
            itemDirection: 'left-to-right',
            itemTextColor: '#777',
            effects: [
              {
                on: 'hover',
                style: {
                  itemBackground: 'rgba(0, 0, 0, .03)',
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        motionConfig="default"
      />
    </div>
  );
};

export default Diagram;
