import { ChangeEvent } from "react";

interface InputProps {
    label: string;
    id: string;
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
}

export const Input = ({ label, id, name, value, onChange, placeholder }: InputProps) => {
    return (
        <div className="flex flex-row justify-between items-center gap-8">
            <label htmlFor={id}>{label}</label>
            <input type="text" id={id} name={name} value={value} onChange={onChange} placeholder={placeholder} className="h-8 w-72 rounded bg-secondary pl-3" />
        </div>
    )
}