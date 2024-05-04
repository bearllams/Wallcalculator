import {useEffect, useState} from 'react';
import {Form, Button, Radio, message, Select} from 'antd';
import PropTypes from 'prop-types';
import {densityOptions} from "../../../Constants/Constants.js";

const OrdinateCalculator = ({wallData, plasterData, setRbData, constructionTypeWall, wallSelect}) => {
    const {Option, OptGroup} = Select;
    const [constructionType, setConstructionType] = useState(null);
    const [materialType, setMaterialType] = useState(null);
    const [selectedK, setSelectedK] = useState(null);
    const [form] = Form.useForm();
    const [formDisabled, setFormDisabled] = useState(true)
    const [localPlasterData, setLocalPlasterData] = useState({
        plasterDensity: 0,
        K: 0,
        firstLayerThickness: 0,
        secondLayerThickness: 0
    })

    useEffect(() => {
        if (plasterData !== null){
            setLocalPlasterData(plasterData)
        }
        if (wallSelect === "multivalue"){
            setFormDisabled(false)
        }
    }, [formDisabled, plasterData, wallSelect]);

    const calculateValues = () => {
        const pi = Math.PI;
        const r4 = Math.pow(0.16, 4);
        const wallThicknessMeters = parseFloat(wallData.thickness) / 1000 + (parseFloat(localPlasterData.firstLayerThickness) + parseFloat(localPlasterData.secondLayerThickness)) / 1000;
        const b = 1.2;

        const j = (1.2 * Math.pow(wallThicknessMeters, 3) / 12) - (6 * pi * r4 / 64);
        const hPriv = wallThicknessMeters - (6 * pi * Math.pow(0.16, 2) / 4);
        const k = 1.5 * Math.pow((j / (b * Math.pow(hPriv, 3))), 0.25);

        return {k, hPriv};
    };

    const calculateRb = () => {
        form.validateFields()
            .then(() => {
                if (!wallData) {
                    message.info('Необходимо убедиться, что данные о стене загружены');
                    return;
                }

                const {k, hPriv} = calculateValues();

                const kWall = (constructionType === 'hollow' || wallSelect === "multivalue") ? k : selectedK;
                const kPlaster = localPlasterData.K;
                const wallThicknessMeters = parseFloat(wallData.thickness) / 1000;
                const plasterThicknessMeters = plasterData ? (parseFloat(plasterData.firstLayerThickness) + parseFloat(plasterData.secondLayerThickness)) / 1000 : 0;

                const wallTerm =  wallSelect === "multivalue" ? wallData.density * hPriv * kWall: wallData.density * wallThicknessMeters * kWall;
                const plasterTerm = plasterThicknessMeters > 0 ? parseFloat(plasterData.plasterDensity) * plasterThicknessMeters * kPlaster : 0;
                const Rb = 20 * Math.log10(wallTerm + plasterTerm) - 12;
                setRbData(Math.ceil(Rb.toFixed(2)));
                message.success(`Рассчитанное значение Rb: ${Math.ceil(Rb.toFixed(2))}`);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    const handleFormChange = () => {
        setFormDisabled(!form.isFieldsTouched())
    };

    return (
        <div className="calculator-container__ordinate-calculate">
            <h3>{constructionTypeWall === "floor" ? `4` : `5`} Расчет ординаты</h3>
            <Form
                layout="vertical"
                className="ordinate-calculate__form"
                form={form}
                onValuesChange={handleFormChange}
                onFinish={calculateRb}
            >
                {(wallSelect !== "monolite" && wallSelect !== 'multivalue') &&
                    <Form.Item
                        label="Выберите тип конструкции:"
                        name="constructionType"
                        rules={[{required: true, message: 'Пожалуйста, выберите тип конструкции'}]}
                    >
                        <Radio.Group onChange={(e) => setConstructionType(e.target.value)}>
                            <Radio value="solid">Сплошная</Radio>
                            <Radio value="hollow" onClick={() => setMaterialType(null)}>С круглыми пустотами</Radio>
                        </Radio.Group>
                    </Form.Item>
                }
                {(constructionType === 'solid' || wallSelect === "monolite") && (
                    <Form.Item
                        label="Наименование материала:"
                        name="materialType"
                        rules={[{required: true, message: 'Пожалуйста, выберите материал'}]}
                    >
                        <Select onChange={value => setMaterialType(value)} placeholder="Выберите материал"
                                style={{width: '300px'}}>
                            {constructionType === 'solid' &&
                            <OptGroup label="Бетонные материалы">
                                <Option value="keramzit">Керамзитбетон</Option>
                                <Option value="perlit">Перлибетон</Option>
                                <Option value="agloporit">Аглопоритобетон</Option>
                                <Option value="shlakopemz">Шлакопемзобетон</Option>
                            </OptGroup>
                            }
                            {constructionType === 'solid' &&
                                <>
                                    <OptGroup label="Легкие бетоны">
                                        <Option value="light_concretes">Газобетон, Пенобетон, Газосиликат</Option>
                                    </OptGroup>
                                    <OptGroup label="Кладочные материалы">
                                        <Option value="masonry">Кладка из кирпича, Пустотелых керамических блоков</Option>
                                    </OptGroup>
                                    <OptGroup label="Гипсовые материалы">
                                        <Option value="gypsum">Гипсобетон, Гипс (в т.ч. поризованный или с легкими
                                            заполнителями)</Option>
                                    </OptGroup>
                                </>
                            }
                            {wallSelect === "monolite" &&
                                <OptGroup label="Бетонные материалы">
                                    <Option value="keramzitMonolite">Керамзитбетон</Option>
                                </OptGroup>
                            }
                        </Select>
                    </Form.Item>
                )}
                {materialType && densityOptions[materialType] && (
                    <Form.Item
                        label="Выберите плотность и коэффициент:"
                        name="densityAndCoefficient"
                        rules={[{required: true, message: 'Пожалуйста, выберите плотность и коэффициент'}]}
                    >
                        <Select
                            onChange={value => {
                                const kValue = value.split('K: ')[1];
                                setSelectedK(parseFloat(kValue));
                            }}
                            placeholder="Выберите плотность"
                        >
                            {densityOptions[materialType].map((option, index) => (
                                <Option key={index} value={`${option.range}, K: ${option.K}`}>
                                    {`${option.range}, K: ${option.K}`}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>
                )}
                <Form.Item>
                    <Button
                        type="primary"
                        onClick={calculateRb}
                        disabled={
                            formDisabled
                        }
                    >
                        Рассчитать Rb
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

OrdinateCalculator.propTypes = {
    wallData: PropTypes.object.isRequired,
    plasterData: PropTypes.object.isRequired,
    setRbData: PropTypes.object.isRequired,
    constructionTypeWall: PropTypes.string.isRequired,
    wallSelect: PropTypes.string.isRequired
};

export default OrdinateCalculator;