import {useEffect, useState} from 'react';
import {FloatButton, Steps} from "antd";
import {SidebarMenu} from "../../components/index.js";
import ConstructionTypeSelector from "../../components/Constructor/TypeSelector/TypeSelector.jsx";
import AbscissaCalculator from "../../components/Constructor/AbscissaCalculator/AbscissaCalculator.jsx";
import OrdinateCalculator from "../../components/Constructor/OrdinateCalculator/OrdinateCalculator.jsx";
import PlasterFilters from "../../components/Constructor/PlasterFilters/PlasterFilters.jsx";
import WallFilters from "../../components/Constructor/WallFilters/WallFilters.jsx";
import FrequencyResponseTable from "../../components/Constructor/FrequencyResponseTable/FrequencyResponseTable.jsx";
import {FileWordOutlined, MenuOutlined, ReloadOutlined} from "@ant-design/icons";
import {handleExportToWord} from "../../script/wordScript.js";
import './_calculator-page.scss';

const {Step} = Steps;

const CalculatorPage = () => {
    const [constructionType, setConstructionType] = useState(null);
    const [wallSelect, setWallSelect] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [plasterData, setPlasterData] = useState(null);
    const [wallData, setWallData] = useState(null);
    const [rbData, setRbData] = useState({
        Rb: 0,
        constructionType:'',
        material: '',
        densityAndK:''
    });
    const [tableData, setTableData] = useState([])
    const showTable = wallData !== null && rbData.Rb !== 0;
    const handleConstructionTypeSelect = (value) => {
        setConstructionType(value);
        setCurrentStep(1);
    };

    const handleWallFilterSelect = (value) => {
        setWallSelect(value)
        if (wallSelect === null) {
            if (constructionType === "floor") {
                setCurrentStep(currentStep + 2);
            } else {
                setCurrentStep(currentStep + 1);
            }
        }
    }

    const onContinueClick = (plasterData) => {
        setPlasterData(plasterData);
        setCurrentStep(currentStep + 1);
    };

    const handleCalculateAbscissa = (result) => {
        console.log("Результат расчета абсциссы:", result);
        setWallData(result);
        setCurrentStep(currentStep + 1);
    };


    useEffect(() => {
        console.log('Табличные данные', tableData)
    }, [tableData]);

    return (
        <div className="calculator-wrapper">
            <SidebarMenu/>
            <div className="calculator-wrapper__container">
                <Steps className="container__steps" size="small" current={currentStep}>
                    <Step title="Выберите тип конструкции"/>
                    <Step title="Выбор вида конструкции"/>
                    {constructionType === 'wall' &&
                        <Step title="Настройте фильтры"/>
                    }
                    <Step title="Рассчитайте абсциссу"/>
                    <Step title="Рассчитайте ординату"/>
                </Steps>
                <div className="calculator-wrapper__container-items">
                    {currentStep >= 0 && <ConstructionTypeSelector onSelect={handleConstructionTypeSelect}/>}
                    {currentStep >= 1 && (
                        <WallFilters onSelectWall={handleWallFilterSelect} constructionType={constructionType}/>
                    )}
                    {constructionType === 'wall' && currentStep >= 2 && (
                        <PlasterFilters onContinueClick={onContinueClick}/>
                    )}
                    {currentStep >= 3 && (
                        <AbscissaCalculator wallSelect={wallSelect} constructionType={constructionType}
                                            plasterData={plasterData}
                                            onCalculate={handleCalculateAbscissa}/>
                    )}
                    {currentStep >= 4 && (
                        <OrdinateCalculator wallSelect={wallSelect} constructionTypeWall={constructionType}
                                            plasterData={plasterData} wallData={wallData} setRbData={setRbData}/>
                    )}
                </div>
                {showTable && (
                    <FrequencyResponseTable setTableData={setTableData} wallSelect={wallSelect} abscissa={wallData.abscissa} rbValue={rbData.Rb}/>
                )}
                <FloatButton.Group
                    trigger="click"
                    type="primary"
                    style={{right: 24}}
                    icon={<MenuOutlined/>}
                >
                    {showTable && (
                        <FloatButton tooltip={<div>Сформировать документ</div>}
                                     onClick={() => handleExportToWord(constructionType,wallSelect,plasterData,wallData,rbData, tableData)}
                                     icon={<FileWordOutlined/>}/>
                    )}
                    <FloatButton tooltip={<div>Начать заново</div>} onClick={() => window.location.reload()}
                                 icon={<ReloadOutlined/>}/>
                </FloatButton.Group>
            </div>
        </div>
    );
};

export default CalculatorPage;
