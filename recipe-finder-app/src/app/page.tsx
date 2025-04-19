'use client';

import React, { useState } from 'react';
import { CUISINE_TYPES } from './constants/cuisineTypes';
import { Field, Form, Formik } from 'formik';

import { ListBox } from 'primereact/listbox';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

interface SubmitForm {
  query: string;
  cuisine: string;
  preparationTime: string;
}

export default function Home() {
  const [showListbox, setShowListBox] = useState(false);
  const router = useRouter();

  const onSubmitHandle = (values: SubmitForm) => {
    const searchParams = new URLSearchParams();

    if (values.query.trim()) searchParams.set('query', values.query.trim());
    if (values.cuisine.trim()) searchParams.set('cuisine', values.cuisine.trim());
    if (values.preparationTime.trim())
      searchParams.set('preparationTime', values.preparationTime.trim());

    router.push(`/recipes?${searchParams.toString()}`);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <main className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Search recipes</h1>

        <Formik
          initialValues={{
            query: '',
            cuisine: '',
            preparationTime: '',
          }}
          onSubmit={(values: SubmitForm) => {
            onSubmitHandle(values);
          }}
        >
          {({ values, setFieldValue }) => {
            const isNextButtonDisabled = !values.cuisine.trim() && !values.preparationTime.trim();

            return (
              <Form className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <label htmlFor="query" className="mb-1 text-gray-700 font-medium">
                    Query
                  </label>
                  <Field
                    id="query"
                    name="query"
                    placeholder="Enter your query"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <div className="flex flex-col relative">
                  <label htmlFor="cuisine" className="mb-1 text-gray-700 font-medium">
                    Cuisine
                  </label>
                  <Field
                    id="cuisine"
                    name="cuisine"
                    placeholder="Enter your cuisine"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    onClick={() => setShowListBox(true)}
                    readOnly
                  />
                  {showListbox && (
                    <ListBox
                      value={values.cuisine}
                      onChange={(e) => {
                        setFieldValue('cuisine', e.value);
                        setShowListBox(false);
                      }}
                      options={CUISINE_TYPES}
                      className="w-full md:w-14rem absolute top-full z-10 mt-2 bg-gray-200 p-2.5 rounded-2xl"
                      listStyle={{ maxHeight: '100px' }}
                    />
                  )}
                </div>

                <div className="flex flex-col">
                  <label htmlFor="preparationTime" className="mb-1 text-gray-700 font-medium">
                    Max preparation time (min)
                  </label>
                  <Field
                    id="preparationTime"
                    name="preparationTime"
                    placeholder="e.g. 30"
                    className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                </div>

                <button
                  type="submit"
                  className={clsx(
                    'w-full mt-4 py-2 px-4 text-white text-lg font-semibold rounded-xl transition duration-200',
                    {
                      'bg-blue-500 hover:bg-blue-600': !isNextButtonDisabled,
                      'bg-gray-400 cursor-not-allowed': isNextButtonDisabled,
                    },
                  )}
                  disabled={isNextButtonDisabled}
                >
                  Next
                </button>
              </Form>
            );
          }}
        </Formik>
      </main>
    </div>
  );
}
