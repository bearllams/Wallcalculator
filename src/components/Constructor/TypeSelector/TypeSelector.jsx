import { useState } from 'react';
import { Select } from 'antd';
import PropTypes from "prop-types";

const { Option } = Select;

const ConstructionTypeSelector = ({onSelect}) => {
    const [constructionType, setConstructionType] = useState(null);
    console.log(constructionType)
    const handleChange = value => {
        setConstructionType(value);
        onSelect(value);
    };

    return (
        <div className="calculator-container__type-selector">
            <h3>1) Выберите тип конструкции:</h3>
            <Select style={{ width: 200 }} onChange={handleChange} placeholder="Выберите тип">
                <Option value="wall">Стена</Option>
                <Option value="floor">Перекрытие</Option>
            </Select>
        </div>
    );
};

ConstructionTypeSelector.propTypes = {
    onSelect: PropTypes.func.isRequired,
};

export default ConstructionTypeSelector;
