import { useState } from 'react'
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import emailjs from 'emailjs-com'
import {
    faSmileBeam,
    faMeh,
    faFrown,
    faAngry,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

// Validation schema using Yup
const validationSchema = [
    Yup.object({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
    }),
    Yup.object({
        review: Yup.string().required('Please select a review'),
    }),
    Yup.object({}),
]

const MultiStepForm = () => {
    const [step, setStep] = useState(0)

    const handleSubmit = (values, { resetForm }) => {
        console.log('Form values before sending:', values) // Debugging line

        emailjs
            .send(
                'service_multistepform',
                'template_q189z7g',
                {
                    ...values, // Include all form values
                    to_email: values.email, // Add the user's email address to the data
                },
                'lPzIFpCSEZmhOb89o'
            )
            .then(
                (response) => {
                    console.log('Success:', response)
                    resetForm()
                    setStep(0)
                },
                (error) => {
                    console.log('Error:', error)
                }
            )
    }

    const handleNext = () => {
        setStep(step + 1)
    }

    const handleBack = () => {
        setStep(step - 1)
    }

    return (
        <div className="container mx-auto p-4">
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    review: '',
                    comments: '',
                }}
                validationSchema={validationSchema[step]}
                onSubmit={handleSubmit}
            >
                {({ values }) => (
                    <Form className="bg-white p-6 rounded shadow-lg">
                        {step === 0 && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    Step 1: Identification
                                </h2>
                                <div className="mb-4">
                                    <label className="block text-gray-700">
                                        Name
                                    </label>
                                    <Field
                                        name="name"
                                        type="text"
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">
                                        Email
                                    </label>
                                    <Field
                                        name="email"
                                        type="email"
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 1 && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    Step 2: Review
                                </h2>
                                <div className="w-1/2 mb-4 flex justify-between gap-24">
                                    <label>
                                        <Field
                                            type="radio"
                                            name="review"
                                            value="unhappy"
                                            className="mr-2"
                                        />
                                        <FontAwesomeIcon
                                            icon={faFrown}
                                            className="text-red-500 text-3xl"
                                        />
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            name="review"
                                            value="could be better"
                                            className="mr-2"
                                        />
                                        <FontAwesomeIcon
                                            icon={faMeh}
                                            className="text-yellow-500 text-3xl"
                                        />
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            name="review"
                                            value="satisfied"
                                            className="mr-2"
                                        />
                                        <FontAwesomeIcon
                                            icon={faSmileBeam}
                                            className="text-green-500 text-3xl"
                                        />
                                    </label>
                                    <label>
                                        <Field
                                            type="radio"
                                            name="review"
                                            value="very satisfied"
                                            className="mr-2"
                                        />
                                        <FontAwesomeIcon
                                            icon={faAngry}
                                            className="text-blue-500 text-3xl"
                                        />
                                    </label>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-700">
                                        Comments (optional)
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="comments"
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    />
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">
                                    Step 3: Review and Send
                                </h2>
                                <div className="mb-4">
                                    <p>
                                        <strong>Name:</strong> {values.name}
                                    </p>
                                    <p>
                                        <strong>Email:</strong> {values.email}
                                    </p>
                                    <p>
                                        <strong>Review:</strong> {values.review}
                                    </p>
                                    <p>
                                        <strong>Comments:</strong>{' '}
                                        {values.comments}
                                    </p>
                                </div>
                            </div>
                        )}

                        <div className="flex justify-between">
                            {step > 0 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
                                >
                                    Back
                                </button>
                            )}
                            <div>
                                {step < 2 ? (
                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
                                    >
                                        Next
                                    </button>
                                ) : (
                                    <button
                                        type="submit"
                                        className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
                                    >
                                        Send
                                    </button>
                                )}
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default MultiStepForm
