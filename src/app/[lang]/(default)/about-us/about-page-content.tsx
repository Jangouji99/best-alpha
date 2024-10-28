'use client';

import { useTranslation } from 'src/app/i18n/client';
import Image from '@components/ui/image';
import Container from '@components/ui/container';
import { aboutSetting } from '@settings/about-setting';
import aboutUs1 from '@public/assets/images/about-us/Frozen-Chicken.jpg';
import aboutUs2 from '@public/assets/images/about-us/frozen-beef-meat.jpg';
import aboutUs3 from '@public/assets/images/about-us/rice.jpg';
import aboutUs4 from '@public/assets/images/about-us/Corn-Wheat.jpg';
import aboutUs5 from '@public/assets/images/about-us/Flour.jpg';
import aboutUs6 from '@public/assets/images/about-us/pepper.jpg';
import aboutUs7 from '@public/assets/images/about-us/Condiments-Spices.png';
import aboutUs8 from '@public/assets/images/about-us/coffe.webp';
import aboutUs9 from '@public/assets/images/about-us/tea.jpg';
import banner from '@public/assets/images/about-us/banner.jpg'
import { useCompanyProfileQuery } from '@framework/company/get-company-profile';

const backgroundThumbnail = '/assets/images/about-us/import_export_banner.jpg';

export default function AboutPageContent({ lang }: { lang: string }) {
  const { t } = useTranslation(lang, 'about');
  const { data, isLoading, error } = useCompanyProfileQuery({ lang });
  const baseUrlCertificate = process.env.NEXT_PUBLIC_URL_CETIFICATE;
  const totalCertifications = data?.certificates?.length || 0;
  const CertificationsLength = Math.ceil(totalCertifications / 2);
  const firstCertifications = data?.certificates?.slice(0, CertificationsLength);
  const secondCertifications = data?.certificates?.slice(CertificationsLength);
  return (
    <>
      <div
        className="flex justify-center h-[250px] lg:h-96 2xl:h-[500px] w-full bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${backgroundThumbnail})`,
        }}
      />
      <div className="py-8 lg:py-16 2xl:py-20">
        <Container>
          <div className="flex flex-col w-full mx-auto max-w-[1200px]">
            <h2 className="text-lg md:text-xl lg:text-[30px] text-brand-dark font-semibold mb-1 lg:mb-7">
              {
                // @ts-ignore
                t(aboutSetting?.titleOne)
              }
            </h2>
            <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">
              {t('about-title')}
            </h2>
            <p className='text-justify'>{t('about-description')}</p>
            <div
              className="text-sm leading-7 text-brand-dark lg:text-15px lg:leading-loose">
              <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">{t('frozen-foods-title')}</h2>
              <p>{t('frozen-foods-title')}</p>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('frozen-chicken')}</span>{t('frozen-chicken-description')}</p>
                </li>
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('frozen-beef')}</span>{t('frozen-beef-description')}</p>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 my-8 lg:my-14">
              <Image
                src={aboutUs1}
                alt={t('text-map')}
                className="ltr:mr-5 rtl:ml-5 rounded-xl"
              />
              <Image
                src={aboutUs2} alt={t('text-map')} className="rounded-xl"
              />
            </div>
            <div
              className="text-sm leading-7 text-brand-dark lg:text-15px lg:leading-loose">
              <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">{t('grains-title')}</h2>
              <p>{t('grains-description')}</p>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('rice')}</span>{t('rice-description')}</p>
                </li>
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('corn-wheat')}</span> {t('corn-wheat-description')}</p>
                </li>
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('flour')}</span>{t('flour-description')}</p>
                </li>
              </ul>
            </div>

            <div className="flex flex-col grid-cols-3 gap-4 my-8 lg:my-14 sm:grid">
              <Image
                src={aboutUs3}
                alt={t('text-map')}
                className="ltr:mr-4 rtl:ml-4 rounded-xl"
              />
              <Image
                src={aboutUs4}
                alt={
                  // @ts-ignore
                  t('text-map')
                }
                className="ltr:mr-4 rtl:ml-4 rounded-xl"
              />
              <Image src={aboutUs5} alt={t('text-map')} className="rounded-xl" />
            </div>
            <div
              className="text-sm leading-7 text-brand-dark lg:text-15px lg:leading-loose">
              <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">{t('condiments-title')}</h2>
              <p>{t('condiments-description')}</p>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('pepper-ketchup')}</span>{t('pepper-ketchup-description')}</p>
                </li>
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('other-condiments')}</span>{t('other-condiments-description')}</p>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 my-8 lg:my-14">
              <Image
                src={aboutUs6}
                alt={t('text-map')}
                className="ltr:mr-5 rtl:ml-5 rounded-xl"
              />
              <Image
                src={aboutUs7} alt={t('text-map')} className="rounded-xl"
              />
            </div>

            <div
              className="text-sm leading-7 text-brand-dark  lg:text-15px lg:leading-loose">
              <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">{t('beverages-title')}</h2>
              <p>{t('beverages-description')}</p>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('beverages')}</span> {t('beverages-subtitle')}</p>
                </li>
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('coffee-tea')}</span>{t('coffee-tea-description')}</p>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 my-8 lg:my-14">
              <Image
                src={aboutUs8}
                alt={t('text-map')}
                className="ltr:mr-5 rtl:ml-5 rounded-xl"
              />
              <Image
                src={aboutUs9} alt={t('text-map')} className="rounded-xl"
              />
            </div>

            <div
              className="text-sm leading-7 text-brand-dark lg:text-15px lg:leading-loose">
              <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">{t('miscellaneous-title')}</h2>
              <p>{t('miscellaneous-description')}</p>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('other-categories')}</span>{t('other-categories-description')}</p>
                </li>
              </ul>
            </div>
            <div
              className="text-sm leading-7 text-brand-dark lg:text-15px lg:leading-loose mt-4 lg:mt-7">
              <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-semibold mb-4 lg:mb-7">{t('why-choose-us-title')}</h2>
              <ul className="list-disc pl-6">
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('container-handling')}</span>{t('container-description')}</p>
                </li>
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('global-reach')}</span>{t('global-reach-description')}</p>
                </li>
                <li className="mb-2">
                  <p className='text-justify'><span className='font-bold text text-brand-dark'>{t('quality-assurance')}</span>{t('quality-assurance-description')}</p>
                </li>
              </ul>
            </div>

            <div
              className="text-sm leading-7 text-brand-dark lg:text-15px lg:leading-loose mt-4 lg:mt-4">
              <h2 className="text-lg md:text-xl lg:text-[24px] text-brand-dark font-bold mb-4 lg:mb-7">{t('safety-title')}</h2>
              <p className='text-justify'>{t('safety-message')}</p>
            </div>

            <p className="text-brand-dark font-medium text-base lg:text-lg leading-7 2xl:text-[20px] lg:leading-loose lg:mt-4 mb-3.5">
              {t(aboutSetting.titleThree)} &nbsp;
              <a href="mailto:info@bestalphalimited.com">info@bestalphalimited.com</a>.
            </p>
          </div>

        </Container>
      </div>

      <section className="py-28">
        <h2 className="text-3xl text-brand-dark font-semibold text-center mb-8">
          {t('our_certifications')}
        </h2>
        <div className="logos__marquee">
          <div className="marquee__logos me-4">
            {firstCertifications?.concat(firstCertifications)?.map((certifications, index) => (
              <div
                key={`${certifications.name}-${index}`}
                className=" bg-white  rounded-xl shadow-featured"
              >
                <Image
                  src={`${baseUrlCertificate}${certifications.logo}`}
                  alt={certifications.name}
                  width={100}
                  height={50}
                  loading="eager"
                />
              </div>
            ))}
          </div>
          {/* The second row of logos */}
          <div className="marquee__logos" aria-hidden="true">
            {firstCertifications?.concat(firstCertifications)?.map((certifications, index) => (
              <div
                key={`${certifications.name}-${index}`}
                className=" bg-white rounded-xl shadow-featured "
              >
                <Image
                  src={`${baseUrlCertificate}${certifications.logo}`}
                  alt={certifications.name}
                  width={100}
                  height={50}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="logos__marquee reverse">
          <div className="marquee__logos me-4">
            {secondCertifications?.concat(secondCertifications)?.map((certifications, index) => (
              <div
                key={`${certifications.name}-${index}`}
                className=" bg-white rounded-xl shadow-featured"
              >
                <Image
                  src={`${baseUrlCertificate}${certifications.logo}`}
                  alt={certifications.name}
                  width={100}
                  height={50}
                  loading="eager"
                />
              </div>
            ))}
          </div>
          {/* The second row of logos */}
          <div className="marquee__logos" aria-hidden="true">
            {secondCertifications?.concat(secondCertifications)?.map((certifications, index) => (
              <div
                key={`${certifications.name}-${index}`}
                className=" bg-white rounded-xl shadow-featured"
              >
                <Image
                  src={`${baseUrlCertificate}${certifications.logo}`}
                  alt={certifications.name}
                  width={100}
                  height={50}
                  loading="eager"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
