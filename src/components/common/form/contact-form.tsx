'use client';

import Input from '@components/ui/form/input';
import Button from '@components/ui/button';
import TextArea from '@components/ui/form/text-area';
import { useForm } from 'react-hook-form';
import { useIsMounted } from '@utils/use-is-mounted';
import { useTranslation } from 'src/app/i18n/client';
import { useCreateContact } from '@framework/contact/create-contact';
import { ContactRequest } from '@framework/types';
import { useEffect, useState } from 'react';
interface ContactFormValues {
  name: string;
  email: string;
  country: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC<{ lang: string }> = ({ lang }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormValues>();
  const { t } = useTranslation(lang);
  const { mutate: sendContact, data, isSuccess, error } = useCreateContact();
  const [successMessage, setSuccessMessage] = useState<string | null>(null); // State for success message
  function onSubmit(values: ContactFormValues) {
    const request: ContactRequest = {
      name: values.name,
      email: values.email,
      country: values.country,
      subject: values.subject,
      message: values.message
    };
    sendContact({ request, lang })
  }

  // Use useEffect to reset form inputs when isSuccess becomes true
  useEffect(() => {
    if (isSuccess) {
      reset();  // Reset all form fields to initial state
      const newLocal = t('message-success');
      setSuccessMessage(newLocal);
    }
  }, [isSuccess, reset]);

  // Clear success message after a delay (optional)
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null); // Clear the message after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [successMessage]);


  const mounted = useIsMounted();



  return (
    <>
      {/* Display success message */}
      {successMessage && (
        <p className=" text-green-600 mb-7 lg:mb-7">{successMessage}</p> // Adjust styling as needed
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <Input
          variant="solid"
          label="forms:label-name-required"
          placeholder="forms:placeholder-name"
          {...register('name', { required: 'forms:name-required' })}
          error={errors.name?.message}
          lang={lang}
        />
        <Input
          type="email"
          variant="solid"
          label="forms:label-email-required"
          placeholder="forms:placeholder-email"
          {...register('email', {
            required: 'forms:email-required',
            pattern: {
              value:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: 'forms:email-error',
            },
          })}
          error={errors.email?.message}
          lang={lang}
        />
        <Input
          variant="solid"
          type="text"
          label="forms:label-country"
          placeholder="forms:placeholder-country"
          {...register('country', {
            required: 'forms:country-required',
          })}
          error={errors.country?.message}
          lang={lang}
        />
        <Input
          variant="solid"
          type="text"
          label="forms:label-subject"
          placeholder="forms:placeholder-subject"
          {...register('subject')}
          lang={lang}
        />
        <TextArea
          variant="solid"
          label="forms:label-message"
          {...register('message')}
          placeholder="forms:placeholder-briefly-describe"
          lang={lang}
        />
        <Button variant="formButton" className="w-full" type="submit">
          {mounted && <>{t('common:button-send-message')}</>}
        </Button>
      </form>
    </>

  );
};

export default ContactForm;
