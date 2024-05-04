import {useState} from 'react';
import {Form, Input, Radio, Button, Select, Popover} from 'antd';
import PropTypes from "prop-types";
import {plasterOptions} from "../../../Constants/Constants.js";

const PlasterFilters = ({onContinueClick}) => {
    const [form] = Form.useForm();
    const [canContinue, setCanContinue] = useState(true);
    const [plasterType, setPlasterType] = useState(null);
    const [densityK, setDensityK] = useState(null);
    const [showForm, setShowForm] = useState(false)
    const {Option} = Select;

    const content_cement = (
        <div>
            <p>Гипс:</p>
            <ul>
                <li> 1400+(кг/м3)</li>
                <li> 1300-1399 (кг/м3)</li>
                <li> 1200-1299 (кг/м3)</li>
                <li> 1000-1199 (кг/м3)</li>
                <li> 800-999 (кг/м3)</li>
            </ul>
            <p>Цемент:</p>
            <ul>
                <li> 1750+ (кг/м3)</li>
                <li> 1700-1750 (кг/м3)</li>
                <li> 1500-1650 (кг/м3)</li>
                <li> 1350-1450 (кг/м3)</li>
                <li> 1250-1349 (кг/м3)</li>
            </ul>
        </div>
    );

    const handleFormChange = (_, allValues) => {
        const canProceed = allValues.plaster === 'yes' && plasterType && allValues.plasterDensity &&
            allValues.firstLayerThickness && allValues.secondLayerThickness;
        setCanContinue(canProceed);
    };

    const handleContinueClick = () => {
        const plasterData = {
            plasterDensity: form.getFieldValue('plasterDensity') === '' ? 0 : form.getFieldValue('plasterDensity'),
            K: densityK === null ? 0: densityK,
            firstLayerThickness: form.getFieldValue('firstLayerThickness') === '' ? 0 : form.getFieldValue('firstLayerThickness'),
            secondLayerThickness: form.getFieldValue('secondLayerThickness') === '' ? 0 : form.getFieldValue('secondLayerThickness'),
        };
        console.log(plasterData)
        onContinueClick(plasterData);
        setCanContinue(false)
    };

    const handlePlasterTypeChange = value => {
        setPlasterType(value);
        form.resetFields(['density']);
        setCanContinue(false);
        setDensityK(null);
    };

    const handlePlasterDensityChange = e => {
        const enteredDensity = parseFloat(e.target.value);
        if (!isNaN(enteredDensity) && plasterType) {
            const options = plasterOptions[plasterType];
            const foundOption = options.find(option => {
                return enteredDensity >= option.range.start && enteredDensity <= option.range.end;
            });

            if (foundOption) {
                setDensityK(parseFloat(foundOption.K))
            } else {
                setDensityK(null);
            }
        }
    };

    const handleResetFields = () => {
        form.setFieldsValue({
            plasterType: null,
            firstLayerThickness: '0',
            secondLayerThickness: '0',
            plasterDensity: '0'
        });
        setShowForm(false);
        setCanContinue(true);
        setDensityK(null);
    };

    const handleShowForm = () => {
        setShowForm(true)
    }

    return (
        <div className="calculator-container__plaster-filters">
            <h3>3) Есть ли штукатурка?</h3>
            <Form
                form={form}
                layout="vertical"
                className="plaster-filter__form"
                onValuesChange={handleFormChange}
                initialValues={{
                    plaster: 'no',
                    firstLayerThickness: '',
                    secondLayerThickness: '',
                    plasterDensity: '',
                }}
            >
                <Form.Item name="plaster">
                    <Radio.Group>
                        <Radio value={'yes'} onClick={() => handleShowForm()}>Да</Radio>
                        <Radio value={'no'} onClick={() => handleResetFields()}>Нет</Radio>
                    </Radio.Group>
                </Form.Item>
                {showForm && (
                    <>
                        <Form.Item name="plasterType" label="Тип штукатурки">
                            <Select placeholder="Выберите тип" onChange={handlePlasterTypeChange}>
                                <Option value="gypsum">Гипсовая</Option>
                                <Option value="cement">Цементная</Option>
                            </Select>
                        </Form.Item>
                        <Popover placement="right" title={'Таблица:'} content={content_cement}>
                            <Form.Item name="plasterDensity" label="Плотность штукатурки (кг/м3)">
                                <Input onChange={handlePlasterDensityChange}/>
                            </Form.Item>
                        </Popover>
                        <Form.Item name="firstLayerThickness" label="Толщина слоя штукатурки с первой стороны (мм)">
                            <Input/>
                        </Form.Item>
                        <Form.Item name="secondLayerThickness" label="Толщина слоя штукатурки со второй стороны (мм)">
                            <Input/>
                        </Form.Item>
                    </>
                )}
                <Button type="primary" onClick={handleContinueClick} disabled={!canContinue}>Продолжить</Button>
            </Form>
        </div>
    );
};

PlasterFilters.propTypes = {
    onContinueClick: PropTypes.func.isRequired,
};

export default PlasterFilters;
