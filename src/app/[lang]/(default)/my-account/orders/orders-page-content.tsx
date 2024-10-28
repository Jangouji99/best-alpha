'use client';

import OrderTable from '@components/order/order-table';

export default function OrdersPageContent({ lang }: { lang: string }) {

  return (
    <OrderTable lang={lang} />
  );
}
