import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useState } from 'react';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import Layout from '@/layouts/_layout';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import AnchorLink from '@/components/ui/links/anchor-link';
import { Copy } from '@/components/icons/copy';
import { Check } from '@/components/icons/check';
import AuthorInformation from '@/components/author/author-information';
import ProposalTab from '@/components/proposal/proposal-tab';
import Avatar from '@/components/ui/avatar';
import routes from '@/config/routes';
import { useRouter } from 'next/router';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';
import { getVotesByStatus } from '@/data/static/vote-data';
import { SearchIcon } from '@/components/icons/search';
import { Listbox } from '@/components/ui/listbox';
import { ChevronDown } from '@/components/icons/chevron-down';
import { Transition } from '@/components/ui/transition';

// static data
import { authorData } from '@/data/static/author';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const ProposalsPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  const router = useRouter();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');
  const { totalVote: totalOffChainVote } = getVotesByStatus('off-chain');
  const { totalVote: totalExecutableVote } = getVotesByStatus('executable');
  const { totalVote: totalPastVote } = getVotesByStatus('past');
  let [copyButtonStatus, setCopyButtonStatus] = useState(false);
  let [_, copyToClipboard] = useCopyToClipboard();
  const handleCopyToClipboard = () => {
    copyToClipboard(authorData.wallet_key);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  };

  const sort = [
    { id: 1, name: 'All' },
    { id: 2, name: 'Active' },
    { id: 3, name: 'Closed' }
  ];

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


  function goToProposals() {
    setTimeout(() => {
      router.push(routes.proposals);
    }, 200);
  }
  function goToCreateProposalPage() {
    setTimeout(() => {
      router.push(routes.createProposal);
    }, 200);
  }
  function goToTreasury() {
    setTimeout(() => {
      router.push(routes.treasury);
    }, 200);
  }
  function goToAbout() {
    setTimeout(() => {
      router.push(routes.about);
    }, 200);
  }
  function goToSettings() {
    setTimeout(() => {
      router.push(routes.settings);
    }, 200);
  }
  return (
    <>
      <NextSeo
        title="Proposals"
        description="RefiDao proposals"
      />
      <div className="mx-auto mt-12">
        <div className="grid sm:pt-5 2xl:grid-cols-[280px_minmax(auto,_1fr)] 4xl:grid-cols-[320px_minmax(auto,_1fr)] ">
          {/* Left */}
          <div className="rounded-lg border-2 border-gray-200 bg-white p-5 dark:border-gray-200 dark:bg-light-dark">
            <Avatar
              size="lg"
              image={authorData?.avatar?.thumbnail}
              alt="Author"
              className="z-10"
            />
            {/* Profile Info */}
            <div className="flex w-full flex-col md:flex-row lg:flex-row mt-4">
              <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 xl:ltr:pr-14 xl:rtl:pl-14 2xl:w-80 3xl:w-96 3xl:ltr:pr-16 3xl:rtl:pl-16">
                <div className="text-center ltr:md:text-left rtl:md:text-right">
                  {/* Name */}
                  <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
                    {authorData?.name}
                  </h2>
                  <div className="">
                    <div className="mb-1.5 text-lg tracking-tighter text-gray-600 dark:text-white">
                      {authorData?.following} Members
                    </div>
                  </div>
                  {/* User ID and Address */}
                  <div className="mt-5 inline-flex h-9 items-center rounded-full bg-white shadow-card dark:bg-light-dark xl:mt-6 text-center">
                    <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-blue2 px-4 text-xs text-white sm:text-sm truncate text-ellipsis sm:w-40 sm:text-sm">
                      #{authorData?.wallet_key}
                    </div>
                    <div
                      className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                      title="Copy Address"
                      onClick={handleCopyToClipboard}
                    >
                      {copyButtonStatus ? (
                        <Check className="h-auto w-3.5 text-green-500" />
                      ) : (
                        <Copy className="h-auto w-3.5" />
                      )}
                    </div>
                  </div>
                  {/* Submenu */}
                  <div className="mt-5 text-left">
                    <AnchorLink href="#" onClick={() => goToProposals()}>
                      <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-500 dark:text-white">
                        Proposals
                      </div>
                    </AnchorLink>
                    <AnchorLink href="#" onClick={() => goToCreateProposalPage()}>
                      <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-500 dark:text-white">
                        New proposal
                      </div>
                    </AnchorLink>
                    <AnchorLink href="#" onClick={() => goToTreasury()}>
                      <div className="mb-1.5 text-lg font-medium tracking-tighter text-gray-500 dark:text-white">
                        Treasury
                      </div>
                    </AnchorLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="2xl:ltr:pl-10 2xl:rtl:pr-10 4xl:ltr:pl-12 4xl:rtl:pr-12">
              <div className="flex flex-col items-center justify-between border-b border-dashed border-gray-200 pb-5 dark:border-gray-700 md:flex-row">
                <h2 className="mb-3 shrink-0 text-lg font-medium uppercase text-black dark:text-white sm:text-xl md:mb-0 md:text-2xl">
                  Proposals
                </h2>
                <Search />
                <SortList />
              </div>
            <VoteList voteStatus={'active'} />
            <VoteList voteStatus={'past'} />
          </div>
        </div>
      </div>
    </>
  );
};

ProposalsPage.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default ProposalsPage;
