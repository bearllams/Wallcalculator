import { Table } from 'antd';
import PropTypes from "prop-types";
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const FrequencyResponseTable = ({ abscissa, rbValue, wallSelect }) => {
    const frequencies = [100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150];
    const evaluationCurve = [33, 36, 39, 42, 45, 48, 51, 52, 53, 54, 55, 56, 56, 56, 56, 56];

    const abscissaIndex = frequencies.findIndex(frequency => frequency >= abscissa);
    let finalRbValues = frequencies.map((frequency, index) => {
        if (index < abscissaIndex) {
            return rbValue;
        } else {
            let increment = 2 * (index - abscissaIndex);
            return Math.min(rbValue + increment, 65);
        }
    });

    let bestShift = -3;
    let closestSum = Infinity;

    for (let shift = -10; shift <= 10; shift++) {
        const shiftedEvaluationCurve = evaluationCurve.map(value => value + shift);
        const shiftedDeviations = finalRbValues.map((value, index) => value - shiftedEvaluationCurve[index]);
        const negativeDeviationsSum = shiftedDeviations.filter(val => val < 0).reduce((acc, val) => acc + val, 0);

        if (negativeDeviationsSum > -32 && Math.abs(negativeDeviationsSum + 32) < Math.abs(closestSum + 32)) {
            closestSum = negativeDeviationsSum;
            bestShift = shift;
        }
    }

    const shiftedEvaluationCurve = evaluationCurve.map(value => value + bestShift);
    const shiftedDeviations = finalRbValues.map((value, index) => value - shiftedEvaluationCurve[index]);

    const columns = frequencies.map(frequency => ({
        title: `${frequency} Гц`,
        dataIndex: `f${frequency}`,
        key: `f${frequency}`
    }));

    const data = [{}, {}, {}, {}, {}];
    frequencies.forEach((frequency, index) => {
        data[0][`f${frequency}`] = finalRbValues[index] + ' дБ';
        data[1][`f${frequency}`] = evaluationCurve[index] + ' дБ';
        data[2][`f${frequency}`] = (finalRbValues[index] - evaluationCurve[index]) + ' дБ';
        data[3][`f${frequency}`] = shiftedEvaluationCurve[index] + ' дБ';
        data[4][`f${frequency}`] = shiftedDeviations[index] + ' дБ';
    });

    const chartData = {
        labels: frequencies.map(freq => `${freq} Гц`),
        datasets: [
            {
                label: 'Расчетная характеристика',
                data: finalRbValues,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: 'Смещенная оценочная кривая',
                data: shiftedEvaluationCurve,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            }
        ]
    };

    return (
        <div className="table">
            <h1>Таблица с расчетами</h1>
            <Line data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
            <Table columns={columns} dataSource={data} pagination={false} bordered />
            {wallSelect === "double" &&
                <div className="instruction">
                    <p>
                        Согласно п. 9.7 СП 275.1325800.2016 "Конструкции ограждающие жилых и общественных зданий"
                        приближенный индекс изоляции воздушного шума двойным ограждением в жилых зданиях может быть
                        определен по формуле:
                    </p>
                    <strong>
                        R<sub>w</sub> = R<sub>w0</sub> + ΔR
                    </strong>
                    <p>
                        Где R<sub>w0</sub> - индекс изоляции воздушного шума однослойным
                        ограждением из кирпича, бетона и др. материалов, определяемый в соответствии с п 9.1 СП 275.1325800.2016
                        "Конструкции ограждающие жилых и общественных зданий"; дБ. <strong>ΔR = 8 дБ</strong>
                    </p>
                </div>
            }
            <p>Индекс изоляции воздушного шума R<sub>w</sub>={wallSelect === "double" ? shiftedEvaluationCurve[frequencies.indexOf(500)] + 8 : shiftedEvaluationCurve[frequencies.indexOf(500)]} дБ </p>
        </div>
    );
};

FrequencyResponseTable.propTypes = {
    abscissa: PropTypes.number.isRequired,
    rbValue: PropTypes.number.isRequired,
    wallSelect: PropTypes.number.isRequired,
};

export default FrequencyResponseTable;
