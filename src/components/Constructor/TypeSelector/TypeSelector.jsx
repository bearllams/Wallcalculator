import {useEffect, useState} from 'react';
import { Select, Button } from 'antd';
import PropTypes from "prop-types";

const { Option } = Select;

const ConstructionTypeSelector = ({ onSelect }) => {
    const [constructionType, setConstructionType] = useState(null);
    const [disabled, setDisabled] = useState(true)

    const handleButtonPress = () => {
        if (constructionType) {
            onSelect(constructionType);
        }
        setDisabled(false)
    };

    return (
        <div className="calculator-container__type-selector">
            <h3>1) Выберите тип конструкции:</h3>
            <div className="type-selector__container">
                <Select
                    style={{ width: 200 }}
                    onChange={setConstructionType}
                    value={constructionType}
                    disabled={!disabled}
                    placeholder="Выберите тип"
                >
                    <Option value="wall">Стена</Option>
                    <Option value="floor">Перекрытие</Option>
                </Select>
                <Button
                    type="primary"
                    onClick={handleButtonPress}
                    disabled={!disabled || !constructionType}
                    style={{width: '120px'}}
                >
                    Выбрать
                </Button>
            </div>
        </div>
    );
};

ConstructionTypeSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default ConstructionTypeSelector;
