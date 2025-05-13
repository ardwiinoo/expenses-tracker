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
                    <label className="block text-sm font-medium mb-3">
                        {field.label}
                    </label>
                    <input
                        type={field.type}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={field.placeholder}
                        disabled={field.disabled}
                        className="mb-2 w-full h-12 rounded-md p-3 border border-gray-600 focus:border-[#DFD0B8] focus:ring-[#DFD0B8] bg-[#222831] text-[#DFD0B8] placeholder:text-gray-400 disabled:opacity-50"
                    />
                </div>
            ))}
            <button
                type="submit"
                className="btn btn-primary w-full cursor-pointer bg-[#DFD0B8] text-[#222831] h-12 rounded-md font-medium hover:bg-[#948979]"
                disabled={loading}
            >
                {loading ? 'Processing...' : submitLabel}
            </button>
        </form>
    )
}
