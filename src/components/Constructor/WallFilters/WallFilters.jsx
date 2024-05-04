import { Select } from 'antd';
import PropTypes from "prop-types";

const { Option } = Select;

const WallFilters = ({onSelectWall, constructionType}) => {
    const handleChange = value => {
        onSelectWall(value);
    };

    return (
        <div className="calculator-container__wall-selector">
            <h3>2) Выберите тип конструкции:</h3>
            {constructionType === 'wall'
                ?  <Select style={{ width: 200 }} onChange={handleChange} placeholder="Выберите тип">
                    <Option value="oneSide">Однослойная перегородка</Option>
                    <Option value="double">Двойная стена (одинаковая)</Option>
                </Select>
                : <Select style={{ width: 200 }} onChange={handleChange} placeholder="Выберите тип">
                    <Option value="monolite">Монолитное</Option>
                    <Option value="multivalue">Многопустотное</Option>
                </Select>
            }
        </div>
    );
};

WallFilters.propTypes = {
    onSelectWall: PropTypes.func.isRequired,
    constructionType: PropTypes.string.isRequired,
};

export default WallFilters;
