import { Button, Modal, ModalBody, ModalHeader } from 'react-bootstrap';
import styles from './history-dialog.module.scss';
import { useEffect, useState } from 'react';
import TextImage from '../../reusable/text-image/text-image';
import { ApexOptions } from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import { Period, Rate, getRatesRange } from 'src/app/contexts/currency-data-context/tools/rates-range-fetcher';
import { Currency } from 'src/app/contexts/currency-data-context/models/currency-model';


export interface HistoryDialogProps {
  initialCur: Currency
  targetCur: Currency
  show: boolean
  handleClose: () => void
}

interface PeriodButtonProps {
  content: string
  handleClick?: (() => void)
  selected?: boolean
}

function PeriodButton({content, handleClick, selected = false}: PeriodButtonProps) {
  return (
    <button className={`btn ${styles.periodButton} ${selected ? styles.selectedButton : ''}`} onClick={handleClick}>
      {content}
    </button>
  )
}

interface ChartProps {
  rates: Rate[]
  baseCur: Currency
}

function Chart({rates, baseCur} : ChartProps) {
  const series: ApexAxisChartSeries = [{
    name: "Price",
    data: rates.map(rate => rate.rate),
  }]
  const options: ApexOptions = {
    chart: {
      height: '100%',
      type: 'line',
      zoom: {
        enabled: true
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
            enabled: true,
            delay: 150
        },
        dynamicAnimation: {
            enabled: true,
            speed: 350
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return value + ` ${baseCur.code}`;
        }
      },
    },
    stroke: {
      curve: 'straight',
      width: 2
    },
    title: {
      text: '',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'],
        opacity: 0.5
      },
    },
    xaxis: {
      categories: rates.map(rate => rate.date),
    }
  }

  return (
    <ReactApexChart
      options={options}
      series={series}
      height={'100%'}
    />
  )
}

interface DialogProps {
  initialCur: Currency
  targetCur: Currency
  handleClose: () => void
}

function Dialog({initialCur, targetCur, handleClose} : DialogProps) {
  const [rates, setRates] = useState<Rate[]>([])
  const [period, setPeriod] = useState<Period>('1w')

  useEffect(() => {
    getRatesRange(initialCur, targetCur, period).then(data => setRates(data))
  }, [period])

  return (
    <Modal 
      show={true} 
      onHide={handleClose} 
      dialogClassName={`${styles.historyModal}`}
      centered
      scrollable={true}
    >
      <ModalHeader closeButton className={`${styles.modalHeader}`}>
        <h2 className='w-100'>
          
          <div className='d-inline-flex'>
            <div className='my-auto me-2'>Exchange rates for pair: </div>
              <TextImage
                src={initialCur.imageSrc}
                alt={`${initialCur.code.toLowerCase()}.png`}
                text={initialCur.code}
                style={{
                  image: {height: '1em'}
                }}
              />
              <div className='my-auto ms-1 me-1'>/</div>
              <TextImage
                src={targetCur.imageSrc}
                alt={`${targetCur.code.toLowerCase()}.png`}
                text={targetCur.code}
                style={{
                  image: {height: '1em'}
                }}
              />
          </div>
        </h2>
      </ModalHeader>
      <ModalBody>
        <div className={`${styles.modalBodyHolder}`}>
          <div className='row w-100 h-100'>
            <div className='col-8'>
              {
                rates.length > 0 ? (
                  <Chart rates={rates} baseCur={initialCur}/>
                ) : (
                 <h3>Loading the data, please wait...</h3>
                )
              }
            </div>
            <div className='col-4'>
                <h3 className='text-center mb-4'>Period:</h3>
                <div className='w-100 text-center'>
                  <PeriodButton 
                    selected={period == '1w'} 
                    content='1 week' 
                    handleClick={() => setPeriod('1w')} 
                  />
                  <PeriodButton 
                    selected={period == '2w'}
                    content='2 weeks' 
                    handleClick={() => setPeriod('2w')} 
                  />
                  <PeriodButton 
                    selected={period == '1m'}
                    content='1 month' 
                    handleClick={() => setPeriod('1m')} 
                  />
                  <PeriodButton 
                    selected={period == '3m'}
                    content='3 months'
                    handleClick={() => setPeriod('3m')} 
                  />
                  <PeriodButton 
                      selected={period == '6m'}
                    content='6 months'
                    handleClick={() => setPeriod('6m')} 
                  />
                  <PeriodButton 
                    selected={period == '1y'}
                    content='1 year' 
                    handleClick={() => setPeriod('1y')} 
                  />
                </div>
            </div>
          </div>
        </div>
      </ModalBody>
    </Modal>

  )
}

export function HistoryDialog({initialCur, targetCur, show, handleClose}: HistoryDialogProps) {

  return (
    <div>
      {show ? (
        <Dialog initialCur={initialCur} targetCur={targetCur} handleClose={handleClose} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default HistoryDialog;
