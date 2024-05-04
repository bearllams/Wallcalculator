import {Form, Input, Button, message} from 'antd';
import PropTypes from 'prop-types';
import {densities, frequencies, octaveBands} from "../../../Constants/Constants.js";
import {useState} from "react";

const AbscissaCalculator = ({ onCalculate, plasterData, constructionType, wallSelect  }) => {
    const [form] = Form.useForm();
    const [formDisabled, setFormDisabled] = useState(true)
    const interpolateFrequency = (density) => {
        if (density < 600) return frequencies[0];
        if (density >= 1800) return frequencies[6];
        for (let i = 0; i < densities.length - 1; i++) {
            if (density >= densities[i] && density < densities[i + 1]) {
                return frequencies[i] + (frequencies[i + 1] - frequencies[i]) * ((density - densities[i]) / (densities[i + 1] - densities[i]));
            }
        }
        return frequencies[6];
    };

    const findNearestFrequency = (frequency) => {
        const band = octaveBands.find(band => frequency >= band.lower && frequency <= band.upper);
        return band ? band.freq : null;
    };

    const calculateAbscissa = (values) => {
        const pi = Math.PI;
        const r4 = Math.pow(0.16, 4);
        const density = values.density;
        let thickness = parseFloat(values.thickness)
        let totalThickness = parseFloat(values.thickness);

        if (plasterData && plasterData.firstLayerThickness && plasterData.secondLayerThickness) {
            totalThickness += parseFloat(plasterData.firstLayerThickness) + parseFloat(plasterData.secondLayerThickness);
        }

        const totalDestiny = wallSelect === "multivalue"
            ? density * (totalThickness / 1000 * 1.2 - 6 * Math.PI * Math.pow(0.16, 2) / 4) / (1.2 * totalThickness / 1000)
            : density;

        const frequency = interpolateFrequency(totalDestiny);
        const rawResult = frequency / totalThickness;
        const roundedResult = findNearestFrequency(rawResult);
        setFormDisabled(true)

        return {
            abscissa: roundedResult,
            density: values.density,
            thickness: thickness
        };
    };

    const handleCalculate = () => {
        form.validateFields().then(values => {
            const result = calculateAbscissa(values);
            message.success(`Абсцисса равна: ${result.abscissa} Гц`)
            onCalculate(result);
        });
    };

    const handleFormChange = () => {
        setFormDisabled(!form.isFieldsTouched())
    };

    return (
        <div className="calculator-container__abscissa-calculate">
            <h3>{constructionType === "floor" ? `3` : `4`} Расчет абсциссы</h3>
            <Form form={form} onValuesChange={handleFormChange} layout="vertical" className="abscissa-calculate__form">
                <Form.Item name="density" label="Плотность материала (кг/м3)" rules={[{message:'Пожаулуйста, введите плотность материала', required: true }]}>
                    <Input type="number" addonAfter="кг/м³" />
                </Form.Item>
                <Form.Item name="thickness" label="Толщина стены (мм)" rules={[{message:'Пожаулуйста, введите толщину стены',  required: true }]}>
                    <Input type="number" addonAfter="мм" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" onClick={handleCalculate} disabled={formDisabled}>Рассчитать</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

AbscissaCalculator.propTypes = {
    onCalculate: PropTypes.func.isRequired,
    plasterData: PropTypes.object.isRequired,
    constructionType: PropTypes.string.isRequired,
    wallSelect: PropTypes.string.isRequired
}

export default AbscissaCalculator;
