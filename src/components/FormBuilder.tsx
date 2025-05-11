'use client'

import { ChangeEvent } from 'react'

type Field = {
    name: string
    label: string
    type: 'text' | 'email' | 'password' | 'number'
    value: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    disabled?: boolean
}

type FormBuilderProps = {
    fields: Field[]
    onSubmit: () => void
    submitLabel?: string
    loading?: boolean
}

export default function FormBuilder({
    fields,
    onSubmit,
    submitLabel = 'Submit',
    loading = false,
}: FormBuilderProps) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onSubmit()
            }}
            className="space-y-4"
        >
            {fields.map((field) => (
                <div key={field.name}>
                    <label className="block text-sm font-medium mb-1">
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        className="input input-bordered w-full"
                    />
                </div>
            ))}
            <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loading}
            >
                {loading ? 'Processing...' : submitLabel}
            </button>
        </form>
    )
}
