import styles from './amount-input.module.scss';

export interface AmountInputProps {
  name: string,
  value: number,
  onChange: React.ChangeEventHandler<HTMLInputElement>,
}

export function AmountInput({name, value, onChange}: AmountInputProps) {
  return (
      <div className="d-inline-flex w-75">
          <input type="number" className="form-control form-control-lg text-center rounded-pill ms-3 me-3"
              min={0} value={value} name={name} onChange={onChange}/>
      </div>
  )
}

export default AmountInput;
