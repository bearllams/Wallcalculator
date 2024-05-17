import { useState } from 'react';
import { Select, Button } from 'antd';
import PropTypes from "prop-types";

const { Option } = Select;

const WallFilters = ({ onSelectWall, constructionType }) => {
    const [selectedType, setSelectedType] = useState(null);
    const [disabled, setDisabled] = useState(true)

    const handleButtonPress = () => {
        if (selectedType) {
            onSelectWall(selectedType);
        }
        setDisabled(false)
    };

    return (
        <div className="calculator-container__wall-selector">
            <h3>2) Выберите вид конструкции:</h3>
            <div className="wall-selector__container">
                {constructionType === 'wall' ? (
                    <Select
                        disabled={!disabled}
                        style={{ width: 200 }}
                        onChange={setSelectedType}
                        value={selectedType}
                        placeholder="Выберите тип"
                    >
                        <Option value="oneSide">Однослойная перегородка</Option>
                        <Option value="double">Двойная стена (одинаковая)</Option>
                    </Select>
                ) : (
                    <Select
                        disabled={!disabled}
                        style={{ width: 200 }}
                        onChange={setSelectedType}
                        value={selectedType}
                        placeholder="Выберите тип"
                    >
                        <Option value="monolite">Монолитное</Option>
                        <Option value="multivalue">Многопустотное</Option>
                    </Select>
                )}
                <Button
                    type="primary"
                    onClick={handleButtonPress}
                    disabled={!selectedType || !disabled}
                    style={{width:'120px'}}
                >
                    Выбрать
                </Button>
            </div>
        </div>
    );
};

WallFilters.propTypes = {
    onSelectWall: PropTypes.func.isRequired,
    constructionType: PropTypes.string.isRequired,
};

export default WallFilters;
