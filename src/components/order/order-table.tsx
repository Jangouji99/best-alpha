import { Table } from '@components/ui/table';
import Input from '@components/ui/form/input';
import { useEffect, useState } from 'react';
import Pagination from '@components/ui/pagination';
import ActionsButton from '@components/ui/action-button';
import { TotalPrice } from '@components/order/price';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { BsSearch } from 'react-icons/bs';
import { Quotation } from '@framework/types';
import { useTranslation } from 'src/app/i18n/client';
import { useGetQuotations } from '@framework/order/get-quotations';
import { isEmpty } from 'lodash';
type Props = {
  lang: string;
  id: string;
}

export const CreatedAt: React.FC<{ createdAt?: string }> = ({ createdAt }) => {
  dayjs.extend(relativeTime);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return (
    <span className="whitespace-nowrap">
      {dayjs.utc(createdAt).tz(dayjs.tz.guess()).fromNow()}
    </span>
  );
};

export const Status: React.FC<{ item?: any }> = ({ item }) => {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return '#28a745'; // Green
      case 'pending':
        return '#ffc107'; // Yellow
      case 'accepted':
        return '#007bff'; // Blue
      default:
        return '#dc3545'; // Gray for unknown statuses
    }
  };
  return (
    <span className={item?.status?.replace(/\s/g, '_').toLowerCase()}>
      <span
        className="bullet"
        style={{ backgroundColor: getStatusColor(item?.status) }}
      />
      {item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)}
    </span>
  );
};



const OrderTable: React.FC<{ lang: string }> = ({ lang }) => {
  const { t } = useTranslation(lang, 'forms');
  const [value, setValue] = useState<Quotation[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const countPerPage = 5;
  const [filterData, setFilterData] = useState<Quotation[]>([]);
  const [tempIdList, setTempIdList] = useState<string[]>([]);

  useEffect(() => {
    const savedQuotation = localStorage.getItem('quotations');
    if (savedQuotation) {
      const parsedQuotation = JSON.parse(savedQuotation);
      if (Array.isArray(parsedQuotation)) {
        const tempIds = parsedQuotation.map((quotation: Quotation) => quotation._id);
        setTempIdList(tempIds);
      }
    }
  }, []);

  const { data, isLoading, error } = useGetQuotations(tempIdList.join(','), lang);
  useEffect(() => {
    if (!isEmpty(data)) {
      setValue(data || []);
      setFilterData(data?.slice(0, countPerPage) || []); // Set initial filter data
    }
  }, [data, countPerPage]);

  const updatePage = (page: number) => {
    setCurrentPage(page);
    const to = countPerPage * page;
    const from = to - countPerPage;
    setFilterData(value.slice(from, to)); // Update filterData for the current page
  };

  const onChangeSearch = (e: any) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to the first page when search term changes
    if (e.target.value) {
      const filtered = value.filter((item: Quotation) =>
        item._id.toLowerCase().includes(e.target.value.toLowerCase()) || item.name.toLowerCase().includes(e.target.value.toLowerCase()) || item.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilterData(filtered.slice(0, countPerPage)); // Update filterData based on search
    } else {
      updatePage(1); // Reset to the first page if search term is cleared
    }
  };



  const onSubmitHandle = (e: any) => {
    e.preventDefault();
  };

  const columns = [
    {
      title: t('text-order-number'),
      dataIndex: '_id',
      key: '_id',
      className: 'id-cell',
      width: 200,
    },
    {
      title: t('company-name'),
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: t('status'),
      key: 'status',
      width: 145,
      render: function status(item: any) {
        return <Status item={item} />;
      },
    },
    {
      title: t('email-address'),
      dataIndex: 'email',
      key: 'email',
      width: 200,
    },
    {
      title: t('created_at'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 140,
      render: (createdAt: string) => <CreatedAt createdAt={createdAt} />,
    },
    {
      dataIndex: '_id',
      key: '_id',
      width: 80,
      render: (id: string) => <ActionsButton id={id} lang={lang} />,
      className: 'operations-cell',
    },
  ];

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[64vh] text-center">
        <div className="loader"></div>
      </div>
    )
  }

  return (
    <>
      <div className="items-center mb-5 md:flex md:justify-between sm:mb-10">
        <h2 className="mb-4 text-sm font-semibold md:text-xl text-brand-dark md:mb-0">
          {t('request_quotation_list')}
        </h2>
        <form onSubmit={onSubmitHandle} className="relative">
          <span className="absolute ltr:right-3 rtl:left-3 top-[80%] transform -translate-y-1/2 order-icon-color">
            <BsSearch size={19} />
          </span>
          <Input
            name="search"
            type="search"
            value={searchTerm}
            onChange={onChangeSearch}
            placeholder={t('order-page-input-placeholder')}
            inputClassName="h-[46px] w-full bg-white border border-[#E3E8EC] rounded-md order-search focus:border-2 focus:outline-none focus:border-brand focus:text-brand-muted"
            lang={lang}
          />
        </form>
      </div>
      <div className="order-list-table-wrapper">
        <Table
          className="order-list-table"
          columns={columns}
          data={filterData}
          rowKey="_id" // Ensure this matches the unique identifier for each order
          scroll={{ x: 750 }}
        />
      </div>
      {!searchTerm.trim() && (
        <div className="mt-5 ltr:text-right rtl:text-left">
          <Pagination
            current={currentPage}
            onChange={updatePage}
            pageSize={countPerPage}
            total={value.length}
            prevIcon={<GrPrevious size={12} style={{ color: '#090B17' }} />}
            nextIcon={<GrNext size={12} style={{ color: '#090B17' }} />}
            className="order-table-pagination"
          />
        </div>
      )}
    </>
  );
};

export default OrderTable;
