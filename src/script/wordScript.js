import { Document, Packer, Paragraph, Table, TableRow, TableCell, WidthType, TextRun, BorderStyle, AlignmentType } from "docx";

export const handleExportToWord = (constructionType, wallSelect, plasterData, wallData, rbData, tableData ) => {
    console.log(constructionType, wallSelect, plasterData, wallData, rbData)
    const frequencies = [100, 125, 160, 200, 250, 315, 400, 500, 630, 800, 1000, 1250, 1600, 2000, 2500, 3150];
    let wallText;
    let constructionText;
    let plasterText;
    let plasterDensityText;
    let plasterTypeText;
    let firstLayerThicknessText;
    let secondLayerThicknessText;
    let abscissaText;
    let wallThicknessText;
    let constructionWallTypeText;
    let wallDensityAndKText;
    let materialText;
    let RbValueText;

    if (constructionType === 'wall') {
        constructionText = 'Стена'
        if (wallSelect === 'oneSide') {
            wallText = 'Однослойная перегородка'
        } else {
            wallText = 'Двойная стена (одинаковая)'
        }
        if (rbData.constructionType === 'solid'){
            constructionWallTypeText = 'Сплошная'
            wallDensityAndKText = rbData.densityAndK
            if(rbData.material ==='keramzit'){
                materialText = 'Керамзитобетон'
            } else if (rbData.material ==='perlit'){
                materialText = 'Перлитобетон'
            } else if (rbData.material ==='agloporit'){
                materialText = 'Аглопоритобетон'
            } else if (rbData.material ==='shlakopemz'){
                materialText = 'Шлакопемзобетон'
            } else if (rbData.material ==='light_concretes'){
                materialText = 'Легкие бетоны: Газобетон, Пенобетон, Газосиликат'
            } else if (rbData.material ==='masonry'){
                materialText = 'Кладка из кирпича, Пустотелых керамических блоков'
            } else if (rbData.material ==='gypsum'){
                materialText = 'Гипсобетон, Гипс (в т.ч. поризованный или с легкими заполнителями)'
            }
        }
    } else {
        constructionText = 'Перекрытие'
        if (wallSelect === 'monolite') {
            wallText = 'Монолитное'
        } else {
            wallText = 'Многопустотное'
        }
    }

    if (plasterData.plaster === 'yes') {
        plasterText = 'Да'
        plasterDensityText = plasterData.plasterDensity
        firstLayerThicknessText = plasterData.firstLayerThickness
        secondLayerThicknessText = plasterData.secondLayerThickness
        if (plasterData.plasterType === 'gypsum') {
            plasterTypeText = 'Гипсовая'
        } else {
            plasterTypeText = 'Цементная'
        }
    } else {
        plasterText = 'Нет'
    }

    abscissaText = wallData.abscissa
    wallThicknessText = wallData.thickness
    RbValueText = rbData.Rb

    const tableRows = [
        new TableRow({
            children: [
                new TableCell({
                    children: [new Paragraph({
                        children: [new TextRun({
                            text: "Частота (Гц)",
                            size: 15 * 2 // Умножаем на 2, потому что размер в half-points
                        })],
                        alignment: AlignmentType.CENTER
                    })],
                    columnSpan: 1
                }),
                ...frequencies.map(frequency => new TableCell({
                    children: [new Paragraph({
                        children: [new TextRun({
                            text: `${frequency} Гц`,
                            size: 15 * 2
                        })],
                        alignment: AlignmentType.CENTER
                    })]
                }))
            ]
        }),
        ...tableData.map((row, index) => {
            const rowCells = [new TableCell({
                children: [new Paragraph({
                    children: [new TextRun({
                        text: `Ряд ${index + 1}`,
                        size: 15 * 2
                    })],
                    alignment: AlignmentType.CENTER
                })]
            })];
            Object.keys(row).forEach(freq => {
                rowCells.push(new TableCell({
                    children: [new Paragraph({
                        children: [new TextRun({
                            text: row[freq],
                            size: 15 * 2
                        })],
                        alignment: AlignmentType.CENTER
                    })],
                }));
            });
            return new TableRow({ children: rowCells });
        })
    ];


    const table = new Table({
        rows: tableRows,
        width: { size: 112, type: WidthType.PERCENTAGE },
        borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            left: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            right: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
            insideVertical: { style: BorderStyle.SINGLE, size: 1, color: "000000" },
        }
    });

    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        text: "Расчет",
                        alignment: AlignmentType.CENTER,
                        heading: "Heading1",
                        style: "myHeaderStyle"
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                break: 1
                            })
                        ]
                    }),
                    new Paragraph({
                        text: `Тип конструкции: ${constructionText}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Вид конструкции: ${wallText}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Тип стены: ${constructionWallTypeText || 'Не задано'}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Плотность и коэффициент: ${wallDensityAndKText || 'Не задано'}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Материал: ${materialText || 'Не задано'}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Штукатурка: ${plasterText || 'Не задано'}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Плотность штукатурки: ${plasterDensityText || 'Не задано'}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Тип штукатурки: ${plasterTypeText || 'Не задано'}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Толщина первого слоя штукатурки: ${firstLayerThicknessText || 'Не задано'}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Толщина второго слоя штукатурки: ${secondLayerThicknessText || 'Не задано'}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Толщина стены: ${wallThicknessText}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Абсцисса: ${abscissaText}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        text: `Значение Rb: ${RbValueText}`,
                        alignment: AlignmentType.LEFT,
                        style: "myParagraphStyle",
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                break: 1
                            })
                        ]
                    }),
                    new Paragraph({
                        text: "Результаты измерений по частотам",
                        heading: "Heading1",
                        alignment: AlignmentType.CENTER,
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: "",
                                break: 1
                            })
                        ]
                    }),
                    table
                ],
            },
        ],
        styles: {
            paragraphStyles: [
                {
                    id: "myParagraphStyle",
                    name: "My Paragraph Style",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 28,
                    },
                    paragraph: {
                        spacing: {
                            after: 120,
                        },
                    },
                },
                {
                    id: "myHeaderStyle",
                    name: "My Header Style",
                    basedOn: "Normal",
                    next: "Normal",
                    run: {
                        size: 35,
                    },
                    paragraph: {
                        spacing: {
                            after: 120,
                        },
                    },
                },
            ],
        }
    });


    // Генерация Blob и инициация скачивания файла
    Packer.toBlob(doc).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Расчет ${constructionText}-${wallText}.docx`;
        a.click();
        window.URL.revokeObjectURL(url);
    }).catch(error => console.error("Ошибка при создании документа Word:", error));
};
