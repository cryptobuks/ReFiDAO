import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import {
  useTable,
  useResizeColumns,
  useFlexLayout,
  useSortBy,
  usePagination,
} from 'react-table';
import Button from '@/components/ui/button';
import Scrollbar from '@/components/ui/scrollbar';
import { ChevronDown } from '@/components/icons/chevron-down';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowLeft } from '@/components/icons/long-arrow-left';
import { LinkIcon } from '@/components/icons/link-icon';
import { MembershipData } from '@/data/static/membership-data';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { RadioGroup } from '@/components/ui/radio-group';
import { motion } from 'framer-motion';
import { Listbox } from '@/components/ui/listbox';
import { Transition } from '@/components/ui/transition';
import { SearchIcon } from '@/components/icons/search';
import { useModal } from '@/components/modal-views/context';

export default function TransactionTable() {
  const data = React.useMemo(() => MembershipData, []);

  const sort = [
    { id: 1, name: 'Delegate' },
    { id: 2, name: 'Member' },
  ];

  const COLUMNS = [
    {
      Header: 'ID',
      accessor: 'id',
      minWidth: 60,
      maxWidth: 80,
    },
    {
      Header: () => <div className="ltr:ml-auto rtl:mr-auto">Address</div>,
      accessor: 'address',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="flex items-center justify-end">
          <LinkIcon className="h-[18px] w-[18px] ltr:mr-2 rtl:ml-2" /> {value}
        </div>
      ),
      minWidth: 100,
      maxWidth: 280,
    },
    {
      Header: () => <div className="ltr:ml-auto rtl:mr-auto">Date join</div>,
      accessor: 'createdAt',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="ltr:text-right rtl:text-left">{value}</div>
      ),
      minWidth: 160,
      maxWidth: 220,
    },
    {
      Header: () => <div className="ltr:ml-auto rtl:mr-auto">Role</div>,
      accessor: 'role',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="ltr:text-right rtl:text-left">{value}</div>
      ),
      minWidth: 80,
      maxWidth: 120,
    },
    {
      Header: () => <div className="ltr:ml-auto rtl:mr-auto">Status</div>,
      accessor: 'status',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="ltr:text-right rtl:text-left">{value}</div>
      ),
      minWidth: 100,
      maxWidth: 180,
    },
    {
      Header: () => <div className="ltr:ml-auto rtl:mr-auto">Action</div>,
      accessor: 'address_action',
      // @ts-ignore
      Cell: ({ cell: { value } }) => (
        <div className="flex items-center justify-end">
          <Button shape="rounded" size="mini" color="primary"
            onClick={() => openModal('MEMBERSHIP_PROFILE_VIEW')}>View</Button>
        </div>
      ),
      minWidth: 100,
      maxWidth: 280,
    }
  ];
  const columns = React.useMemo(() => COLUMNS, []);
  const { openModal } = useModal();

  const {
    getTableProps,
    getTableBodyProps,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    headerGroups,
    page,
    nextPage,
    previousPage,
    prepareRow,
  } = useTable(
    {
      // @ts-ignore
      columns,
      data,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    useResizeColumns,
    useFlexLayout,
    usePagination
  );

  function SortList() {
    const [selectedItem, setSelectedItem] = useState(sort[0]);
  
    return (
      <div className="relative w-full md:w-auto">
        <Listbox value={selectedItem} onChange={setSelectedItem}>
          <Listbox.Button className="flex h-11 w-full items-center justify-between rounded-lg bg-gray-100 px-4 text-sm text-gray-900 dark:bg-light-dark dark:text-white md:w-36 lg:w-40 xl:w-56">
            {selectedItem.name}
            <ChevronDown />
          </Listbox.Button>
          <Transition
            enter="ease-out duration-200"
            enterFrom="opacity-0 translate-y-2"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 -translate-y-0"
            leaveTo="opacity-0 translate-y-2"
          >
            <Listbox.Options className="absolute left-0 z-10 mt-2 w-full origin-top-right rounded-lg bg-white p-3 shadow-large dark:bg-light-dark">
              {sort.map((item) => (
                <Listbox.Option key={item.id} value={item}>
                  {({ selected }) => (
                    <div
                      className={`block cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-gray-900 transition dark:text-white  ${
                        selected
                          ? 'my-1 bg-gray-100 dark:bg-dark'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {item.name}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </div>
    );
  }
  
  function Search() {
    return (
      <form
        className="relative flex w-full rounded-full md:w-auto lg:w-64 xl:w-80"
        noValidate
        role="search"
      >
        <label className="flex w-full items-center">
          <input
            className="h-11 w-full appearance-none rounded-lg border-2 border-gray-200 bg-transparent py-1 text-sm tracking-tighter text-gray-900 outline-none transition-all placeholder:text-gray-600 focus:border-gray-900 ltr:pr-5 ltr:pl-10 rtl:pr-10 dark:border-gray-600 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-500"
            placeholder="Search"
            autoComplete="off"
          />
          <span className="pointer-events-none absolute flex h-full w-8 cursor-pointer items-center justify-center text-gray-600 hover:text-gray-900 ltr:left-0 ltr:pl-2 rtl:right-0 rtl:pr-2 dark:text-gray-500 sm:ltr:pl-3 sm:rtl:pr-3">
            <SearchIcon className="h-4 w-4" />
          </span>
        </label>
      </form>
    );
  }

  const { pageIndex } = state;

  return (
    <div className="">
      <div className="rounded-tl-lg rounded-tr-lg bg-white px-4 pt-6 dark:bg-light-dark md:px-8 md:pt-8">
        <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
          <h2 className="mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
            Members
          </h2>
          <Search />
          <SortList />
          <Button 
            shape="rounded"
            onClick={() => openModal('REQUEST_MEMBERSHIP_VIEW')}
            color="primary"
          >Request membership</Button>
        </div>
      </div>
      <div className="-mx-0.5">
        <Scrollbar style={{ width: '100%' }} autoHide="never">
          <div className="px-0.5">
            <table
              {...getTableProps()}
              className="transaction-table w-full border-separate border-0"
            >
              <thead className="text-sm text-gray-500 dark:text-gray-300">
                {headerGroups.map((headerGroup, idx) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={idx}>
                    {headerGroup.headers.map((column, idx) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                        key={idx}
                        className="group  bg-white px-2 py-5 font-normal first:rounded-bl-lg last:rounded-br-lg ltr:first:pl-8 ltr:last:pr-8 rtl:first:pr-8 rtl:last:pl-8 dark:bg-light-dark md:px-4"
                      >
                        <div className="flex items-center">
                          {column.render('Header')}
                          {column.canResize && (
                            <div
                              {...column.getResizerProps()}
                              className={`resizer ${
                                column.isResizing ? 'isResizing' : ''
                              }`}
                            />
                          )}
                          <span className="ltr:ml-1 rtl:mr-1">
                            {column.isSorted ? (
                              column.isSortedDesc ? (
                                <ChevronDown />
                              ) : (
                                <ChevronDown className="rotate-180" />
                              )
                            ) : (
                              <ChevronDown className="rotate-180 opacity-0 transition group-hover:opacity-50" />
                            )}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                {...getTableBodyProps()}
                className="text-xs font-medium text-gray-900 dark:text-white 3xl:text-sm"
              >
                {page.map((row, idx) => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      key={idx}
                      className="mb-3 items-center rounded-lg bg-white uppercase shadow-card last:mb-0 dark:bg-light-dark"
                    >
                      {row.cells.map((cell, idx) => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            key={idx}
                            className="px-2 py-4 tracking-[1px] ltr:first:pl-4 ltr:last:pr-4 rtl:first:pr-8 rtl:last:pl-8 md:px-4 md:py-6 md:ltr:first:pl-8 md:ltr:last:pr-8 3xl:py-5"
                          >
                            {cell.render('Cell')}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Scrollbar>
      </div>
      <div className="mt-3 flex items-center justify-center rounded-lg bg-white px-5 py-4 text-sm shadow-card dark:bg-light-dark lg:py-6">
        <div className="flex items-center gap-5">
          <Button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            title="Previous"
            shape="circle"
            variant="transparent"
            size="small"
            className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
          >
            <LongArrowLeft className="h-auto w-4 rtl:rotate-180" />
          </Button>
          <div>
            Page{' '}
            <strong className="font-semibold">
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </div>
          <Button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            title="Next"
            shape="circle"
            variant="transparent"
            size="small"
            className="text-gray-700 disabled:text-gray-400 dark:text-white disabled:dark:text-gray-400"
          >
            <LongArrowRight className="h-auto w-4 rtl:rotate-180 " />
          </Button>
        </div>
      </div>
    </div>
  );
}
