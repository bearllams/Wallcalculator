import {useEffect, useState} from 'react';
import {Steps} from "antd";
import {SidebarMenu} from "../../components/index.js";
import ConstructionTypeSelector from "../../components/Constructor/TypeSelector/TypeSelector.jsx";
import AbscissaCalculator from "../../components/Constructor/AbscissaCalculator/AbscissaCalculator.jsx";
import OrdinateCalculator from "../../components/Constructor/OrdinateCalculator/OrdinateCalculator.jsx";
import PlasterFilters from "../../components/Constructor/PlasterFilters/PlasterFilters.jsx";
import WallFilters from "../../components/Constructor/WallFilters/WallFilters.jsx";
import FrequencyResponseTable from "../../components/Constructor/FrequencyResponseTable/FrequencyResponseTable.jsx";
import './_calculator-page.scss';

const {Step} = Steps;

const CalculatorPage = () => {
    const [constructionType, setConstructionType] = useState(null);
    const [wallSelect, setWallSelect] = useState(null);
    const [currentStep, setCurrentStep] = useState(0);
    const [plasterData, setPlasterData] = useState(null);
    const [wallData, setWallData] = useState(null);
    const [rbData, setRbData] = useState(null);
    const showTable =  wallData !== null && rbData !== null;
    const handleConstructionTypeSelect = (value) => {
        setConstructionType(value);
        setCurrentStep(1);
    };

    const handleWallFilterSelect = (value) => {
        setWallSelect(value)
        if (constructionType === "floor") {
            setCurrentStep(currentStep + 2);
        } else {
            setCurrentStep(currentStep + 1);
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
        console.log(plasterData, wallData)
    }, [plasterData, wallData]);

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
                        <AbscissaCalculator wallSelect={wallSelect} constructionType={constructionType} plasterData={plasterData}
                                            onCalculate={handleCalculateAbscissa}/>
                    )}
                    {currentStep >= 4 && (
                        <OrdinateCalculator wallSelect={wallSelect} constructionTypeWall={constructionType} plasterData={plasterData} wallData={wallData} setRbData={setRbData}/>
                    )}
                </div>
                {showTable && (
                    <FrequencyResponseTable wallSelect={wallSelect} abscissa={wallData.abscissa} rbValue={rbData}/>
                )}
            </div>
        </div>
    );
};

export default CalculatorPage;
