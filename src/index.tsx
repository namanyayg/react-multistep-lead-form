import React, { useState, ChangeEvent, FormEvent } from 'react';
import { z } from 'zod';

const LeadSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  lookingFor: z.string().min(1, 'Please select an option'),
});

type LeadData = z.infer<typeof LeadSchema>;

interface ReactMultistepLeadFormProps {
  onComplete: () => void;
  apiUrl: string;
  lookingForOptions: string[];
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
  buttonClassName?: string;
  errorClassName?: string;
}

export const ReactMultistepLeadForm: React.FC<ReactMultistepLeadFormProps> = ({
  onComplete,
  apiUrl,
  lookingForOptions,
  className = "bg-transparent-white backdrop-blur-md rounded-lg p-8",
  inputClassName = "w-full px-3 py-2 bg-transparent-white backdrop-blur-md text-white placeholder-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500",
  labelClassName = "block text-white font-medium mb-2",
  buttonClassName = "w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300",
  errorClassName = "text-red-500 text-xs mt-1",
}) => {
  const [step, setStep] = useState(1);
  const [lead, setLead] = useState<LeadData>({ email: '', phone: '', lookingFor: '' });
  const [errors, setErrors] = useState<Partial<LeadData>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setLead({ ...lead, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateStep = () => {
    let isValid = true;
    const currentField = step === 1 ? 'email' : step === 2 ? 'phone' : 'lookingFor';
    try {
      LeadSchema.pick({ [currentField]: true } as Record<keyof LeadData, true>).parse(lead);
      setErrors({ ...errors, [currentField]: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldError = error.errors[0]?.message || 'Invalid input';
        setErrors({ ...errors, [currentField]: fieldError });
        isValid = false;
      }
    }
    return isValid;
  };

  const submitToAPI = async (data: LeadData) => {
    try {
      await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateStep()) return;

    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
    await submitToAPI(lead);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <label htmlFor="email" className={labelClassName}>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={lead.email}
              onChange={handleChange}
              required
              className={inputClassName}
              placeholder="Enter your email"
            />
            {errors.email && <p className={errorClassName}>{errors.email}</p>}
          </>
        );
      case 2:
        return (
          <>
            <label htmlFor="phone" className={labelClassName}>Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={lead.phone}
              onChange={handleChange}
              required
              className={inputClassName}
              placeholder="Enter your phone number"
            />
            {errors.phone && <p className={errorClassName}>{errors.phone}</p>}
          </>
        );
      case 3:
        return (
          <>
            <label htmlFor="lookingFor" className={labelClassName}>What are you looking for?</label>
            <select
              id="lookingFor"
              name="lookingFor"
              value={lead.lookingFor}
              onChange={handleChange}
              required
              className={inputClassName}
            >
              <option value="">Select an option</option>
              {lookingForOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
            {errors.lookingFor && <p className={errorClassName}>{errors.lookingFor}</p>}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      <div className="mb-6">{renderStep()}</div>
      <button
        type="submit"
        className={buttonClassName}
      >
        {step === 3 ? 'Submit' : 'Next'}
      </button>
    </form>
  );
};

