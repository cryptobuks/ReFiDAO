import type { NextPageWithLayout } from '@/types';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import routes from '@/config/routes';
import Layout from '@/layouts/_layout';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import { ExportIcon } from '@/components/icons/export-icon';
import { Close as CloseIcon } from '@/components/icons/close';
import Input from '@/components/ui/forms/input';
import Textarea from '@/components/ui/forms/textarea';
import Listbox, { ListboxOption } from '@/components/ui/list-box';
// static data
import votePool from '@/assets/images/vote-pool.svg';

const actionOptions = [
  {
    name: 'Custom Contact',
    value: 'custom_contact',
  },
  {
    name: 'REFIDAO Token',
    value: 'criptic_token',
  },
  {
    name: 'Reserve',
    value: 'reserve',
  },
];

const reserveOptions = [
  {
    name: 'Renounce Ownership',
    value: 'renounceOwnership',
  },
  {
    name: 'Set Rate Mantissa',
    value: 'setRateMantissa',
  },
  {
    name: 'Transfer Ownership',
    value: 'transferOwnership',
  },
  {
    name: 'Withdraw Reverse',
    value: 'withdrawReverse',
  },
];

const cripticTokenOptions = [
  {
    name: 'Approve',
    value: 'approve',
  },
  {
    name: 'Delegated',
    value: 'delegated',
  },
  {
    name: 'Mint',
    value: 'mint',
  },
  {
    name: 'Set Minter',
    value: 'setMinter',
  },
  {
    name: 'Transfer',
    value: 'transfer',
  },
  {
    name: 'Transfer From',
    value: 'transferFrom',
  },
];

function CripticTokenAction({
  selectedOption,
  onChange,
}: {
  selectedOption: ListboxOption;
  onChange: React.Dispatch<React.SetStateAction<ListboxOption>>;
}) {
  return (
    <>
      <Listbox
        className="w-full sm:w-80"
        options={cripticTokenOptions}
        selectedOption={selectedOption}
        onChange={onChange}
      />
      {selectedOption.value === 'approve' && (
        <>
          <Input
            label="Spender address"
            useUppercaseLabel={false}
            placeholder="Enter spender address"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
        </>
      )}
      {selectedOption.value === 'delegated' && (
        <Input
          label="Delegated address"
          useUppercaseLabel={false}
          placeholder="Enter delegated address"
          className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
        />
      )}
      {selectedOption.value === 'mint' && (
        <>
          <Input
            label="Dst address"
            useUppercaseLabel={false}
            placeholder="Enter dst address"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
        </>
      )}
      {selectedOption.value === 'setMinter' && (
        <Input
          label="Minter address"
          useUppercaseLabel={false}
          placeholder="Enter minter address"
          className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
        />
      )}
      {selectedOption.value === 'transfer' && (
        <>
          <Input
            label="Dst address"
            useUppercaseLabel={false}
            placeholder="Enter dst address"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
        </>
      )}
      {selectedOption.value === 'transferFrom' && (
        <>
          <Input
            label="Src address"
            useUppercaseLabel={false}
            placeholder="Enter src address"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
          <Input
            label="Dst address"
            useUppercaseLabel={false}
            placeholder="Enter dst address"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
          <Input
            label="Raw amount unit256"
            useUppercaseLabel={false}
            placeholder="Enter rawAmount in unit256"
            className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
          />
        </>
      )}
    </>
  );
}

function ActionFields() {
  let [actionType, setActionType] = useState(actionOptions[0]);
  let [reserveAction, setReserveAction] = useState(reserveOptions[0]);
  let [cripticTokenAction, setCripticTokenAction] = useState(
    cripticTokenOptions[0]
  );
  return (
    <div className="">
      <div className="group mb-4 rounded-md bg-gray-100/90 p-5 pt-3 dark:bg-dark/60 xs:p-6 xs:pb-8">
        <div className="-mr-2 mb-3 flex items-center justify-between">
          <h3 className="text-base font-medium dark:text-gray-100">
            Action #1
          </h3>
          <Button
            type="button"
            size="mini"
            shape="circle"
            variant="transparent"
            className="opacity-0 group-hover:opacity-100"
          >
            <CloseIcon className="h-auto w-[11px] xs:w-3" />
          </Button>
        </div>
        <>
          <Listbox
            className="w-full sm:w-80"
            options={actionOptions}
            selectedOption={actionType}
            onChange={setActionType}
          />
          {actionType.value === 'custom_contact' && (
            <Input
              className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12"
              useUppercaseLabel={false}
              placeholder="Enter contact address 0x1f9840a85..."
            />
          )}
          {actionType.value === 'criptic_token' && (
            <div className="rtl:xs:mlr6 rtl:sm:mlr12 mt-4 ltr:xs:ml-6 ltr:sm:ml-12">
              <CripticTokenAction
                selectedOption={cripticTokenAction}
                onChange={setCripticTokenAction}
              />
            </div>
          )}
          {actionType.value === 'reserve' && (
            <div className="mt-4 ltr:xs:ml-6 rtl:xs:mr-6 ltr:sm:ml-12 rtl:sm:mr-12">
              <Listbox
                className="w-full sm:w-80"
                options={reserveOptions}
                selectedOption={reserveAction}
                onChange={setReserveAction}
              />
            </div>
          )}
        </>
      </div>
      <Button variant="ghost" className="mt-2 xs:mt-3">
        Add another action
      </Button>
    </div>
  );
}

const CreateProposalPage: NextPageWithLayout = () => {
  const router = useRouter();
  function goToAllProposalPage() {
    setTimeout(() => {
      router.push(routes.proposals);
    }, 800);
  }
  return (
    <>
      <NextSeo
        title="Treasury"
        description="RefiDao - treasury"
      />
      <section className="mx-auto w-full max-w-[1160px] text-sm sm:pt-10 4xl:py-16">
        <header className="mb-10 flex flex-col gap-4 rounded-lg bg-white p-5 py-6 shadow-card dark:bg-light-dark xs:p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="shrink-0">
            <Button
              size="mini"
              shape="rounded"
              fullWidth={true}
              className="uppercase"
              onClick={() => goToAllProposalPage()}
            >
              Back
            </Button>
          </div>
        </header>
        <h2 className="mb-5 text-lg font-medium dark:text-gray-100 sm:mb-6 lg:mb-7 xl:text-xl">
          Treasury
        </h2>
        <div className="mb-6 rounded-lg border-2 border-gray-300 bg-white p-5 dark:border-gray-500 dark:bg-light-dark xs:py-6 lg:px-8 lg:py-6">
          <p className="leading-loose text-gray-600 dark:text-gray-400 text-center">
            This space doesn't have a treasury yet
          </p>
        </div>
      </section>
    </>
  );
};

CreateProposalPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default CreateProposalPage;
