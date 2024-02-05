import { useContext, useState, useEffect } from 'react';

import { MainContext } from '../../DataTable/DataTable';
import { ColumnType, elemEventType } from "../../Type/Type";
import './Cell.css';



export default function Cell({ column, row }: { column: ColumnType, row: any }) {
  const mainContext = useContext(MainContext);
  const [cellValue, setCellValue] = useState<any>('');
  const [checkboxValue, setCheckboxValue] = useState<boolean>(false);

  const onChangeInput = (event: elemEventType, eventFunction?: (event: elemEventType) => void) => {
    setCellValue(event.target.value);
    eventFunction && eventFunction(event);
  }
  const onChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>, eventFunction?: (event: elemEventType) => void) => {
    setCheckboxValue(event.target.checked);
    eventFunction && eventFunction(event);
  }

  useEffect(() => {
    switch (column.kind) {
      case 'input/textbox':
      case 'input/date':
      case 'input/datetime-local':
      case 'input/number':
      case 'input/file':
      case 'input/password':
      case 'textarea':
        setCellValue(row[column.field.title]);
        break;
      case 'select':
        setCellValue(row[column.field.title]?.value ? row[column.field.title].value : '');
        break;
    }

  }, [])

  switch (column.kind) {

    case 'input/textbox':
    case 'input/date':
    case 'input/datetime-local':
    case 'input/number':
    case 'input/file':
    case 'input/password':
      return (
        <>
          <input value={cellValue} onChange={(event) => onChangeInput(event, column.field.eventHandlerRow)} className='rdtcell-input' type={column.kind.split('/')[1]} />
        </>
      )

    case 'textarea':
      return (
        <>
          <textarea value={cellValue} onChange={(event) => onChangeInput(event, column.field.eventHandlerRow)} className='rdtcell-textarea' />
        </>
      )

    case 'image':
      return (
        <>
          <img src={row[column.field.title]} width={mainContext.options?.cells?.imageWidth} className='rdtcell-image' />
        </>
      )

    case 'button':
      return (
        <>
          <button onClick={() => column.field.eventHandlerRow && column.field.eventHandlerRow(row)} className="rdtcell-button" >{column.field.title}</button>
        </>
      )

    case 'boolean':
      return (
        <>
          <input checked={checkboxValue} onChange={(event) => onChangeCheckbox(event, column.field.eventHandlerRow)} className='rdtcell-checkbox' type='checkbox' />
        </>
      )

    case 'progress':
      return (
        <>
          {
            Array.isArray(row[column.field.title]) && (row[column.field.title]).length === 2 &&
            <progress className="rdtcell-progress" value={row[column.field.title][0]} max={row[column.field.title][1]}>{row[column.field.title][0]}</progress>
          }
        </>
      )

    case 'select':
      return (
        <>
          {
            row[column.field.title] && row[column.field.title].options.includes(row[column.field.title].value) &&
            <select value={cellValue} className="rdtcell-select" onChange={(event) => onChangeInput(event, column.field.eventHandlerRow)}
              style={{ color: mainContext.options?.color?.color, backgroundColor: mainContext.options?.color?.backgroundColor, borderColor: mainContext.options?.color?.borderColor }}
            >
              {
                Array.isArray(row[column.field.title].options) &&
                row[column.field.title].options.map((value: any) => (
                  <option key={value} className="rdtcell-select__option" value={value}>{value}</option>
                ))
              }
            </select>
          }
        </>
      )
    case 'component':
      return (
        <>
          {column.component && column.component(row[column.field.title], column.field?.eventHandlerRow ? column.field?.eventHandlerRow : () => { })}
        </>
      )
    default:
      return (
        <>
          <span className='rdtcell-text'>{row[column.field.title]}</span>
        </>
      )
  }
}