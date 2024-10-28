'use client';

import { useCompanyProfileQuery } from '@framework/company/get-company-profile';
import Image from 'next/image';
import React from 'react';
import { useTranslation } from 'src/app/i18n/client';

interface PartnerProps {
    lang: string;
    className?: string;
}

const OurPartner: React.FC<PartnerProps> = ({
    lang,
    className = 'mb-3 md:mb-4 lg:mb-5 xl:mb-6'
}) => {
    const { t } = useTranslation(lang, 'common');
    const { data, isLoading, error } = useCompanyProfileQuery({ lang });
    const baseUrl = process.env.NEXT_PUBLIC_URL_PARTNER;


    const totalPartner = data?.partners?.length || 0;
    const partnerLength = Math.ceil(totalPartner / 2);
    const firstPartners = data?.partners?.slice(0, partnerLength);
    const secondPartners = data?.partners?.slice(partnerLength);



    return (
        <>
            <section className="py-28">
                <h2 className="text-3xl text-brand-dark font-semibold text-center mb-8">
                    {t('our_special_partners')}
                </h2>
                <div className="logos__marquee">
                    <div className="marquee__logos me-4">
                        {firstPartners?.concat(firstPartners)?.map((partner, index) => (
                            <div
                                key={`${partner.name}-${index}`}
                                className=" bg-white  rounded-xl shadow-featured"
                            >
                                <Image
                                    src={`${baseUrl}${partner.logo}`}
                                    alt={partner.name}
                                    width={100}
                                    height={50}
                                    loading="eager"
                                />
                            </div>
                        ))}
                    </div>
                    {/* The second row of logos */}
                    <div className="marquee__logos" aria-hidden="true">
                        {firstPartners?.concat(firstPartners)?.map((partner, index) => (
                            <div
                                key={`${partner.name}-${index}`}
                                className=" bg-white rounded-xl shadow-featured "
                            >
                                <Image
                                    src={`${baseUrl}${partner.logo}`}
                                    alt={partner.name}
                                    width={100}
                                    height={50}
                                    loading="eager"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="logos__marquee reverse ">
                    <div className="marquee__logos me-4">
                        {secondPartners?.concat(secondPartners)?.map((partner, index) => (
                            <div
                                key={`${partner.name}-${index}`}
                                className=" bg-white  rounded-xl shadow-featured"
                            >
                                <Image
                                    src={`${baseUrl}${partner.logo}`}
                                    alt={partner.name}
                                    width={100}
                                    height={50}
                                    loading="eager"
                                />
                            </div>
                        ))}
                    </div>
                    {/* The second row of logos */}
                    <div className="marquee__logos" aria-hidden="true">
                        {secondPartners?.concat(secondPartners)?.map((partner, index) => (
                            <div
                                key={`${partner.name}-${index}`}
                                className=" bg-white rounded-xl shadow-featured"
                            >
                                <Image
                                    src={`${baseUrl}${partner.logo}`}
                                    alt={partner.name}
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
};

export default OurPartner;
